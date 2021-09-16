<?php

namespace affiliate\view;


use admin\component\Pagination;
use affiliate\collection\LogactionCollection;
use affiliate\model\Offer;
use affiliate\model\Smartlink;
use app\controller\Affiliate;
use system\core\AffiliateController;
use Ufo\Service\ProjectService;

class ActionlogView extends AffiliateController
{
	public $authorizationRequired = true;

	/**
	 * @var Pagination
	 */
	private $pagination;
	private $affiliate_id;

	/**
	 * @var int
	 */
	private $filter_action = null;
	/**
	 * @var int
	 */
	private $filter_smartlink = null;
    /**
     * @var int
     */
    private $filterOffer = null;

    public function init()
	{
		$this->affiliate_id = $_SESSION[SESSION_KEY_CURRENT]['id'];
	}

	public function indexAction()
	{
		$this->showList();
	}

	public function showList ()
	{
		$this->initFilters();

		$this->pagination = new Pagination(50);

		$leads_count = LogactionCollection::getActionsCount($this->affiliate_id);
		$this->pagination->setItemsCount($leads_count);

		$leads = LogactionCollection::getList($this->affiliate_id, $this->collectFilters(), $this->pagination);

		$pages = $this->pagination->getPaginationHtml(MODULE_TEMPLATE . '/pagination.php');
		$this->pushTemplateData([
			'LIST' => $leads,
			'PAGES' => $pages,
			'ACTION_TYPES' => self::getAffiliateActionsStrings(),
			'SMARTLINKS' => Smartlink::getSmartlinksList($this->affiliate_id),
			'FILTER_ACTION' => $this->filter_action,
			'FILTER_SMARTLINK_ID' => $this->filter_smartlink,
			'FILTER_OFFER_ID' => $this->filterOffer,
            'OFFERS' => (new ProjectService())->getProjectsForFilter()
		]);
	}

	public function initFilters ()
	{
		if (isset($_GET['action'])) {
			$this->filter_action = (int) $_GET['action'];
		}

		if (isset($_GET['smartlink'])) {
			$this->filter_smartlink = (int) $_GET['smartlink'];
		}

        if (isset($_GET['offer'])) {
            $this->filterOffer = (int) $_GET['offer'];
        }
	}

	public function collectFilters ()
	{
		$filters = [
			'action' => $this->filter_action,
			'smartlink' => $this->filter_smartlink,
			'offer' => $this->filterOffer,
		];

		return $filters;
	}

	public static function getAffiliateActionsStrings ()
	{
		$list = [
			Affiliate::ACTION_CLICK => 'Click',
			Affiliate::ACTION_SIGNUP => 'Signup',
			Affiliate::ACTION_DEPOSIT => 'Deposit'
		];

		return $list;
	}
}