import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, minus! Eius perferendis facere, enim id aperiam maiores eaque, fugiat quidem soluta quae itaque dolor nesciunt illum placeat eos odit totam.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, minus! Eius perferendis facere, enim id aperiam maiores eaque, fugiat quidem soluta quae itaque dolor nesciunt illum placeat eos odit totam.</p>
        </div>
    </div>
  )
}

export default DescriptionBox