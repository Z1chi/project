<?php
/** @var \Ufo\Model\Project $PROJECT */

?>
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="center-block" style="margin-top: 20px; max-width: 720px; max-height: 480px">
                    <img class="img-responsive" src="<?= $PROJECT->img ?>"
                         alt="Site preview">
                    <br>
                    <p class="text-center">Site preview</p>
                </div>
                <div class="box-header with-border">
                    <h3 class="box-title">Offer info</h3>
                </div>

                <div class="box-body">
                    <table class="table table-bordered table-striped table-hover" style="width: 100%">
                        <tbody>
                        <tr>
                            <td class="text-bold">Title</td>
                            <td><?= $PROJECT->title ?></td>
                        </tr>
                        <tr>
                            <td class="text-bold" style="min-width: 30%">Url</td>
                            <td><?= $PROJECT->url_pattern ?></td>
                        </tr>
                        <tr>
                            <td class="text-bold">Token</td>
                            <td><?= $PROJECT->token ?></td>
                        </tr>
                        <tr>
                            <td class="text-bold">Created At</td>
                            <td><?= $PROJECT->created_at ?></td>
                        </tr>
                        <tr>
                            <td class="text-bold">Updated At</td>
                            <td><?= $PROJECT->updated_at ?></td>
                        </tr>
                        <tr>
                            <td class="text-bold">Accessed At</td>
                            <td><?= $PROJECT->accessed_at ?></td>
                        </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>

</section>