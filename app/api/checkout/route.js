import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function GET(response){
    return new Response('Hello from Checkout')
}

export async function POST(request) {
    const body = await request.json()
    console.log(body)

    if(body.lineItems.length === 0) {
        return new Response('Error', {status: 405})
    }

    try {
        const stripe = new Stripe(process.env.STRIPE_KEY ?? '', {
            apiVersion: '2020-08-27'
          })

        const session = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:3000',
            cancel_url: 'http://localhost:3000',
            line_items: body.lineItems,
            mode: 'payment'
        })

        return NextResponse.json({ session })
    } catch (err) {
        console.log(`Error: ${err.message}`)
        return new Response('Error', {status: 500})
    }
}