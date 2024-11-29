import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

type Card = {
  key: number;
  id: number;
  image: string;
  product_name: string;
  price: number;
};

const Card = ({ id, image, product_name, price }: Card) => {

  const [ isInCart, setIsInCart ] = useState<boolean>(false)

  const productData = {
    id: id,
    image: image,
    product_name: product_name,
    price: price,
  };

  useEffect(() => {
    setIsInCart(localStorage.getItem(id.toString()) ? true : false)
  }, [])


  const handleClickFromCart = () => {
    if (isInCart) {
      localStorage.removeItem(id.toString())
    } else {
      localStorage.setItem(id.toString(), JSON.stringify(productData));    
    }
    setIsInCart(!isInCart)
  }
  


  return (
    <div className="flex flex-col gap-2 p-4 rounded-md hover:bg-slate-50 shadow-md hover:shadow-none duration-200">
      <Link to={`./product/${id}`}>
        <img src={image} alt="" className="mb-2 rounded-lg" />
        <div className="px-2 flex flex-col gap-4 my-4">
          <h2 className="font-semibold text-2xl">{product_name}</h2>
          <p className="font-semibold">{price.toFixed(2).replace(".", ",")}€</p>

        </div>
      </Link>
      <AddToCart isInCart={isInCart} handleClickFromCart={handleClickFromCart}  />
    </div>
  );
};

export default Card;
