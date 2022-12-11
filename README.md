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

1. Выполнить команду:
``` chmod +x ./entrypoint.sh ```

2. Выполнить команду:
``` sudo docker-compose -f docker-compose.dev.yml build ```
Если требуется генерация данных для БД, то предварительно стоит выставить переменную среды `GENERATE=true`.

2. Выполнить команду:
``` sudo docker-compose -f docker-compose.dev.yml up ```

## Тестовые пользователи для запуска приложения от каждой роли:
### Admin:
1. Логин: admin
2. Пароль: admin

### Manager:
1. Логин: manager
2. Пароль: manager

### Carrier:
1. Логин: driver
2. Пароль: driver




