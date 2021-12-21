import React from 'react';
import { ReferalTemplate } from '../../Templates/ReferalTemplate/ReferalTemplate';

import { referalLink, referalProgram, referalCards } from './data';

export const ReferalPage = () => {
    return (
        <div className='referalPage'>
            <ReferalTemplate 
                link={referalLink}
                program={referalProgram}
                cards={referalCards}
            />
        </div>
    )
}