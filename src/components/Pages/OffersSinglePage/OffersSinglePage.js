import React from 'react';

import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';
import {OfferHeader} from "../../Molecules/OfferHeader/OfferHeader";
import {OfferGrid} from "../../Organisms/OfferGrid/OfferGrid";

import './offersSinglePage.scss';

import {description, descriptionData, rowsConfig} from './data'

export const OffersSinglePage = () => {
    return (
        <div className='offersSinglePage'>
            <PageTemplate
                renderPage={({width}) => {
                    return (
                        <>
                            <OfferHeader/>
                            <OfferGrid
                                description={description}
                                descriptionData={descriptionData}
                                rows={rowsConfig}/>
                        </>
                    )
                }}
            />
        </div>
    )
};