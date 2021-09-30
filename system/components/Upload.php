<?php

namespace system\components;

use system\exceptions\RequestException;

class Upload
{
    /**
     * @param $current_path
     * @param null $image_name
     * @param string $path_to_save
     * @return null|string
     * @throws RequestException
     */
    public static function ajaxUploadImage($current_path, $image_name = null, $path_to_save = UPLOAD_DIR . '/temp')
    {
        if (empty($current_path)) {
            throw new RequestException();
        }

        if ($image_name == null) {
            $image_name = md5(microtime());
        }

        try {
            $imagick = new \Imagick($current_path);

            $imagick->setImageFormat('jpg');
            $imagick->setImageCompression(\Imagick::COMPRESSION_JPEG);
            $imagick->setCompressionQuality(100);
            $imagick->setInterlaceScheme(\Imagick::INTERLACE_JPEG);
            $imagick->writeImage($path_to_save . '/' . $image_name . '.jpg');
            $imagick->clear();
            $imagick->destroy();

            return $image_name;

        } catch (\ImagickException $e) {
            console($e->getMessage(), 'Imagick exception');
            throw new RequestException();
        }
    }

    /**
     * @param $image_name
     * @param $old_path
     * @param $new_path
     * @param string $ext
     */
    public static function moveFile($image_name, $old_path, $new_path, $ext = 'jpg')
    {
        $old_path = "$old_path/$image_name.$ext";
        $new_path = "$new_path/$image_name.$ext";

        console($old_path);
        console($new_path);

        rename($old_path, $new_path);
    }

    public static function uploadGIF($current_path, $image_name = null, $path_to_save = UPLOAD_DIR . '/temp')
    {
        if (empty($current_path)) {
            throw new RequestException();
        }

        if ($image_name == null) {
            $image_name = md5(microtime());
        }

        $imagick = new \Imagick($current_path);


        $imagick->setImageFormat('gif');
        $imagick->writeImage($path_to_save . '/' . $image_name . '.gif');


        $imagick->clear();
        $imagick->destroy();

        return $image_name;
    }
}