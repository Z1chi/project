<section class="content-header">
	<h1>Withdraw BTC</h1>
</section>

<section class="content">
	<div class="row">
		<div class="col-xs-12">
			<div class="box box-primary">
				<form role="form" class="js_form_withdraw_btc">
					<div class="box-body">
						<div class="form-group">
							<label>Your balance:</label>
							<div><?=$BALANCE_BTC?> BTC</div>
						</div>

						<div class="form-group">
							<label>Bitcoin address:</label>
							<input name="address" type="text" class="form-control" placeholder="1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2">
						</div>

						<div class="form-group">
							<label>Amount:</label>
							<input name="amount" type="text" class="form-control" placeholder="0.00100000" value="<?=$BALANCE_BTC?>">
						</div>
					</div>
					<div class="box-footer">
						<button type="submit" class="btn btn-primary">Send request</button>
					</div>
				</form>
			</div>

			<div class="alert alert-danger alert-dismissible hidden">
				<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
				<h4 class="js_withdraw_message"></h4>
			</div>
		</div>
	</div>
</section>