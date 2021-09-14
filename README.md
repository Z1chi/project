## DEPLOY

1. Install dependencies and migrations
```bash
$ composer install
```

2. Add the **.env** file to the root of the project, for example there is a **.env.dist** file and write your parameters
```bash
$ cp .env.dist .env2
```

3. Create a **geoip** folder in the site root in the **resource** folder and attach the **GeoLite-City.mmdb** file

4. Run seed command to create admin account and seed other data
```bash
$ cp .env.dist .env2
```

5. For authorization use **login: admin password: administrator**


## Tests
```php
$ vendor/bin/phpunit --filter=SignupTest::testSignup
```