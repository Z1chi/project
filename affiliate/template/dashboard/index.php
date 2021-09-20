<section class="content-header">
	<h1>Dashboard</h1>
</section>

<section class="content">
	<div class="row">

		<? use app\controller\Affiliate;

        if (App::getSession('parent_id') == 0): // todo refactor ?>

		<div class="col-sm-4 col-xs-12">
			<div class="small-box bg-aqua">
				<div class="inner">
					<h3><?=$BALANCE_BTC?> <sup style="font-size: 20px">BTC</sup></h3>

					<p>Balance in Bitcoins</p>
				</div>
				<div class="icon">
					<i class="fa fa-btc"></i>
				</div>
			</div>
		</div>

		<div class="col-sm-4 col-xs-12">
			<div class="small-box bg-gray">
				<div class="inner">
					<h3><?=$INCOME_BTC?> <sup style="font-size: 20px">BTC</sup></h3>

					<p>Total income BTC</p>
				</div>
			</div>
		</div>

		<? endif; ?>

		<div class="col-sm-4 col-xs-12">
			<div class="small-box bg-gray">
				<div class="inner">
					<h3><?=$TURNOVER_BTC?> <sup style="font-size: 20px">BTC</sup></h3>

					<p>Total turnover BTC</p>
				</div>
			</div>
		</div>

	</div>

    <?php if (false): ?>
	<div class="row">
		<div class="col-xs-12">
			<div class="box box-primary">

				<div class="box-header with-border">
					<h3 class="box-title">Latest Leads</h3>
				</div>

				<div class="box-body">

					<? if (empty($LEADS)): ?>
						<p>List is empty.</p>
					<? else: ?>

						<table class="table table-bordered table-hover">
							<thead>
							<tr>
								<th class="text-center">URL</th>
								<th class="text-center">ID</th>
								<th class="text-center">Signed up</th>
								<th class="text-center hidden-xs">Last activity</th>
								<th class="text-center hidden-xs">E-mail verified</th>
								<th class="text-center">Last deposit request</th>
								<th class="text-center hidden-xs">GEO</th>
							</tr>
							</thead>
							<tbody>
							<? /* @var $row \app\model\User */ foreach ($LEADS as $row): ?>
								<tr>
									<td class="text-center"><?=$row->url_title?></td>
									<td class="text-center">
										<a href="<?=$row->info_url?>"><?=$row->getEncodedId()?></a>
									</td>
									<td class="text-center"><?=$row->getCreatedFormatted()?></td>
									<td class="text-center hidden-xs"><?=$row->getActivityFormatted()?></td>
									<td class="text-center hidden-xs"><?=$row->getIsEmailVerified() ? '<span class="label label-success">Yes</span>' : '<span class="label label-danger">No</span>'?></td>
									<td class="text-center"><?=$row->last_sum?></td>
									<td class="text-center hidden-xs"><?=$row->getGeo()?></td>

								</tr>
							<? endforeach; ?>
							</tbody>
						</table>

					<? endif; ?>
				</div>

				<div class="box-footer clearfix" style="">
					<a href="<?=App::createUrl('leads')?>" class="btn btn-sm btn-default btn-flat pull-right">View All Leads</a>
				</div>
			</div>
		</div>
	</div>
    <?php endif; ?>

	<div class="row">
		<div class="col-xs-12">
			<div class="box box-primary">

				<div class="box-header with-border">
					<h3 class="box-title">Latest Actions</h3>
				</div>

				<div class="box-body">

					<? if (empty($ACTIONS)): ?>
						<p>List is empty.</p>
					<? else: ?>

						<table class="table table-bordered table-hover">
							<thead>
							<tr>
								<th class="text-center">User ID</th>
								<th class="text-center">Smart link</th>
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
							<? /* @var $row \ufo\model\AffiliateActionLog */ foreach ($ACTIONS as $row): ?>
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
									<td class="text-center"><?=$action?></td>
									<td class="text-center hidden-xs"><?=$row->deposit?> <?=$row->currency?></td>
									<td class="text-center"><?=date('d.m.Y, H:i', $row->created)?></td>
									<td class="text-center hidden-xs"><?=$row->geo ?? 'Unknown' ?></td>
									<? if (App::getSession('parent_id') == 0): ?>
									<td class="text-center"><?=$row->payout?> <?=$row->currency?></td>
									<? endif; ?>

								</tr>
							<? endforeach; ?>
							</tbody>
						</table>

					<? endif; ?>
				</div>

				<div class="box-footer clearfix" style="">
					<a href="<?=App::createUrl('actionlog')?>" class="btn btn-sm btn-default btn-flat pull-right">View All Actions</a>
				</div>
			</div>
		</div>
	</div>
</section>