import React, {useState} from 'react';

import ClickAwayListener from "react-click-away-listener";

import './dropdown.scss'


export const Dropdown = ({renderSwitcher, renderContent}) => {
    const [isOpened, setIsOpened] = useState(false);
    return (
        <div className='dropdown'>
            <div className='dropdown__switcher' onClick={() => setIsOpened(true)}>
                {
                    renderSwitcher({isOpened, setIsOpened})
                }
            </div>
            {
                isOpened && (
                    <ClickAwayListener onClickAway={() => {
                        setIsOpened(false)
                    }}>
                        <div className='dropdown__content'>
                            {
                                renderContent({isOpened, setIsOpened})
                            }
                        </div>
                    </ClickAwayListener>
                )
            }
        </div>
    )
};