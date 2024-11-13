type AddToCart = {
    handleClick: any,
}

function AddToCart ({handleClick} : AddToCart) {

    return (
        <>
            <button onClick={handleClick}>Ajouter au panier</button>
        </>
    )
}

export default AddToCart