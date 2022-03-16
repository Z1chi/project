import React from 'react';
import {useHistory} from 'react-router-dom';
import {useQuery} from "react-query";
import request from "../../../api/request";
import {useAtom} from "@reatom/react";

import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';
import {OfferHeader} from "../../Molecules/OfferHeader/OfferHeader";
import {OfferGrid} from "../../Organisms/OfferGrid/OfferGrid";

import './offersSinglePage.scss';

import {languageAtom} from "../../../store/language";
import {description, rowsConfig} from './data'


export const OffersSinglePage = (props) => {
    const [languageData, ] = useAtom(languageAtom);
    const history = useHistory();
    const offerQuery = useQuery('offer', () => {

        return request(`/offers/get-offer?id=${props.match.params.id}`).then(res => {
            if (res.exception)
                history.push('/offers');
            return res.data
        })
    });


    return (
        <div className='offersSinglePage'>
            <PageTemplate
                renderPage={({contentData}) => {
                    return offerQuery.data && (
                        <>
                            <OfferHeader
                                {...offerQuery.data}
                                contentData={contentData.data}
                            />
                            <OfferGrid
                                offerQuery={offerQuery.data}
                                description={description({contentData : languageData.data.offerSignlePage.row})}
                                // descriptionData={descriptionData}
                                rows={rowsConfig({contentData : languageData.data.offerSignlePage.row})}/>
                        </>
                    )
                }}
            />
        </div>
    )
};