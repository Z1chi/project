<?php

namespace affiliate\view;

use system\core\AffiliateController;
use Ufo\Model\Affiliate;
use Ufo\Model\ProjectAsset;
use Ufo\ValueObject\ProjectAssetCategory;

class AssetsView extends AffiliateController
{
    private int $affiliateId = 0;
    private int $filterProject = 0;
    private int $filterCategory = 0;

    public function init()
    {
        $this->affiliateId = $_SESSION[SESSION_KEY_CURRENT]['id'];
    }

    public function initFilters()
    {
        $projectId = Affiliate::find($this->affiliateId)->project_id;
        if(!empty($projectId)) {
            $this->filterProject = $projectId;
        }

        if (isset($_GET['category'])) {
            $this->filterCategory = (int) $_GET['category'];
        }
    }

    public function indexAction()
    {
        $this->initFilters();

        $assets = ProjectAsset::when(!empty($this->filterProject), function ($query){
            return $query->where('project_id', $this->filterProject);
        })->when(!empty($this->filterCategory), function ($query){
            return $query->where('category', $this->filterCategory);
        })->get();

        $categories = ProjectAssetCategory::getCategories();

        $this->pushTemplateData([
            'ASSETS' => $assets,
            'FILTER_CATEGORY' => $this->filterCategory,
            'CATEGORIES' => $categories,
        ]);
    }

}