<section class="content-header">
    <h1>Change password</h1>
</section>

<section class="content">

    <div class="row">
        <form method="post" class="js_change_password_form">
            <div class="col-xs-4">
                <div class="box box-primary">
                    <div class="box-body">

                        <div class="form-group">
                            <label for="password_old">Old password</label>
                            <input class="form-control" name="password_old" type="password" placeholder="">
                        </div>

                        <div class="form-group">
                            <label for="password_new">New password</label>
                            <input class="form-control" name="password_new" type="password" placeholder="">
                        </div>

                        <div class="form-group">
                            <label for="password_new_repeat">Repeat password</label>
                            <input class="form-control" name="password_new_repeat" type="password" placeholder="">
                        </div>
                    </div>

                    <div class="box-footer">
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary js_change_password_button">Save</button>
                        </div>

                        <div class="hidden js_change_password_result">
                            <div class="callout callout-danger">
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>