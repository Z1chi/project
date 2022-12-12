import React from 'react';
import {useQuery} from "react-query";
import request from "../../../api/request";

import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';
import {OfferCard} from "../../Molecules/OfferCard/OfferCard";

import {paymentParamsConfig} from './data';

import './offersPage.scss';

export const OffersPage = () => {

  const offerQuery = useQuery('offers', () => {
    return request('/offers/get-offers').then(res => res.data)
  });

  return (
    <PageTemplate
      renderPage={({height, width}) => {
        return (
          <div className='offersPage' style={{width, height}}>
            {offerQuery.data && offerQuery.data.offers && offerQuery.data.offers.map((cardData, key) =>
              (
                <div className='offersPage__cardItem' key={`offersPage__cardItem(${key})`}>
                  <OfferCard
                    isMobile={width < 480}
                    offerConfig={paymentParamsConfig}
                    {...cardData}
                  />
                </div>
              )
            )}
          </div>
        )
      }}
    />
  )
};
