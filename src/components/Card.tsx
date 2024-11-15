import { Link } from "react-router-dom";

type Card = {
  id: number;
  image: string;
  product_name: string;
  price: number;
};

const Card = ({ id, image, product_name, price }: Card) => {
  console.log(price);

  // if (price == XXXXX)
  // XXXXX,00
  // else if (price == XX.X)
  // XX,X0
  // else if (price == XX.XX)
  // XX,XX

  const productData = {
    id: id,
    image: image,
    product_name: product_name,
    price: price,
  };

  function handleClickFromCard() {
    localStorage.setItem(id.toString(), JSON.stringify(productData));
    console.log(localStorage);
  }

  return (
    <div className="mb-4">
      <Link to={`./product/${id}`}>
        <img src={image} alt="" />
        <h2>{product_name}</h2>
        <p>{price.toFixed(2).replace(".", ",")}€</p>
      </Link>
      <button onClick={handleClickFromCard} className="p-2 w-full border border-black hover:bg-black hover:text-white duration-150">Ajouter au panier</button>
    </div>
  );
};

export default Card;
