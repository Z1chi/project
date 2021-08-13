<?php

namespace system;

use App;
use Dotenv\Dotenv;
use system\components\I18N;
use system\components\Url;

/**
 * Class RunApp
 * Application initialization
 * @package system
 */
class RunApp
{
	/**
	 * @var Router
	 */
	private $router;

	private $module;
	private $language;

	/**
     * Application constructor.
     * @throws exceptions\InvalidRouteException
     */
	public function __construct()
	{
		// Declare app instance
		App::$app = $this;

		$this->setConfig();

		if (php_sapi_name() == 'cli') {
			$this->initCli();
		} else {
			$this->initWeb();
		}
	}

	private function setConfig()
	{
		// Read environment variables
		$dotenv = Dotenv::create(ROOT);
		$dotenv->load();

		// Require system config
		require_once CONFIG . '/system.php';
	}

    /**
     * Web application initialization
     * @throws exceptions\InvalidRouteException
     */
	private function initWeb()
	{
		if (in_array(App::getUserGeo(), ['LT', 'EE', 'LV'])) {
			require_once SYSTEM . '/template/service_unavailable.php';
			exit();
		}

		session_set_cookie_params(0, '/', null, PRODUCTION, true);
		session_start();

		$this->router = new Router();

		$routes = unserialize(ROUTES);

		foreach ($routes as $route) {
			if (isset($route['route'])) {
				$this->router->add($route['match'], $route['route']);
			} else {
				$this->router->add($route['match']);
			}
		}

		$this->router->dispatch($_SERVER['REQUEST_URI']);
	}

	/**
	 * Cli initialization
	 */
	private function initCli()
	{
		set_time_limit(0);

		if(!isset($_SERVER['argv'][1])) {
			echo "\nThis script must be run from the command line: ./public/index.php TASK\n\nList of tasks:\n\n";

			$list = scandir(CLI);

			for ($i=2; $i < sizeof($list); $i++) echo str_replace('.php', '', $list[$i]) . "\n";

			die("\n");
		}

		$task = $_SERVER['argv'][1];

		$className = $task;
		$classPath = 'cli\\' . $className;
		$filePath = CLI . '/' . $className . '.php';

		echo $className . PHP_EOL;

		if (!file_exists($filePath)) {
			die("Unknown task" . PHP_EOL);
		}

		$class = new $classPath();
		$class->run();
	}

    /**
     * Set application language
     * @param string $language
     */
    public function setLanguage($language)
    {
        $this->language = $language;
    }

    /**
     * Get application language
     * @return string
     */
    public function getLanguage()
    {
        return $this->language;
    }

    public function getLanguageList()
    {
        $current_language = $this->language;
        $language_list    = array_values(
            array_filter(
                unserialize(LANGUAGES_ARRAY), function ($lang) use ($current_language) {
                    return $lang !== $current_language;
                }
            )
        );

        return $language_list;
    }

    /**
     * Save language to session and cookies
     * @param string $language
     */
    public function saveLanguage($language)
    {
    	if (PRODUCTION) {
    		$host = '.' . $_SERVER['HTTP_HOST'];
		} else {
    		$host = '';
		}

        setcookie('language', $language, time() + (365 * 86400), '/', $host, true);
    }

    public function getReverseLanguage()
	{
		$list = $this->getLanguageList();

		if ($this->getLanguage() == DEFAULT_LANGUAGE) {
			return $list[0];
		} else {
			return DEFAULT_LANGUAGE;
		}
	}

	public function getReverseUrl ()
	{
		$uri = $_SERVER['REQUEST_URI'];
		$new_uri = preg_replace('~/' . $this->getLanguage() . '~', '', $uri);

		return Url::createRaw($new_uri, $this->getReverseLanguage());
	}

    /**
     * Load config depending on module
     * @param string $module
     */
    public function loadModule($module)
    {
    	$this->module = $module;
    	require ROOT . '/config/' . $module . '.php';
    }

    /**
     * @return I18N instance
     */
    public function getI18n()
    {
		require_once MODULE_I18N . '/' . $this->getLanguage() . '.php';
        return I18N::getInstance();
    }

    public function getRouter ()
	{
		return $this->router;
	}

	public function getModuleName ()
	{
		return $this->module;
	}
}