import React from 'react';

import { useResizeDetector } from 'react-resize-detector';
import { getAdaptiveClassName } from '../../../helpers/mobile';

import { ContactCardField } from '../../Atoms/ContactCardField/ContactCardField';
import { Avatar } from '../../Atoms/Avatar/Avatar';

import SVG from 'react-inlinesvg';
import { images } from '../../Pages/FAQPage/images';

import './managerContactCard.scss';

export const ManagerContactCard = ({ manager }) => {
    const { width, height, ref } = useResizeDetector();
    
    return (
        <div ref={ref} className={getAdaptiveClassName({ className: 'managerContactCard', width, maxWidth: 320 })}>
            <div className='managerContactCard__profile'>
                <div className='managerContactCard__avatar'>
                    <Avatar imageSrc={manager.avatar} size='100px' />
                </div>
                <div className='managerContactCard__info'>
                {
                    manager.info.map( (managerField, key) => {
                        return (
                            <div key={key} className='managerContactCard__infoItem'>
                                <ContactCardField {...managerField} />
                            </div>
                        )
                    })
                }
                </div>
            </div>
            <div className='managerContactCard__contact'>
                <button>
                    <SVG src={images.socials.telegramIcon} />
                    <span>Contact now</span>
                </button>
            </div>
        </div>
    )
}