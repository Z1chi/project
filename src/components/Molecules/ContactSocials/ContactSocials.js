import React from 'react';
import {ContactSocialLink} from '../../Atoms/ContactSocialLink/ContactSocialLink';

import './contactSocials.scss';

export const ContactSocials = ({contacts, supportData}) => {
    return (
        <div className='contactSocials'>
            <div className='contactSocials__title'>
                {contacts.title}
            </div>
            <div className='contactSocials__subtitle'>
                {contacts.subTitle}
            </div>
            <div className='contactSocials__links'>
                    <ContactSocialLink link={supportData?.email} socialName={"SOCIALS/EMAIL"}/>
                    <ContactSocialLink link={supportData?.link} socialName={"SOCIALS/TELEGRAM"}/>
            </div>
        </div>
    )
};