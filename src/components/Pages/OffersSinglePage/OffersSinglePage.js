import React from 'react';

import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';
import {OfferHeader} from "../../Molecules/OfferHeader/OfferHeader";
import {OfferGrid} from "../../Organisms/OfferGrid/OfferGrid";

import './offersSinglePage.scss';

import {description, descriptionData, rowsConfig} from './data'
import {useQuery} from "react-query";
import request from "../../../api/request";

export const OffersSinglePage = (props) => {

    const offerQuery = useQuery('offer', () => {
        return request(`/offers/get-offer/?id=${props.match.params.id}`).then(res => res.data)
    });


    return (
        <div className='offersSinglePage'>
            <PageTemplate
                renderPage={() => {
                    return (
                        <>
                            <OfferHeader
                                {...offerQuery.data}
                            />
                            <OfferGrid
                                offerQuery={offerQuery.data}
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