import React from 'react';
import { ContactSocialLink } from '../../Atoms/ContactSocialLink/ContactSocialLink';

import './contactSocials.scss';

export const ContactSocials = ({ links }) => {
    return (
        <div className='contactSocials'>
            <div className='contactSocials__title'>
                Contact us
            </div>
            <div className='contactSocials__subtitle'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </div>
            <div className='contactSocials__links'>
            {
                links.map( (link, key) => {
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