import { Button } from "./ui/button";

type AddToCart = {
    handleClickFromCart: React.MouseEventHandler<HTMLButtonElement>
    isInCart: boolean
}

function AddToCart({ handleClickFromCart, isInCart} : AddToCart) {

    const dynamicClasses = isInCart ? "bg-white text-black hover:bg-slate-100 min-w-32" : "bg-slate-900 text-white min-w-32" 
    

    return (
        <>
        <Button onClick={handleClickFromCart} className={dynamicClasses} >{isInCart ? "Retirer du panier" : "Ajouter au panier"}</Button>
        </>
    )
}

export default AddToCart;


