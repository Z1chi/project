<section class="content-header">
    <h1 style="margin-bottom: 20px">Action log</h1>
    <table class="table">

        <thead>
        <tr>
            <td style="border:none; font-size: 16px"
                class="text-center"></td>
            <td style="border:none; font-size: 16px"
                class="text-center"><?= number_format($TABLE_FOOTER->getDeposit(), 2, '.', ' ') ?> <?= $TABLE_FOOTER->getCurrency() ?></td>
            <? if (App::getSession('parent_id') == 0): ?>
                <td style="border:none; font-size: 16px"
                    class="text-center"><?= number_format($TABLE_FOOTER->getPayout(), 2, '.', ' ') ?> <?= $TABLE_FOOTER->getCurrency() ?></td>
            <? endif; ?>
        </tr>
        </thead>
        <tfoot>
        <tr>

            <td style="border:none;" class="text-center "><h3>Click</h3></td>
            <td style="border:none;" class="text-center "><h3>Registrations</h3></td>
            <td style="border:none;" class="text-center "><h3>Deposits</h3></td>

        </tr>
        </tfoot>
    </table>

</section>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">

                <div class="box-header with-border">
                    <div class="row">
                        <div class="col-xs-12 col-md-4">
                            <div class="form-group">
                                <label for="actionInput">Action</label>
                                <select class="form-control input-sm js_filter" data-param="action" id="actionInput">
                                    <option value="">All</option>
                                    <? foreach ($ACTION_TYPES as $key => $str): ?>
                                        <option value="<?= $key ?>"<? if ($FILTER_ACTION == $key): ?> selected="selected"<? endif; ?>><?= $str ?></option>
                                    <? endforeach; ?>
                                </select>
                            </div>
                        </div>

                        <div class="col-xs-12 col-md-4">
                            <div class="form-group">
                                <label for="smartlinkInput">Smart link</label>
                                <select class="form-control input-sm js_filter" data-param="smartlink"
                                        id="smartlinkInput">
                                    <option value="">All</option>
                                    <? foreach ($SMARTLINKS as $key => $obj): ?>
                                        <option value="<?= $obj->getId() ?>"<? if ($FILTER_SMARTLINK_ID == $obj->getId()): ?> selected="selected"<? endif; ?>><?= $obj->getTitle() ?></option>
                                    <? endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-4">
                            <div class="form-group">
                                <label>Period:</label>
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                    <input value="<?= $DATES ?>" type="text"
                                           class="form-control pull-right js_date_range">
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-4">
                            <div class="form-group">
                                <label for="smartlinkInput">Project</label>
                                <select class="form-control input-sm js_filter" data-param="project" id="projectSelect">
                                    <option value="">All</option>
                                    <?php /** @var \Ufo\Model\Project[] $PROJECTS
                                     * @var int $FILTER_PROJECT_ID
                                     */
                                    foreach ($PROJECTS as $key => $obj): ?>
                                        <option value="<?= $obj->id ?>"<?php
                                        if ($FILTER_PROJECT_ID == $obj->id):?> selected="selected"<?php endif; ?>><?= $obj->title ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>


                    </div>
                </div>

                <div class="box-body">

                    <? if (empty($LIST)): ?>
                        <p>List is empty.</p>
                    <? else: ?>

						<table class="table table-bordered table-hover">
							<thead>
							<tr>
								<th class="text-center">User ID</th>
								<th class="text-center">Smart link</th>
								<th class="text-center">Project</th>
								<th class="text-center">Action</th>
								<th class="text-center hidden-xs">Deposit</th>
								<th class="text-center">Datetime</th>
								<th class="text-center hidden-xs">GEO</th>
								<? if (App::getSession('parent_id') == 0): ?>
								<th class="text-center">Payout</th>
								<? endif; ?>
							</tr>
							</thead>
							<tbody>
							<? /* @var $row \affiliate\model\Logaction */ foreach ($LIST as $row): ?>
								<tr>
									<td class="text-center"><?=$row->getUserUid()?></td>
									<td class="text-center"><?=$row->url_title?></td>
									<td class="text-center"><?=$row->project_title?></td>
									<td class="text-center"><?=$row->getActionString()?></td>
									<td class="text-center hidden-xs"><?=number_format($row->getDeposit(), 2, '.', ' ')?> <?=$row->getCurrency()?></td>
									<td class="text-center"><?=$row->getCreatedFormatted()?></td>
									<td class="text-center hidden-xs"><?=$row->getGeo()?></td>
									<? if (App::getSession('parent_id') == 0): ?>
									<td class="text-center"><?=number_format($row->getPayout(), 2, '.', ' ')?> <?=$row->getCurrency()?></td>
									<? endif; ?>
								</tr>
							<? endforeach; ?>
							</tbody>
                            <tfoot>
                            <tr style="background: #ebedf3">
                                <td class="text-center">-</td>
                                <td class="text-center">-</td>
                                <td class="text-center">-</td>
                                <td class="text-center">-</td>
                                <td class="text-center hidden-xs"><?= number_format($TABLE_FOOTER->getDeposit(), 2, '.', ' ') ?> <?= $TABLE_FOOTER->getCurrency() ?></td>
                                <td class="text-center">-</td>
                                <td class="text-center hidden-xs">-</td>
                                <? if (App::getSession('parent_id') == 0): ?>
                                    <td class="text-center"><?= number_format($TABLE_FOOTER->getPayout(), 2, '.', ' ') ?> <?= $TABLE_FOOTER->getCurrency() ?></td>
                                <? endif; ?>
                            </tr>
                            </tfoot>
                        </table>

                    <? endif; ?>
                </div>

                <?= $PAGES ?>
            </div>
        </div>
    </div>
</section>