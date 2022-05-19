import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {setToken} from "./helpers/lib";
import {QueryClientProvider, QueryClient} from "react-query";
import {reatomContext} from '@reatom/react';

import {MainPage} from './components/Pages/MainPage/MainPage';
import {DashboardPage} from './components/Pages/DashboardPage/DashboardPage';
import {OffersPage} from './components/Pages/OffersPage/OffersPage';
import {OffersSinglePage} from "./components/Pages/OffersSinglePage/OffersSinglePage";
import {CreativesPage} from './components/Pages/CreativesPage/CreativesPage';
import {CreativesSinglePage} from './components/Pages/CreativesSinglePage/CreativesSinglePage';
import {StatisticsPage} from './components/Pages/StatisticsPage/StatisticsPage';
import {ActionLogsPage} from './components/Pages/ActionLogsPage/ActionLogsPage';
import {LeadsPage} from './components/Pages/LeadsPage/LeadsPage';
import {AffiliatePage} from './components/Pages/AffiliatePage/AffiliatePage';
import {SmartLinksPage} from './components/Pages/SmartLinksPage/SmartLinksPage';
import {PostbackPage} from './components/Pages/PostbackPage/PostbackPage';
import {WithdrawPage} from './components/Pages/WithdrawPage/WithdrawPage';
import {FAQPage} from './components/Pages/FAQPage/FAQPage';
import {SettingsPage} from './components/Pages/SettingsPage/SettingsPage';

import {store} from './store';

import './app.scss';
import './fonts/fonts.scss';

const queryClient = new QueryClient(
    {
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        }
    },
);

export default function App() {
    setToken();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="app">
                <reatomContext.Provider value={store}>
                    <Router basename='affiliate'>

                        <Switch>
                            <Route exact path='/' component={MainPage}/>
                            <Route exact path='/dashboard' component={DashboardPage}/>
                            <Route exact path='/offers' component={OffersPage}/>
                            <Route exact path='/offers/:id' component={OffersSinglePage}/>
                            <Route exact path='/creatives' component={CreativesPage}/>
                            <Route exact path='/creatives/:id' component={CreativesSinglePage}/>
                            <Route exact path='/statistics' component={StatisticsPage}/>
                            <Route exact path='/actionLogs' component={ActionLogsPage}/>
                            {/*<Route exact path='/leads' component={LeadsPage}/>*/}
                            {/*<Route exact path='/affiliate-program' component={AffiliatePage}/>*/}
                            <Route exact path='/smartlinks' component={SmartLinksPage}/>
                            {/* <Route exact path='/postback' component={PostbackPage}/> */}
                            <Route exact path='/withdraws' component={WithdrawPage}/>
                            <Route exact path='/faq' component={FAQPage}/>
                            <Route exact path='/settings' component={SettingsPage}/>
                            <Route exact path='*' component={LeadsPage}/>
                        </Switch>


                    </Router>
                </reatomContext.Provider>
            </div>
        </QueryClientProvider>
    );
}


