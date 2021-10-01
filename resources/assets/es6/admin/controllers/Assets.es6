import {Controller} from "../../core/Controller";
import $ from "jquery";
import {Util} from "../../lib/Util";

export class Assets extends Controller {
    init() {
        super.init();

        super.initFilters();
        this.initCreate();
        this.initAssets();
    }

    validateForm() {
        const $createForm = $('.js_asset_create_form');
        const file = $createForm.find('#file');

        let isValid = true;
        if (file.val().length === 0) {
            if (file.siblings('.error').length === 0) {
                const error = $('<label for="file" class="error">Choose file</label>');
                file.after(error);
            }
            isValid = false;
        } else {
            file.siblings('.error').remove();
        }

        const category = $createForm.find('#category').val()
        const preview = $createForm.find('#preview')
        if (["4", "5"].includes(category) && preview.val().length === 0) {
            if (preview.siblings('.error').length === 0) {
                const error = $('<label for="preview" class="error">Choose preview</label>');
                preview.after(error);
            }
            isValid = false;
        } else if (["4", "5"].includes(category) && preview.val().length !== 0
            || !["4", "5"].includes(category)) {
            preview.siblings('.error').remove();
        }
        return isValid;
    }

    initCreate() {
        const $createForm = $('.js_asset_create_form');

        $createForm.on('submit', (event) => {
            event.preventDefault();
            if (this.validateForm()) {
                Util.ajax({
                        url: this.url('/assets/create'),
                        data: new FormData($createForm[0]),
                        processData: false,
                        contentType: false
                    },
                    response => {
                        if (response.result === 'success') {
                            Util.reload();
                        }
                    });
            }
        });

        /**
         * show preview input only on LANDING and ARCHIVE categories
         * @see Ufo\ValueObject\ProjectAssetCategory
         */
        $createForm.find('#category').on('change', function () {
            let previewFormGroup = $('#preview').parent();
            $('#preview').siblings('.error').remove();
            if (["4", "5"].includes($(this).val())) {
                previewFormGroup.removeClass('hidden');
            } else {
                previewFormGroup.addClass('hidden');
            }
        })

        $createForm.find('#preview, #file').on('change', function () {
            $(this).siblings('.error').remove();
        });
    }

    initAssets() {
        const assets = $('.asset-block');
        assets.find('.delete-icon').on('click', (event) => {
            const assetId = $(event.currentTarget).data('assetid');
            Util.ajax({
                    url: this.url('/assets/delete'),
                    data: {id: assetId}
                },
                response => {
                    if (response.result === 'success') {
                        $(event.currentTarget).parent().remove();
                    }
                });
        })
    }
}