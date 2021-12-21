import React from 'react';
import {Redirect} from 'react-router-dom'

import './mainPage.scss';

export const MainPage = () => {

    return (
        <div className='mainPage'>
            <Redirect to='/dashboard'/>
        </div>
    )
};