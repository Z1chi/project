import React from 'react';

import { Button } from '../../Atoms/Button/Button';
import { Input } from '../../Atoms/Input/Input';
import { Checkbox } from '../../Atoms/Checkbox/Checkbox';
import { PostbackCharacteristicsItem } from '../../Molecules/PostbackCharacteristicsItem/PostbackCharacteristicsItem';
import { PostbackSection } from '../../Organisms/PostbackSection/PostbackSection';
import { PageTemplate } from '../../Templates/PageTemplate/PageTemplate';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './postbackPage.scss';

import { conversionStatusList, characteristicsList } from './data';

export const PostbackPage = () => {
    return (
        <div className='postbackPage'>
            <PageTemplate 
                renderPage={()=>{
                    return (
                        <div className='postbackPage__content'>
                            <div className='postbackPage__type'>
                                <PostbackSection title={{ text: 'Postback type', info: 'Info' }}>
                                    <Input placeholder='Name' />
                                </PostbackSection>
                            </div>
                            <div className='postbackPage__inquiry'>
                                <PostbackSection title={{ text: 'Inquiry type', info: 'Info' }}>
                                    
                                </PostbackSection>
                                <PostbackSection title={{ text: 'Basic link', info: 'Info' }}>
                                    <Input placeholder='Lorem ipsum' />
                                </PostbackSection>
                            </div>
                            <div className='postbackPage__conversion'>
                                <PostbackSection title={{ text: 'Conversion status', info: 'Info' }}>
                                {
                                    conversionStatusList && conversionStatusList.length > 0 && 
                                    conversionStatusList.map( item => {
                                        return (
                                            <div className='postbackPage__conversionItem'>
                                                <Checkbox {...item} size='12px' />
                                            </div>
                                        )
                                    })
                                }
                                </PostbackSection>
                            </div>
                            <div className='postbackPage__characteristics'>
                                <PostbackSection title={{ text: 'Characteristics', info: 'Info' }}>
                                    <div className='postbackPage__characteristicsList'>
                                    {
                                        characteristicsList && characteristicsList.length > 0 
                                        && characteristicsList.map( item => {
                                            return (
                                                <PostbackCharacteristicsItem {...item} />
                                            )
                                        })
                                    }
                                    </div>
                                    <div className='postbackPage__characteristicsAdd'>
                                        <Button onClick={ () => {} }>
                                            <SVG src={images.plusIcon} />
                                            <span>Add parameter</span>
                                        </Button>
                                    </div>
                                </PostbackSection>
                            </div>
                            <div className='postbackPage__link'>
                                <PostbackSection title={{ text: 'Link example', info: 'Info' }}>
                                    <div className='postbackPage__linkInput'>
                                        <div className='postbackPage__linkUrl'>
                                            <Input />
                                        </div>
                                        <div className='postbackPage__linkCopy'>
                                            <Button styles={{ background: '#2D313D', width: '38px', height: '38px', padding: '0', }}>
                                                <SVG src={images.copyIcon} />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='postbackPage__linkButtons'>
                                        <Button styles={{ border: '1px solid #219FE6', backgroundColor: 'transparent', }}>
                                            <SVG src={images.testIcon} />
                                            <span>Test</span>
                                        </Button>

                                        <Button>
                                            Create
                                        </Button>
                                    </div>
                                </PostbackSection>
                            </div>
                        </div>
                    )
                }}
            />
        </div>
    )
}