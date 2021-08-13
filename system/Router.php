<?php

namespace system;

use admin\model\Admin;
use affiliate\model\Affiliate;
use App;
use app\controller\UserSession;
use system\components\Url;
use system\components\Vars;
use system\core\Controller;
use system\exceptions\InvalidRouteException;
use system\exceptions\WrongRouteException;

/**
 * Class Router
 * Parses the request URL into controller, action, and parameters.
 * @package system
 */
class Router
{
    /**
     * Routes tables
     * @var array $routes [match, route[]]
     */
    private $routes = [];

    /**
     * Current route
     * @var array $route [controller, action, params]
     */
    protected $route = [];

    /**
     * Is it the AJAX request
     * @var bool
     */
    private $isAjax = false;

    /**
     * Add new route to routes table
     * @param string $regexp regexp of route
     * @param array $route route ([controller, action, params])
     */
    public function add($regexp, $route = [])
    {
        $this->routes[$regexp] = $route;
    }

    /**
     * Return routes table
     * @return array
     */
    public function getRoutes()
    {
        return $this->routes;
    }

    /**
     * Return current route (controller, action, [params])
     * @return array
     */
    public function getRoute()
    {
        return $this->route;
    }

    /**
     * Find URL in routes table
     * @param string $url
     * @return array $route
     */
    public function matchRoute($url)
    {
        $route = [];
        foreach ($this->routes as $pattern => $route) {
            if (preg_match("#$pattern#i", $url, $matches)) {
                foreach ($matches as $k => $v) {
                    if (is_string($k) && !(isset($route[$k]))) {
                        $route[$k] = $v;
                    }
                }
                if (!isset($route['viewcontroller'])) {
                    $route['viewcontroller'] = 'home';
                }
                if (!isset($route['action'])) {
                    $route['action'] = 'index';
                }

                if (!isset($route['language']) && !isset($route['module']) && self::isAjax() === false) {
                    $location = '/' . self::getSavedLanguage();

                    if ($_SERVER['QUERY_STRING'] != '') {
                    	$location .= '/?' . $_SERVER['QUERY_STRING'];
					}

                    header("Location: {$location}");
                    exit();
                }
                break;
            }
        }
        return $route;
    }

    /**
     * @param $controller
     * @param $route
     * @return Controller
     */
    private function getControllerObj($controller, $route)
    {
        return new $controller($route);
    }

