<?php

namespace affiliate\view;


use system\core\AffiliateController;
use system\exceptions\WrongRouteException;
use Ufo\Model\Project;

class ProjectView extends AffiliateController
{
	public $authorizationRequired = true;

	public function init()
	{

	}

	public function indexAction()
	{
		$data = [];

		$this->pushTemplateData($data);
	}
}