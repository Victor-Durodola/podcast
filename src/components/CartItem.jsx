import { UseShoppingContext } from "../context/ShoppingContext"
import PropTypes from 'prop-types'
import data from '../product.json'

CartItem.propTypes = {
    id: PropTypes.number,
    quantity: PropTypes.number
}

export default function CartItem(props) {
    const {removeFromCart} = UseShoppingContext()
    const some = data.find(item => item.id == props.id)
    some == null && null

  return (
    <>
      <div className="cartItem">
        <div className="item-left">
            <img
                src={some.image}
                style={{ width: "125px", height: "75px", objectFit: "cover"}}
                alt="product image" />
            
            <div className="itemName-qty-price">
                <div className="itemName">{some.name} <span>x{props.quantity}</span></div>
                <span>${some.price}</span>
            </div>
        </div>
        <div className="details">
            <div className="itemTotal">${some.price * props.quantity}</div>
            <button className="remove" onClick={()=>removeFromCart(props.id)}> X </button>
        </div>

      </div>
    </>
  )
}
