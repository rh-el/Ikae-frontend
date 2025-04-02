import { createBrowserHistory } from 'history'
import { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from './ui/button';

function Product () {
    const history = createBrowserHistory(); 
    const splitPathname = history.location.pathname.split('/')
    const productId = splitPathname[2]

    const [ productData, setProductData ] = useState<any>()
    const [ isInCart, setIsInCart ] = useState<boolean>(false)    
  
    
    const formattedProductData = {
        id: productData?.id, 
        image: productData?.images[0], 
        product_name: productData?.product_name, 
        price: productData?.price,
    }

    const handleClickFromCart = () => {
      if (isInCart) {
        localStorage.removeItem(productData?.id)
      } else {
        localStorage.setItem(productData?.id, JSON.stringify(formattedProductData));    
      }
      setIsInCart(!isInCart)
    }
    
    const getProductInfo = async () => {
        const request = await fetch(`https://ikae-backend-supabase.vercel.app/product/${productId}`)
        const fetchProductData = await request.json()
        setProductData(fetchProductData)        
        return fetchProductData.id
    }

    useEffect(() => {
        const initializeProduct = async () => {
            const fetchedId = await getProductInfo()
            if (fetchedId) {
                setIsInCart(localStorage.getItem(fetchedId.toString()) ? true : false)
            }
        }
        initializeProduct()
    }, [])

    function capitalizeFirstLetter(val: string) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    const dynamicClasses = isInCart ? "bg-white border border-black text-black hover:border-none hover:bg-slate-100 min-w-40": "bg-primary text-white min-w-40 hover:bg-white hover:border border-black hover:text-black" 

    return (
    <div className='min-h-[85vh]'>
        <div className='flex w-full justify-center items-center py-10 px-4 gap-20'>
            <div className="flex w-1/3 gap-8">
                    <Carousel opts={{loop: true}} className="flex flex-col gap-4">
                        <CarouselContent className='w-full items-center'>
                            {productData?.images.map((image: string, index: number) => (
                                <CarouselItem  key={index} className='basis-full'>
                                    <img src={image} className="" alt="" />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className='' />
                        <CarouselNext />
                    </Carousel>
                </div>
                <div className='w-1/3 flex flex-col gap-8'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <h2 className="text-4xl mb-2">{productData?.product_name}</h2>
                            <p className="text-2xl">{productData?.price.toFixed(2).replace(".", ",")}€</p>
                        </div>
                        <div className='leading-6'>
                            <p className="font-bold mt-3">Description</p>
                            <p>{productData?.description}</p>
                            <p className="font-bold mt-3">Catégorie</p>
                            <p>{capitalizeFirstLetter(productData?.type)}</p>
                            <p className="font-bold mt-3">Matière</p>
                            <p>{capitalizeFirstLetter(productData?.material)}</p>
                            <p className="font-bold mt-3">État</p>
                            <p>{capitalizeFirstLetter(productData?.state)}</p>
                        </div>
                    </div>
                    <div>
                        <Button className={dynamicClasses} onClick={handleClickFromCart}>{isInCart ? "Retirer du panier" : "Ajouter au panier"}</Button>
                    </div>
                </div>
        </div>
    </div>
    )
}

export default Product 