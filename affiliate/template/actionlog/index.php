<?php

use app\controller\Affiliate;

?>
<section class="content-header">
    <h1 style="margin-bottom: 20px">Action log</h1>
    <table class="table">

        <thead>
        <tr>
            <td style="border:none; font-size: 16px"
                class="text-center"><?= /** @var array $SUMMARY */
               $SUMMARY['clicks'] ?></td>
            <td style="border:none; font-size: 16px"
                class="text-center"><?= $SUMMARY['registrations'] ?></td>
            <td style="border:none; font-size: 16px"
                    class="text-center"><?= $SUMMARY['deposits'] ?> |
                <?= number_format($SUMMARY['sum_deposit'], 2, '.', ' ') ?>
            </td>
        </tr>
        </thead>
        <tfoot>
        <tr>

            <td style="border:none;" class="text-center "><h3>Clicks</h3></td>
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
                                    <?php foreach ($ACTION_TYPES as $key => $str): ?>
                                        <option value="<?= $key ?>"<?php if ($FILTER_ACTION == $key): ?> selected="selected"<?php endif; ?>><?= $str ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>

                        <div class="col-xs-12 col-md-4">
                            <div class="form-group">
                                <label for="smartlinkInput">Smart link</label>
                                <select class="form-control input-sm js_filter" data-param="smartlink"
                                        id="smartlinkInput">
                                    <option value="">All</option>
                                    <?php /** @var \affiliate\model\Smartlink $SMARTLINKS */
                                    /** @var int $FILTER_SMARTLINK_ID */
                                    foreach ($SMARTLINKS as $key => $obj): ?>
                                        <option value="<?= $obj->getId() ?>"
                                            <?php if ($FILTER_SMARTLINK_ID == $obj->getId()): ?> selected="selected"<?php endif; ?>>
                                            <?= $obj->getTitle() ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-4">
                            <div class="form-group">
                                <label>Period</label>
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                    <input style="max-height: 30px" value="<?= /** @var string $DATES */
                                        $DATES?>" type="text" class="form-control pull-right js_date_range">
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

                    <?php if (empty($LIST)): ?>
                        <p>List is empty.</p>
                    <?php else: ?>

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
                                <?php if (App::getSession('parent_id') == 0): ?>
								<th class="text-center">Payout</th>
                                <?php endif; ?>
							</tr>
							</thead>
							<tbody>
                            <?php /* @var $row \ufo\model\AffiliateActionLog */ foreach ($LIST as $row): ?>
                                <?php
                                $action = '';
                                switch ($row->action) {
                                    case Affiliate::ACTION_CLICK:
                                        $action =  'Click';
                                        break;
                                    case Affiliate::ACTION_SIGNUP:
                                        $action = '<span class="text-orange">Sign up</span>';
                                        break;
                                    case Affiliate::ACTION_DEPOSIT:
                                        $action = '<strong class="text-green">Deposit</strong>';
                                        break;
                                }
                                ?>
								<tr>
									<td class="text-center"><?=$row->user_uid?></td>
									<td class="text-center"><?=$row->url_title?></td>
									<td class="text-center"><?=$row->project_title?></td>
									<td class="text-center"><?=$action?></td>
									<td class="text-center hidden-xs"><?=number_format($row->deposit, 8, '.', ' ')?> <?=$row->currency?></td>
									<td class="text-center"><?=date('d.m.Y, H:i', $row->created)?></td>
									<td class="text-center hidden-xs"><?=$row->geo ?? 'Unknown' ?></td>
                                    <?php if (App::getSession('parent_id') == 0): ?>
									<td class="text-center"><? if ($row->payout_amount > 0): ?><?=$row->payout_amount?> <?=$row->currency?><? endif; ?></td>
                                    <?php endif; ?>
								</tr>
                            <?php endforeach; ?>
							</tbody>
                        </table>

                    <?php endif; ?>
                </div>

                <?= $PAGES ?>
            </div>
        </div>
    </div>
</section>