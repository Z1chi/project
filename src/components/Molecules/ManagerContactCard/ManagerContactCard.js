import React from 'react';

import {useResizeDetector} from 'react-resize-detector';
import {getAdaptiveClassName} from '../../../helpers/mobile';

import {ContactCardField} from '../../Atoms/ContactCardField/ContactCardField';
import {Avatar} from '../../Atoms/Avatar/Avatar';

import SVG from 'react-inlinesvg';
import {images} from '../../Pages/FAQPage/images';

import './managerContactCard.scss';
import {Button} from "../../Atoms/Button/Button";

export const ManagerContactCard = ({manager, managerData}) => {
    const {width, ref} = useResizeDetector();
    const mangerInfo = [
        {
            parameter: manager.managerCard.name,
            value: managerData?.name
        },
        {
            parameter: manager.managerCard.occupation,
            value: managerData?.occupation
        },
        {
            parameter: manager.managerCard.exp,
            value: managerData?.experience
        }
    ];
    return (
        <div ref={ref} className={getAdaptiveClassName({className: 'managerContactCard', width, maxWidth: 320})}>
            <div className='managerContactCard__profile'>
                <div className='managerContactCard__avatar'>
                    <Avatar imageSrc={managerData ? process.env.MEDIA_URL + managerData.img : ''} size='100px'/>
                </div>
                <div className='managerContactCard__info'>
                    {
                        mangerInfo.map((managerField, key) => {
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
                <Button onClick={() => {
                    window.open(manager?.link, '_blank');
                }}>
                    <SVG src={images.socials.telegramIcon}/>
                    <span>{manager.managerCard.link}</span>
                </Button>

            </div>
        </div>
    )
};