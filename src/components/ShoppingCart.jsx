import '../shoppingCart.css' 
import { UseShoppingContext } from '../context/ShoppingContext'
import CartItem from './CartItem'
import data from '../product.json'
import {AiOutlineClose} from 'react-icons/ai'

export default function ShoppingCart() {
    const {closeCart, open, cartItems} = UseShoppingContext()
    const style = {
        translate: open? '0px' : '350px'
    }
  return (
    <>
      <div className="shoppingCart" style={style}>
       <div className="cartHeader">
        <h1>Cart</h1>
        <button className='closeCart' onClick={closeCart}><AiOutlineClose/></button>
       </div>
       <div className="cartBody">
        {cartItems.map(item => <CartItem key={item.id} id={item.id} quantity={item.quantity}/>)}
       </div>
       <div className="cartTotal">
        Total: {cartItems.reduce((total, cartItem) => {
          const some = data.find(item => item.id == cartItem.id)
          return total + (some?.price || 0) * cartItem.quantity
        }, 0 )}
       </div>
      </div>
    </>
  )
}
