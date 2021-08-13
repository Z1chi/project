<?php

namespace system\core;

class Template
{
	public $src;
	private $html;
	private $params;

	public function __construct ($template, $params = array())
	{
		$this->src = $template;
		$this->params = $params;
	}

	public function init ($params = array()) {

		$params = array_merge($params, $this->params);
		
		if (is_array($params)) {
			foreach ($params as $k => $r) {
				$$k = $r;
			}
		}

		ob_start();
		require($this->src);
		$template = ob_get_clean();

		$this->html = $template;

	}

	public function render () {
		return $this->html;
	}
	
	public function renderEcho () {
		echo $this->render();
	}

	public function setSource ($source) {
		$this->src = $source;
	}

}
