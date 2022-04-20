import React from "react";

import {Swiper, SwiperSlide} from 'swiper/react';

import {Table} from "../../Organisms/Table/Table";
import {Map} from "../../Organisms/Map/Map";
import {AItem} from "../../Atoms/AdItem/AItem";
import {OfferPaymentParam} from "../../Atoms/OfferPaymentParam/OfferPaymentParam";
import {SelectionItem} from "../../Atoms/SelectionItem/SelectionItem";
import {InfoCard} from "../../Molecules/InfoCard/InfoCard";
import {TrafficSourceList} from "../../Molecules/TrafficSourceList/TrafficSourceList";
import {OfferDemoAccount} from "../../Organisms/OfferDemoAccount/OfferDemoAccount";

import 'swiper/css';

import {images} from "./images/index";

import {offerTypeNameList} from "../OffersPage/data";

import {dateStringFormator, localeString} from "../../../helpers/lib";

export function rowsConfig({contentData}) {
    return (
        [
            [{
                id: 'model',
                icon: images.modelIcon,
                title: contentData.model,
                renderContent: ({type, cpa, revshare}) => {
                    return (
                        <> {(type === 0 || type === 2) && <OfferPaymentParam
                            styles={{margin: '5px 10px 5px 0'}}
                            param={[

                                <span style={{
                                    padding: '5px 10px',
                                    color: '#16FFAC',
                                    background: 'rgba(22, 255, 172, 0.26)',
                                    border: '1px solid rgba(22, 255, 172, 0.4)',
                                    cursor: 'default',
                                    borderRadius: "4px"
                                }}>
                            {`${offerTypeNameList[0]} ${cpa.symbol} ${Number(cpa.amount).toFixed(2)}`}
                        </span>
                            ]}

                        />}
                            {(type === 1 || type === 2) && <OfferPaymentParam
                                styles={{margin: '5px 0'}}
                                param={[

                                    <span style={{
                                        padding: '5px 10px',
                                        color: '#FF16BE',
                                        background: 'rgba(255, 22, 190, 0.26)',
                                        border: '1px solid rgba(255, 22, 190, 0.4)',
                                        cursor: 'default',
                                        borderRadius: "4px"
                                    }}>
                                {`${offerTypeNameList[1]} ${Number(revshare).toFixed(1)}% `}<b>FTD</b>
                            </span>
                                ]}/>}</>
                    )
                }
            }, {
                id: 'conversion',
                icon: images.conversionIcon,
                title: contentData.conversion,
                renderContent: ({conversion_type}) => {
                    return String(conversion_type);
                }
            }],

            [{
                id: 'demoAccount',
                icon: images.demoAccountIcon,
                title: contentData.demoAccount,
                renderContent: ({demoAccounts, width}) => {

                    const demoAccountTable = {
                        tableConfig: [
                            {
                                columnId: 'login',
                                columnName: 'Login',
                                columnWidth: '170px',
                            },
                            {
                                columnId: 'password',
                                columnName: 'Password',
                                columnWidth: '156px',
                            },
                            {
                                columnId: 'link',
                                columnName: 'Link',
                                columnWidth: '216px',

                                renderRowItem: (item) => {
                                    return (

                                        <a style={{color: '#219FE5'}} href={item}>{item}</a>

                                    )
                                }
                            },
                        ],
                        data: demoAccounts,
                        emptyTable: {
                            icon: images.emptyTableIcon,
                            text: "Oops, error...",

                        }
                    };

                    return (
                        width < 511 ?
                            <OfferDemoAccount demoAccounts={demoAccounts}/> :
                            <Table {...demoAccountTable} />
                    )
                }
            }],

            [{
                id: 'trafficSource',
                icon: images.trafficSourceIcon,
                title: contentData.trafficSource.title,
                renderContent: ({sources, width}) => {
                    return (
                        <TrafficSourceList contentData={contentData.trafficSource} width={width} sources={sources}/>
                    )
                }
            }],

            [{
                id: 'statistic',
                icon: images.statisticsIcon,
                title: contentData.statistic.title,
                renderContent: ({statistic, width}) => {

                    const isMobile = width < 511;
                    statistics = [
                        {
                            icon: images.created_at,
                            title: contentData.statistic.createDate,
                            value: dateStringFormator(statistic.created_at),
                        },
                        {
                            icon: images.avg_deposit,
                            title: contentData.statistic.avgDep,
                            value: `${statistic.avg_deposit.symbol} ${localeString({value: statistic.avg_deposit.amount})}`,
                        },
                        {
                            icon: images.deposits,
                            title: contentData.statistic.recordDep,
                            value: `${statistic.deposits.symbol} ${localeString({value: statistic.deposits.amount})}`,
                        },
                        {
                            icon: images.avg_turnover,
                            title: contentData.statistic.avgTurnover,
                            value: `${statistic.avg_turnover.symbol} ${localeString({value: statistic.avg_turnover.amount})}`,
                        },
                        {
                            icon: images.registrations_amount,
                            title: contentData.statistic.regAmount,
                            value: statistic.registrations_amount,
                        },
                        {
                            icon: images.deposits_amount,
                            title: contentData.statistic.depAmount,
                            value: statistic.deposits_amount,
                        },

                    ];
                    return (
                        <>
                            {statistic && statistics.map((card, key) => {


                                    return <div
                                        className={`offerStatisticCard${isMobile ? ' offerStatisticCard--isMobile' : ''}`}
                                        key={`offerStatisticCard${key}`}>
                                        <InfoCard {...card} iconSize='80px' backgroundColor='#2D313D'
                                                  renderSubtitle={value => <p>{value}</p>}/>
                                    </div>
                                }
                            )}
                        </>
                    )
                }
            }],

            [{
                id: 'geo',
                icon: images.geoIcon,
                title: contentData.geo.title,
                renderContent: ({countries, width}) =>
                    <>
                        {width > 350 ?
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'nowrap',
                                        alignItems: 'center'
                                    }}>
                        <span
                            style={{
                                width: '12px',
                                height: '12px',
                                background: '#219FE6',
                                borderRadius: '2px',
                                marginRight: '5px'
                            }}/>
                                    <p style={{marginRight: '10px'}}>{contentData.geo.available}</p>
                                    <span
                                        style={{
                                            width: '12px',
                                            height: '12px',
                                            background: '#3C3F4B',
                                            borderRadius: '2px',
                                            marginRight: '5px'
                                        }}/>
                                    <p>{contentData.geo.unavailable}</p></div>
                                <Map countryIdList={countries}/> </> : ''}

                        <p style={{color: '#898A98', marginBottom: '20px'}}>{contentData.geo.list}</p>
                        <div style={{width: '100%', display: 'flex', flexWrap: 'wrap'}}>

                            {countries && countries.map((item, key) =>

                                <SelectionItem
                                    key={key}
                                    isSelected={true}
                                    title={item.name}
                                    styles={{width: width < 511 ? '100%' : 'calc(50% - 10px)', margin: '10px 5px'}}/>
                            )}
                        </div>
                    </>
            }],

            [{
                id: 'advertismentExamples',
                isSlider: true,
                icon: images.advertismentExamplesIcon,
                title: contentData.advertisment,
                renderContent: ({width, assets}) => {
                    const isMobile = width < 510;
                    if (isMobile) {

                        return (

                            <Swiper
                                style={{width: '100%', height: '100%'}}
                                slidesPerView={1.3}
                                freeMode={true}
                                spaceBetween={15}
                                loop={true}>

                                {
                                    assets && assets.map((adItem, key) => (
                                        <SwiperSlide style={{width: "100%", height: "200px"}} key={key}>
                                            <AItem {...adItem} isMobile={isMobile}/>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>

                        )

                    } else {
                        return (

                            assets && assets.map((adItem, key) => {
                                return (
                                    <div style={{width: '50%', height: 'auto'}}
                                         key={key}>
                                        <AItem {...adItem}/>
                                    </div>
                                )
                            })

                        )

                    }

                }
            }],
        ]
    )
}

export function description({contentData}) {
    return {
        icon: images.descriptionIcon,
        title: contentData.description,
        renderContent: ({data}) => {
            return (
                <div dangerouslySetInnerHTML={{__html: data}}/>
            )
        }
    }

}
