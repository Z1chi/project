<?php

use Illuminate\Database\Eloquent\Collection;
use Ufo\Model\ProjectAsset;
use Ufo\ValueObject\ProjectAssetCategory;

?>

<section class="content-header">
    <h1>Project assets</h1>
</section>
<section class="content">
    <div class="row col-xs-12 row-assets">
        <div class="box box-primary">
            <div class="box-header with-border">
                <div class="row">
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group">
                            <label for="categoryIdInput">Category</label>
                            <select class="form-control input-sm js_filter" data-param="categoryId" id="categoryIdInput">
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
            <?php /** @var Collection[] $ASSETS */
            if (!$ASSETS->isEmpty()): ?>
                <div class="box-body assets-wrapper">
                    <?php /** @var ProjectAsset[] $ASSETS */
                    $categories = ProjectAssetCategory::getCategories();
                    foreach ($ASSETS as $asset): ?>
                        <div class="asset-block">
                            <a download href="<?=$asset->file?>" class="btn btn-success tooltip">Download</a>
                            <img class="asset-preview" src="<?= $asset->preview_src ?>" alt="">
                            <div class="badges">
                                <span class="badge badge-category-<?= $asset->category_id ?>"><?= $categories[$asset->category_id] ?></span>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php else: ?>
                <h2 style="padding: 30px;">There is no <?php if (!empty($FILTER_CATEGORY)): ?> such <?php endif; ?> assets for your
                    project</h2>
            <?php endif; ?>
        </div>
    </div>
</section>