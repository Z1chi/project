import React from 'react';
import { ContactSocialLink } from '../../Atoms/ContactSocialLink/ContactSocialLink';

import './contactSocials.scss';

export const ContactSocials = ({ contacts }) => {
    return (
        <div className='contactSocials'>
            <div className='contactSocials__title'>
                {contacts.title}
            </div>
            <div className='contactSocials__subtitle'>
                {contacts.subTitle}
            </div>
            <div className='contactSocials__links'>
            {
                contacts.links.map( (link, key) => {
                    return (
                        <div key={key} className='contactSocials__linksItem'>
                            <ContactSocialLink {...link} />
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
};