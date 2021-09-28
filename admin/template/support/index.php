<section class="content-header">
    <h1>Support</h1>
</section>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">

                <div class="box-body">

                    <? if (empty($LIST)): ?>
                        <p>Support list is empty.</p>
                    <? else: ?>

                        <table class="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th class="text-center">telegram link</th>
                                <th class="text-center">Active</th>
                            </tr>
                            </thead>
                            <tbody>
                            <? /* @var $row \ufo\model\Support */ foreach ($LIST as $row): ?>
                                <tr>
                                    <td class="text-center">
                                        <?=$row->getId()?>
                                    </td>
                                    <td style="word-break: break-all"><?=$row->name?></td>
                                    <td style="text-align: center"><img src="<?=$row->image?>"></td>
                                    <td style="text-align: center"><?=$row->tg_link?></td>
                                    <td class="text-center"><?=$row->isActive() ? '<span class="label label-success">Yes</span>' : '<span class="label label-danger">No</span>'?></td>
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
                                <th>Image</th>
                                <th class="text-center">telegram link</th>
                                <th class="text-center">Active</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input type="text" name="name" class="form-control" value="" placeholder="John Deer">
                                </td>
                                <td>
                                    <input type="image" name="image" class="form-control" value="">
                                </td>
                                <td>
                                    <input type="text" name="tg_link" class="form-control">
                                </td>
                                <td>
                                    <input type="text" name="active" class="form-control" value="" placeholder="1">
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