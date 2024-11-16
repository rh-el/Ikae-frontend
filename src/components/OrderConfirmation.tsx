const OrderConfirmation = ({ orderData }: any) => {


    return (
        <>
        <div className="w-full flex justify-center items-center flex-col">
            <h1>Merci pour votre commande #{orderData.order_id}</h1>
            <h2>Nous vous recontacterons sur l'adresse email suivante: {orderData.user_email}</h2>
        </div>
        </>
    )
}

export default OrderConfirmation