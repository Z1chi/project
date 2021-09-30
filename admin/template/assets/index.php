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
                            <?php foreach ($PROJECTS as $project): ?>
                                <option value="<?= $project->id ?>"><?= $project->title ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="form-group col-xs-6">
                        <label for="category">Asset category</label>
                        <select id="category" name="category" class="form-control">
                            <?php foreach ($CATEGORIES as $categoryId => $categoryTitle): ?>
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
                Project Assets
            </div>
            <div class="box-body assets-wrapper">
                <?php /** @var \Ufo\Model\ProjectAsset[] $ASSETS */
                $categories = \Ufo\ValueObject\ProjectAssetCategory::getCategories();
                foreach ($ASSETS as $asset): ?>
                    <div class="asset-block">
                        <img class="asset-preview" src="<?= $asset->preview ?>" alt="">
                        <div class="badges">
                            <span class="badge badge-category-<?=$asset->category?>"><?= $categories[$asset->category] ?></span>
                            <span class="badge badge-project"><?= $asset->project->title ?></span>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>