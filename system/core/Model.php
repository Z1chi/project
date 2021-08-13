<?php

namespace system\core;

abstract class Model
{
	/**
	 * The table associated with the model
	 *
	 * @var string
	 */
	private static $table;

	public function __set($property, $value)
	{
		$this->$property = $value;
	}

	public function __get($property)
	{
		return $this->$property;
	}
}