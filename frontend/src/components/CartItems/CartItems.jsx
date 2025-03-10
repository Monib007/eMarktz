import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {all_product, cartItems, removeFromCart, getTotalCartAmount} = useContext(ShopContext);

  return (
    <div className='cart-items '>
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
                <div className="cart-items-format cart-items-format-main">
                    <img className='cart-icon-product-icon' src={e.image} alt="" />
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <button className='cart-items-quantity'>{cartItems[e.id]}</button>
                    <p>${e.new_price*cartItems[e.id]}</p>
                    <img className='cart-items-remove-icon' onClick={()=>{removeFromCart(e.id)}} src={remove_icon} alt="" />
                </div>
            </div>
            }
            return null;
        })}
        <div className="cart-items-down">
            <div className="cart-items-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cart-items-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className='cart-items-total-item'>
                        <p>Shipping fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className='cart-items-total-item'>
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cart-items-promocode">
                <p>If you have a promocode, enter it here</p>
                <div className="cart-items-promobox">
                    <input type="text" placeholder='PROMO CODE'/>
                    <button>Submit</button>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default CartItems