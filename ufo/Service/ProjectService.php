<?php
declare(strict_types=1);

namespace Ufo\Service;

use admin\component\Pagination;
use Illuminate\Database\Eloquent\Collection;
use Ufo\Model\Affiliate;
use Ufo\Model\Project;

final class ProjectService
{
    public function getProjectsCount(): int
    {
       return Project::all()->count();
    }

    /**
     * @param Pagination $pagination
     * @return Collection Collection with Project
     */
    public function getProjectsList(Pagination $pagination = null, int $limit = null): Collection
    {
        if (!empty($pagination)) {
            $limit = $pagination->getItemsOnPage();
            $offset = $pagination->getOffset();
        } else {
            $offset = 0;
            if (empty($limit)) {
                $limit = 50;
            }
        }
        return Project::limit($limit)->offset($offset)->get();
    }

    /**
     * @return Collection Projects Collection
     */
    public function getProjectsForFilter(): Collection
    {
        return Project::select(['id', 'title'])->orderBy('title')->get();
    }
}