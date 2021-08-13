<section class="content-header">
	<h1>Admin profile</h1>

	<ol class="breadcrumb">
		<li><a href="<?=App::createUrl('admins')?>"><i class="fa fa-comment"></i> Admins</a></li>
		<li class="active">Admin profile</li>
	</ol>
</section>
<? /* @var $ADMIN \admin\model\Admin */?>
<section class="content js_admin" data-admin-id="<?=$ADMIN->getId()?>">
	<div class="row">
		<div class="col-xs-12 col-md-6">
			<div class="box box-primary">

				<form role="form" class="js_admin_form">
					<input type="hidden" name="id" value="<?=$ADMIN->getId()?>">
					<div class="box-body">

						<div class="form-group">
							<label for="first_name">ID</label>
							<div><?=$ADMIN->getId()?></div>
						</div>

						<div class="form-group">
							<label for="name">Name</label>
							<input type="text" class="form-control" id="name" name="name" value="<?=$ADMIN->getFullName()?>">
						</div>

                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input type="text" class="form-control" id="email" name="email" value="<?=$ADMIN->getEmail()?>">
                        </div>

                        <div class="form-group">
                            <label for="email">CC %</label>
                            <input type="text" class="form-control" id="callcenter_percent" name="callcenter_percent" value="<?=$ADMIN->getCallcenterPercent()?>">
                        </div>

                        <div class="form-group">
                            <label for="email">CC ID</label>
                            <input type="text" class="form-control" id="callcenter_id" name="callcenter_id" value="<?=$ADMIN->getCallcenterId()?>">
                        </div>

					</div>

					<div class="box-footer">
						<div class="form-group">
							<button type="submit" class="btn btn-primary js_admin_update">Update</button>
						</div>
					</div>

					<div class="hidden js_admin_result">
						<hr />
						<div class="callout callout-danger">
							<p></p>
						</div>
					</div>

				</form>
			</div>
		</div>

        <div class="col-xs-12 col-md-6">

            <div class="box">

                <div class="box-header with-border">
                    <h3 class="box-title">Additional information</h3>
                </div>

                <div class="box-body">
                    <div class="form-group">
                        <label for="created">Account status</label>
                        <select class="form-control js_active_select" data-last-value="<?=$ADMIN->isActive() ? 1 : 0?>" data-admin-id="<?=$ADMIN->getId()?>">
                            <option value="0">Disabled</option>
                            <option value="1"<?if ($ADMIN->isActive()):?> selected="selected"<?endif;?>>Active</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="created">Created</label>
                        <div><?=$ADMIN->getCreatedFormatted()?></div>
                    </div>

                    <div class="form-group">
                        <label for="created">Activity</label>
                        <div><?=$ADMIN->getActivityFormatted()?></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-md-6">

            <div class="box box-warning">

                <div class="box-header with-border">
                    <h3 class="box-title">Reset password</h3>
                </div>

                <div class="box-body">
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary js_admin_reset_password">Create new password</button>
                    </div>
                </div>

                <div class="box-footer">
                    <div class="hidden js_admin_new_password">
                        <div class="callout callout-success">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

	</div>

</section>