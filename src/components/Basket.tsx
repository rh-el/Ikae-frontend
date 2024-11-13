import { useState } from "react";

function Basket () {

    // const [ basketContent, setBasketContent ] = useState()
    
    const productList = []
    let totalPrice:GLfloat = 0;

    for (const id in localStorage) {
        if (!isNaN(parseInt(id))) {
            productList.push(JSON.parse(localStorage[id]));
            console.log("🌝", productList);
            console.log("🌈", typeof(localStorage[id]));
        }
    }

    for (let i = 0; i < productList.length; i ++){
        totalPrice += productList[i].price;
            console.log(totalPrice)
    }
    console.log(totalPrice)
    
    // function removeItem(productId : string) {
    //     localStorage.removeItem(productId)
    //     console.log("📍", productId)
    //     window.location.reload()
    // }



    // function sumTotalPrice() {
    //     const totalPrice = 1+1
    //     return totalPrice
    // }

    // function sumTotalPrice(...nums : any) {
    //     let sum = nums.reduce((num1 : number, num2: number) => num1 + num2)
    //     return sum
    // }

    // let totalPrice = sumTotalPrice()

    return (
        <div className="flex justify-between p-10">
            <div>
                <h2 className="text-3xl mb-5">Panier</h2> 
                <div className="flex flex-col gap-5">
                        {productList.map((product) => {
                            return (
                            <div key={product.id} className="flex gap-4" >
                                <img src={product.image} alt="" className="max-w-32"/>
                                <div>
                                    <h3>{product.product_name}</h3>
                                    <p>{product.price.toFixed(2)}€</p>
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
            <div>
                <div className="flex flex-col gap-5 border border-grey p-6">
                        <h2>Résumé de votre commande</h2>

                        {productList.map((product) => {
                            return (
                            <div key={product.id} className="flex gap-4" >
                                <div>
                                    <h3>{product.product_name}</h3>
                                    <p>{product.price.toFixed(2)}€</p>
                                </div>
                            </div>
                            )}
                        )}
                        {/* <p>Prix total : {productList.map((product) => 
                            totalPrice += parseInt(product.price)
                        )}€</p> */}
                        <p>Prix total : {totalPrice}€</p>

                </div>
            </div>
        </div>
    )
}

export default Basket

// "{\"id\":14,\"image\":\"http://192.168.5.181:3000/img/lampe-acier-gris.webp\",\"product_name\":\"Lampe en acier industrielle\",\"price\":75}"
