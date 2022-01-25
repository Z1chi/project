import React from 'react';
import {Link} from 'react-router-dom';

import {OfferPaymentParam} from '../../Atoms/OfferPaymentParam/OfferPaymentParam';


import './offerCard.scss';


export const OfferCard = ({image, isMobile, id, title, url, project_affiliate, small_description, offerConfig}) => {

    const paymentParamsArray = Object.entries(project_affiliate);

    return (
        <div className={`offerCard${isMobile ? " offerCard--isMobile" : ""}`}>
            <div className='offerCard__preview'>
                <div className='offerCard__logo'>
                    <img src={`${process.env.MEDIA_URL}${image}`} alt=''/>
                </div>
                <Link to={`/offers/${id}`} className='offerCard__more'>
                    More info
                </Link>
            </div>

            <div className='offerCard__info'>
                <div className='offerCard__header'>
                    <div className='offerCard__title'>
                        <div className='offerCard__titleText'>
                            {title}
                        </div>
                        <div className='offerCard__titleLink'>
                            <a href={url}>
                                {url}
                            </a>
                        </div>
                    </div>
                    <div className='offerCard__tags'>
                        {/*<OfferTags tags={tags}/>*/}
                    </div>
                </div>

                <div className='offerCard__paymentParams'>
                    {

                        paymentParamsArray && paymentParamsArray.map((item, key) => {
                            return (
                                <div className='offerCard__paymentParamsItem'
                                     key={`offerCard__paymentParamsItem${key}`}>
                                    {
                                        (offerConfig[item[0]] && offerConfig[item[0]].renderValue)
                                            ? offerConfig[item[0]].renderValue({value: item, isMobile})
                                            : <OfferPaymentParam key={key} isMobile={isMobile} param={item}/>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className='offerCard__description'>
                    {small_description}
                </div>
            </div>
        </div>

    )
};