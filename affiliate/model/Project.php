<?php

namespace affiliate\model;

use affiliate\component\Logger;
use system\components\DB;
use system\core\Model;
use system\exceptions\RequestException;

class Project extends Model
{
    private $id;
    private $title;
    private $token;
    private $created_at;
    private $updated_at;
    private $accessed_at;


    public static function withRow($row)
    {
        $instance = new self();
        $instance->fill($row);
        return $instance;
    }

    private function fill(array $row)
    {
        $this->id = $row['id'];
        $this->title = $row['title'];
        $this->token = $row['token'];
        $this->created_at = $row['created_at'];
        $this->updated_at = $row['updated_at'];
        $this->accessed_at = $row['accessed_at'];
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

    /**
     * @return mixed
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @return mixed
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * @return mixed
     */
    public function getAccessedAt()
    {
        return $this->accessed_at;
    }


    public static function getProjects()
    {
        $q = 'SELECT * FROM project';
        $q .= ' ORDER BY id DESC;';

        $list = DB::getInstance()
            ->run($q);

        $projects = [];

        if (!empty($list)) {
            foreach ($list as $row) {
                $projects[] = Project::withRow($row);
            }
        }

        return $projects;
    }


}