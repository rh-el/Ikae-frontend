import { createBrowserHistory } from 'history'
import { useEffect, useState } from 'react'
import AddToCart from './AddToCart';

function Product () {
    const history = createBrowserHistory(); 
    const splitPathname = history.location.pathname.split('/')
    const productId = splitPathname[2]
    console.log(productId)

    const [ productData, setProductData ] = useState<any>()

    const fetchFunction = async () => {
        const request = await fetch(`http://192.168.5.181:3000/product/${productId}`)
        const fetchProductData = await request.json()
        setProductData(fetchProductData)
    }

    useEffect(() => {
        fetchFunction()
    }, [])

    console.log(productData)

    function handleClick () {
        localStorage.setItem(productData[0].id, JSON.stringify(productData[0]));
        console.log(localStorage);
    }

    return (
        <div className="flex gap-4 p-14">
            <div className="flex flex-col gap-4">
                <img src={productData?.[0].image_links[0]} className="w-96" alt="" />
                <div className="flex">
                    <img src={productData?.[0].image_links[1]} className="max-w-32" alt="" />
                    <img src={productData?.[0].image_links[2]} className="max-w-32" alt="" />
                    <img src={productData?.[0].image_links[3]} className="max-w-32" alt="" />
                </div>
            </div>

            <div>
                <h2 className="text-4xl">{productData?.[0].product_name}</h2>
                <p>{productData?.[0].price}€</p>
                <p>{productData?.[0].description}</p>
                <p>{productData?.[0].type}</p>
                <p>{productData?.[0].material}</p>
                <p>{productData?.[0].state}</p>
                <AddToCart handleClick={handleClick}/>
            </div>
        </div>

    )
}

export default Product 