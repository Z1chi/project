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

    public function viewAction()
    {
        $project_id = explode('/', $_SERVER['REQUEST_URI'])[3] ?? null;
        if(empty($project_id) || !is_numeric($project_id)) {
            throw new WrongRouteException();
        }

        $project = Project::find($project_id);

        if(empty($project)) {
            throw new WrongRouteException("No such offer");
        }

        $this->pushTemplateData([
            'TEST' => $project
        ]);
    }
}