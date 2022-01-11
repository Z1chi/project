import React, {useCallback, useEffect, useRef, useState} from 'react';

import ReactCrop from 'react-image-crop';
import request from '../../../api/request';

import 'react-image-crop/src/ReactCrop.scss';


export const AvatarEditor = () => {

    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({
        height: 150,
        unit: "px",
        width: 150,
        x: 0,
        y: 0,
        aspect: 1
    });
    const [completedCrop, setCompletedCrop] = useState(null);

    async function generateDownload(canvas, crop) {

        if (!crop || !canvas) {
            return;
        }

        await canvas.toBlob((blob) => {

                const file = new File([blob], "avatar.jpg", {type: "image/jpeg", lastModified: new Date().getTime()});

                let formData = new FormData();
                formData.append("img", file);
                formData.append("_method", "PATCH");
                request('profile/update-img', {
                    method: 'POST', data :formData, headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            },
            'image/png',
            1
        );
    }


    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );
    }, [completedCrop]);


    return (
        <div className='avatarEditor'>

            <div>
                <input type="file" accept="image/*" onChange={onSelectFile}/>
            </div>
            <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
            />
            <div>
                <canvas
                    ref={previewCanvasRef}
                    style={{
                        width: Math.round(completedCrop?.width ?? 0),
                        height: Math.round(completedCrop?.height ?? 0)
                    }}
                />
            </div>

            <button
                type="button"
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={() =>
                    generateDownload(previewCanvasRef.current, completedCrop)
                }
            >
                Download cropped image
            </button>
        </div>

    )
};