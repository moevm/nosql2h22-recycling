# nosql2h22-recycling
nosql2h22-recycling

## Пример запуска
[Пример запуска mongodb](https://disk.yandex.ru/i/zjlzet1fwbmBrw)

## Запуск генератора
`./generator/bin/run generate -p=27017 -u=30 -o=15 -h=localhost -d=Recycling`

`-p - порт, на котором запускается mongo`

`-u - количество пользователей`

`-o - количество заказов на одного пользователя`

`-d - название БД`

`-h - хост БД`


## Запуск с помощью `docker-compose`
1. В корне проекта запустить команду `npm run deps && npm run build`

2. Далее перейти в папку `generator`, выполнить команду `npm i`, вернуться в корень проекта

3. Выполнить команду:
``` sudo docker-compose -f docker-compose.dev.yml build ```

4. Выполнить команду:
``` sudo docker-compose -f docker-compose.dev.yml up ```
5. Если нужно сгенерировать данные для БД, то запустить команду из корня проекта: `./generator/bin/run generate -p=27018 -u=30 -o=15 -h=localhost -d=test`
