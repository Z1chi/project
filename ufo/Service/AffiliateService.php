<?php
declare(strict_types=1);

namespace Ufo\Service;

use Ufo\Exception\AffiliateServiceException;
use Ufo\Model\Affiliate;
use Ufo\Model\Project;

final class AffiliateService
{
    public function create(Project $project, array $affiliateParams): Affiliate
    {
        $requiredFields = [
            'first_name',
            'last_name',
            'email',
            //'telegram',
            //'password',
            'user_uid',
        ];
        foreach ($requiredFields as $requiredField) {
            if (!isset($affiliateParams[$requiredField]) || !$affiliateParams[$requiredField]) {
                throw new AffiliateServiceException(sprintf('Missing %s data', $requiredField));
            }
        }

        $affiliate = $this->findByProjectAndUserUid($project, $affiliateParams['user_uid']);
        if (!$affiliate) {
            $affiliate = new Affiliate();
            $affiliate->project_id = $project->id;
            foreach ($affiliateParams as $k => $v) { // todo make validation
                $affiliate->{$k} = $v;
            }
            $affiliate->created = time();
            $affiliate->updated = $affiliate->created;

            $affiliate->save();
            $affiliate->refresh();
        }

        return $affiliate;
    }

    public function getByProjectAndUid(Project $project, string $uid): Affiliate
    {
        return Affiliate::where('project_id', $project->id)->where('user_uid', $uid)->first();
    }

    public function findByProjectAndUid(Project $project, string $uid): ?Affiliate
    {
        return Affiliate::where('project_id', $project->id)->where('user_uid', $uid)->first();
    }

    public function findByProjectAndUserUid(Project $project, string $uid): ?Affiliate
    {
        return Affiliate::where('project_id', $project->id)->where('user_uid', $uid)->first();
    }
}
