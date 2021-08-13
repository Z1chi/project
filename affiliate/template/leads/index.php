<section class="content-header">
	<h1>Leads</h1>
</section>

<section class="content">
	<div class="row">
		<div class="col-xs-12">
			<div class="box box-primary">

				<div class="box-body">

					<? if (empty($LIST)): ?>
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
							<? /* @var $row \app\model\User */ foreach ($LIST as $row): ?>
								<tr>
									<td class="text-center"><?=$row->url_title?></td>
									<td class="text-center">
										<a href="<?=$row->info_url?>"><?=$row->getEncodedId()?></a>
									</td>
									<td class="text-center"><?=$row->getCreatedFormatted()?></td>
									<td class="text-center hidden-xs"><?=$row->getActivityFormatted()?></td>
									<td class="text-center hidden-xs"><?=$row->getIsEmailVerified() ? '<span class="label label-success">Yes</span>' : '<span class="label label-danger">No</span>'?></td>
									<td class="text-center"><?=$row->last_sum?></td>
									<td class="text-center"><?=$row->getGeo()?></td>

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