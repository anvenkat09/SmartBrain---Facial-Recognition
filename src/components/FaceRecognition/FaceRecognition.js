import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({boxes, imageUrl}) => {
    return(
        <div className='center ma'>
            <div id = 'image_with_boxes' className='absolute mt2'>
                <img id='detected_image' alt='' src = {imageUrl} width='500px' height='auto'></img>
                {boxes.map((box,index) => {
                  return(<div className='bounding-box' key={index} style={{top: box.top_row, right: box.right_col, bottom: box.bottom_row, left: box.left_col}}></div>)  
                })}
            </div>
        </div>
    );
}

export default FaceRecognition;