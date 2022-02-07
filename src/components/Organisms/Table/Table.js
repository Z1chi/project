import React, {useState} from 'react';

import {TableHead} from '../../Molecules/TableHead/TableHead';
import {TableRow} from '../../Molecules/TableRow/TableRow';
import {TableEmpty} from '../../Molecules/TableEmpty/TableEmpty';

import './table.scss';

export const Table = ({groups, tableConfig, data, emptyTable, fetchMore, hasMore}) => {

    const [verticalScroll, setVerticalScroll] = useState(0);

    return (
        <div className='table'>
            {
                data && data.length > 0 ?

                    (<div className='table__data' onScroll={e => {
                        const isScrolled = e.target.scrollTopMax && e.target.scrollTop !== verticalScroll && e.target.scrollTop == e.target.scrollTopMax;
                        isScrolled && setVerticalScroll(e.target.scrollTop);
                        return isScrolled ? fetchMore() : undefined
                    }}>

                        <TableHead tableConfig={tableConfig} groups={groups}/>

                        <div className='table__rowList'>

                            {
                                data.map((row, key) => {
                                    return (
                                        <TableRow row={row} key={`TableRow${key}`} tableConfig={tableConfig}/>
                                    )
                                })
                            }


                        </div>
                    </div>)
                    : <TableEmpty {...emptyTable}/>
            }
        </div>
    )
};