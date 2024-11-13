function Basket () {
    
    const productList = []

    for (const id in localStorage) {
        if (!isNaN(parseInt(id))) {
            productList.push(JSON.parse(localStorage[id]));
            console.log("🌝", productList);
            console.log("🌈", typeof(localStorage[id]));
        }
    }

    return (
        <div className="flex justify-between p-10">
            <div>
                <h2>Panier</h2> 
                <div className="flex flex-col gap-5">
                        {productList.map((product) => {
                            return (
                            <div key={product.id} className="flex gap-4" >
                                <img src={product.image} alt="" className="max-w-32"/>
                                <div>
                                    <h3>{product.product_name}</h3>
                                    <p>{product.price}€</p>
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
                                    <p>{product.price}€</p>
                                </div>
                            </div>
                            )}
                        )}
                </div>
            </div>
        </div>
    )
}

export default Basket

// "{\"id\":14,\"image\":\"http://192.168.5.181:3000/img/lampe-acier-gris.webp\",\"product_name\":\"Lampe en acier industrielle\",\"price\":75}"
