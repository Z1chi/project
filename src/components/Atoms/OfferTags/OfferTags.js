import React from 'react';

import styled from "styled-components";

import './offerTags.scss'

const Item = styled.div`
    background: ${({styled}) => styled ? '#131826' : '#2F3440'};
    &:hover {
      background:  ${({styled}) => styled ? '#121c36' : '#404a57'};
    }
`;


export const OfferTags = ({tags, styled}) => {
    return (
        <div className='offerTags'>
            {
                tags.map((tag, key) => {
                    return (
                        <Item styled={styled} key={key} className='offerTags__item'>
                            {tag}
                        </Item>
                    )
                })
            }
        </div>
    )
};