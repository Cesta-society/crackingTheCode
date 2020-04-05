import React from 'react';
import GoogleAuth from './GoogleAuth';

const Header = ()=>{
    return (
        <div className="ui secondary pointing menu">
            <div className="item">
                Quiz
            </div>
            <div className="right menu">
                <div  className="item">
                    Quiz
                </div>
                <GoogleAuth />
            </div>
        </div>
    )
}

export default Header;