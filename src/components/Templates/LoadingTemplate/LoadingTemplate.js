import React from 'react';

import { PageTemplate } from '../PageTemplate/PageTemplate';
import { TableEmpty } from '../../Molecules/TableEmpty/TableEmpty';
import { Loader } from '../../Atoms/Loader/Loader';

export const LoadingTemplate = ({ icon }) => {
    return (
        <PageTemplate
            renderPage={({}) => {
                return <TableEmpty icon={icon} text='Loading data' loader={Loader} />
            }}
        />
    )
}