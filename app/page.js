import Stripe from "stripe";
import ProductCard from './ProductCard'

async function getStripeProducts() {
  const stripe = new Stripe(process.env.STRIPE_KEY ?? '', {
    apiVersion: '2020-08-27'
  })
  const res = await stripe.prices.list({
    expand: ['data.product']
  })
  const prices = res.data
  return prices
}

export default async function Home() {
  const products = await getStripeProducts();
  
  return (
    <main className='p-4'>
      <div className="max-w-[1100px] w-full mx-auto grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products?.map((item, index) => (
          <ProductCard key={index} product={item} />
          ))}
      </div>
    </main>
  );
}