<?php
namespace app\view;

use App;
use app\component\FbHelper;
use Hashids\Hashids;
use system\components\DB;
use system\components\Url;
use system\components\Vars;
use system\core\Controller;

class HomeView extends Controller
{
	public function init()
	{
		$this->setMetaTitle(App::t('app_name'));

        $this->layout = MODULE_LAYOUT . '/promo.php';

        $this->metaTags = [
        	'description' => sprintf(App::t('meta_description'), date('Y'))
		];
	}

	public function indexAction()
    {

	}
}