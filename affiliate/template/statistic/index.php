<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">

                <div class="box-header with-border">
                    <h3 class="box-title">Offer info</h3>
                </div>

                <div class="box-body">
                    <table class="table table-bordered table-striped table-hover" style="width: 100%">
                        <tbody>
                        <tr>
                            <td style="min-width: 30%">Website</td>
                            <td class="text-bold"><?=App::getBaseUrl()?></td>
                        </tr>
                        <tr>
                            <td>Flow</td>
                            <td class="text-bold">Deposit</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td class="text-bold">FTD, RevShare, CPA, CPL</td>
                        </tr>
                        <tr>
                            <td>Payout</td>
                            <td class="text-bold">Multiple</td>
                        </tr>
                        <tr>
                            <td>Minimum deposits</td>
                            <td class="text-bold">$100, $50 (Tier 3)</td>
                        </tr>
                        <tr>
                            <td>Allowed countries</td>
                            <td class="text-bold">Europe, Russia, Belarus, Ukraine, Kazakhstan, USA, Canada, Australia, Turkey, Uzbekistan, South Africa, South America</td>
                        </tr>
                        <tr>
                            <td>OS types</td>
                            <td class="text-bold">All OS types</td>
                        </tr>
                        <tr>
                            <td>Browser types</td>
                            <td class="text-bold">All browser types</td>
                        </tr>
                        <tr>
                            <td>Connection types</td>
                            <td class="text-bold">All connection types</td>
                        </tr>
                        <tr>
                            <td>Devices</td>
                            <td class="text-bold">All devices</td>
                        </tr>
                        <tr>
                            <td>Traffic sources</td>
                            <td>
                                <span class="badge bg-green">seo</span>
                                <span class="badge bg-green">adult</span>
                                <span class="badge bg-green">native ads</span>
                                <span class="badge bg-green">cashback</span>
                                <span class="badge bg-green">clickunder_popunder</span>
                                <span class="badge bg-green">doorway</span>
                                <span class="badge bg-green">email</span>
                                <span class="badge bg-green">popup</span>
                                <span class="badge bg-green">sms</span>
                                <span class="badge bg-green">banners</span>
                                <span class="badge bg-green">aff_net</span>
                                <span class="badge bg-green">google_adw</span>
                                <span class="badge bg-green">mobile</span>
                                <span class="badge bg-green">social</span>
                                <span class="badge bg-green">push</span>
                                <span class="badge bg-red">redirects</span>
                                <span class="badge bg-red">incentive_traffic</span>
                            </td>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>

    <? if (App::getSession('parent_id') == 0): ?>
        <div class="row">
            <div class="col-xs-12">
                <div class="box box-primary">

                    <div class="box-header with-border">
                        <h3 class="box-title">Tariffs</h3>
                    </div>

                    <div class="box-body">
                        <table class="table table-bordered table-striped table-hover" style="width: 100%">
                            <thead>
                            <tr>
                                <td>Goal</td>
                                <td>Country</td>
                                <td>Payout</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Deposit</td>
                                <td>Any</td>
                                <td><?=App::getSession('first_deposit_percent')?>% from deposit</td>
                            </tr>
                            <tr>
                                <td>RevShare</td>
                                <td>Any</td>
                                <td><?=App::getSession('revshare_percent')?>% from deposit</td>
                            </tr>
                            <tr>
                                <td>Lead, Registration</td>
                                <td>Any</td>
                                <td>Please contact your manager</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    <? endif; ?>

    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">

                <div class="box-header with-border">
                    <h3 class="box-title">About company</h3>
                </div>

                <div class="box-body">

                    <p>In 2018, our team decided to create a unique product in the field of cryptocurrency mining. Each member of our team is engaged in their narrow specialization, which allows us to offer a truly superior platform named <?=APP_PUBLIC_NAME?>.</p>

                    <p>Our goal was to create a quality product that would be favorably received by our partners and customers. We also strived to make it comprehensible for users and capable of making them totally immerse in the mining process.</p>


                    <p>Our key advantages:</p>
                    <ul>
                        <li>1. Transparent system of working with the simple profitability calculator. The user can proceed from his budget without delving into complex figures.</li>
                        <li>					2. Animation and game effects. We focused not only on the financial efficiency of our platform, but on customer involvement as well. For example, when entering their personal account what the user sees are not only statistics, but also graphic miners which vary based on the power acquired by the user.</li>
                        <li>	3. Friendly support; call center available.</li>
                    </ul>



                    <p>
                        For our part, we are prepared to offer a percentage of the customer's deposit and RevShare, consider your counter-offer. We are all for dialogue and an open, long-term cooperation!
                    </p>
                    <p>
                        Demo access to the platform:
                    </p>
                    <p>
                        Login: <strong>demo</strong><br />
                        Password: <strong><?=strtolower(APP_PUBLIC_NAME)?></strong>
                    </p>

                </div>
            </div>
        </div>
    </div>



</section>