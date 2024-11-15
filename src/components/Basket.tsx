import { Link } from "react-router-dom";
import Cookies from 'js-cookie';


function Basket () {

    // const [ basketContent, setBasketContent ] = useState()
    
    const productList:any = []
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

    const newOrder = async (productIds: number[], token: string) => {
        const request = await fetch('http://192.168.5.181:3000/order', {
            method: "POST",
            body: JSON.stringify({
                token : token,
                total_price : totalPrice,
                product_id : productIds,
            })
        })
        console.log(request.json());
    }

    const completeOrder = async () => {
        const productIds = productList.map((product: any) => {
            return product.id
        })
        console.log("🍑", productIds);
        const token = Cookies.get('token')
        console.log(token);
        newOrder(productIds, token)
    }


    

    return (
        <div className="flex justify-between p-10">
            <div>
                <h2 className="text-3xl mb-5">Panier</h2> 
                <div className="flex flex-col gap-5">
                        {productList.map((product: any) => {
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
            <div className="w-1/3">
                <div className="flex flex-col gap-5 border border-grey p-6 w-full">
                        <h2 className="font-bold">Résumé de votre commande</h2>
                        {productList.map((product: any) => {
                            return (
                            <div key={product.id} className="flex gap-4" >
                                <div className="flex justify-between w-full">
                                    <h3>{product.product_name}</h3>
                                    <p>{product.price.toFixed(2).replace(".", ",")}€</p>
                                </div>
                            </div>
                            )}
                        )}
                        <hr className="my-2 h-0.5 border-t-0 bg-black" />
                        <div className="flex justify-between font-bold">
                            <p>Prix total</p>
                            <p>{totalPrice.toFixed(2).replace(".", ",")}€</p>
                        </div>
                        <button onClick={completeOrder} className="p-2 w-full border border-black bg-black text-white duration-150">Commander</button>
                </div>
            </div>
        </div>
    )
}    

export default Basket;

{/* // "{\"id\":14,\"image\":\"http://192.168.5.181:3000/img/lampe-acier-gris.webp\",\"product_name\":\"Lampe en acier industrielle\",\"price\":75}" */}
