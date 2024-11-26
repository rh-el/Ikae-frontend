import { useEffect, useState } from "react"
import { createBrowserHistory } from "history";

type Product = {
    color: string;
    created_at: string;
    description: string;
    id: number;
    image_links: string[];
    in_stock: number;
    material: string;
    price: number;
    product_name: string;
    state: string;
    type: string;
    updated_at: string;
    user_id: number
}

const DashboardProduct = () => {
    const history = createBrowserHistory(); 
    const splitPathname = history.location.pathname.split('/')
    const productId = splitPathname[3]
    const [ dashboardProductData, setDashboardProductData ] = useState<Product[]>(null)
    const [ productName, setProductName ] = useState<string>("")
    const [ description, setDescription ] = useState<string>('')
    const [ material, setMaterial ] = useState<string>('')
    const [ price, setPrice ] = useState<string>('')
    const [ state, setState ] = useState<string>('')
    const [ type, setType ] = useState<string>('')

    const fetchFunction = async () => {
        const request = await fetch(`http://localhost:3000/product/${productId}`)
        const fetchProductData = await request.json()
        setDashboardProductData(fetchProductData)
        setProductName(fetchProductData[0].product_name)
        setDescription(fetchProductData[0].description)
        setMaterial(fetchProductData[0].material)
        setPrice(fetchProductData[0].price)
        setState(fetchProductData[0].state)
        setType(fetchProductData[0].type)

    }

    console.log(dashboardProductData);
    

    useEffect(() => {
        fetchFunction()
    }, [])

    // const handleFileSelect = (event) => {
    //     const file = event.target.files[0]
    //     setSelectedFile(file)
    //     console.log("selected file: ", file);        
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
    //         console.log(data);
    //     } catch (error: any) {
    //         console.error('upload error:', error)
    //         setUploadStatus('error uploading file: ' + error.message)
    //     }
    // }

    

    return (
        <>
            <h2 className="text-3xl text-center p-6">Modifier les informations</h2>
            <form className="flex flex-col items-center gap-4 w-full" action="post">
                <div>
                    <div className="flex w-full gap-2 mb-4">
                        <img src={dashboardProductData?.[0].image_links[0]} className="max-w-40" alt="" />
                        {/* <input type="file" onChange={handleFileSelect}/> */}
                        <img src={dashboardProductData?.[0].image_links[1]} className="max-w-40" alt="" />
                        <img src={dashboardProductData?.[0].image_links[2]} className="max-w-40" alt="" />
                        <img src={dashboardProductData?.[0].image_links[3]} className="max-w-40" alt="" />
                    </div>
                </div>
                {/* <div className="flex"> */}
                    <div className="flex w-full flex-col items-center">
                        <div className="flex flex-col gap-5 w-1/3 pb-4">
                            <div>
                                <label htmlFor="product_name" className="font-semibold leading-8">Nom du produit : </label>
                                <input type="text" className="border rounded-sm w-full outline-none px-4 py-2" name="product_name" value={productName} onChange={(e) => setProductName(e.target.value)} ></input>
                            </div>
                            <div>
                                <label htmlFor="description" className="font-semibold leading-8">Description : </label>
                                <input type="text" className="border rounded-sm w-full outline-none px-4 py-2" name="description" value={description} onChange={(e) => setDescription(e.target.value)} ></input>
                            </div>
                            <div>
                                <label htmlFor="material" className="font-semibold leading-8">Matière : </label>
                                <input type="text" className="border rounded-sm w-full outline-none px-4 py-2" name="material" value={material} onChange={(e) => setMaterial(e.target.value)} ></input>
                            </div>
                            <div>
                                <label htmlFor="price" className="font-semibold leading-8">Prix : </label>
                                <input type="text" className="border rounded-sm w-full outline-none px-4 py-2" name="price" value={price} onChange={(e) => setPrice(e.target.value)} ></input>
                            </div>
                            <div>
                                <label htmlFor="state" className="font-semibold leading-8">État : </label>
                                <input type="text" className="border rounded-sm w-full outline-none px-4 py-2" name="type" value={state} onChange={(e) => setState(e.target.value)} ></input>
                            </div>
                            <div>
                                <label htmlFor="type" className="font-semibold leading-8">Type : </label>
                                <input type="text" className="border rounded-sm w-full outline-none px-4 py-2" name="state" value={type} onChange={(e) => setType(e.target.value)} ></input>
                            </div>
                            
                        </div>
                    </div>
                {/* </div> */}
                <div className="flex flex-col gap-4 my-6">
                    <button className="border rounded-lg py-4 px-8 bg-slate-950 text-white" type="submit">Modifier les informations</button>
                    <button className="border rounded-lg py-4 px-8" type="submit">Supprimer le produit</button>
                </div>
            </form>
        </>
    )
}


export default DashboardProduct