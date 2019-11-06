import React from 'react';
import './ImageUrl.css'

const ImageUrl = ({onInputChange, onDetect}) => {
    return(
        <div>
            <p className='f3 tc'>Enter an Image URL to try out the facial recognition!</p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70' type='text' onChange={onInputChange}></input>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onDetect}>Detect!</button>
                </div>
            </div>
        </div>
    )
}

export default ImageUrl;