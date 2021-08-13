<section class="content-header">
	<h1><?php echo $TITLE; ?></h1>
</section>

<section class="content">
	<div class="row">
		<div class="col-xs-12">
			<div class="box box-primary">

				<div class="box-body">

					<? if (empty($LIST)): ?>
						<p>Shift list is empty.</p>
					<? else: ?>

						<table class="table table-bordered table-hover">
							<thead>
							<tr>
								<th class="text-center" style="width: 40px">#</th>
								<th>Start</th>
								<th>End</th>
								<th class="text-center" style="width: 40px">Duration</th>
							</tr>
							</thead>
							<tbody>
							<? /* @var $shift \Ufo\Model\AdminShift */ foreach ($LIST as $i => $shift): ?>
								<tr id="shift_<?php echo $shift->id; ?>" class="<?php echo $shift->id == $ACTIVE_SHIFT_ID ? 'bg-info' : ''; ?>">
									<td class="text-center"><?php echo $i + 1; ?></td>
									<td><?php echo $shift->getFromFormatted(); ?></td>
                                    <td><?php echo $shift->getTillFormatted(); ?></td>
                                    <td style="white-space: nowrap"><?php echo $shift->getDiffFormatted(); ?></td>
                                    <td class="text-center" style="word-break: break-all">
                                        <i class="fa fa-times js_shift_remove_button" style="cursor: pointer" data-id="<?php echo $shift->id; ?>"></i>
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
                    Add shift
                </div>

                <div class="box-body">
                    <form method="post" class="js_shift_add_form">
                        <input type="hidden" name="admin_id" value="<?php echo $ADMIN_ID; ?>">
                        <table class="table table-bordered ">
                            <thead>
                            <tr>
                                <th>Shift starts</th>
                                <th>Shift ends</th>
                                <th class="text-center"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <div class="form-group">
                                        <div class="input-group bootstrap-timepicker timepicker">
                                            <input type="text" class="form-control input-small js_time" value="09:00" name="shift_time_from">
                                            <span class="input-group-addon">
                                                <i class="glyphicon glyphicon-time"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <input type="text" name="shift_date_from" class="form-control js_date" value="<?php echo date('d.m.Y'); ?>" placeholder="Дата">
                                </td>
                                <td>
                                    <div class="form-group">
                                        <div class="input-group bootstrap-timepicker timepicker">
                                            <input type="text" class="form-control input-small js_time" value="23:00" name="shift_time_till">
                                            <span class="input-group-addon">
                                                <i class="glyphicon glyphicon-time"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <input type="text" name="shift_date_till" class="form-control js_date" value="<?php echo date('d.m.Y'); ?>" placeholder="Дата">
                                </td>
                                <td class="text-center" style="vertical-align: middle">
                                    <button type="submit" class="btn btn-success btn-sm js_shift_add_button">Add</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>

                <div class="box-footer">
                    <div class="hidden js_shift_add_result">
                        <div class="callout callout-danger">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>