    /**
     * Redirect URL to correct route
     * @param $url
     * @throws InvalidRouteException
     */
    public function dispatch($url)
    {
        try {
            $this->isAjax = self::isAjax();
            $url = self::removeQueryString($url);
            $this->route = self::matchRoute($url);

            if (empty($this->route)) {
                throw new WrongRouteException();
            }

            self::setAppModule(isset($this->route['module']) ? $this->route['module'] : APP_MODULE_NAME);
            self::setAppLanguage();

            $viewcontroller
				= MODULE_NAME . '\view\\' . self::upperCamelCase($this->route['viewcontroller']) . 'View';

            if (!class_exists($viewcontroller)) {
            	throw new WrongRouteException();
			}

            $cObj = self::getControllerObj($viewcontroller, $this->route);

			if ($cObj->overrideActionToIndex)
			{
				$this->route['action'] = 'index';
				$cObj->view = 'index';
			}

            if ($this->isAjax) {
                $action = 'ajax' . self::upperCamelCase($this->route['action']);
            } else {
                $action = self::lowerCamelCase($this->route['action']) . 'Action';
            }

            $layout_data = [
				'CONTROLLER' => $this->route['viewcontroller'],
				'LANGUAGE' => App::getLanguage(),
			];

			// TODO: standalone Admin/App controllers

            // APP module conditions

            if (MODULE_NAME == APP_MODULE_NAME)
            {
				// todo: refactor
				$mtime_css = filemtime(ROOT . '/public/assets/css/bundle.css');
				$mtime_js = filemtime(ROOT . '/public/assets/js/bundle.js');

				$cObj->pushLayoutData([
					'MTIME_CSS' => $mtime_css,
					'MTIME_JS' => $mtime_js
				]);

				$mob = new \Mobile_Detect();

				if (!UserSession::isSigned() && $cObj->authorizationRequired == true) {
					$cObj->redirectToPath('/?signin=1');
				}
			}

			// ADMIN module conditions

			if (MODULE_NAME == ADMIN_MODULE_NAME)
			{
				if (!Admin::isSigned() && $this->route['viewcontroller'] != 'home') {

					if ($this->isAjax) {
						$cObj->jsonErrorMsg('Authorization required');
					} else {
						$cObj->redirectToPath();
					}

				}
			}

			// AFFILIATE module conditions

			if (MODULE_NAME == AFFILIATE_MODULE_NAME)
			{
				if (!Affiliate::isSigned() && $this->route['viewcontroller'] != 'home') {

					if ($this->isAjax) {
						$cObj->jsonErrorMsg('Authorization required');
					} else {
						$cObj->redirectToPath();
					}

				}
			}

			$cObj->pushLayoutData($layout_data);

			if (!method_exists($cObj, $action)) {
				throw new WrongRouteException();
			}

			if (method_exists($cObj, 'init')) {
				$cObj->init();
			}

            $cObj->beforeAction($this->isAjax);
            $cObj->$action();

            if (!$this->isAjax)
            {
                $cObj->showTemplate();
                $cObj->afterAction();
            }

        } catch (WrongRouteException $e) {
            http_response_code(404);
            require_once SYSTEM . '/template/404.php';
            exit();
        }
    }

    /**
     * Transform name to CamelCase
     * @param string $name string for transformation
     * @return string
     */
    private function upperCamelCase($name)
    {
        return str_replace(' ', '', ucwords(str_replace('-', ' ', $name)));
    }

    /**
     * Transform name to camelCase
     *
     * @param string $name for transformation
     * @return string
     */
    private function lowerCamelCase($name)
    {
        return lcfirst(self::upperCamelCase($name));
    }

    /**
     * Return URL without GET params
     * @param string $url request URL
     * @return string
     */
    private function removeQueryString($url)
    {
        if ($url) {
            $url = trim($url, '/');
            $params = explode('?', $url, 2);
            return rtrim($params[0], '/');
        }
        return $url;
    }

    /**
     * Check request type for AJAX
     * @return bool
     */
    private function isAjax()
    {
        if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
            return true;
        else
            return false;
    }

    /**
     * Set Application language
     * If user changed language in URL - save new language in user session and cookie
     */
    private function setAppLanguage()
    {
        $saved_language = self::getSavedLanguage();

        if (isset($this->route['language']) && $saved_language != $this->route['language']) {
            App::$app->setLanguage($this->route['language']);
            App::$app->saveLanguage($this->route['language']);
        } else {
            App::$app->setLanguage($saved_language);
        }
    }

    /**
     * Get user priority language
     * Check if user has saved language in session or cookie
     * If user has not saved language - check user system language, or use default language
     * @return string
     */
    private function getSavedLanguage()
    {
        if (isset($_COOKIE['language']) && in_array($_COOKIE['language'], unserialize(LANGUAGES_ARRAY))) {
            $language = $_COOKIE['language'];
        } else {
            $language = self::getUserSystemLanguage();
            App::$app->saveLanguage($language);
        }
        return $language;
    }

    private static function getUserSystemLanguage()
    {
        if (!isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
            return DEFAULT_LANGUAGE;
        }

        $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

        $list = unserialize(LANGUAGES_ARRAY);

        if (in_array($lang, $list)) {
        	$language = $lang;
		} else {
			$language = DEFAULT_LANGUAGE;
		}

        return $language;
    }

    /**
     * Set application module
     * @param $module
     */
    private static function setAppModule($module)
    {
        App::$app->loadModule($module);
    }
}