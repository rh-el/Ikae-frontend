import { Link } from "react-router-dom";

function Basket () {

    // const [ basketContent, setBasketContent ] = useState()
    
    const productList = []
    let totalPrice:GLfloat = 0;

    for (const id in localStorage) {
        if (!isNaN(parseInt(id))) {
            productList.push(JSON.parse(localStorage[id]));
        }
    }

    for (let i = 0; i < productList.length; i ++){
        totalPrice += productList[i].price;
    }
    
    // function removeItem(productId : string) {
    //     localStorage.removeItem(productId)
    //     console.log("📍", productId)
    //     window.location.reload()
    // }

    function handleClickOrder() {

    }

    // async function postOrder () {
    //     await fetch(`http://192.168.5.181:3000/order`, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           token: ,
    //           product_id: ,
    //           total_price: ,
    //         }),
    //       });
    // }
    

    return (
        <div className="flex justify-between p-10">
            <div>
                <h2 className="text-3xl mb-5">Panier</h2> 
                <div className="flex flex-col gap-5">
                        {productList.map((product) => {
                            return (
                            <div key={product.id} className="flex gap-4" >
                                <Link to={`../product/${product.id}`}>
                                <img src={product.image} alt="" className="max-w-32"/>
                                </Link>
                                <div>
                                    <h3>{product.product_name}</h3>
                                    <p>{product.price.toFixed(2).replace(".", ",")}€</p>
                                    {/* <button onClick={() => removeItem(product.id)}>🗑️ Supprimer</button> */}
                                     <button onClick={() => { 
                                        localStorage.removeItem(product.id)
                                        window.location.reload()
                                     }}>Supprimer</button>
                                </div>
                            </div>
                            )}
                        )}
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-5 border border-grey p-6">
                        <h2>Résumé de votre commande</h2>

                        {productList.map((product) => {
                            return (
                            <div key={product.id} className="flex gap-4" >
                                <div>
                                    <h3>{product.product_name}</h3>
                                    <p>{product.price.toFixed(2).replace(".", ",")}€</p>
                                </div>
                            </div>
                            )}
                        )}
                        <p>Prix total : {totalPrice.toFixed(2).replace(".", ",")}€</p>

                </div>
                <button className="border rounded-xl px-4 py-2 w-full duration-100 hover:bg-slate-950 hover:text-white " onClick={handleClickOrder} >Passer la commande</button>
            </div>
        </div>
    )
}

export default Basket

// "{\"id\":14,\"image\":\"http://192.168.5.181:3000/img/lampe-acier-gris.webp\",\"product_name\":\"Lampe en acier industrielle\",\"price\":75}"
