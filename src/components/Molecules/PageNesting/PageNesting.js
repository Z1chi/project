import React from 'react';
import { Link } from 'react-router-dom';

import './pageNesting.scss';


export const PageNesting = () => {
    return (
        <div className='pageNesting'>
            <Link to='/offers' className='pageNesting__initial'>Offers</Link>
            <p className='pageNesting__second'>1X Games</p>
        </div>
    )
};