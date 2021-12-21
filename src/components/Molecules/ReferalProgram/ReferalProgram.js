import React from 'react';
import { ReferalProgramItem } from '../../Atoms/ReferalProgramItem/ReferalProgramItem';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './referalProgram.scss';

export const ReferalProgram = ({ program, isMobile }) => {
    return (
        <div className={`referalProgram${isMobile?' referalProgram--isMobile':''}`}>
            <div className='referalProgram__title'>
            {
                <h2>{program.title}</h2>
            }
            </div>
            <div className='referalProgram__subtitle'>
            {
                <h3>{program.subtitle}</h3>
            }
            </div>
            <div className='referalProgram__steps'>
            {
                program.steps.map( (step, index) => {
                    return (
                        <>
                            <div className='referalProgram__stepsItem'>
                                <ReferalProgramItem {...step} stepNumber={index+1} />
                            </div>
                            {
                                index !== program.steps.length -1
                                ? <div className='referalProgram__stepsArrow'>
                                    <SVG src={images.arrowIcon} />
                                </div>
                                : null
                            }
                        </>
                    )
                })
            }
            </div>
        </div>
    )
}