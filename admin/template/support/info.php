<section class="content-header">
    <h1>Admin profile</h1>

    <ol class="breadcrumb">
        <li><a href="<?=App::createUrl('admins')?>"><i class="fa fa-comment"></i> Supports</a></li>
        <li class="active">Support profile</li>
    </ol>
</section>
<? /* @var $SUPPORT \ufo\model\Support */?>
<section class="content js_admin" data-admin-id="<?=$SUPPORT->id?>">
    <div class="row">
        <div class="col-xs-12 col-md-6">
            <div class="box box-primary">

                <form role="form" class="js_admin_form">
                    <input type="hidden" name="id" value="<?=$SUPPORT->id?>">
                    <div class="box-body">

                        <div class="form-group">
                            <label for="first_name">ID</label>
                            <div><?=$SUPPORT->id?></div>
                        </div>

                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" name="name" value="<?=$SUPPORT->name?>">
                        </div>

                        <div class="form-group">
                            <label for="email">Image</label>
                            <input type="text" class="form-control" id="image" name="image" value="<?=$SUPPORT->image?>">
                        </div>

                        <div class="form-group">
                            <label for="email">Telegram link</label>
                            <input type="text" class="form-control" id="tg_link" name="tg_link" value="<?=$SUPPORT->tg_link?>">
                        </div>

                        <div class="form-group">
                            <label for="email">Active</label>
                            <input type="text" class="form-control" id="active" name="active" value="<?=$SUPPORT->active?>">
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
</section>