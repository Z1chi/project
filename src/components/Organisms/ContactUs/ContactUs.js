import React from 'react';
import { ContactSocials } from '../../Molecules/ContactSocials/ContactSocials';
import { ManagerContactCard } from '../../Molecules/ManagerContactCard/ManagerContactCard';

import './contactUs.scss';

export const ContactUs = ({ contacts }) => {
    return (
        <div className='contactUs'>
            <div className='contactUs__socials'>
                <ContactSocials links={contacts.links} />
            </div>
            <div className='contactUs__separator'></div>
            <div className='contactUs__manager'>
                <div className='contactUs__managerTitle'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt?
                </div>
                <div className='contactUs__managerSubtitle'>
                    Your personal manager
                </div>
                <div className='contactUs__managerInfo'>
                    <ManagerContactCard manager={contacts.manager} />
                </div>
            </div>
        </div>
    )
}