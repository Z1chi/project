import React from 'react';

import { Table } from '../../Organisms/Table/Table';
import { PageTemplate } from '../../Templates/PageTemplate/PageTemplate';

import { table } from './data';

import './leadsPage.scss';

export const LeadsPage = () => {
    return (
        <div className='leadsPage'>
            <PageTemplate 
                renderPage={()=>{
                    return (
                        <div className='leadsPage__content'>
                            <Table 
                                emptyTable={table.emptyTable}
                            />
                        </div>
                    )
                }}
            />
        </div>
    )
}