<section class="content-header">
	<h1>Smart Links</h1>
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
								<th class="text-center hidden-xs">Created</th>
								<th class="text-center">Title</th>
								<th class="text-center">Url</th>
								<th class="text-center hidden-xs">Lead Iframe</th>
								<th class="text-center hidden-xs">Conversion Iframe</th>
								<th class="text-center">Action</th>
							</tr>
							</thead>
							<tbody>
							<? /* @var $row \affiliate\model\Smartlink */ foreach ($LIST as $row): ?>
								<tr>
									<td class="text-center hidden-xs"><?=$row->getCreatedFormatted()?></td>
									<td class="text-bold">

										<?=htmlspecialchars($row->getTitle(), ENT_QUOTES)?>

										<?/*
										<div class="input-group">
											<input type="text" class="form-control js_smartlink" value="<?=htmlspecialchars($row->getTitle(), ENT_QUOTES)?>">
											<span class="input-group-btn">

											<button type="button" class="btn btn-default js_smartlink_save" disabled="disabled" data-id="<?=$row->getId()?>">Save</button>
										</span>
										</div>*/?>

										</td>
									<td class="text-center">
										<input type="text" value="<?=$row->getSmartlinkUrl()?>" class="form-control" readonly>
									</td>
									<td class="text-center hidden-xs">
										<input type="text" value="<?=$row->getIframeLead()?>" class="form-control" readonly>
									</td>
									<td class="text-center hidden-xs">
										<input type="text" value="<?=$row->getIframeConversion()?>" class="form-control" readonly>
									</td>
									<td class="text-center">
										<button type="button" class="btn btn-danger js_smartlink_delete" data-toggle="modal" data-target="#modal-delete" data-id="<?=$row->getId()?>">
											<i class="fa fa-trash"></i>
										</button>
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

		<div class="col-xs-12">

			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">Add new smart link</h3>
				</div>
				<!-- /.box-header -->
				<!-- form start -->
				<form role="form" class="js_smartlink_create_form">
					<div class="box-body">
						<div class="form-group">
							<label>Smart link title</label>
							<input name="title" type="text" class="form-control" placeholder="GB / Facebook / 25-35">
						</div>

						<div class="form-group">
							<label>Signup (lead) conversion URL for hidden iframe (not required)</label>
							<input name="iframe_lead" type="text" class="form-control" placeholder="https://yourwhitedomain.com/signup-success.html">
							<p class="help-block">This url is used for lead signup tracking. Your url with facebook pixel or any other tracking code will be loaded in hidden iframe when the user finishes the payment.</p>
						</div>

						<div class="form-group">
							<label>Deposit conversion URL for hidden iframe (not required)</label>
							<input name="iframe_conversion" type="text" class="form-control" placeholder="https://yourwhitedomain.com/thank-you-page.html">
							<p class="help-block">This url is used for deposit conversion tracking. Your url with tracking code will be loaded in hidden iframe when the user successfully signed up.</p>
						</div>
					</div>
					<!-- /.box-body -->

					<div class="box-footer">
						<button type="submit" class="btn btn-primary">Create</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>

<div class="modal fade" id="modal-delete">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">Delete smart link</h4>
			</div>
			<div class="modal-body">
				<p>Are you sure you want to delete this smart link? This action cannot be undone.</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-danger" id="modal-confirm">Delete</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->