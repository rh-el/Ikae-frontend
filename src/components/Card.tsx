import { useState } from "react";
import { Link } from "react-router-dom";
import AddToCart from "./addToCart";

type Card = {
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

  const handleClickFromCart = () => {
    localStorage.setItem(id.toString(), JSON.stringify(productData));    
    setIsInCart(!isInCart)
  }


  return (
    <div className="mb-4">
      <Link to={`./product/${id}`}>
        <img src={image} alt="" className="mb-2" />
        <h2 className="font-semibold">{product_name}</h2>
        <p>{price.toFixed(2).replace(".", ",")}€</p>
      </Link>
      <AddToCart isInCart={isInCart} handleClickFromCart={handleClickFromCart} />
    </div>
  );
};

export default Card;
