<section class="content-header">
	<h1>Admins</h1>
</section>

<section class="content">
	<div class="row">
		<div class="col-xs-12">
			<div class="box box-primary">

				<div class="box-body">

					<? if (empty($LIST)): ?>
						<p>Admins list is empty.</p>
					<? else: ?>

						<table class="table table-bordered table-hover">
							<thead>
							<tr>
								<th class="text-center">#</th>
								<th>Name</th>
								<th>E-mail</th>
                                <th class="text-center">%</th>
                                <th class="text-center">ID</th>
                                <th class="text-center hidden-xs">Activity</th>
                                <th class="text-center hidden-xs">Shifts</th>
								<th class="text-center">Active</th>
								<th class="text-center">Status</th>
							</tr>
							</thead>
							<tbody>
							<? /* @var $row \admin\model\Admin */ foreach ($LIST as $row): ?>
								<tr>
									<td class="text-center">
										<?=$row->getId()?>
									</td>
									<td>
                                        <a href="<?=App::createRawUrl('/admins/?id=' . $row->getId())?>"><?=$row->getFullName()?></a>
									</td>
                                    <td style="word-break: break-all"><?=$row->getEmail()?></td>
                                    <td style="text-align: center"><?=$row->getCallcenterPercent()?></td>
                                    <td style="text-align: center"><?=$row->getCallcenterId()?></td>
									<td class="text-center"><?=$row->getActivityFormatted()?></td>
									<td class="text-center">
                                        <a href="<?=App::createRawUrl('/admins/shifts?id=' . $row->getId())?>"><?php echo $row->getShiftCount(); ?></a>
                                    </td>
									<td class="text-center"><?=$row->isActive() ? '<span class="label label-success">Yes</span>' : '<span class="label label-danger">No</span>'?></td>
									<td class="text-center">
										<select class="form-control js_active_select" data-last-value="<?=$row->isActive() ? 1 : 0?>" data-admin-id="<?=$row->getId()?>">
											<option value="0">Disabled</option>
											<option value="1"<?if ($row->isActive()):?> selected="selected"<?endif;?>>Active</option>
										</select>
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

    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    Add admin
                </div>

                <div class="box-body">
                    <form method="post" class="js_admin_add_form">
                        <table class="table table-bordered ">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th class="text-center">%</th>
                                <th class="text-center">ID</th>
                                <th class="text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input type="text" name="name" class="form-control" value="" placeholder="John Deer">
                                </td>
                                <td>
                                    <input type="text" name="email" class="form-control" value="" placeholder="john.d@email.com">
                                </td>
                                <td>
                                    <input type="text" name="callcenter_percent" class="form-control" value="5">
                                </td>
                                <td>
                                    <input type="text" name="callcenter_id" class="form-control" value="" placeholder="101">
                                </td>
                                <td>
                                    <button type="submit" class="btn btn-success btn-sm js_admin_add_button">Add</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>

                <div class="box-footer">
                    <div class="hidden js_admin_add_result">
                        <div class="callout callout-danger">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>