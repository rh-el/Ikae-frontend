import { useEffect, useState } from "react";
import Card from "./Card";
import Filter from "./Filter";

interface Product {
  id: number;
  product_name: string;
  price: GLfloat;
  image_links: string[];
  type: string;
  color: string;
  material: string,
  state: string
}

interface Home {
  filter: string;
}

interface Category {
  type: string;
  color: string;
  material: string,
  state: string
}

const Home = ({ filter }: Home) => {
  const [data, setData] = useState<[]>();
  const [category, setCategory] = useState<Category>({"type": "", "material":"", "color": "", "state": ""});
    console.log("Catégorie: ", category)
    
  useEffect(() => {
    fetchFunction();
  }, [filter]);

  const fetchFunction = async () => {
    const request = await fetch("http://192.168.5.181:3000/home");
    const fetchData = await request.json();
    setData(fetchData);
  };

  console.log(data);

  
    // fonction pour modifier setCategory
    // et lui passer la valeur de l'élément option sélectionné
  const handleClick = (event:any) => {
    let categoryCopied = {...category}

    categoryCopied[event.target.name] = event.target.value
    console.log("Catégorie copiée: ", categoryCopied)
    setCategory(categoryCopied);
  }

  const checkCategory = (product: Product, category: Category, attribute: string) => {
    if (category[attribute].length !== 0) {
      console.log('dddddd') 
      return product[attribute] === category[attribute];
    }
    else {
      return true;
    }
  }

  return (
    <>
  <Filter handleClick={handleClick}/>
      <div className="grid gap-2 grid-cols-4 p-4">
        {data
          ?.filter((product: Product) => 
            product.product_name.trim().toLowerCase().includes(filter)
          && checkCategory(product, category, "type")
          && checkCategory(product, category, "material")
          && checkCategory(product, category, "color")
          && checkCategory(product, category, "state")
          )
          .map((product: Product) => (
            <Card
              id={product.id}
              product_name={product.product_name}
              price={product.price}
              image={product.image_links?.[0]}
            />
          ))}
      </div>
    </>
  );
};

export default Home;
