import React, {useState} from 'react';

import {TableHead} from '../../Molecules/TableHead/TableHead';
import {TableRow} from '../../Molecules/TableRow/TableRow';
import {TableEmpty} from '../../Molecules/TableEmpty/TableEmpty';

import './table.scss';
import { Button } from '../../Atoms/Button/Button';
import { Loader } from '../../Atoms/Loader/Loader';

export const Table = ({groups, tableConfig, data, emptyTable, fetchMore, isFetching, hasMore, isLoading}) => {
    const [verticalScroll, setVerticalScroll] = useState(0);

    if(isLoading) {
        return (
            <div className='table'>
                <TableEmpty {...emptyTable} text='Loading data' />
            </div>
        )
    }

    return (
        <>
        <div className='table'>
            {
                data && data.length > 0 ?

                    <div className='table__data'>

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
                    </div>
                    : <TableEmpty {...emptyTable}/>
            }
        </div>
        { hasMore && <div className='table__load'>
            {
                isFetching 
                ? <Button><Loader whiteTheme={true} /></Button>  
                : <Button onClick={()=>fetchMore()}>Load more</Button>  
            }   
        </div> }
        </>
    )
};