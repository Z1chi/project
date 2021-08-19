## DEPLOY
    
     Инструкция для поднятие проекта
     
1. Сделать git clone 
2. В терминале выполнить команду: `composer install`
3. Добавить файл **.env** в корень сайта, для примера есть файл **.env.dist** и прописать свои параметры
4. Выполнить из под корня проекта команду: `vendor/bin/phpmig migrate`
5. Создать в корне сайта в папке **resources** папку **geoip** и туда положить файл **GeoLite-City.mmdb**
6. Выполнить в БД запрос: `INSERT INTO "admin" 
                             (name, email, password, created, updated, level, callcenter_percent, activity, active)
                          VALUES
                             ('Admin', 'admin', '$2y$10$HFPz4SvUbb9keSK9io9.2OhsagEP0vaq3DOQ21n5GGUnp.d8vn/Ky', 1, 1, 20, 10, 1, 1);`
                          
7. Для авторизации использовтаь **login: admin password: administrator**

Clean and Seed database with fresh data.
```bash
php artisan app:seed
```
    
      Instructions for raising the project

1. Make git clone
2. In the terminal, run the command: `composer install`
3. Add the **.env** file to the root of the project, for example there is a **.env.dist** file and write your parameters
4. Run the command from under the project root: `vendor/bin/phpmig migrate`
5. Create a **geoip** folder in the site root in the **resource** folder and attach the **GeoLite-City.mmdb** file
6. Execute a query in the database: `INSERT INTO "admin" 
                                        (name, email, password, created, updated, level, callcenter_percent, activity, active)
                                    VALUES
                                        ('Admin', 'admin', '$2y$10$HFPz4SvUbb9keSK9io9.2OhsagEP0vaq3DOQ21n5GGUnp.d8vn/Ky', 1, 1, 20, 10, 1, 1);`
                          
7. For authorization use **login: admin password: administrator**