<?php

use Illuminate\Database\Eloquent\Collection;
use system\components\Url;
use Ufo\Model\Affiliate;
use Ufo\Model\Project;
/** @var Affiliate $affiliate */
/** @var Collection $LIST */
/** @var Project $project */
?>
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">

                <div class="box-body">

                    <table class="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">Preview</th>
                            <th class="text-center">Offer name</th>
                            <th class="text-center">Website Url</th>
                            <th class="text-center"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        foreach ($LIST as $affiliate):
                            $project = $affiliate->project;
                            if (!empty($project)): ?>
                                <tr>
                                    <td class="text-center">
                                        <img src="<?= $project->img ?>" alt="" style="">
                                    </td>
                                    <td class="text-center">
                                       <?= $project->title ?>
                                    </td>
                                    <td class="text-center">
                                        <?= $project->getUrlHost() ?>
                                    </td>
                                    <td>
                                        <a href="<?= Url::create("project",$project->id)?>" target="_blank">
                                            <button class="button button-success"><i class="fa fa-eye" aria-hidden="true"></i></button>
                                        </a>
                                    </td>
                                </tr>
                            <?php endif; ?>
                        <?php endforeach; ?>
                        </tbody>
                    </table>

                </div>


            </div>
        </div>
    </div>
</section>