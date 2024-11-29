"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface DropdownStateChange {
  handleStateChange: (types: string[]) => void;
}

function DropdownState
({ handleStateChange }: DropdownStateChange) {

  // group all items in an object, associate a boolean for state management
  const [checkedItems, setCheckedItems] = React.useState<{ [key: string]: boolean }>({
    new: false,
    mint_condition: false,
    good_condition: false,
    satisfactory_condition: false,
  });

  // associate display values with values declared in db
  const itemsMap = {
    new: { display: "Neuf", value: "neuf" },
    mint_condition: { display: "Très bon état", value: "très bon état" },
    good_condition: { display: "Bon état", value: "bon état" },
    satisfactory_condition: { display: "État satisfaisant", value: "état satisfaisant" },
  };

  // manage check logic
  const handleCheckedChange = (key: keyof typeof itemsMap, checked: boolean) => {
    // update checkedItems state with new checked item
    const newCheckedItems = {
      ...checkedItems,
      [key]: checked
    };
    setCheckedItems(newCheckedItems);

    // get selected states:
    // convert {key: value} to [key, value]
    const selectedStates = Object.entries(newCheckedItems)
    // keep only truthy item
      .filter(([_, isChecked]) => isChecked)
    // get db exact name for each checked item
      .map(([key]) => itemsMap[key as keyof typeof itemsMap].value);
    // update category wuth new selected items
    handleStateChange(selectedStates);
  };

  // count selected items
  const selectedCount = Object.values(checkedItems).filter(Boolean).length;
  const buttonLabel = selectedCount > 0 
    ? `État (${selectedCount}) ▾` 
    : "État ▾";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="min-w-56 text-md h-12 shadow-md hover:shadow-none hover:bg-primary hover:text-white" variant="outline">{buttonLabel}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* generate a selector for each item in itemsMap */}
        {Object.entries(itemsMap).map(([key, { display }]) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={checkedItems[key]}
            onCheckedChange={(checked) => handleCheckedChange(key as keyof typeof itemsMap, checked as boolean)}
            className="text-md focus:bg-primary focus:text-white"
          >
            {display}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownState
