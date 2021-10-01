<?php
declare(strict_types=1);

namespace Ufo\Service;


use FFMpeg\Coordinate\TimeCode;
use FFMpeg\FFMpeg;
use Ufo\ValueObject\ProjectAssetCategory;

class ProjectAssetService
{
    public function uploadVideoWithPreview($fileTmpPath, $uploadPath): array
    {
        $result = [];
        $ffmpeg = FFMpeg::create([
            'ffmpeg.binaries' => '/usr/bin/ffmpeg',
            'ffprobe.binaries' => '/usr/bin/ffprobe'
        ]);
        $video = $ffmpeg->open($fileTmpPath);

        $newPreviewName = md5(microtime()) . '.jpg';
        $newPreviewPath = $uploadPath . $newPreviewName;
        $video->frame(TimeCode::fromSeconds(1))->save($newPreviewPath);

        $newFileName = md5(microtime()) . '.' . explode('/', $_FILES['file']['type'])[1];
        $newFilePath = $uploadPath . $newFileName;
        if(move_uploaded_file($fileTmpPath, $newFilePath)) {
            $result = [
                'file' => $newFileName,
                'preview' => $newPreviewName,
            ];
        }

        return $result;
    }
}