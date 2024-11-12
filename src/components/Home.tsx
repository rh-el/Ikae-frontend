import Header from "./Header"
import { useEffect, useState } from "react"
import Card from "./Card"

interface Product {
    id: number;
    product_name: string;
    price: number;
    image_links: string[];
}

const Home = () => {

    const [ prenom, setPrenom ] = useState<string>('')
    const [ data, setData ] = useState<[]>()

    useEffect(() => {
        fetchFunction()
    }, [])

    const fetchFunction = async () => {
        const request = await fetch('http://192.168.5.181:3000/home')
        const fetchData = await request.json()
        setData(fetchData)
    }

    console.log(data);
    return (
        <>
            <div>this is my homepage</div>
            <div>je suis {prenom}</div>
            <Header setPrenom={setPrenom} />
            {data?.map((product: Product) => (
                <Card 
                key={product.id}
                product_name={product.product_name}
                price={product.price}
                image={product.image_links?.[0]} />
                
            ))}
            
        </>

    )
}

export default Home