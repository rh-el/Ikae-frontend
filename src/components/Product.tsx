import { createBrowserHistory } from 'history'
import { useEffect, useState } from 'react'

function Product () {
    const history = createBrowserHistory(); 
    const splitPathname = history.location.pathname.split('/')
    const productId = splitPathname[2]
    console.log(productId)

    const [ data, setData ] = useState<any>()

    useEffect(() => {
        fetchFunction()
    }, [])

    const fetchFunction = async () => {
        const request = await fetch(`http://192.168.5.181:3000/product/${productId}`)
        const fetchData = await request.json()
        setData(fetchData)
    }

    console.log(data)

    return (
        <div className="flex gap-4 p-14">
            <div className="flex flex-col gap-4">
                <img src={data?.[0].image_links[0]} className="w-96" alt="" />
                <div className="flex">
                    <img src={data?.[0].image_links[1]} className="max-w-32" alt="" />
                    <img src={data?.[0].image_links[2]} className="max-w-32" alt="" />
                    <img src={data?.[0].image_links[3]} className="max-w-32" alt="" />
                </div>
            </div>

            <div>
                <h2 className="text-4xl">{data?.[0].product_name}</h2>
                <p>{data?.[0].price}€</p>
                <p>{data?.[0].description}</p>
                <p>{data?.[0].type}</p>
                <p>{data?.[0].material}</p>
                <p>{data?.[0].state}</p>
            </div>
        </div>

    )
}

export default Product 