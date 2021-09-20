<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">

                <div class="box-header with-border">
                    <h3 class="box-title">Statistics</h3>
                </div>

                <!--                <div class="col-xs-12 col-md-4">-->
                <!--                    <div class="form-group">-->
                <!--                        <label for="orderFieldFilter">Группировка1</label>-->
                <!--                        <select class="form-control input-sm js_filter" data-param="orderFieldFilter"-->
                <!--                                id="orderFieldFilter">-->
                <!--                            <option value="">All</option>-->
                <!--                            <option value="1">1</option>-->
                <!--                        </select>-->
                <!--                    </div>-->
                <!--                </div>-->

                <!--                <div class="col-xs-12 col-md-4">-->
                <!--                    <div class="form-group">-->
                <!--                        <label>Period:</label>-->
                <!--                        <div class="input-group">-->
                <!--                            <div class="input-group-addon">-->
                <!--                                <i class="fa fa-calendar"></i>-->
                <!--                            </div>-->
                <!--                            <input type="text" class="form-control pull-right js_date_range">-->
                <!--                        </div>-->
                <!--                    </div>-->
                <!--                </div>-->

                <div class="box-body">
                    <?php if (empty($LIST)): ?>
                        <p>List is empty.</p>
                    <?php else: ?>

                        <table id="tableStatistics" class="table table-bordered table-hover table-striped">
                            <thead>
                            <!--                        <tr>-->
                            <!--                            <th class="text-center hidden-xs" rowspan="1">Группировки</th>-->
                            <!--                            <th class="text-center hidden-xs" rowspan="1" colspan="4">Трафик</th>-->
                            <!--                            <th class="text-center hidden-xs" rowspan="1" colspan="5">Лиды</th>-->
                            <!--                            <th class="text-center hidden-xs" rowspan="1" colspan="2">Доход</th>-->

                            <!--                        </tr>-->
                            <tr>
                                <th class="text-center" style="display: flex; align-items: center;" rowspan="2">
                                    <svg style="display:none;" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                         class="bi bi-arrow-clockwise" viewBox="0 0 16 14">
                                        <path fill-rule="evenodd"
                                              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                    </svg>
                                    Date <i style="display:none;" class="fa fa-arrows-v" aria-hidden="true"></i></th>
                                <th rowspan="2" data-orderFieldFilter="section1">Cicks <i style="display:none;" class="fa fa-arrows-v"
                                                                                          aria-hidden="true"></i></th>
                                <th rowspan="2">Unique clicks <i style="display:none;" class="fa fa-arrows-v" aria-hidden="true"></i></th>
                                <th rowspan="2">Deposit <i style="display:none;" class="fa fa-arrows-v" aria-hidden="true"></i></th>
                                <th rowspan="2">EPC <i style="display:none;" class="fa fa-arrows-v" aria-hidden="true"></i></th>
                                <!--                            <th rowspan="2">CPA <i class="fa fa-arrows-v" aria-hidden="true"></i></th>-->
                                <!--                            <th rowspan="2">%CR <i class="fa fa-arrows-v" aria-hidden="true"></i></th>-->
                                <!--                            <th rowspan="2">%SR <i class="fa fa-arrows-v" aria-hidden="true"></i></th>-->
                                <!--                            <th rowspan="2">%AR <i class="fa fa-arrows-v" aria-hidden="true"></i></th>-->
                                <!--                            <th rowspan="2"><i class="fa fa-calendar-plus-o" aria-hidden="true"></i> &nbsp; <i-->
                                <!--                                        class="fa fa-arrows-v" aria-hidden="true"></i></th>-->
                                <!--                            <th rowspan="2"><i class="fa fa-calendar-check-o" aria-hidden="true"></i> &nbsp; <i-->
                                <!--                                        class="fa fa-arrows-v" aria-hidden="true"></i></th>-->
                                <!--                            <th rowspan="2"><i class="fa fa-clock-o" aria-hidden="true"></i> &nbsp; <i-->
                                <!--                                        class="fa fa-arrows-v" aria-hidden="true"></i></th>-->
                                <!--                            <th rowspan="2"><i class="fa fa-calendar-times-o" aria-hidden="true"></i> &nbsp; <i-->
                                <!--                                        class="fa fa-arrows-v" aria-hidden="true"></i></th>-->
                                <!--                            <th rowspan="2"><i class="fa fa-trash-o" aria-hidden="true"></i> &nbsp; <i-->
                                <!--                                        class="fa fa-arrows-v" aria-hidden="true"></i></th>-->
                                <!--                            <th rowspan="2">-->
                                <!--                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"-->
                                <!--                                     class="bi bi-wallet" viewBox="0 0 16 16">-->
                                <!--                                    <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z"/>-->
                                <!--                                </svg>-->
                                <!--                                &nbsp; <i class="fa fa-arrows-v" aria-hidden="true"></i></th>-->
                                <!--                            <th rowspan="2"><i class="fa fa-clock-o" aria-hidden="true"></i> &nbsp; <i-->
                                <!--                                        class="fa fa-arrows-v" aria-hidden="true"></i></th>-->
                            </tr>
                            </thead>
                            <tbody>
                            <?php foreach ($LIST as $row):?>
                                <tr>
                                    <td><?php echo $row['created_dt']; ?></td>
                                    <td><?php echo $row['clicks']; ?></td>
                                    <td><?php echo $row['unique_clicks']; ?></td>
                                    <td><?php echo $row['sum_deposit']; ?></td>
                                    <td><?php  echo $row['epc']; ?></td>
                                    <!--                            <td>6</td>-->
                                    <!--                            <td>7</td>-->
                                    <!--                            <td>8</td>-->
                                    <!--                            <td>9</td>-->
                                    <!--                            <td>10</td>-->
                                    <!--                            <td>11</td>-->
                                    <!--                            <td>12</td>-->
                                    <!--                            <td>13</td>-->
                                    <!--                            <td>14</td>-->
                                    <!--                            <td>15</td>-->
                                    <!--                            <td>16</td>-->
                                </tr>
                            <?php endforeach;?>
                            </tbody>
                            <tfoot>
                            <tr>
                                <th class="bold">--</th>
                                <th class="bold"><?php /** @var array $SUM_ROW */
                                    echo $SUM_ROW['clicks']; ?></th>
                                <th class="bold"><?php echo $SUM_ROW['unique_clicks']; ?></th>
                                <th class="bold"><?php echo $SUM_ROW['sum_deposit']; ?></th>
                                <th class="bold"><?php echo $SUM_ROW['epc']; ?></th>
                                <!--                            <th class="bold">800</th>-->
                                <!--                            <th class="bold">47%</th>-->
                                <!--                            <th class="bold">0%</th>-->
                                <!--                            <th class="bold">25</th>-->
                                <!--                            <th class="bold">8</th>-->
                                <!--                            <th class="bold">2</th>-->
                                <!--                            <th class="bold">0</th>-->
                                <!--                            <th class="bold">6</th>-->
                                <!--                            <th class="bold">8</th>-->
                                <!--                            <th class="bold">1599 р.</th>-->
                                <!--                            <th class="bold">0 р.</th>-->
                            </tr>
                            </tfoot>
                        </table>

                    <?php endif;?>

                </div>

            </div>
        </div>
    </div>


</section>