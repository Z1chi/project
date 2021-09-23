<?php
/** @var \Ufo\Model\Affiliate $AFFILIATE */

?>
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">

                <div class="box-body">
                    <form style="max-width: 720px" method="post" class="js_profile_changes">
                        <img src="" alt="">
                        <label for="img">Profile avatar</label>
                        <input type="file" id="img" name="img" class="form-control text-center color__default" value=""
                               placeholder="image.png">
                        <br>
                        <label for="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" class="name form-control color__default" value=""
                               placeholder="John">
                        <br>
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" class="name form-control color__default" value=""
                               placeholder="Deer">
                        <br>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" class="userEmail form-control color__default" value=""
                               placeholder="john.d@email.com">
                        <br>
                        <label for="oldPassword">Old password</label>
                        <input type="password" id="oldPassword" name="oldPassword" class="password form-control color__default" value=""
                               placeholder="oldPassword">
                        <br>
                        <label for="newPassword">New password</label>
                        <input type="password" id="newPassword" name="newPassword" class="password form-control color__default" value=""
                               placeholder="newPassword">
                        <br>
                        <label for="confirmPassword">Confirm password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" class="password form-control color__default" value=""
                               placeholder="confirmPassword">
                        <br>
                        <label for="wallet">BTC wallet</label>
                        <input type="text" id="wallet" name="wallet" class="wallet form-control color__default" value="" placeholder="wallet">
                        <br>
                        <label for="telegram">Telegram</label>
                        <input type="text" id="telegram" name="telegram" class="form-control" value=""
                               placeholder="telegram">
                        <br>
                        <button type="submit" class="btn btn-success buttonSubmit">Save</button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</section>