import { useEffect, useState } from "react";
import Card from "./Card";

interface Product {
  id: number;
  product_name: string;
  price: GLfloat;
  image_links: string[];
}

interface Home {
  filter: string;
}

const Home = ({ filter }: Home) => {
  const [data, setData] = useState<[]>();

  useEffect(() => {
    fetchFunction();
  }, [filter]);

  const fetchFunction = async () => {
    const request = await fetch("http://192.168.5.181:3000/home");
    const fetchData = await request.json();
    setData(fetchData);
  };

  console.log(data);
  console.log("HOME FILTER", filter);

  return (
    <>
      <div className="grid gap-2 grid-cols-4 p-4">
        {data
          ?.filter((product: Product) =>
            product.product_name.trim().toLowerCase().includes(filter)
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
