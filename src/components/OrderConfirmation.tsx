import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const OrderConfirmation = ({ orderData }: any) => {


    return (
        <>
        <div className="w-full flex justify-center items-center flex-col gap-4 text-2xl min-h-[85vh]">
            <p>Merci pour votre commande #{orderData.order_id} !</p>
            <p>Nous vous recontacterons sur l'adresse email : {orderData.user_email}.</p>
            <Link to="/">
                <Button className="mt-10 px-8 py-6 hover:bg-white hover:text-black border">Retour au shopping</Button>
            </Link>
        </div>
        </>
    )
}

export default OrderConfirmation