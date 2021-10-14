<div class="eight-section bg">
    <div class="container">
        <form class="content modal-dialog js_signup_form_home " action="" id="sign-up" method="POST">
            <div class="label">Take a few clicks</div>
            <div class="section-title-block">
                <div>
                    <div class="title">sign up <br> form</div>
                </div>
            </div>
            <div class="form-block">
                <div class="form-group">
                    <input type="text" name="first_name" class="firstNameSignUp" required>
                    <div class="labelForm">name</div>
                </div>
                <div class="form-group">
                    <input type="text" name="last_name" class="last_name" required>
                    <div class="labelForm">last name</div>
                </div>
                <div class="form-group">
                    <input type="text" class="userEmailSignUp" name="email" required>
                    <div class="labelForm">e-mail</div>
                </div>
                <div class="form-group">
                    <input type="text" name="telegram" class="telegramLink" required>
                    <div class="labelForm">telegram</div>
                </div>
                <div class="form-group">
                    <img src="/assets/svg/eye-view.svg" class="js_view_pass" alt="eye-view">
                    <input type="password" name="password" id="passwordSignUpHome" class="passwordSignUp" required>
                    <div class="labelForm">password</div>
                </div>
                <div class="form-group">
                    <img src="/assets/svg/eye-view.svg" class="js_view_pass" alt="eye-view">
                    <input type="password" name="password_repeat"  class="password_repeat" required>
                    <div class="labelForm">re-entry password</div>
                </div>
            </div>
            <div class="caption form__error-wrapper">
                <p>If you push the button you confirm
                    <a href="<?= \system\components\Url::create('terms') ?>" target="_blank" class="term">terms</a>
                </p>
                <label class="error-label"></label>
            </div>
            <div class="d-flex sign-center-block js_signup_form_home_submit">
                <div class="title">create account</div>
                <img src="/assets/svg/arrow-right.svg" height="43" alt="arrow-right">
            </div>
            <input type="submit" style="position: absolute; left: -9999px; display: none; width: 0; height: 0"/>
        </form>
    </div>
</div>