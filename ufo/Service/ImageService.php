<?php
declare(strict_types=1);

namespace Ufo\Service;

class ImageService
{
    /**
     * Optimize image
     *
     * https://developers.google.com/speed/docs/insights/OptimizeImages
     * -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace sRGB
     *
     * @access public
     * @param string $filePath Path of the file
     * @throws \ImagickException
     */
    public function optimize(string $filePath): void
    {
        /**
         * Compress image
         */
        $imagick = new \Imagick();
        $rawImage = file_get_contents($filePath);

        $imagick->readImageBlob($rawImage);
        $imagick->stripImage();

        // Define image
        $width = 300;
        $height = 150;

        // Compress image
        $imagick->setImageCompressionQuality(85);

        $imageType = getimagesize($filePath);

        // Get thumbnail image


        // Set image as based its own type
        if ($imageType[2] === IMAGETYPE_JPEG) {
            $imagick->thumbnailImage($width, $height, true);

            $imagick->setImageFormat('jpeg');
            $imagick->setSamplingFactors(array('2x2', '1x1', '1x1'));
            $profiles = $imagick->getImageProfiles("icc", true);
            $imagick->stripImage();
            if (!empty($profiles)) {
                $imagick->profileImage('icc', $profiles['icc']);
            }

            $imagick->setInterlaceScheme(\Imagick::INTERLACE_JPEG);
            $imagick->setColorspace(\Imagick::COLORSPACE_SRGB);
        } else if ($imageType[2] === IMAGETYPE_PNG) {
            $imagick->thumbnailImage($width, $height, true);
            $imagick->setImageFormat('png');
        } else if ($imageType[2] === IMAGETYPE_GIF) {
            foreach($imagick as $frame){
                $frame->scaleImage($width, $height, true);
            }
            $imagick->setImageFormat('gif');
        }

        if($imageType[2] === IMAGETYPE_GIF) {
            $imagick->writeImages($filePath, true);
        } else {
            $imagick->writeImage($filePath);
        }


        // Destroy image from memory
        $imagick->destroy();
    }
}