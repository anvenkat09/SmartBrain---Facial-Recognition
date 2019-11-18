import React from 'react';

const Navigation = ({currentRoute, onRouteChange}) => {
    return(
        (currentRoute === 'home' 
            ? 
            <div className='shadow-5' style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className='pointer dim link tr pr3 underline br2' onClick={() => onRouteChange('signin')}>Sign Out!</p>
            </div>
            : 
            (currentRoute === 'register' 
                ?
                <div className='shadow-5' style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p className='pointer dim link tr pr3 underline br2' onClick={() => onRouteChange('signin')}>Sign In</p>
                </div>
                : 
                <div></div>
            )
         )
    )
}

export default Navigation;