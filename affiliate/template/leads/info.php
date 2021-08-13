<section class="content-header">
	<h1>Lead info</h1>

	<ol class="breadcrumb">
		<li><a href="<?=App::createUrl('leads')?>"><i class="fa fa-comment"></i> Leads</a></li>
		<li class="active">Lead info</li>
	</ol>
</section>

<section class="content">
	<div class="row">
		<div class="col-xs-12">

			<div class="box box-primary">

				<div class="box-body">

					<div class="form-group">
						<label for="created">E-mail verified</label>
						<div><?=$USER->getIsEmailVerified() ? '<span class="label label-success">Yes</span>' : '<span class="label label-danger">No</span>'?></div>
					</div>

					<div class="form-group">
						<label for="created">Documents verified</label>
						<div><?=$USER->isDocsVerified() ? '<span class="label label-success">Yes</span>' : '<span class="label label-danger">No</span>'?></div>
					</div>

					<div class="form-group">
						<label for="created">GEO</label>
						<div><?=$USER->getGeo()?></div>
					</div>

					<div class="form-group">
						<label for="language">User language</label>
						<input type="text" class="form-control" value="<?=$USER->getLanguage()?>" disabled>
					</div>

					<div class="form-group">
						<label for="activity">Last activity</label>
						<input type="text" class="form-control" value="<?=$USER->getActivityFormatted()?>" disabled>
					</div>

					<div class="form-group">
						<label for="created">Signed up</label>
						<input type="text" class="form-control" value="<?=$USER->getCreatedFormatted()?>" disabled>
					</div>

				</div>
			</div>
		</div>

		<div class="col-xs-12">

			<div class="box box-primary">

				<div class="box-header with-border">
					<h3 class="box-title">Payment request logs</h3>
				</div>

				<div class="box-body">
					<table class="table table-hover table-bordered">
						<tbody><tr>
							<th>Date</th>
							<th>Sum</th>
						</tr>


						<? if (empty($LOGS)): ?>

							<tr>
								<td colspan="5">Log is empty.</td>
							</tr>

						<? endif; ?>

						<? foreach ($LOGS as $log): ?>

							<tr>
								<td><?=date('d.m.Y H:i', $log['created'])?></td>
								<td><?=$log['data']?></td>
							</tr>

						<? endforeach; ?>

						</tbody>
					</table>
				</div>
			</div>
		</div>

        <?/*
		<div class="col-xs-12">

			<div class="box box-primary">

				<div class="box-header with-border">
					<h3 class="box-title">User miners</h3>
				</div>

				<div class="box-body">
					<table class="table table-hover table-bordered">
						<tbody><tr>
							<th>Miner type</th>
							<th>GH/s</th>
							<th>Price</th>
							<th>Contract date</th>
							<th>End date</th>
							<th>Status</th>
						</tr>

						<? if (empty($MINERS)): ?>

							<tr>
								<td colspan="5">Miners list is empty.</td>
							</tr>

						<? endif; ?>

						<? /* @var $miner \app\model\Miner */ /* foreach ($MINERS as $miner): ?>

						<tr>
							<td><?=$miner->getMinerTypeStr()?></td>
							<td><?=$miner->getGhs()?></td>
							<td><? if ($miner->isCc()): echo $miner->getPriceEur() . '€'; else: echo $miner->getPriceBtc() . ' BTC'; endif;?></td>
							<td><?=$miner->getStartFormatted()?></td>
							<td><?=$miner->getStopFormatted()?></td>
							<td>
								<?if ($miner->isBonus()):?><span class="label label-success">BONUS</span><?endif;?>
								<?if ($miner->isDeleted()):?><span class="label label-danger">DELETED</span><?endif;?>
							</td>
						</tr>

						<? endforeach; ?>

						</tbody>
					</table>
				</div>
			</div>
		</div>
	    */?>
    </div>
</section>

<?/*
<style type="text/css">
	.select2-container .select2-selection--single {
		height: 32px;
		padding: 6px;
	}
</style>


<script>
	$(function () {
		$('.select2').select2()
	});
</script>
*/?>