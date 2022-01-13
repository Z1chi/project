import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useAtom} from "@reatom/react";

import ReactCrop from 'react-image-crop';
import request from '../../../api/request';

import {alertAtom} from "../../../store/Alert";

import 'react-image-crop/src/ReactCrop.scss';
import './avatarEditor.scss'




export const AvatarEditor = ({onClose}) => {

    const [alertData, alertActions] = useAtom(alertAtom);

    const [upImg, setUpImg] = useState();
    const [crop, setCrop] = useState({
        height: 150,
        unit: "px",
        width: 150,
        x: 0,
        y: 0,
        aspect: 1
    });
    const [completedCrop, setCompletedCrop] = useState(null);

    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);


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
                    method: 'POST', data: formData, headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    if (res.exception) {
                        alertActions.open({
                            message: 'Error text',
                            type: 'ALERT/ERROR',
                        })
                    } else {
                        onClose(false)
                        alertActions.open({
                            message: 'Avatar updated',
                            type: 'ALERT/SUCCESS',
                        })
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

            <div className='avatarEditor__file'>
                <input type="file" accept="image/*" onChange={onSelectFile}/>
            </div>
            <ReactCrop

                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
            />
            <div className='avatarEditor__preview'>
                <canvas
                    ref={previewCanvasRef}
                    style={{
                        width: Math.round(completedCrop?.width ?? 0),
                        height: Math.round(completedCrop?.height ?? 0)
                    }}
                />
            </div>

            <button
                className='avatarEditor__updateButton'
                type="button"
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={() =>
                    generateDownload(previewCanvasRef.current, completedCrop)
                }
            >
                Update avatar
            </button>
        </div>

    )
};