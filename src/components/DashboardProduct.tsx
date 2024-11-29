import { useEffect, useState } from "react"
import { createBrowserHistory } from "history";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Product = {
    color: string;
    created_at: string;
    description: string;
    id: number;
    images: string[];
    in_stock: number;
    material: string;
    price: number;
    product_name: string;
    state: string;
    type: string;
    updated_at: string;
    user_id: number
}

type ModifyForm = {
    productName: string;
    description: string;
    material: string;
    price: string;
    state: string;
    type: string
}

const DashboardProduct = () => {
    const history = createBrowserHistory(); 
    const splitPathname = history.location.pathname.split('/')
    const productId = splitPathname[3]
    const [ dashboardProductData, setDashboardProductData ] = useState<Product>()
    const [ productName, setProductName ] = useState<string>("")
    const [ description, setDescription ] = useState<string>('')
    const [ material, setMaterial ] = useState<string>('')
    const [ price, setPrice ] = useState<string>('')
    const [ state, setState ] = useState<string>('')
    const [ type, setType ] = useState<string>('')
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (data: any) => { 
        sendUpdateForm(data)
        navigate(-1)
     }

    const sendUpdateForm = async (data: ModifyForm) => {
        const request = await modifyDb(data)
    }

    const modifyDb = async (data: ModifyForm) => {
        try {
            const response = await fetch(`https://ikae-backend-supabase.vercel.app/dashboard/update-product/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productName: data.productName,
                    description: data.description,
                    material: data.material,
                    price: data.price,
                    state: data.state,
                    type: data.type
                })
            })
            const modifyData = await response.json()
            return modifyData
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const fetchFunction = async () => {
        const request = await fetch(`https://ikae-backend-supabase.vercel.app/product/${productId}`)
        const fetchProductData = await request.json()
        setDashboardProductData(fetchProductData)
        setProductName(fetchProductData.product_name)
        setDescription(fetchProductData.description)
        setMaterial(fetchProductData.material)
        setPrice(fetchProductData.price)
        setState(fetchProductData.state)
        setType(fetchProductData.type)

    }

    

    useEffect(() => {
        fetchFunction()
        setValue('product_name', productName)
        setValue('description', description)
        setValue('material', material)
        setValue('price', price)
        setValue('state', state)
        setValue('type', type)
    }, [description, material, productName, price, state, type, setValue])

    // const handleFileSelect = (event) => {
    //     const file = event.target.files[0]
    //     setSelectedFile(file)
    // }

    // const handleUpload = async () => {
    //     if (!selectedFile) {
    //         setUploadStatus('Please select a file first')
    //         return
    //     }
    //     const formData = new FormData()
    //     formData.append('file', selectedFile)
    
    //     try {
    //         const api = await fetch('http://localhost:3000/api/feed/upload', {
    //                 method: 'POST',
    //                 body: formData
    //             })
    //         const data = await api.json()
    //     } catch (error: any) {
    //         console.error('upload error:', error)
    //         setUploadStatus('error uploading file: ' + error.message)
    //     }
    // }

    

    return (
        <>
            <h2 className="text-3xl text-center p-6">Modifier les informations</h2>
                <div>
                    <div className="flex w-full gap-2 mb-4">
                        <img src={dashboardProductData?.images[0]} className="max-w-40" alt="" />
                        {/* <input type="file" onChange={handleFileSelect}/> */}
                        <img src={dashboardProductData?.images[1]} className="max-w-40" alt="" />
                        <img src={dashboardProductData?.images[2]} className="max-w-40" alt="" />
                        <img src={dashboardProductData?.images[3]} className="max-w-40" alt="" />
                    </div>
                </div>
            <form className="flex flex-col items-center gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex w-full flex-col items-center">
                        <div className="flex flex-col gap-5 w-1/3 pb-4">
                            <div>
                                <label htmlFor="product_name" className="font-semibold leading-8">Nom du produit : </label>
                                <input type="text" className="border rounded-sm w-full outline-none px-4 py-2" {...register("product_name")} ></input>
                            </div>
                            <div>
                                <label htmlFor="description" className="font-semibold leading-8">Description : </label>
                                <input type="text" className="border rounded-sm w-full outline-none px-4 py-2" {...register("description")} ></input>
                            </div>
                            <div>
                                <label htmlFor="material" className="font-semibold leading-8">Matière : </label>
                                <input type="text" className="border rounded-sm w-full outline-none px-4 py-2" {...register("material")} ></input>
                            </div>
                            <div>
                                <label htmlFor="price" className="font-semibold leading-8">Prix : </label>
                                <input type="text" className="border rounded-sm w-full outline-none px-4 py-2" {...register("price")} ></input>
                            </div>
                            <div>
                                <label htmlFor="state" className="font-semibold leading-8">État : </label>
                                <input type="text" className="border rounded-sm w-full outline-none px-4 py-2" {...register("state")} ></input>
                            </div>
                            <div>
                                <label htmlFor="type" className="font-semibold leading-8">Type : </label>
                                <input type="text" className="border rounded-sm w-full outline-none px-4 py-2" {...register("type")} ></input>
                            </div>
                            
                        </div>
                    </div>
                <div className="flex flex-col gap-4 my-6">
                    <button className="border rounded-lg py-4 px-8 bg-slate-950 text-white" type="submit">Modifier les informations</button>
                    {/* <button className="border rounded-lg py-4 px-8" type="submit">Supprimer le produit</button> */}
                </div>
            </form>
        </>
    )
}


export default DashboardProduct