import { useEffect, useState } from "react"
import { createBrowserHistory } from "history";

const DashboardProduct = () => {
    const history = createBrowserHistory(); 
    const splitPathname = history.location.pathname.split('/')
    const productId = splitPathname[3]
    const [ dashboardProductData, setDashboardProductData ] = useState<any>(null)
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
        <div className="p-10">
            <form className="flex gap-4" action="post">
                <div>
                    <img src={dashboardProductData?.[0].image_links[0]} className="w-40" alt="" />
                    {/* <input type="file" onChange={handleFileSelect}/> */}
                    <img src={dashboardProductData?.[0].image_links[1]} className="w-40" alt="" />
                    <img src={dashboardProductData?.[0].image_links[2]} className="w-40" alt="" />
                    <img src={dashboardProductData?.[0].image_links[3]} className="w-40" alt="" />
                </div>
                <div className="flex w-full flex-col items-center">
                    <div className="flex flex-col gap-4 w-3/4 pb-4">
                        <div>
                            <label htmlFor="product_name">Nom du produit: </label>
                            <input type="text" className="border w-full" name="product_name" value={productName} onChange={(e) => setProductName(e.target.value)} ></input>
                        </div>
                        <div>
                            <label htmlFor="description">Description: </label>
                            <input type="text" className="border w-full" name="description" value={description} onChange={(e) => setDescription(e.target.value)} ></input>
                        </div>
                        <div>
                            <label htmlFor="material">Matière: </label>
                            <input type="text" className="border w-full" name="material" value={material} onChange={(e) => setMaterial(e.target.value)} ></input>
                        </div>
                        <div>
                            <label htmlFor="price">Prix: </label>
                            <input type="text" className="border w-full" name="price" value={price} onChange={(e) => setPrice(e.target.value)} ></input>
                        </div>
                        <div>
                            <label htmlFor="state">État: </label>
                            <input type="text" className="border w-full" name="type" value={state} onChange={(e) => setState(e.target.value)} ></input>
                        </div>
                        <div>
                            <label htmlFor="state">Type: </label>
                            <input type="text" className="border w-full" name="state" value={type} onChange={(e) => setType(e.target.value)} ></input>
                        </div>
                        
                    </div>
                    <button className="border py-4 px-8" type="submit">Modifier les informations</button>
                </div>
            </form>
        </div>
        </>
    )
}


export default DashboardProduct