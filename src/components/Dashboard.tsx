import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
    id: number;
    product_name: string;
    price: number;
    image_links: string[];
}

type Dashboard = {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

const Dashboard = ( { setIsLoggedIn } : Dashboard) => {

    const [dashboardData, setDashboardData] = useState<[]>([])

    const fetchFunction = async () => {
        const request = await fetch("http://localhost:3000/home");
        const fetchData = await request.json();
        setDashboardData(fetchData)
      };

      useEffect(() => {
        fetchFunction()
      }, [])



    return (
        <div className="w-3/4 flex flex-col gap-4 items-center pt-10 min-h-[85vh]">
            <h2 className="text-3xl mb-5">Modifier les produits</h2>
            {dashboardData?.map((product: Product) => (
                <div key={product.id} className="relative flex w-3/4 gap-4 border items-center rounded-xl">
                    <div className="flex items-center w-24 h-24 object-contain">
                        <img className="rounded-l-xl" src={product.image_links?.[0]} alt="" />
                    </div>
                    <div className="flex flex-col justify-center w-3/4">
                        <h3 className="font-semibold">{product.product_name}</h3>
                        <p>{product.price.toFixed(2).replace(".", ",")}€</p>
                    </div>
                    <div className="flex pr-6 gap-x-4">
                        <Link className="hover:underline" to={`./product/${product.id}`}>Modifier</Link>
                        <p className="text-slate-200">|</p>
                        <Link className="hover:underline" to={`./product/${product.id}`}>🗑️</Link> 
                    </div>
                </div>
            ))}
            <Link to={'/login'}>
                <button onClick={() => setIsLoggedIn(false)} className="border py-4 px-10 rounded-md bg-slate-900 text-white m-10">Déconnexion</button>
            </Link>
        </div>
    )

}

export default Dashboard