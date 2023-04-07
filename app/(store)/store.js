import { Stalemate } from "next/font/google";
import { create } from "zustand";

const useCart = create((set, get) => ({
    cart: [],
    product: {},
    openModal: false,
    isMutation: false,
    setIsMutation: (params) => {
        set(state => {
            return {
                ...state,
                isMutation: !state.isMutation
            }
        })
    },
    setOpenModal: (params) => {
        set(state => {
            return {
                ...state,
                openModal: !state.openModal
            }
        })
    },
    setProduct: (params) => {
        const { newProduct } = params
        set(state => {
            return {
                ...state,
                product: newProduct
            }
        })
    },
    addItemToCart: (params) => {
        const { newItem } = params

        set((state) => {
            const newCart = [...state.cart, newItem]
            return {
                ...state,
                cart: newCart
            }
        })
    },
    removeItemToCart: (params) => {
        const { itemIndex } = params;
        set((state) => {
            const newCart = state.card.filter((item, index) => index !== itemIndex);
            return {
                ...state,
                cart: newCart
            }
        })
    },
    emptyCart: (params) => {
        set((state) => {
            const newCart = []
            return {
                ...state,
                cart: newCart
            }
        })
    }
}))

export default useCart