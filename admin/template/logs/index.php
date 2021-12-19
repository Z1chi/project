<?php
use system\components\Url;
use ufo\Model\Admin;
use Ufo\Model\LogAdmin;

/**
 * @var LogAdmin[] $LOGS
 * @var Admin[] $MANAGERS
 * @var string $PAGES
 * @var null|int $FILTER_MANAGER
 * @var array $ACTIONS
 * @var null|string $FILTER_ACTION
 *
 */
?>
<section class="content-header">
    <h1>Admin logs</h1>
</section>

<section class="content">

    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">

                <div class="box-body with-border">
                    <div class="row">

                        <?php if (Admin::isMinLevel(Admin::LEVEL_CALL_CENTER_SUPERVISOR)): ?>

                            <div class="col-xs-12 col-md-3">
                                <div class="form-group">
                                    <label for="calendarInput">Manager</label>
                                    <select class="form-control input-sm js_filter" data-param="manager" id="calendarInput">
                                        <option value="">All</option>
                                        <?php foreach ($MANAGERS as $key => $row): ?>
                                            <option value="<?=$row['id']?>"<?php if ($FILTER_MANAGER == $row['id']):?> selected="selected"<?php endif;?>><?=$row['name']?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>

                        <?php endif; ?>
                        <div class="col-xs-12 col-md-3">
                            <div class="form-group">
                                <label>Period:</label>

                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                    <input type="text" class="form-control pull-right js_date_range">
                                </div>
                            </div>
                        </div>

                        <div class="col-xs-12 col-md-3">
                            <div class="form-group">
                                <label for="action">Action</label>
                                <select class="form-control input-sm js_filter" data-param="action" id="action">
                                    <option value="">All</option>
                                    <?php foreach ($ACTIONS as $key => $row): ?>
                                        <option value="<?= $key ?>"<?php if ($FILTER_ACTION == $key):?> selected="selected"<?php endif;?>><?=$row?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-body">
                    <?php if (empty($LIST)): ?>
                        <p>List is empty.</p>
                    <?php else: ?>
                        <table class="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th class="text-center hidden-xs">ID</th>
                                <th class="text-center">Date</th>
                                <th class="text-center">Admin</th>
                                <th class="text-center">Action</th>
                                <th class="text-center">Data</th>
                            </tr>
                            </thead>
                            <tbody>

                            <?php foreach ($LIST as $row): /* @var LogAdmin $row */ ?>
                                <tr>
                                    <td class="text-center hidden-xs"><?= $row->id ?>.</td>
                                    <td class="text-center"><?= $row->created_at->format('d.m.Y H:i') ?></td>
                                    <td class="text-center"><?= $row->admin_name ?></td>
                                    <td class="text-center"><?= $ACTIONS[$row->action] ?></td>
                                    <td style="word-break: break-all;">
                                        <?php $data = json_decode($row->data) ?>
                                        <?php if ($data): ?>
                                            <?php foreach($data as $key => $val): ?>
                                                <?= $key ?>: <?= $val ?><br>
                                            <?php endforeach; ?>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    <?php endif; ?>
                </div>

                <?=$PAGES?>
            </div>
        </div>
    </div>

</section>