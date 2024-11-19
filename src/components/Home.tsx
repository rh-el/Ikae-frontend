import { useEffect, useState } from "react";
import Card from "./Card";
// import Filter from "./Filter";
import DropdownCategory from "./DropdownCategory";
import DropdownMaterial from "./DropdownMaterial";
import DropdownColor from "./DropdownColor";
import DropdownState from "./DropdownState";
import { Button } from "./ui/button";

interface Product {
  id: number;
  product_name: string;
  price: GLfloat;
  image_links: string[];
  type: string;
  color: string;
  material: string;
  state: string;
}

interface Home {
  filter: string;
}

interface Category {
  types: string[];
  materials: string[];
  colors: string[];
  states: string[];
}

const Home = ({ filter }: Home) => {
  const [data, setData] = useState<[]>();
  const [category, setCategory] = useState<Category>({
    types: [],
    materials: [],
    colors: [],
    states: []
  });  
  const [ reset, setReset ] = useState(0)

  useEffect(() => {
    getAllProducts();
  }, [filter]);

  // fetch all products data
  const getAllProducts = async () => {
    const request = await fetch("http://localhost:3000/home");
    const fetchData = await request.json();
    setData(fetchData);
  };

  // handle category change
  // used in DropdownCategory component
  const handleCategoryChange = (types: string[]) => {
    setCategory(prev => ({
      ...prev,
      types
    }));
  };

  // handle material change
  // used in DropdownCategory component
  const handleMaterialChange = (materials: string[]) => {
    setCategory(prev => ({
      ...prev,
      materials
    }))
  }

  // handle color change
  // used in DropdownColor component
  const handleColorChange = (colors: string[]) => {
    setCategory(prev => ({
      ...prev,
      colors
    }))
  }

    // handle color change
  // used in DropdownColor component
  const handleStateChange = (states: string[]) => {
    setCategory(prev => ({
      ...prev,
      states
    }))
  }

  const handleReset = () => {
    handleCategoryChange([])
    handleMaterialChange([])
    handleColorChange([])
    handleStateChange([])
    setReset((prev) => prev + 1)
  }
  
  // main logic for checking checked categories
  // for each attribute: return all product if none selected, or only matching products
  const checkCategory = (product: Product, category: Category, attribute: string) => {
    switch (attribute) {
      case "types":
        return category.types.length === 0 ? true : category.types.includes(product.type)
      case "materials":
        return category.materials.length === 0 ? true : category.materials.includes(product.material)
      case "colors":
        return category.colors.length === 0 ? true : category.colors.includes(product.color)
      case "states":
        return category.states.length === 0 ? true : category.states.includes(product.state)
    }
  };

  return (
    <div className="mb-4 min-h-[85vh]">
      <div className="flex justify-center gap-2 pb-6">
        <DropdownCategory key={`category-${reset}`} handleCategoryChange={handleCategoryChange} />
        <DropdownMaterial key={`material-${reset}`} handleMaterialChange={handleMaterialChange} />
        <DropdownColor key={`color-${reset}`} handleColorChange={handleColorChange} />
        <DropdownState key={`state-${reset}`} handleStateChange={handleStateChange} />
        <Button className="min-w-32 bg-white text-black font-bold border hover:bg-slate-100 " onClick={handleReset}>Réinitialiser ↺</Button>
        {/* <Filter handleClick={handleClick} /> */}
      </div>
      <div className="grid justify-center items-center gap-x-4 gap-y-10 grid-cols-4 px-4 max-w-7xl ">
        {data
          ?.filter((product: Product) =>
            product.product_name.trim().toLowerCase().includes(filter) &&
            checkCategory(product, category, "types") &&
            checkCategory(product, category, "materials") &&
            checkCategory(product, category, "colors") &&
            checkCategory(product, category, "states")
          )
          .map((product: Product) => (
            <Card
              key={product.id}
              id={product.id}
              product_name={product.product_name}
              price={product.price}
              image={product.image_links?.[0]}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;