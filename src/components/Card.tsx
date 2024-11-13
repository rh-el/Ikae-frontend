import { Link } from 'react-router-dom'

type Card = {
    id: number,
    image: string,
    product_name: string,
    price: number
}

const Card = ({ id, image, product_name, price }: Card) => {

    console.log(price)

    // if (price == XXXXX)
        // XXXXX,00
    // else if (price == XX.X)
        // XX,X0
    // else if (price == XX.XX)
        // XX,XX

    return (<
        Link to={`./product/${id}`}>
        <div>
            <img src={image} alt="" />
            <h2>{product_name}</h2>
            <p>{price}€</p>
            <button className="focus:border-none">Ajouter au panier</button>
        </div>
        </Link>
    )

}

export default Card