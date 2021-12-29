import React from 'react';

import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';

import './slider.scss';

import {AItem} from "../../Atoms/AdItem/AItem";


export const Slider = ({items}) => {

    return (
        <div className='slider'>
            <Swiper
                style={{width: '100%', height: '100%'}}
                slidesPerView={5}
                freeMode={true}
                loop={true}
                spaceBetween={0}
                navigation={true}
                pagination={{
                    "clickable": true
                }}
            >

                {
                    items && items.map((adItem, key) => {
                        return (
                            <SwiperSlide style={{width: "100%", height: "200px"}} key={key}>
                                <AItem preview_src={adItem}/>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
};