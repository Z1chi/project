<?php

namespace system\core;


/**
 * Class View
 * @package system\core
 */
class View {

	/**
	 * Current route (view controller, action, params)
	 * @var array
	 */
	public $route = [];

	/**
	 * Current layout
	 * @var string
	 */
	public $layout;

	/**
	 * Current view
	 * @var string
	 */
	public $view;

    /**
     * @var string the page title
     */
	public $title;


    /**
     * @var array the registered headers
     */
	public $headers = [];

	public function __construct($route, $layout = '', $view = '', $title = '', $meta_tags = false, $custom_headers = false)
	{
		$this->route = $route;
		if ($layout === false) {
			$this->layout = false;
		} else {
			$this->layout = $layout ?: MODULE_LAYOUT . '/' . DEFAULT_LAYOUT_FILE;
		}
		$this->view = $view;
        $this->title = $title;

        $this->headers = $this->processMetaTags($meta_tags);

        foreach ($custom_headers as $header) {
			$this->headers .= $header;
		}
	}

	public function render($data)
	{
        if (is_array($data)) extract($data);

		$file_view = MODULE_TEMPLATE . "/{$this->route['viewcontroller']}/{$this->view}.php";

		ob_start();
		if (is_file($file_view)){
			require $file_view;
		} else {
			debug("View not found $file_view");
		}
		$content = ob_get_clean();

		if ($this->layout !== false) {
			$file_layout = $this->layout;
			if (is_file($file_layout)) {
				require $file_layout;
			} else {
				debug("Template not found $file_layout");
			}
		} else{
			echo $content;
		}
	}

	public function processMetaTags($tags)
    {

    	if (!$tags || !is_array($tags)) {
    		return false;
		}

        $metaTags = '';
        foreach ($tags as $name => $content) {
            $metaTags .= $this->generateMetaTag($name, $content);
        }
        return $metaTags;
    }

    private function generateMetaTag($name, $content)
    {
        return "<meta name=\"{$name}\" content=\"{$content}\">\n";
    }
}