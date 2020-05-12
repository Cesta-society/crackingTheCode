import React from 'react';
import GoogleAuth from './GoogleAuth';


const Header = ()=>{
    return (
        <div className="Login">
            <div className="text-right">
                <GoogleAuth />
            </div>
        </div>
    )
}

export default Header;