import React from 'react';
import { PostbackSectionTitle } from '../../Atoms/PostbackSectionTitle/PostbackSectionTitle';

import './postbackSection.scss';

export const PostbackSection = ({ title, children }) => {
    return (
        <div className='postbackSection'>
            <div className='postbackSection__title'>
                <PostbackSectionTitle {...title} />
            </div>
            <div className='postbackSection__content'>
                { children }
            </div>
        </div>
    )
}