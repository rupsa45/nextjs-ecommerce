import { create } from "zustand";
import { OrderItem, ShippingAddress } from "../models/OrderModel";
import { persist } from "zustand/middleware";
type Cart={
    items:OrderItem[]
    itemsPrice: number
    taxPrice:number,
    shippingPrice:number,
    totalPrice:number

    paymentMethod:string,
    shippingAddress:ShippingAddress
}
const initailState :Cart ={
    items:[],
    itemsPrice:0,
    taxPrice:0,
    shippingPrice:0,
    totalPrice:0,

    paymentMethod:'PayPal',
     shippingAddress:{
        fullName:"",
        address: "",
        city: "",
        pin: "",
        country:""
     }
}
export const cartStore=create<Cart>()(
    persist(()=>initailState,{
        name:"cartStore",
    })
) 
//export const cartStore=create<Cart>(()=>initailState)

export default function useCartService(){
    const {items,itemsPrice,taxPrice,shippingPrice,totalPrice,paymentMethod,
        shippingAddress} =cartStore()
    return{
        items,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentMethod,
        shippingAddress,
        
        increase:(item:OrderItem)=>{
            const exist = items.find(i => i.slug === item.slug);
            const updatedCartItems = exist 
            ? items.map((x)=>
               x.slug === item.slug? {...exist,qty:exist.qty+1}:x )
            :[...items ,{...item,qty:1}]
            const {itemsPrice,shippingPrice,taxPrice,totalPrice}=calcPrice(updatedCartItems)
            cartStore.setState({
                items:updatedCartItems,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            })
        },
        decrease:(item:OrderItem)=>{
            const exist = items.find(x=>x.slug===item.slug)
            if(!exist) return
            const updatedCartItems=
            exist.qty===1
             ? items.filter((x:OrderItem)=>x.slug !== item.slug)
             : items.map((x)=>(
                item.slug
                 ?{...exist,qty:exist.qty-1}:x
             ))
             const {itemsPrice,shippingPrice,taxPrice,totalPrice}=calcPrice(updatedCartItems)
            cartStore.setState({
                items:updatedCartItems,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            })
            
        },
        saveShippingAddrress: (shippingAddress: ShippingAddress) => {
            cartStore.setState({
              shippingAddress,
            })
          },
    }
}
const calcPrice = (items: OrderItem[]) => {
    const itemsPrice = items.reduce((total, item) => total + item.price * item.qty, 0);
    const taxPrice = itemsPrice * 0.1; // Assuming 10% tax
    const shippingPrice = 10; // Assuming a flat shipping rate of $10
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
    return { itemsPrice, taxPrice, shippingPrice, totalPrice };
};