import { Button } from "./ui/button";

type AddToCart = {
    handleClickFromCart: React.MouseEventHandler<HTMLButtonElement>
    isInCart: boolean
}

function AddToCart({ handleClickFromCart, isInCart} : AddToCart) {

    const dynamicClasses = isInCart ? "bg-white text-black hover:bg-slate-100 min-w-32 text-md h-10 duration-200" : "bg-primary text-white min-w-32 text-md h-10 hover:text-black hover:bg-secondary hover:backdrop-blur-lg duration-200" 
    

    return (
        <>
        <Button onClick={handleClickFromCart} className={dynamicClasses} >{isInCart ? "Retirer du panier" : "Ajouter au panier"}</Button>
        {/* <div className="bg-re"></div> */}
        </>
    )
}

export default AddToCart;


