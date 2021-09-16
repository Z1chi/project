<?php
declare(strict_types=1);

namespace Ufo\Service;

use Ufo\Model\Project;

final class ProjectService
{
    /**
     * @return Project []
     */
    public function getProjectsForFilter(): array
    {
        $projectsCollection = Project::get(['id', 'title']);
        $projects = [];

        $projectsCollection->each(function ($project) use (&$projects){
            $projects[] = $project;
        });

        return $projects;
    }
}