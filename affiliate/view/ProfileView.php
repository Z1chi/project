<?php

namespace affiliate\view;

use system\core\AffiliateController;

class ProfileView extends AffiliateController
{
    public function init()
    {

    }

    public function indexAction()
    {
        $this->pushTemplateData([
            'TEST' => 'Hello World',
        ]);
    }
}