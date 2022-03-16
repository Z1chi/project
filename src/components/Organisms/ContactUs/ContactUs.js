import React from 'react';
import { ContactSocials } from '../../Molecules/ContactSocials/ContactSocials';
import { ManagerContactCard } from '../../Molecules/ManagerContactCard/ManagerContactCard';

import './contactUs.scss';

export const ContactUs = ({ contentData , support}) => {

    return (
        <div className='contactUs'>
            <div className='contactUs__socials'>
                <ContactSocials contacts={contentData.contacts} />
            </div>
            <div className='contactUs__separator'/>
            <div className='contactUs__manager'>
                <div className='contactUs__managerTitle'>
                    {contentData.contacts.secondSubTitle}
                </div>
                <div className='contactUs__managerSubtitle'>
                    {contentData.managerTitle.title}
                </div>
                <div className='contactUs__managerInfo'>
                    <ManagerContactCard managerData={support} manager={contentData.managerTitle} />
                </div>
            </div>
        </div>
    )
};