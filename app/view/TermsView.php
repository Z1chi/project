<?php
namespace app\view;

use system\core\Controller;

class TermsView extends Controller
{
	public $overrideActionToIndex = true;

	public function indexAction ()
	{
		$this->pushTemplateData([
		]);
	}
}
