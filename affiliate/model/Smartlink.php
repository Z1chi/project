<?php


namespace affiliate\model;

use app\component\HashidHelper;
use system\components\DB;
use system\core\Model;

class Smartlink extends Model
{
	private $id;
	private $affiliate_id;
	private $title;
	private $projectId;
	private $created;
	private $iframe_conversion;
	private $iframe_lead;

	public static function withRow ($row)
	{
		$instance = new self();
		$instance->fill($row);
		return $instance;
	}

	private function fill( array $row )
	{
		$this->id = $row['id'];
		$this->affiliate_id = $row['affiliate_id'];
		$this->title = $row['title'];
		$this->projectId = $row['project_id'];
		$this->created = $row['created'];
		$this->iframe_conversion = $row['iframe_conversion'];
		$this->iframe_lead = $row['iframe_lead'];
	}

	/**
	 * @return int
	 */
	public function getId()
	{
		return $this->id;
	}

	/**
	 * @return string
	 */
	public function getEncodedId()
	{
		$encoded = HashidHelper::encodeSmartlinkId($this->getId());
		return $encoded;
	}

	/**
	 * @return string
	 */
	public function getSmartlinkUrl()
	{
		$url = getenv('APP_SCHEME') . '://' . getenv('APP_HOSTNAME') . '/?' . AFFILIATE_URL_GET_KEY . '=' . $this->getEncodedId(); // todo: App::getExternalUrl()
		return $url;
	}

	/**
	 * @return int
	 */
	public function getAffiliateId()
	{
		return $this->affiliate_id;
	}

	/**
	 * @return string
	 */
	public function getTitle()
	{
		return $this->title;
	}

	/**
	 * @return int
	 */
	public function getProjectId(): int
    {
		return $this->projectId;
	}

	/**
	 * @return string
	 */
	public function getCreatedFormatted ()
	{
		return date('d.m.Y, H:i', $this->created);
	}

	/**
	 * @return string
	 */
	public function getIframeConversion()
	{
		return $this->iframe_conversion;
	}

	/**
	 * @return string
	 */
	public function getIframeLead()
	{
		return $this->iframe_lead;
	}

	public static function getSmartlinksList ($affiliate_id, $pagination = null)
	{
		$q = 'SELECT * FROM "' . TBL_AFFILIATE_URL . '" WHERE affiliate_id =  ' . $affiliate_id . ' AND deleted=0';

		$q .= 'ORDER BY id DESC';

		if ($pagination != null)
		{
			$q .= ' LIMIT ' . $pagination->getItemsOnPage() . ' ' .
				'OFFSET ' . $pagination->getOffset();
		}

		$list = DB::getInstance()
			->run($q);

		$smartlinks = [];

		foreach ($list as $k => $row)
		{
			$smartlink = Smartlink::withRow($row);

			$smartlinks[] = $smartlink;
		}

		return $smartlinks;
	}
}