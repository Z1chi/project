<?php
/** @var \Ufo\Model\Affiliate $AFFILIATE */

?>
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">

                <div class="box-body">
                    <form style="max-width: 720px" method="post" class="js_profile_changes">
                        <input type="file" name="img" class="form-control text-center"
                               value="<?= $AFFILIATE->img?>" placeholder="image.png">
                        <br>
                        <input type="text" name="firstName" class="form-control"
                               value="<?= $AFFILIATE->first_name?>" placeholder="John">
                        <br>
                        <input type="text" name="lastName" class="form-control"
                               value="<?= $AFFILIATE->last_name?>" placeholder="Deer">
                        <br>
                        <input type="email" name="email" class="form-control"
                               value="<?= $AFFILIATE->email?>" placeholder="john.d@email.com">
                        <br>
                        <input type="password" name="oldPassword" class="form-control" value="" placeholder="oldPassword">
                        <br>
                        <input type="password" name="newPassword" class="form-control" value="" placeholder="newPassword">
                        <br>
                        <input type="password" name="confirmPassword" class="form-control" value="" placeholder="confirmPassword">
                        <br>
                        <input type="text" name="wallet" class="form-control"
                               value="<?= $AFFILIATE->wallet?>" placeholder="wallet">
                        <br>
                        <input type="text" name="telegram" class="form-control"
                               value="<?= $AFFILIATE->telegram?>" placeholder="telegram">
                        <br>
                        <button type="submit" class="btn btn-success btn-sm js_admin_add_button">Save</button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</section>