import React, {useState} from 'react';

import ClickAwayListener from "react-click-away-listener";

import './dropdown.scss'


export const Dropdown = ({renderSwitcher, renderContent}) => {
    const [isOpened, setIsOpened] = useState(false);
    return (
        <ClickAwayListener onClickAway={isOpened ? () => {
            setIsOpened(false)
        } : () => {}}>
        <div className='dropdown'>
            <div className='dropdown__switcher' onClick={() => {
                setIsOpened(isOpenedStatus => !isOpenedStatus)
            }}>
                {
                    renderSwitcher({isOpened, setIsOpened})
                }
            </div>
            {    
                <div className='dropdown__content' style={{ display: isOpened ? 'block' : 'none' }}>
                    {
                        renderContent({isOpened, setIsOpened})
                    }
                </div>
            }
        </div>
        </ClickAwayListener>
    )
};