<?php

define('ROUTES', serialize([
    [
        'match' => '^(?P<module>(api/v1))/?(?P<action>[a-z-]+)?$',
        'route' => [
            'viewcontroller' => 'api',
        ]
    ],

	// admin panel

	[
		'match' => '^(?P<module>(' . getenv('APP_ADMIN_PATH') . '))$',
		'route' => [
			'module' => ADMIN_MODULE_NAME,
			'viewcontroller' => 'home',
			'action' => 'index',
		]
	],
    // url '/admin/project/1' going to ProjectView, action view
    [
        'match' => '^(?P<module>(' . getenv('APP_ADMIN_PATH') . '))/?(?P<viewcontroller>[a-z-]{3,}+)/([0-9]+)$',
        'route' => [
            'module' => ADMIN_MODULE_NAME,
            'action' => 'view'
        ]
    ],
	[
		'match' => '^(?P<module>(' . getenv('APP_ADMIN_PATH') . '))/?(?P<viewcontroller>[a-z-]{3,}+)/?(?P<action>[a-z-]+)?$',
		'route' => [
			'module' => ADMIN_MODULE_NAME
		]
	],

    // affiliate panel

	[
		'match' => '^(?P<module>(' . getenv('APP_AFFILIATE_PATH') . '))$',
		'route' => [
			'module' => AFFILIATE_MODULE_NAME,
			'viewcontroller' => 'home',
			'action' => 'index',
		]
	],
	[
		'match' => '^(?P<module>(' . getenv('APP_AFFILIATE_PATH') . '))/?(?P<viewcontroller>[a-z-]{3,}+)/?(?P<action>[a-z-]+)?$',
		'route' => [
			'module' => AFFILIATE_MODULE_NAME
		]
	],

    // app

    [
        'match' => '^/?$',
        'route' => [
            'viewcontroller' => 'home',
            'action' => 'index'
        ]
    ],
	[
		'match' => '^(?P<language>(' . LANGUAGES_LIST . '))/?$',
		'route' => [
			'viewcontroller' => 'home',
			'action' => 'index'
		]
	],
	[
		'match' => '^(?P<language>(' . LANGUAGES_LIST . '))/avoid-scam?$',
		'route' => [
			'viewcontroller' => 'avoidscam',
			'action' => 'index'
		]
	],
    [
        'match' => '^(?P<language>(' . LANGUAGES_LIST . '))/(?P<viewcontroller>[a-z-0-9]{3,}+)/?(?P<action>[A-z-0-9]+)?$',
    ]
]));