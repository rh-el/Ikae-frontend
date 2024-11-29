"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface DropdownCategoryProps {
  handleCategoryChange: (types: string[]) => void;
}

function DropdownCategory
({ handleCategoryChange }: DropdownCategoryProps) {

  // group all items in an object, associate a boolean for state management
  const [checkedItems, setCheckedItems] = React.useState<{ [key: string]: boolean }>({
    sofa: false,
    chair: false,
    lamp: false,
    carpet: false,
    armchair: false,
    table: false,
    storage: false,
    mirror: false,
    desk: false,
    decoration: false
  });

  // associate display values with values declared in db
  const itemsMap = {
    sofa: { display: "Canapé", value: "canapé" },
    chair: { display: "Chaise", value: "chaise" },
    lamp: { display: "Lampe", value: "lampe" },
    carpet: { display: "Tapis", value: "tapis" },
    armchair: { display: "Fauteuil", value: "fauteuil" },
    table: { display: "Table", value: "table" },
    storage: { display: "Rangement", value: "rangement" },
    mirror: { display: "Miroir", value: "miroir" },
    desk: { display: "Bureau", value: "bureau" },
    decoration: { display: "Décoration", value: "décoration" }
  };


  // manage check logic
  const handleCheckedChange = (key: keyof typeof itemsMap, checked: boolean) => {
    // update checkedItems state with new checked item
    const newCheckedItems = {
      ...checkedItems,
      [key]: checked
    };
    setCheckedItems(newCheckedItems);

    // get selected categories:
    // convert {key: value} to [key, value]
    const selectedTypes = Object.entries(newCheckedItems)
    // keep only truthy item
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, isChecked]) => isChecked)
    // get db exact name for each checked item
      .map(([key]) => itemsMap[key as keyof typeof itemsMap].value);
    // update category wuth new selected items
    handleCategoryChange(selectedTypes);
  };

  // count selected items
  const selectedCount = Object.values(checkedItems).filter(Boolean).length;
  const buttonLabel = selectedCount > 0 
    ? `Catégorie (${selectedCount}) ▾` 
    : "Catégorie ▾";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="min-w-56 text-md h-12 shadow-md hover:shadow-none hover:bg-secondary" variant="outline">{buttonLabel}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* generate a selector for each item in itemsMap */}
        {Object.entries(itemsMap).map(([key, { display }]) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={checkedItems[key]}
            onCheckedChange={(checked) => handleCheckedChange(key as keyof typeof itemsMap, checked as boolean)}
            className="text-md focus:bg-secondary"
          >
            {display}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownCategory
