<?php

namespace affiliate\model;

use affiliate\component\Logger;
use system\components\DB;
use system\core\Model;
use system\exceptions\RequestException;

class Offer extends Model
{
    private $id;
    private $title;

    public static function withRow ($row)
    {
        $instance = new self();
        $instance->fill($row);
        return $instance;
    }

    private function fill( array $row )
    {
        $this->id = $row['id'];
        $this->title = $row['title'];
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    public static function getOffers(): array
    {

        $q = "SELECT * FROM project ORDER BY id";

        $list = DB::getInstance()
			->run($q);

        $offers = [];

        if(!empty($list)) {
            foreach ($list as $row) {
               $offers[] = Offer::withRow($row);
            }
        }

        return $offers;
    }

}