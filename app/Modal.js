"use client";
import useCart from "./(store)/store";
import ReactDom from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal() {
  // cart
  const setOpenModal = useCart((state) => state.setOpenModal);
  const cart = useCart((state) => state.cart);
  const isMutation = useCart((state) => state.isMutation);
  const setIsMutation = useCart((state) => state.setIsMutation);

  const router = useRouter()

  // on Checkout
  async function onCheckout(){
    if(isMutation) return;
    setIsMutation();

    const lineItems = cart?.map(item => ({
        price: item.id,
        quantity: item.quantity
    }))

    // const response = await fetch('/api/checkout', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ lineItems })
    // })
    // const data = await response.json();

    const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lineItems })
    })
    const data = await res.json()

    if(res.ok) {
        setTimeout(() => setIsMutation(), 1500)
        router.push(data.session.url)
    }
  }
  

  return ReactDom.createPortal(
    <div className="w-screen h-screen z-50 fixed top-0 left-0 -translate-x-0 -translate-y-0 bg-black bg-opacity-50">
      <div onClick={setOpenModal} className="absolute inset-0"></div>
      <div className="absolute top-0 right-0 w-full sm:w-96 h-screen bg-white text-slate-700 p-2 overflow-y-scroll">
        <div className="flex items-center justify-between p-4">
          <p className="tracking-tight font-semibold text-xl">Cart</p>
          <i className="fa-solid fa-xmark text-xl" onClick={setOpenModal} />
        </div>
        <div className="w-[250px] h-[1px] bg-slate-400 mx-auto mb-4" />

        <div className="p-2 flex flex-col gap-4">
          {cart?.map((item, index) => (
            <div
              className="flex flex-col gap-2 border-l-2 border-solid border-slate-700 p-2 text-slate-800"
              key={index}
            >
              <div className="flex items-center justify-between">
                <h5 className="font-semibold tracking-tight">{item.name}</h5>
                <p>${item.cost / 100}</p>
              </div>
              <p className="text-sm text-slate-500">
                <span className="font-normal">Quantity:</span> {item.quantity}
              </p>
            </div>
          ))}
        </div>

        <div className='p-2 mt-2' onClick={onCheckout}>
            <button className={`border-2 p-3 border-solid ${isMutation ? 'cursor-not-allowed border-slate-300 text-opacity-50' : 'cursor-pointer border-slate-700'} w-full uppercase tracking-wider font-medium text-slate-800`}>
                {isMutation ? 'Progress...' : 'Checkout'}
            </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
