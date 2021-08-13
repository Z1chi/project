<?php
namespace app\view;

use system\core\Controller;

class PrivacypolicyView extends Controller
{
	public $overrideActionToIndex = true;

	public function indexAction ()
	{
		$this->pushTemplateData([
		]);
	}
}
