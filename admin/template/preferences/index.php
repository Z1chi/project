<section class="content-header">
	<h1>Variables</h1>
</section>

<section class="content">
	<div class="row">
		<div class="col-xs-12">
			<div class="box box-primary">
				<div class="box-body">
					<table class="table table-bordered table-hover">
						<thead>
						<tr>
							<th class="text-center">ID</th>
							<th>Key</th>
							<th>Value</th>
						</tr>
						</thead>
						<tbody>

						<? foreach ($LIST as $row): ?>
							<tr>
								<td class="text-center"><?=$row['id']?>.</td>
								<td style="word-break: break-all"><?=$row['key']?></td>
								<td>


									<div class="input-group">
										<input type="text" class="form-control js_variables_key" value="<?=htmlspecialchars($row['value'], ENT_QUOTES)?>">
										<span class="input-group-btn">
											<button type="button" class="btn btn-success js_variables_save" disabled="disabled" data-key="<?=$row['key']?>">Save</button>
										</span>
									</div>
								</td>
							</tr>
						<? endforeach; ?>


						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</section>