import React from 'react';

import './loader.scss';

export const Loader = ({ whiteTheme }) => {
    return (
        <div className={`loader${whiteTheme?' loader--whiteTheme':''}`}></div>
    )
}