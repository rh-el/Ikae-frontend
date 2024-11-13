import { useEffect, useState } from "react";

interface Product {
    id: number;
    product_name: string;
    price: number;
    image_links: string[];
  }

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState<[]>([])

    const fetchFunction = async () => {
        const request = await fetch("http://192.168.5.181:3000/home");
        const fetchData = await request.json();
        setDashboardData(fetchData)
      };

      useEffect(() => {
        fetchFunction()
      }, [])



    return (
        <>
        <div className="p-10 flex flex-col gap-4">
            {dashboardData?.map((product: Product) => (
                <div key={product.id} className=" relative flex w-3/4 gap-4 border items-center rounded-xl ">
                    <div className="w-24 h-24 object-contain">
                        <img className="" src={product.image_links?.[0]} alt="" />

                    </div>
                    <div className="flex flex-col gap-4 justify-center w-1/6 ">
                        <h3>{product.product_name}</h3>
                        <p>{product.price}€</p>
                    </div>
                    <button className="absolute right-4 border h-1/2 p-4 rounded-xl text-center flex items-center ">
                        <p>Modifier produit</p>
                    </button>

                </div>
            ))}
        </div>
        </>
    )

}

export default Dashboard