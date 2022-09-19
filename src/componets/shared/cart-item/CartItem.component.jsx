import React, { useContext } from 'react'
import './cart-item.styles.css'
import { AuthContext } from '../../../contexts/Auth.context'
import { CartContext } from '../../../contexts/Cart.context'
import { removeItem } from '../../../actions/cart.actions'

const CartItem = (props) => {
  const authContextValue = useContext(AuthContext)
  const cartContextValue = useContext(CartContext)

  const updateCart = async () => {
    try {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authContextValue.userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookID: props.book }),
      })
      if (response.status !== 200) {
        throw new Error()
      }
      await response.json()

      alert(`${props.title} removed from your cart`)

      cartContextValue.dispatchCartState(removeItem(props.book, props.price))
    } catch (err) {
      alert('Something went wrong')
    }
  }

  return (
    <div key={props.title} className=''>
      <div className='item-container'>
        <img src={props.bookCover} alt='' />
        <h2>{props.title}</h2>
        <p>{props.authour}</p>
        <span> $ {props.price}</span>
        <button onClick={updateCart} className='remove-btn'>
          Remove
        </button>
      </div>
    </div>
  )
}

export default CartItem
