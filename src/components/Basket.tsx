import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

type Basket = {
    id: number;
    price: number;
    product_name: string;
    image: string;
}

function Basket ({ setOrderData, isLoggedIn } : any) {

    const [ basketContent, setBasketContent ] = useState<Basket[]>([])
    const navigate = useNavigate()
    let totalPrice:GLfloat = 0;

    for (let i = 0; i < basketContent.length; i++){
        totalPrice += basketContent[i].price;
    }

    useEffect(() => {
        const productList: Basket[] = [];
        for (const id in localStorage) {
            if (!isNaN(parseInt(id))) {
                productList.push(JSON.parse(localStorage[id]));
            }
        }
        setBasketContent(productList)
        
        
    }, [])

    function removeItem(productId : string) {
        localStorage.removeItem(productId)
        setBasketContent(prevContent => 
            prevContent.filter(product => product.id.toString() !== productId)
        );
    }

    const newOrder = async (productIds: number[], token: string) => {
        const body = JSON.stringify({
            token : token,
            total_price : totalPrice,
            products_id : productIds,
        })  
        
        
        const request = await fetch('http://localhost:3000/order', {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json",
              },       
        })
        const data = await request.json()
        setOrderData(data)
        localStorage.clear()
        navigate("/confirmation");
    }

    const completeOrder = async () => {
        const token: any = Cookies.get('token')
        if (!isLoggedIn) {
            navigate("/login");
            return
        }
        const productIds = basketContent.map((product: any) => {
            return product.id
        })

        newOrder(productIds, token)
    }


    

    return (
        <div className="flex flex-col w-1/2 p-10 gap-5">
            <h2 className="text-3xl">Panier</h2> 
            <div className="flex justify-between gap-10">
                <div className="w-1/2">
                    <div className="flex flex-col gap-5">
                            {basketContent.map((product: any) => {
                                return (
                                <div key={product.id} className="flex gap-4" >
                                    <Link to={`../product/${product.id}`}>
                                    <img src={product.image} alt="" className="max-w-32"/>
                                    </Link>
                                    <div className="flex justify-between flex-col w-1/3">
                                        <div>
                                            <h3>{product.product_name}</h3>
                                            <p>{product.price.toFixed(2).replace(".", ",")}€</p>

                                        </div>
                                        <Button onClick={() => { 
                                            removeItem(product.id.toString())
                                            }}
                                            className="bg-white text-black hover:bg-slate-100 w-full">
                                            Supprimer
                                        </Button>
                                    </div>
                                </div>
                                )}
                            )}
                    </div>
                </div>
                <div className="flex w-96">
                    <div className="flex flex-col gap-5 border border-grey p-6 h-fit w-full">
                            <h2 className="font-bold">Récapitulatif de votre commande</h2>
                            {basketContent.map((product: any) => {
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
                            <Button onClick={completeOrder} className="px-2 py-6 w-full border border-black bg-black text-white duration-150">Commander</Button>
                            {/* <button onClick={completeOrder} className="p-2 w-full border border-black bg-black text-white duration-150">Commander</button> */}
                    </div>
                </div>
            </div>

        </div>
    )
}    

export default Basket;

