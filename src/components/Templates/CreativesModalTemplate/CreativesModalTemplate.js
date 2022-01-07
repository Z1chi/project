import React from 'react';

import {Slider} from '../../Organisms/Slider/Slider';
import {SelectionItem} from '../../Atoms/SelectionItem/SelectionItem';

import SVG from 'react-inlinesvg';
import config from '../../../configApi'

import './creativesModalTemplate.scss';

import {icons} from "./images";

export const CreativesModalTemplate = ({onClose, images, description, file_size, file_format, onDownload, preview_src}) => {

    const sliderImages = images.map(imageItem => {
        return {
            ...imageItem,
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
            <div className='creativesModalTemplate__slider'>
                <Slider items={sliderImages.map(image => image.source)}/>
            </div>
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
                    <button onClick={onDownload}>
                        Download now
                    </button>
                </div>
            </div>
        </div>
    )
};