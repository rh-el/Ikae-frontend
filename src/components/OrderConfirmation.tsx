import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const OrderConfirmation = ({ orderData }: any) => {


    return (
        <>
        <div className="w-full h-screen flex justify-center items-center flex-col gap-4">
            <h1>Merci pour votre commande #{orderData.order_id}</h1>
            <h2>Nous vous recontacterons sur l'adresse email suivante: {orderData.user_email}</h2>
            <Link to="/">
                <Button className="px-8 py-6 hover:bg-white hover:text-black border">Retour au shopping</Button>
            </Link>
        </div>
        </>
    )
}

export default OrderConfirmation