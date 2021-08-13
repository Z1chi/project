<div class="box-footer clearfix">
	<ul class="pagination pagination-sm no-margin pull-left">
		<? foreach ($PAGES as $page): ?>
			<li class="<?= $page['active'] ? ' active' : '' ?>"><a href="<?= $page['url'] ?>"><?= $page['page'] ?></a></li>
		<? endforeach; ?>
	</ul>
</div>