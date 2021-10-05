<?php

namespace admin\view;

use system\components\Upload;
use system\components\Util;
use system\core\AdminController;
use Ufo\Model\ProjectAsset;
use Ufo\Service\ImageService;
use Ufo\Service\ProjectService;
use Ufo\ValueObject\ProjectAssetCategory;

class AssetsView extends AdminController
{
    private int $filterProject = 0;
    private int $filterCategory = 0;

    public function initFilters()
    {
        if (isset($_GET['project'])) {
            $this->filterProject = (int)$_GET['project'];
        }

        if (isset($_GET['category'])) {
            $this->filterCategory = (int)$_GET['category'];
        }
    }

    public function indexAction(): void
    {
        $this->setMetaTitle('Project assets');
        $this->initFilters();
        $projects = (new ProjectService())->getProjectsForFilter();

        $categories = ProjectAssetCategory::getCategories();

        $assets =
            ProjectAsset::with('project')
                ->when(!empty($this->filterCategory), function ($query) {
                    return $query->where('category_id', $this->filterCategory);
                })
                ->when(!empty($this->filterProject), function ($query) {
                    return $query->where('project_id', $this->filterProject);
                })->get();

        $this->pushTemplateData([
            'PROJECTS' => $projects,
            'CATEGORIES' => $categories,
            'ASSETS' => $assets,
            'FILTER_PROJECT' => $this->filterProject,
            'FILTER_CATEGORY' => $this->filterCategory,
        ]);
    }

    public function ajaxCreate(): void
    {
        $fileName = $_FILES['file']['tmp_name'];
        if (empty($fileName)) {
            $this->jsonErrorMsg('File is not uploaded');
        }

        $category = $_POST['category'];
        $uploadDir = ROOT . '/public/upload/';

        $data = [
            'category_id' => $_POST['category'],
            'project_id' => (int)Util::sanitize($_POST['projectId']),
        ];
        $newFileNames = [];

        try {
            switch ($category) {
                case ProjectAssetCategory::BANNER:
                    $newFileNames['file'] = Upload::ajaxUploadImage($fileName, null, $uploadDir) . '.jpg';
                    $newFileNames['preview'] = Upload::ajaxUploadImage($fileName, null, $uploadDir) . '.jpg';
                    break;
                case ProjectAssetCategory::ANIMATED:
                    $newFileNames['file'] = Upload::uploadGif($fileName, $uploadDir).'.gif';
                    $newFileNames['preview'] = Upload::uploadGif($fileName, $uploadDir).'.gif';
                    break;
                case ProjectAssetCategory::LANDING:
                case ProjectAssetCategory::ARCHIVE:
                case ProjectAssetCategory::VIDEO:
                    $previewName = $_FILES['preview']['tmp_name'];
                    $newFileNames['preview'] = Upload::ajaxUploadImage($previewName, null, $uploadDir) . '.jpg';

                    $newFileNames['file'] = md5(microtime()) . '.' . explode(".", $_FILES['file']['name'])[1];
                    $newFilePath = $uploadDir . $newFileNames['file'];
                    if (!move_uploaded_file($_FILES['file']['tmp_name'], $newFilePath)) {
                        $this->jsonErrorMsg('Upload failed: ' . ProjectAssetCategory::getCategories()[$category]);
                    }
                    break;
            }

            (new ImageService())->optimize($uploadDir.$newFileNames['preview']);
        } catch (\ImagickException $e) {
            $this->jsonErrorMsg('Category: '.ProjectAssetCategory::getCategories()[$category].'. ImagickError: '. $e->getMessage());
        } catch (\Exception $e) {
            $this->jsonErrorMsg('Category: '.ProjectAssetCategory::getCategories()[$category].'. Message:'.$e->getMessage());
        }

        $data['file'] = '/upload/' . $newFileNames['file'];
        $data['preview_src'] = '/upload/' . $newFileNames['preview'] ;

        $projectAsset = new ProjectAsset($data);
        $isSaved = $projectAsset->save();

        if ($isSaved) {
            $this->jsonSuccess();
        } else {
            $this->jsonErrorMsg("Asset not saved");
        }
    }

    public function ajaxDelete(): void
    {
        $id = (int)Util::sanitize($_POST['id']);
        $asset = ProjectAsset::find($id);

        if (!empty($asset)) {
            $filePath = $asset->file;
            $previewPath = $asset->preview;
            if ($asset->delete()) {
                $filePath = ROOT . '/public' . $filePath;
                unlink($filePath);
                if (!empty($previewPath)) {
                    $previewPath = ROOT . '/public' . $previewPath;
                    unlink($previewPath);
                }

                $this->jsonSuccess();
            } else {
                $this->jsonErrorMsg("Asset not deleted");
            }
        } else {
            $this->jsonErrorMsg("No such asset");
        }
    }

}