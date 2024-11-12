type Card = {
    image: string,
    product_name: string,
    price: number
}

const Card = ({ image, product_name, price }: Card) => {



    return (
        <div>
            <img src={image} alt="" />
            <h2>{product_name}</h2>
            <p>Prix: {price}</p>
            <button className="focus:border-none">Ajouter au panier</button>
        </div>

    )

}

export default Card