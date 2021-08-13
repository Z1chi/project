<section class="content-header">
	<h1>Affilates</h1>
</section>

<section class="content">
	<div class="row">
		<div class="col-xs-12">
			<div class="box box-primary">
				<div class="box-header with-border">
				</div>

				<div class="box-body">

					<? if (empty($LIST)): ?>
						<p>List is empty.</p>
					<? else: ?>

						<table class="table table-bordered table-hover">
							<thead>
							<tr>
								<th class="text-center">#</th>
								<th>Name</th>
								<th>E-mail</th>
								<th class="text-center">Telegram</th>
								<th class="text-center hidden-xs">Last activity</th>
								<th class="text-center hidden-xs">%</th>
								<th class="text-center hidden-xs">Active</th>
								<th class="text-center">Status</th>
								<th class="text-center">Action</th>
							</tr>
							</thead>
							<tbody>
							<? /* @var $row \affiliate\model\Affiliate */ foreach ($LIST as $row): ?>
								<tr>
									<td class="text-center">
										<?=$row->getId()?>
									</td>
									<td>
										<?=$row->getFullName()?>
									</td>
									<td style="word-break: break-all"><?=$row->getEmail()?></td>
									<td class="text-center"><?=$row->getTelegram()?></td>
									<td class="text-center"><?=$row->getActivityFormatted()?></td>
									<td class="text-center">RS <?=$row->getRevsharePercent()?>%; FD <?=$row->getFirstDepositPercent()?>%</td>
									<td class="text-center"><?=$row->isActive() ? '<span class="label label-success">Yes</span>' : '<span class="label label-danger">No</span>'?></td>
									<td class="text-center">
										<select class="form-control js_active_select" data-last-value="<?=$row->isActive() ? 1 : 0?>" data-affiliate-id="<?=$row->getId()?>">
											<option value="0">Disabled</option>
											<option value="1"<?if ($row->isActive()):?> selected="selected"<?endif;?>>Active</option>
										</select>
									</td>
									<td class="text-center">
										<a href="<?=App::createRawUrl('/affiliates/login/?id=' . $row->getId())?>" target="_blank">Sign in</a>
									</td>
								</tr>
							<? endforeach; ?>
							</tbody>
						</table>

					<? endif; ?>
				</div>

				<?=$PAGES?>
			</div>
		</div>
	</div>
</section>