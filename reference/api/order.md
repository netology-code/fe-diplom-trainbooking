# Заказ билетов

## Посадочные места

Информация о посадочных местах определённого направления.
Параметры поиска позволят отфильтровать только нужные вагоны в составе

POST /routes/order

## Пример:

```js
fetch( 'https://netology-trainbooking.herokuapp.com/order', {
    method: 'POST',
    body: JSON.stringify({
      "user": {
          "first_name": "Иван",
          "last_name": "Смирнов",
          "patronymic": "Олегович",
          "phone": "8900123123",
          "email": "string@string.ru",
          "payment_method": "cash" // или online
        },
        "departure": {
          "route_direction_id": "123431",
          "seats": [
            {
              "coach_id": "12341",
              "person_info": {
                "is_adult": true,
                "first_name": "Ivan",
                "last_name": "Popov",
                "patronymic": "Popovich",
                "gender": true,
                "birthday": "1980-01-01",
                "document_type": "паспорт",
                "document_data": "45 6790195"
              },
              "seat_number": 10,
              "is_child": true,
              "include_children_seat": true
            }
          ]
        }
      })
  })
    .then( response => response.json())
    .then( console.log );
```

## Параметры:

- **user** - пользователь в системе
- **departure** - билеты на отбытие
- **arrival** - билеты на прибытие

### user

- **first_name** - имя
- **last_name** - фамилия
- **patronymic** - отчество
- **phone** - телефон
- **email** - E-mail
- **payment_method** - метод оплаты (cash или online)

### departure/arrival

Объект с данными заказа о прибытии и отбытии

- **route_direction_id** - id направления
- **seats** - массив с информацией о билетах

### departure.seats и arrival.seats

Массив заказываемых билетов:

- **coach_id** - Идентификатор вагона
- **person_info** - объект с информацией о пассажире 
- **seat_number** - Номер места в вагоне
- **is_child** - Детский билет
- **include_children_seat** - Необходимо ли доп. место для билета «Детский без места»?
Доступно только для взрослого места.

### person_info

- **is_adult** - Взрослый/детский
- **first_name** - Имя
- **last_name** - Фамилия
- **patronymic** - Отчество
- **gender** - Пол (true - мужской)
- **birthday** - День рождения (в формате YYYY-MM-DD)
- **document_type** - Тип документа
- **document_data** - Информация о документе

