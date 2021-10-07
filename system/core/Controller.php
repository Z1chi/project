<?php

namespace system\core;

use App;
use app\controller\Affiliate;
use system\components\Url;
use Ufo\Service\DatabaseService;

define('JSON_SUCCESS', 'success');
define('JSON_ERROR', 'error');

/**
 * Class Controller
 * @package system\Controller
 */
abstract class Controller
{

    /**
     * Current route (controller, action, params)
     * @var array
     */
    public $route = [];

    /**
     * Layout
     * @var
     */
    public $layout;

    /**
     * View
     * @var
     */
    public $view;

	/**
	 * Controller
	 * @var
	 */
	public $controller;

    /**
     * @var string the page title
     */
    public $title;

	/**
	 * @var array the registered meta tags
	 */
	public $metaTags = [];

	/**
	 * @var array the registered meta tags
	 */
	public $customHeaders = [];

    /**
     * Data transferred to the any views.
     * @var array $layoutData
     */
    public $layoutData = [];

    /**
     * Data transferred to the views
     * @var array
     */
    public $templateData = [];

	/**
	 * Overrides action call to indexAction() method
	 * @var bool
	 */
	public $overrideActionToIndex = false;

	/**
	 * Is controller only for authorized users?
	 * Not used in Admin module.
	 *
	 * TODO: move routing conditions to app/admin controller
	 *
	 * @var bool
	 */
	public $authorizationRequired = false;

	public function __construct($route)
    {
        $this->route = $route;
        $this->view = $route['action'];
        $this->viewcontroller = $route['viewcontroller'];

        Affiliate::parseAffiliateUrl();

        (new DatabaseService())->initEloquent();
    }

    public function setTemplate($name)
	{
		$this->view = $name;
	}

    public function showTemplate()
    {
        $vObj = new View($this->route, $this->layout, $this->view, $this->title, $this->metaTags, $this->customHeaders);
        $vObj->render(array_merge($this->layoutData, $this->templateData));
    }

    private function jsonStatus($result, $message = '', $data = [])
    {
        $json = [];

        $json['result'] = $result;

        if ($message != '') $json['message'] = $message;
        if (!empty($data)) $json['data'] = $data;

        echo json_encode($json);

        exit;
    }

    public function jsonErrorMsg($message = '', $data = [])
    {
        self::jsonStatus(JSON_ERROR, $message, $data);
    }

    public function jsonSuccessMsg($message = '', $data = [])
    {
        self::jsonStatus(JSON_SUCCESS, $message, $data);
    }

    public function jsonErrorData($data = [])
    {
        self::jsonStatus(JSON_ERROR, '', $data);
    }

    public function jsonSuccessData($data = [])
    {
        self::jsonStatus(JSON_SUCCESS, '', $data);
    }

    public function jsonError()
    {
        self::jsonStatus(JSON_ERROR);
    }

    public function jsonSuccess()
    {
        self::jsonStatus(JSON_SUCCESS);
    }

    public function redirectToPath($path = null)
    {
        $url = Url::createRaw($path);
        head("Location: {$url}");
        exit();
    }

    public function beforeAction($is_ajax)
    {

    }

    public function afterAction()
    {

    }

	/**
	 * Set $data for current template. May be used from any controller, any action
	 * @param array $data
	 */
	public function pushTemplateData($data)
	{
		$this->templateData = array_merge($this->templateData, $data);
	}

    /**
     * Set $data for layout. May be used from any controller, any action
     * @param array $data
     */
    public function pushLayoutData($data)
    {
        $this->layoutData = array_merge($this->layoutData, $data);
    }

	public function show404 ()
	{
		header('HTTP/1.0 404 Not Found');
		$this->layout = SYSTEM . '/template/404.php';
		$this->showTemplate();
		exit();
	}

	public function setMetaTitle ($string)
	{
		$this->title = $string . ' | ' . APP_PUBLIC_NAME;
	}

	public function pushCustomHeader ($string)
	{
		$this->customHeaders[] = $string;
	}

	public function check2FA ()
	{
		if (!App::is2FApassed()) {
			$this->redirectToPath('/auth');
			exit;
		}
	}
}