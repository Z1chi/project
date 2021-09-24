<?php

namespace affiliate\view;

use system\core\AffiliateController;

class HelpView extends AffiliateController
{
    public function init()
    {

    }

    public function indexAction()
    {
        $data = [];

        $this->pushTemplateData($data);
    }
}