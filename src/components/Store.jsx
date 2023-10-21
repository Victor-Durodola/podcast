import { useState } from 'react'
import PropTypes from 'prop-types'
import '../store.css'
import data from '../product.json'
import ShoppingCart from './ShoppingCart'
import { IoBagCheckOutline } from 'react-icons/io5'
import { UseShoppingContext } from '../context/ShoppingContext'
export function Item (props) {
  const [preview, setPreview] = useState(false)

  const {increaseCart, 
    decreaseCart, 
    getItemQuantity, 
    removeFromCart } = UseShoppingContext()
  //const quantity = getItemQuantity(props.id);

  


  const image = {
    backgroundImage: `url(${props.image})`
  }

  const togglePreview =(e)=> {
    e.stopPropagation();
    setPreview(!preview)
  }

  return(
    <>
      <div className="product-item">
          <div className="product-img" onClick={togglePreview} style={image}></div>
          <div className="product-info">
            <div className="namAndPrice">
              <div className="product-name">{props.name}</div>
              <div className="product-price">${props.price}</div>
            </div>
            {/* <button>preview</button> */}
          </div>
          <div className="input-submit">
            {getItemQuantity(props.id) >= 1 && <div className="input-section">
              <button className='decrease' onClick={()=>{decreaseCart(props.id)}}>-</button>
              <span className='count'>{getItemQuantity(props.id)}</span>
              <button className='increase' onClick={()=>{increaseCart(props.id)}}>+</button>
            </div>}
            {getItemQuantity(props.id)  > 0 &&<button className='remove' onClick={()=>{removeFromCart(props.id)}}>Remove</button>}
             {getItemQuantity(props.id) === 0  &&<button className='add-btn' onClick={()=>{increaseCart(props.id)}}>Add to cart</button>}
          </div>
        </div>
    </>
  )
}

export default function Store() {
  const {cartQuantity, openCart } = UseShoppingContext()
  let allItems = data.map(item => {
   return <Item key={item.id} name={item.name} price={item.price} image={item.image} id={item.id}/>
})
  return (
    <div className='store-container'>
      <div className="topBar">
        <h1>Welcome to our Store</h1>
        {cartQuantity > 0 && <button className='checkout-btn' onClick={openCart}>
          <IoBagCheckOutline/>
          <div className="cartCount">{cartQuantity}</div>
        </button>}
      </div>

      <ShoppingCart/>

      <div className="store-contents">
        {allItems}
      </div>
    </div>
  )
}

Item.propTypes = {
  name : PropTypes.string,
  image : PropTypes.string,
  price : PropTypes.string,
  id :PropTypes.number
}