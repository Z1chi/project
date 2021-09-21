<?php

namespace admin\view;

use admin\component\Pagination;
use system\core\AdminController;
use system\exceptions\WrongRouteException;
use Ufo\Model\Project;
use Ufo\Service\ProjectService;

class ProjectView extends AdminController
{
    public function init()
    {

    }

    public function indexAction()
    {
        $pagination = new Pagination();
        $projectService = new ProjectService();

        $projects_count = $projectService->getProjectsCount();
        $pagination->setItemsCount($projects_count);

        $projects = $projectService->getProjectsList($pagination);

        $this->pushTemplateData([
            'PROJECTS' => $projects
        ]);
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
            'PROJECT' => $project
        ]);
    }
}