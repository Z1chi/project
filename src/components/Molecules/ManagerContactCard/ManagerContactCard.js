import React from 'react';
import { useAtom } from '@reatom/react';

import { useResizeDetector } from 'react-resize-detector';
import { getAdaptiveClassName } from '../../../helpers/mobile';

import { ContactCardField } from '../../Atoms/ContactCardField/ContactCardField';
import { Avatar } from '../../Atoms/Avatar/Avatar';

import SVG from 'react-inlinesvg';
import { images } from '../../Pages/FAQPage/images';

import { profileSettingsAtom } from '../../../store/ProfileSettings';

import './managerContactCard.scss';

export const ManagerContactCard = ({ manager }) => {
    const { width, height, ref } = useResizeDetector();
    const [profileSettingsData, profileSettingsActions] = useAtom(profileSettingsAtom);
    
    return (
        <div ref={ref} className={getAdaptiveClassName({ className: 'managerContactCard', width, maxWidth: 320 })}>
            <div className='managerContactCard__profile'>
                <div className='managerContactCard__avatar'>
                    <Avatar imageSrc={profileSettingsData.fields.support? process.env.MEDIA_URL + profileSettingsData.fields.support.img : ''} size='100px' />
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
                <a href={profileSettingsData.fields.support?.link}>
                    <SVG src={images.socials.telegramIcon} />
                    <span>Contact now</span>
                </a>
            </div>
        </div>
    )
}