import React from 'react';
import styled from 'styled-components'
import './avatar.scss'


const StyledAvatar = styled.div`
      width: ${({size}) => size};
      height: ${({size}) => size};
      border-radius: 50%;
      overflow: hidden;
         & > * {
        height: 100%;
        width: auto;
      }
`;

export const Avatar = ({imageSrc, size}) => {
    return (
        <StyledAvatar
            size={size}
            className='avatar'
        >
            <img src={imageSrc} alt='1'/>
        </StyledAvatar>
    )
};