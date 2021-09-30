<?php

namespace admin\view;

use phpDocumentor\Reflection\Types\Void_;
use PHPUnit\Exception;
use system\components\Upload;
use system\components\Util;
use system\core\AdminController;
use Ufo\Model\ProjectAsset;
use Ufo\Service\ProjectService;
use Ufo\ValueObject\ProjectAssetCategory;
use FFMpeg\FFMpeg;
use FFMpeg\Coordinate\TimeCode;

class AssetsView extends AdminController
{
    public function indexAction(): void
    {
        $projects = (new ProjectService())->getProjectsForFilter();
        $categories = ProjectAssetCategory::getCategories();

        $assets = ProjectAsset::with('project')->get();

        $this->pushTemplateData([
            'PROJECTS' => $projects,
            'CATEGORIES' => $categories,
            'ASSETS' => $assets,
        ]);
    }

    public function ajaxCreate(): void
    {
        $fileName = $_FILES['file']['tmp_name'];
        if(empty($fileName)) {
            $this->jsonErrorMsg('File is not uploaded');
        }

        $category = $_POST['category'];
        $preview = '';
        $uploadDir = ROOT . '/public/upload/';

        $data = [
            'category' => $_POST['category'],
            'project_id' => (int)Util::sanitize($_POST['projectId']),
        ];
        try {
            switch ($category) {
                case ProjectAssetCategory::VIDEO:
                    $ffmpeg = FFMpeg::create([
                        'ffmpeg.binaries' => '/usr/bin/ffmpeg',
                        'ffprobe.binaries' => '/usr/bin/ffprobe'
                    ]);
                    $video = $ffmpeg->open($fileName);

                    $newPreviewName = md5(microtime()) . '.jpg';
                    $newPreviewPath = $uploadDir . $newPreviewName;
                    $video->frame(TimeCode::fromSeconds(0.1))->save($newPreviewPath);

                    $newFileName = md5(microtime()) . '.'.explode('/', $_FILES['file']['type'])[1];
                    $newFilePath = $uploadDir . $newFileName;
                    if(!move_uploaded_file($fileName, $newFilePath)) {
                        $this->jsonErrorMsg('Upload failed: '. ProjectAssetCategory::getCategories()[$category]);
                    }

                    $data['preview'] = '/upload/'.$newPreviewName;
                    $data['file'] = '/upload/'.$newFileName;
                    break;
                case ProjectAssetCategory::BANNER:

                    $newPreviewName = Upload::ajaxUploadImage($fileName, null, $uploadDir);
                    $data['file'] = '/upload/' . $newPreviewName . '.jpg';
                    $data['preview'] = '/upload/' . $newPreviewName . '.jpg';
                    break;
                case ProjectAssetCategory::ANIMATED:
                    $newFileName = md5(microtime()) . '.'.explode("/", $_FILES['file']['type'])[1];
                    $newFilePath = $uploadDir . $newFileName;
                    if(!move_uploaded_file($fileName, $newFilePath)) {
                        $this->jsonErrorMsg('Upload failed: '. ProjectAssetCategory::getCategories()[$category]);
                    }

                    $data['file'] = '/upload/' . $newFileName;
                    $data['preview'] = '/upload/' . $newFileName;
                    break;
                case ProjectAssetCategory::LANDING:
                case ProjectAssetCategory::ARCHIVE:
                    $previewName = $_FILES['preview']['tmp_name'];
                    $newPreviewName = Upload::ajaxUploadImage($previewName, null, $uploadDir);

                    $newFileName = md5(microtime()) . explode(".", $_POST['file']['name'])[1];
                    $newFilePath = $uploadDir . $newFileName;
                    if(!move_uploaded_file($_FILES['file']['tmp_name'], $newFilePath)) {
                        $this->jsonErrorMsg('Upload failed: '. ProjectAssetCategory::getCategories()[$category]);
                    }

                    $data['file'] = '/upload/'.$newFileName.'.jpg';
                    $data['preview'] = '/upload/' . $newPreviewName . '.jpg';
                    break;
            }
        } catch (\ImagickException $e) {
            $this->jsonErrorMsg($e->getMessage());
        }
        $projectAsset = new ProjectAsset($data);
        try {
            $isSaved = $projectAsset->save();
        } catch (\Exception $e) {

        }
        if($isSaved) {
            $this->jsonSuccess();
        } else {
            $this->jsonErrorMsg("Asset not saved");
        }
    }

    public function ajaxUpdate()
    {

    }

    public function ajaxDelete()
    {

    }

}