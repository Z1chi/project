import React from 'react';

import {Slider} from '../../Organisms/Slider/Slider';
import {SelectionItem} from '../../Atoms/SelectionItem/SelectionItem';

import SVG from 'react-inlinesvg';

import './creativesModalTemplate.scss';

import {icons} from "./images";

export const CreativesModalTemplate = ({onClose, images, description, file_size, file_format, preview_src, file, contentData}) => {

    const sliderImages = images && images.map(imageItem => {
        return {
            ...imageItem,
            handler: () => {
                const win = window.open(process.env.MEDIA_URL + imageItem.source, "_blank");
                win.focus();
            },
            link: process.env.MEDIA_URL + imageItem.source,
            source: `${imageItem.source}`,
        };
    });

    return (
        <div className='creativesModalTemplate'>
            <div className='creativesModalTemplate__close' onClick={onClose}>
                <SVG src={icons.closeIcon}/>
            </div>
            <div className='creativesModalTemplate__image'>
                <img src={process.env.MEDIA_URL + preview_src} alt='modalImage'/>
            </div>
            {sliderImages && <div className='creativesModalTemplate__slider'>
                <Slider items={sliderImages}/>
            </div>}
            <div className='creativesModalTemplate__about'>
                <h3>About</h3>
                <div className='creativesModalTemplate__description'>
                    <p>{description}</p>
                </div>
                <div className='creativesModalTemplate__filesInfo'>
                    <div className='creativesModalTemplate__filesParam'>
                        <SelectionItem isSelected={true} title={`Format: ${file_format}`}/>
                    </div>
                    <div className='creativesModalTemplate__filesParam'>
                        <SelectionItem isSelected={true} title={`Size: ${file_size}`}/>
                    </div>
                </div>
                <div className='creativesModalTemplate__download'>
                    <a href={process.env.MEDIA_URL + file} target='_blank' download={file}>
                        {contentData.common.download}
                    </a>
                </div>
            </div>
        </div>
    )
};