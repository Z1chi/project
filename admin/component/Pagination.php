<?php

namespace admin\component;


use Purl;
use system\core\Template;

class Pagination
{
	private $items_count;
	private $items_on_page;
	private $current_url;

	public function __construct($items_on_page = 10)
	{
		$this->items_on_page = $items_on_page;
		$this->current_url = Purl\Url::fromCurrent();
	}

	/**
	 * @param int $items_count
	 */
	public function setItemsCount($items_count)
	{
		$this->items_count = (int) $items_count;
	}

	/**
	 * @param int $items_on_page
	 */
	public function setItemsOnPage($items_on_page)
	{
		$this->items_on_page = $items_on_page;
	}

	/**
	 * @return int
	 */
	public function getItemsOnPage()
	{
		return $this->items_on_page;
	}

	private function getPaginationUrls()
	{
		$urls = array();

		if (empty($this->items_count)) return $urls;

		$page_count = ceil($this->items_count / $this->items_on_page);

		$current_page = $this->getPageIndex();

		$pagination_size = 4;

		$right_overflow = $current_page - $pagination_size <= 0 ? $current_page - $pagination_size - 1 : 0;
		$left_overflow = $page_count - $current_page - $pagination_size < 0 ? $page_count - $current_page - $pagination_size : 0;

		$start_page = $current_page - $pagination_size - $right_overflow + $left_overflow;
		$start_page = $start_page <= 0 ? 1 : $start_page;
		$end_page = $current_page + $pagination_size - $right_overflow;
		$end_page = $end_page >= $page_count ? $page_count : $end_page;

		if ($page_count >= $pagination_size * 2 + 2 && $start_page > 1)
		{
			$first_url = $this->current_url;
			$first_url->query->remove(KEY_PAGE_PARAM);

			$urls[] = [
				'url' => $first_url->getUrl(),
				'page' => 'first',
				'active' => ''
			];
		}

		for ($i = $start_page; $i <= $end_page; $i++)
		{
			$page_url = $this->current_url;

			if ($i == 1) {
				$page_url->query->remove(KEY_PAGE_PARAM);
			} else {
				$page_url->query->set(KEY_PAGE_PARAM, $i);
			}

			$urls[] = [
				'url' => $page_url->getUrl(),
				'page' => $i,
				'active' => ($current_page == $i - 1)
			];
		}

		if ($page_count >= $pagination_size * 2 + 2 && $end_page != $page_count)
		{
			$last_url = $this->current_url;
			$last_url->query->set(KEY_PAGE_PARAM, $page_count);

			$urls[] = [
				'url' => $last_url->getUrl(),
				'page' => 'last',
				'active' => ''
			];
		}

		return $urls;
	}

	public function getPaginationHtml ($template_path)
	{
		$urls = $this->getPaginationUrls();

		$html = '';

		if (!empty($urls))
		{
			$tpl_file = $template_path;
			$tpl = new Template($tpl_file);
			$tpl->init([
				'PAGES' => $urls
			]);

			$html = $tpl->render();
		}

		return $html;
	}

	public function getPageIndex ()
	{
		$param = $this->current_url->query->get(KEY_PAGE_PARAM);
		$index = 0;

		if ($param != null) {
			$index = (int) $this->current_url->query->get(KEY_PAGE_PARAM) - 1;
		}

		if ($index < 0) {
			$index = 0;
		}

		return $index;
	}

	public function getPageDigit ()
	{
		return $this->getPageIndex() + 1;
	}

	public function getOffset ()
	{
		$page = $this->getPageDigit();
		$offset = $page * $this->getItemsOnPage() - $this->getItemsOnPage();
		return $offset;
	}
}