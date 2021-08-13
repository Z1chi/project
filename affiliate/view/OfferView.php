<?php

namespace affiliate\view;


use system\core\AffiliateController;

class OfferView extends AffiliateController
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