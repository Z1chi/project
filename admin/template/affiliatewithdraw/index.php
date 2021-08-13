<section class="content-header">
	<h1>Affiliate withdrawal requests</h1>
</section>

<section class="content">
	<div class="row">
		<div class="col-xs-12">
			<div class="box box-primary">
				<div class="box-header">

					<div class="btn-group">
						<? foreach ($FILTERS as $key => $filter): ?>
						<a href="<?=$filter['url']?>" type="button" class="btn btn-default btn-sm<? if ($key == $FILTER): ?> active<?endif;?>" data-key="<?=$key?>"><?=$filter['title']?></a>
						<? endforeach; ?>
					</div>

				</div>
				<div class="box-body">

					<? if (empty($LIST)): ?>
					<p>Requests list is empty.</p>
					<? else: ?>

					<table class="table table-bordered table-hover">
						<thead>
						<tr>
							<th class="text-center hidden-xs">ID</th>
							<th>Address</th>
							<th>Amount</th>
							<th>User</th>
							<th>Created</th>
							<th>Status</th>
						</tr>
						</thead>
						<tbody>

						<div class="callout callout-danger">
							<h4>Attention!</h4>

							<p>You need to close the request only after transferring funds to the user's wallet; this action cannot be canceled.</p>
						</div>

						<? /* @var $row \affiliate\model\Withdraw */ foreach ($LIST as $row): ?>
							<tr>
								<td class="text-center hidden-xs"><?=$row->getId()?>.</td>
								<td><a href="https://explorer.bitcoin.com/btc/address/<?=$row->getBtcAddress()?>" target="_blank" rel="nofollow"><?=$row->getBtcAddress()?></td>
								<td><?=$row->getAmountBtc()?></td>
								<td>
									<?=$row->getFullName()?>
								</td>
								<td><?=($row->getCreated() == 0) ? 'Нет' : $row->getCreatedFormatted()?></td>

								<td class="text-center">

									<?if (!$row->isStatusOk()):?>
                                        <a href="bitcoin:<?=$row->getBtcAddress()?>?amount=<?=$row->getAmountBtc()?>" class="btn btn-sm btn-success">Pay</a>
										<button type="submit" class="btn btn-sm btn-danger js_close_request" data-id="<?=$row->getId()?>">Close</button>
									<? else: ?>
										<?=$row->getStatusString()?>
									<? endif; ?>
								</td>
							</tr>
						<? endforeach; ?>
						</tbody>
					</table>

					<? endif; ?>
				</div>

				<?=$PAGES?>
			</div>
		</div>
	</div>
</section>