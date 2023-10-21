import React, { useContext, useState } from "react"
import PropTypes from 'prop-types'
import useLocalStorage from "../hooks/useLocalStorage"

const Shopping = React.createContext()

export function UseShoppingContext () {
    return useContext(Shopping)
}
export default function ShoppingContext(props) {
    const [cartItems, setCartItems] = useLocalStorage('shopping-cart', [])
    // eslint-disable-next-line no-unused-vars
    const [open, setOpen] = useState(false)

    const openCart =()=> {
        setOpen(true)
    }

    const closeCart =()=> {
        setOpen(false)
    }

    const cartQuantity = cartItems.reduce( (quantity, item) =>  item.quantity + quantity, 0)

    function getItemQuantity(id) {
        return cartItems.find(element => element.id === id)?.quantity || 0 
    }

    function increaseCart(id){
        setCartItems(curr => {
            if (curr.find(item => item.id === id) == null){
                return [...curr, { id, quantity: 1}]
            } else {
                return curr.map( item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }         
        })
    }

    function decreaseCart(id) {
        setCartItems(curr => {
            if (curr.find(item => item.id == id)?.quantity == 1){
                return curr.filter(item => item.id !== id)
            } else {
                return curr.map( item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }         
        })
    }

    function removeFromCart(id) {
        setCartItems(curr => {
            return curr.filter( item => item.id !== id )
        })
    }
    const value = {
        increaseCart,
        decreaseCart, 
        getItemQuantity, 
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        open
    }
    
  return (
    
      <Shopping.Provider value={value}>
        {props.children}
      </Shopping.Provider>
    
  )
}

ShoppingContext.propTypes = {
    children: PropTypes.any,
    getItemQuantity: PropTypes.func
} 