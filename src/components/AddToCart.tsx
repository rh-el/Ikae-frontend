// import { useState } from "react";

function AddToCart({ handleClickFromCart, isInCart} : any) {

    // const [ buttonText, setButtonText ] = useState("Ajouter au panier")
    
    return (
        <>
        <button onClick={handleClickFromCart} className="p-2 w-full border border-black hover:bg-black hover:text-white duration-150 mt-2">{isInCart ? "Ajouté ✔️" : "Ajouter au panier"}</button>
        </>
    )
}

export default AddToCart;


