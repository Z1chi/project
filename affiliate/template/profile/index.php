<?php
/** @var \Ufo\Model\Affiliate $AFFILIATE */

?>
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">

                <div class="box-body">
                    <form method="post" class="js_profile_changes profile__form">
                        <img src="<?= $AFFILIATE->img?>" style="width: 200px;" alt="Profile avatar">
                        <label for="img">Profile avatar</label>
                        <input type="file" id="img" name="img" class="form-control text-center color__default" value=""
                               placeholder="">
                        <br>
                        <label for="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName"
                               class="name form-control color__default" value="<?= $AFFILIATE->first_name?>"
                               placeholder="John">
                        <br>
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" class="name form-control color__default"
                               value="<?= $AFFILIATE->last_name?>"
                               placeholder="Deer">
                        <br>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" class="userEmail form-control color__default"
                               value="<?= $AFFILIATE->email?>"
                               placeholder="john.d@email.com">
                        <br>
                        <label for="oldPassword">Old password</label>
                        <input type="password" id="oldPassword" name="oldPassword" class="oldPassword form-control color__default" value=""
                               placeholder="">
                        <span class="error profile__form__errorOldPassword" id="oldPasswordError">Invalid password</span>
                        <br>
                        <label for="newPassword">New password</label>
                        <input type="password" id="newPassword" name="newPassword" class="newPassword form-control color__default" value=""
                               placeholder="">
                        <br>
                        <label for="confirmPassword">Confirm password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" class="password_confirm form-control color__default" value=""
                               placeholder="">
                        <br>
                        <label for="wallet">BTC wallet</label>
                        <input type="text" id="wallet" name="wallet" class="wallet form-control color__default"
                               value="<?= $AFFILIATE->wallet?>" placeholder="">
                        <br>
                        <label for="telegram">Telegram</label>
                        <input type="text" id="telegram" name="telegram" class="form-control"
                               value="<?= $AFFILIATE->telegram?>"
                               placeholder="">
                        <br>
                        <button type="submit" class="btn btn-success buttonSubmit">Save</button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</section>