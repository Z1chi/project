import React from "react";

import {Swiper, SwiperSlide} from 'swiper/react';

import {Table} from "../../Organisms/Table/Table";
import {Map} from "../../Organisms/Map/Map";
import {AItem} from "../../Atoms/AdItem/AItem";

import 'swiper/css';

import {images} from "./images/index";


export const descriptionData = {
    benefits: ["Преимущества кратко:",
        "Кешбэк до 30% у партнеров: LevelOne, AliExpress, re:Store, Reebok, Adidas, Ostin, Pandora, Подружка, GeekBrains, Улыбка Радуги, О'КЕЙ доставка, МТС и другие.",
        "Умный кешбэк до 10% рублями в категории максимальных трат, и 1% - на все остальные покупки До 5% милями на все покупки и до 11% милями за покупки на «Газпромбанк - Travel»",
        "Один раз в месяц вы можете сменить программу лояльности и копить мили вместо кешбэка и наоборот. Накопленные баллы при этом не сгорают.",
    ],
    service: ["Обслуживание – от 0 ₽",
        "Бесплатное снятие наличных в любых банкоматах мира",
        "Моментальные переводы без комиссии в другие банки",
        "До 6% на остаток по накопительному счету",
        "Выпуск до 4 дополнительных карт бесплатно",
        "Технология PayPass, бесконтактная технология Apple Pay, Google Pay, Samsung Pay",
    ],
    superiority: [
        "2 160 платежных систем",
        "47 языков на веб-сайте",
        "12 000+ партнеров по всему миру",
        "Высокие коэффициенты",
        "Регулярные акции и бонусы",
        "1 000 000+ ставок ежедневно"
    ],

};

const demoAccountTable = {
    tableConfig: [{
        columnId: 'login',
        columnName: 'Login',
        columnWidth: '170px',
    }, {
        columnId: 'password',
        columnName: 'Password',
        columnWidth: '116px',
    }, {
        columnId: 'link',
        columnName: 'Link',
        columnWidth: '116px',

        renderRowItem: (item) => {
            return (
                <div>
                    <a href={item.to}>{item.text}</a>
                </div>
            )
        }
    },],

    data: [{
        login: 'examplelogincredentials',
        password: 'examplepasswordfordemo',
        link: 'randomlinkfordemoaccount...',
    }],

};

const adData = [
    {
        link: '/',
        backgroundImage: images.prostoImg
    },
    {
        link: '/',
        backgroundImage: images.remove
    },
    {
        link: '/',
        backgroundImage: images.prostoImg
    },
    {
        link: '/',
        backgroundImage: images.remove
    }
];


export const rowsConfig = [
    [{
        id: 'model',
        icon: images.modelIcon,
        title: 'Model',
        renderContent: ({data = '40%'}) => {
            return (
                <div style={{
                    background: 'rgba(255, 22, 190, 0.26)',
                    border: '1px solid rgba(255, 22, 190, 0.4)',
                    borderRadius: '4px',
                    width: 'fit-content',
                    padding: '4px',
                    color: '#FF16BE'
                }}>
                    Revshare: <span style={{fontWeight: '700'}}>{data} FTD</span>
                </div>
            )
        }
    }, {
        id: 'conversion',
        icon: images.conversionIcon,
        title: 'Conversion',
        renderContent: () => {
            return 'Открытие расчётного счёта';
        }
    }],

    [{
        id: 'demoAccount',
        icon: images.demoAccountIcon,
        title: 'Demo Account',
        renderContent: () => {
            return (
                <Table {...demoAccountTable} />
            )
        }
    }],

    [{
        id: 'trafficSource',
        icon: images.trafficSourceIcon,
        title: 'Traffic Source',
        renderContent: () => {
            return (
                <Table {...demoAccountTable} />
            )
        }
    }],

    [{
        id: 'statistic',
        icon: images.statisticsIcon,
        title: 'Statistic',
        renderContent: () => {
            return (
                <Table {...demoAccountTable} />
            )
        }
    }],

    [{
        id: 'geo',
        icon: images.demoAccountIcon,
        title: 'GEO',
        renderContent: () => {
            return (
                <Map countryIdList={[16]}/>
            )
        }
    }],

    [{
        id: 'advertismentExamples',
        isSlider: true,
        icon: images.advertismentExamplesIcon,
        title: 'Advertisment examples',
        renderContent: ({width}) => {
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
                            adData.map((adItem, key) => (
                                <SwiperSlide style={{width: "100%", height: "200px"}} key={key}>
                                    <AItem {...adItem} isMobile={isMobile}/>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>

                )

            } else {
                return (

                    adData.map((adItem, key) => (
                        <div style={{width: '50%', height: 'auto'}}
                             key={key}>
                            <AItem {...adItem}/>
                        </div>
                    ))

                )

            }

        }
    }],
];


export const gridData = {
    model: '40%',
    demoAccount: {}
};


export const description = {
    icon: images.descriptionIcon,
    title: 'Description',
    renderContent: ({data}) => {
        return (

            <div>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,

                }}>
                    {data.benefits.map((item, key) => {
                        return (
                            <li key={key}>{item}</li>
                        )
                    })}
                </ul>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                }}>
                    {data.service.map((item, key) => {
                        return (
                            <li key={key}>{item}</li>
                        )
                    })}
                </ul>
                <ul
                    style={{
                        paddingLeft: '15px',
                        listStyleImage: `url(${images.superiorityListItem})`,
                    }}>
                    {data.superiority.map((item, key) => {
                        return (
                            <li key={key}>
                                {item}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
};
