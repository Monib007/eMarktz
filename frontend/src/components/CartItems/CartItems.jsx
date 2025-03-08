import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {all_product, cartItems, removeFromCart} = useContext(ShopContext);

  return (
    <div className='cart-items'>
        <div className="cart-items-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItems[e.id]>0)
            {
                return <div>
                <div className="cart-items-format">
                    <img className='cart-icon-product-icon' src="" alt="" />
                    <p></p>
                    <p></p>
                    <button className='cart-items-quantity'></button>
                    <p></p>
                    <img onClick={()=>{removeFromCart()}} src={remove_icon} alt="" />
                </div>
            </div>
            }
        })}
        
    </div>
  )
}

export default CartItems