<section class="content-header">
    <h1>Support profile</h1>

    <ol class="breadcrumb">
        <li><a href="<?= App::createUrl('support') ?>"><i class="fa fa-comment"></i> Supports</a></li>
        <li class="active">Support profile</li>
    </ol>
</section>
<? /* @var $SUPPORT \ufo\model\Support */ ?>
<section class="content js_supportInfo supportInfo" data-support-id="<?= $SUPPORT->id ?>">
    <div class="box box-primary supportInfo__lte">

        <div class="supportInfo__lte__wrapperImg">
            <img class="supportInfo__lte__wrapperImg__img" src="<?= $SUPPORT->image ?>" alt="">
            <label class="supportInfo__lte__wrapperImg__label" >Image</label>
        </div>

        <form role="form" method="post" data-form-id="support/update" class="js_supportInfo-form supportInfo__lte__form">
            <input type="hidden" name="id" value="<?= $SUPPORT->id ?>">
            <div class="box-body">

                <div class="form-group supportInfo__lte__form__id">
                    <label>ID</label>
                    <div><?= $SUPPORT->id ?></div>
                </div>

                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control nameValidate" id="name" name="name" value="<?= $SUPPORT->name ?>">
                </div>

                <div class="form-group">
                    <label for="image">Image</label>
                    <input type="file" class="form-control" id="image" name="image" >
                </div>

                <div class="form-group">
                    <label for="tg_link">Telegram link</label>
                    <input type="text" class="form-control telegramLinkValidate" id="tg_link" name="tg_link"
                           value="<?= $SUPPORT->tg_link ?>">
                </div>

                <div class="form-group">
                    <label for="active">Active</label>
                    <select name="active" class="form-control" >
                        <option value="0">Disabled</option>
                        <option value="1"<?if ($SUPPORT->active):?> selected="selected"<?endif;?>>Active</option>
                    </select>
                </div>
            </div>

            <div class="box-footer">
                <div class="form-group">
                    <button type="submit" class="btn btn-primary js_supportInfo-button">Update</button>
                </div>
            </div>

            <div class="hidden js_supportInfo-result">
                <hr/>
                <div class="callout callout-danger">
                    <p></p>
                </div>
            </div>

        </form>
    </div>

</section>