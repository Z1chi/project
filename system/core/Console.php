<?php

namespace system\core;


class Console
{
	private $error_data = '';

	public function msg ($message) {
		echo '['.date('H:i:s').'] '.$message."\r\n";
	}

	public function endLine () {
		echo "\n";
	}

	public function error ($message) {

		$msg = '['.date('H:i:s').'] Error: '.$message."\r\n";
		$this->error_data .= $msg;

		echo $msg;
	}
}