<?php
use Ufo\Model\ProjectAsset;
use Ufo\ValueObject\ProjectAssetCategory;
?>
<section class="content-header">
    <h1>Project assets</h1>
</section>

<section class="content">
    <div class="row col-xs-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                Add project asset
            </div>
            <div class="box-body">
                <form role="form" class="js_asset_create_form">
                    <div class="form-group col-xs-6">
                        <label for="projectId">Asset project</label>
                        <select id="projectId" name="projectId" class="form-control">
                            <?php /** @var \Ufo\Model\Project[] $PROJECTS */
                            foreach ($PROJECTS as $project): ?>
                                <option value="<?= $project->id ?>"><?= $project->title ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="form-group col-xs-6">
                        <label for="category">Asset category</label>
                        <select id="category" name="category" class="form-control">
                            <?php /** @var array $CATEGORIES */
                            foreach ($CATEGORIES as $categoryId => $categoryTitle): ?>
                                <option value="<?= $categoryId ?>"><?= $categoryTitle ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="form-group col-xs-6">
                        <label for="file">Asset file</label>
                        <input id="file" name="file" type="file" class="form-control"/>
                    </div>
                    <div class="form-group col-xs-6 hidden">
                        <label for="preview">File preview</label>
                        <input id="preview" name="preview" type="file" class="form-control"/>
                    </div>
                    <div class="col-xs-12">
                        <button type="submit" class="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="row col-xs-12 row-assets">
        <div class="box box-primary">
            <div class="box-header with-border">
                <div class="row">
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group">
                            <label for="projectInput">Project</label>
                            <select class="form-control input-sm js_filter" data-param="project" id="projectInput">
                                <option value="">All</option>
                                <?php /** @var \Ufo\Model\Project[] $PROJECTS */
                                foreach ($PROJECTS as $project): ?>
                                    <option <?php if ($FILTER_PROJECT == $project->id): ?> selected="selected" <?php endif;?>
                                            value="<?= $project->id ?>"><?= $project->title ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group">
                            <label for="categoryInput">Category</label>
                            <select class="form-control input-sm js_filter" data-param="category" id="categoryInput">
                                <option value="">All</option>
                                <?php /** @var array $CATEGORIES */
                                foreach ($CATEGORIES as $categoryId => $categoryTitle): ?>
                                    <option <?php if ($FILTER_CATEGORY == $categoryId): ?> selected="selected" <?php endif; ?>
                                            value="<?= $categoryId ?>"><?= $categoryTitle ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-body assets-wrapper">
                <?php /** @var ProjectAsset[] $ASSETS */
                $categories = ProjectAssetCategory::getCategories();
                foreach ($ASSETS as $asset): ?>
                    <div class="asset-block">
                        <span class="delete-icon" data-assetId="<?= $asset->id ?>"><span class="delete-tip">Delete</span></span>
                        <img class="asset-preview" src="<?= $asset->preview_src ?>" alt="">
                        <div class="badges">
                            <span class="badge badge-category-<?=$asset->category_id?>"><?= $categories[$asset->category_id] ?></span>
                            <span class="badge badge-project"><?= $asset->project->title ?></span>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>