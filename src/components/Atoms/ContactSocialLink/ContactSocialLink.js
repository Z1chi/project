import React from 'react';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import { images } from '../../Pages/FAQPage/images'
import { SOCIALS_EMAIL, SOCIALS_TELEGRAM } from '../../Pages/FAQPage/constants'

import './contactSocialLink.scss';

const socailIcons = {
    [SOCIALS_EMAIL]: images.socials.telegramIcon,
    [SOCIALS_TELEGRAM]: images.socials.emailIcon,
};

export const ContactSocialLink = ({ socialName, link }) => {
    return (
        <div className='contactSocialLink'>
            <div className='contactSocialLink__logo'>
                <SVG src={socailIcons[socialName]} />
            </div>
            <div className='contactSocialLink__text'>
                <Link to={link.to}>{link.text}</Link>
            </div>
        </div>
    )
};