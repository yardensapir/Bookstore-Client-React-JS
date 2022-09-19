import React, { useEffect, useState, useContext } from 'react'
import './cart-page.styles.css'
import Loader from '../../componets/shared/loader/Loader.component'
import CartItem from '../../componets/shared/cart-item/CartItem.component'
import { AuthContext } from '../../contexts/Auth.context'
import { useNavigate } from 'react-router-dom'
import { chekout, initCartAction } from '../../actions/cart.actions'
import { CartContext } from '../../contexts/Cart.context'

const CartPage = () => {
  const navigate = useNavigate()

  const authContextValue = useContext(AuthContext)
  const cartContextValue = useContext(CartContext)

  const [isLoading, setIsLoading] = useState(true)

  const handelCheckout = async () => {
    try {
      const response = await fetch('http://localhost:3000/cart/checkout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authContextValue.userToken}`,
        },
      })
      if (response.status !== 200) {
        throw new Error()
      }
      await response.json()
      alert('Checkout success !')
      cartContextValue.dispatchCartState(chekout())
    } catch (err) {
      alert('something went wrong')
    }
  }

  useEffect(() => {
    if (authContextValue.userToken == null) {
      navigate('/login')
    }
    const getUserCart = async () => {
      try {
        const response = await fetch('http://localhost:3000/cart', {
          headers: {
            Authorization: `Bearer ${authContextValue.userToken}`,
          },
        })
        if (response.status !== 200) {
          throw new Error()
        }
        const responsdeData = await response.json()
        const cart = responsdeData.data.findUserCart.books

        const booksPrice = cart.map((books) => {
          return books.bookID.price
        })

        const priceArray = booksPrice
        const initialValue = 0
        const sumBooksPrice = priceArray.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          initialValue
        )

        cartContextValue.dispatchCartState(initCartAction(cart, sumBooksPrice))
      } catch (err) {
        alert('Something went wrong')
      }
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    getUserCart()
  }, [])

  return isLoading ? (
    <Loader />
  ) : (
    <div className='main-cart-page'>
      {cartContextValue.cartState.items.length === 0 ? (
        <h1>Your cart is empty</h1>
      ) : (
        cartContextValue.cartState.items.map((cartItem) => {
          return (
            <CartItem
              key={cartItem.bookID.title}
              bookCover={cartItem.bookID.bookCover}
              title={cartItem.bookID.title}
              authour={cartItem.bookID.authour}
              price={cartItem.bookID.price}
              book={cartItem.bookID._id}
            />
          )
        })
      )}

      <h3>Total: $ {Math.floor(cartContextValue.cartState.price)}</h3>
      <button onClick={handelCheckout} className='checkout-btn'>
        Checkout !
      </button>
    </div>
  )
}

export default CartPage
