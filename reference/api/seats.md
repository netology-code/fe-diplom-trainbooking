## Посадочные места

Информация о посадочных местах определённого направления.
Параметры поиска позволят отфильтровать только нужные вагоны в составе

GET /routes/{id}/seats

Параметры в запросе позволяют исключить лишние вагоны в поезде

## Параметры:

- **id** - Идентификатор направления (обязательный)
- **have_first_class** - Люкс (true/false)
- **have_second_class** - Купе (true/false)
- **have_third_class** - Плацкарт (true/false)
- **have_fourth_class** - Сидячее место (true/false)
- **have_wifi** - Имеется WiFi (true/false)
- **have_air_conditioning** - Имеется кондиционер (true/false)
- **have_express** - Экспресс (true/false)

## Пример:

```javascript
fetch( 'https://netology-trainbooking.herokuapp.com/routes/1234123/seats?have_wifi=false' )
    .then( response => response.json())
    .then( data => console.log( data ));
```

## Результат:

Информация о местах в вагонах.
Массив объектов со свойствами:

- **_id** - Идентификатор
- **name** - Идентификатор
- **class_type** - Идентификатор
- **have_first_class** - Люкс (true/false)
- **have_second_class** - Купе (true/false)
- **have_third_class** - Плацкарт (true/false)
- **have_fourth_class** - Сидячее место (true/false)
- **have_wifi** - Имеется WiFi (true/false)
- **have_air_conditioning** - Имеется кондиционер (true/false)
- **have_express** - Экспресс (true/false)
- **price** - Цена за место (Люкс)
- **top_price** - Цена верхнего места
- **bottom_price** - Цена нижнего места
- **side_price** - Цена бокового места
- **linens_price** - Цена постельного белья
- **wifi_price** - Цена услуги Wi-Fi
- **avaliable_seats** - Количество свободных мест в вагоне
- **is_linens_included** - Стоимость белья включена в 
стоимость билета и не может быть исключена (true/false)
- **seats** - информация о посадочных местах

### seats

Массив объектов со свойствами:

- **index** - Числовой номер места в вагоне
- **available** - Место доступно для бронирования
