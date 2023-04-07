'use client'
import useCart from "../(store)/store";
import { useRouter } from "next/navigation";
import Image from "next/image"

export default function ProductCard(props) {
  const product = useCart(state => state.product);

  // state management
  const isMutation = useCart(state => state.isMutation);
  const setIsMutation = useCart(state => state.setIsMutation);
  const addItemToCart = useCart(state => state.addItemToCart);

  // router
  const router = useRouter()

  function onAddItemToCart(){
    if(isMutation) return;
    setIsMutation()

    const newItem = {
        id: product.price_id,
        quantity: 1,
        name: product.name,
        cost: product.cost
    }
    addItemToCart({ newItem });
    
    setTimeout(() => {
        router.push('/')
        setIsMutation()
    }, 2000)
  }

  if(!product?.name) {
    router.push('/')
  }


  return (
    <div className='flex flex-col p-4'>

        <div className='grid grid-cols-1 md:grid-cols-2 w-full max-w-[1000px] mx-auto gap-4'>
            <div className='p-2 rounded shadow'>
                <Image width='200' height='200' className="rounded h-full object-cover w-full" src={product.image} alt={product.name} />
            </div>
            <div className='flex flex-col'>
                <div className='flex items-center gap-3'>
                    <h3 className='mb-2 text-2xl font-medium tracking-tight text-gray-900'>{product.name}</h3>
                    <div className='w-[35px] h-[35px] rounded-full bg-blue-700 flex items-center justify-center'>
                        <p className='text-white font-bold'>${product.cost/100}</p>
                    </div>
                </div>
                <p>{product.description}</p>
                <div className='flex-1 flex justify-end items-end p-4'>
                    <button onClick={onAddItemToCart} className={`py-2 px-6 ${isMutation ? 'bg-slate-400 cursor-pointer' : 'bg-slate-700 hover:bg-slate-800 cursor-not-allowed'} text-white tracking-wide font-medium`}>
                        {isMutation ? 'Loading...' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
