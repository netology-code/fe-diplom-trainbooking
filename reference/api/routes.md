## Поиск направлений

GET /routes

## Параметры:

- **from_city_id** - Идентификатор города, откуда планируется путешествие (обязательный)
- **to_city_id** - Идентификатор города, куда планируется путешествие (обязательный)
- **date_start** - Дата отбытия туда (в формате YYYY-DD-MM; например 2030-03-01)
- **date_end** - Дата отбытия обратно (в формате YYYY-DD-MM; например 2030-03-01)
- **date_start_arrival** - Дата прибытия туда (в формате YYYY-DD-MM; например 2030-03-01)
- **date_end_arrival** - Дата прибытия обратно (в формате YYYY-DD-MM; например 2030-03-01)
- **have_first_class** - Люкс (true/false)
- **have_second_class** - Купе (true/false)
- **have_third_class** - Плацкарт (true/false)
- **have_fourth_class** - Сидячее место (true/false)
- **have_wifi** - Имеется WiFi (true/false)
- **have_air_conditioning** - Имеется кондиционер (true/false)
- **have_express** - Экспресс (true/false)
- **price_from** - Цена от
- **price_to** - Цена до
- **start_departure_hour_from** - Час отбытия от (число)
- **start_departure_hour_to** - Час отбытия до (число)
- **start_arrival_hour_from** - Час прибытия от (число)
- **start_arrival_hour_to** - Час прибытия до (число)
- **end_departure_hour_from** - Час отбытия назад от (число)
- **end_departure_hour_to** - Час отбытия назад до (число)
- **end_arrival_hour_from** - Час прибытия назад от (работает при установленном параметре date_end)
- **end_arrival_hour_to** - Час прибытия назад до (работает при установленном параметре date_end)
- **limit** - Количество результатов на странице
- **offset** - Количество результатов, которое необходимо пропустить в выдаче
- **sort** - Сортировка результатов (date, price, duration)

```javascript
fetch( 'https://netology-trainbooking.herokuapp.com/routes?from_city_id=123323&to_city_id=456&have_express=true' )
    .then( response => response.json())
    .then( data => console.log( data ));
```

## Результат:

Массив объектов со свойствами:

- **have_first_class** - В поезде есть вагон класса «Люкс» (СВ)
- **have_second_class** - В поезде есть вагон класса «Купе»
- **have_third_class** - В поезде есть вагон класса «Плацкарт»
- **have_fourth_class** - В поезде есть вагон с сидячими местами
- **have_wifi** - Есть Wi-Fi? (на всём направлении)
- **have_air_conditioning** - Есть кондиционер? (на всём направлении)
- **is_express** - Экспресс-маршрут (на всём направлении)
- **min_price** - Минимальная цена поездки (на 1 взрослого)
- **arrival** - информация об отбытии
- **departure** - информация о прибытии
- **total_avaliable_seats** - количество свободных мест

### arrival/departure

Отбытие и прибытие - это, обычно, два разных поезда. Соответственно, у них могут быть
разные характеристики.

Объект со свойствами:

- **have_first_class** - В поезде есть вагон класса «Люкс» (СВ)
- **have_second_class** - В поезде есть вагон класса «Купе»
- **have_third_class** - В поезде есть вагон класса «Плацкарт»
- **have_fourth_class** - В поезде есть вагон с сидячими местами
- **have_wifi** - Есть Wi-Fi? (на всём направлении)
- **have_air_conditioning** - Есть кондиционер? (на всём направлении)
- **is_express** - Экспресс-маршрут (на всём направлении)
- **min_price** - Минимальная цена поездки (на 1 взрослого)
- **train** - Информация о поезде
- **from** - Информация об отправлении
- **to** - Информация о прибытии
- **duration** - Длительность поездки (в секундах)
- **price_info** - Информация о ценах в вагонах разного класса
- **seats_info** - Информация о количестве свободных мест в каждом типе вагонов

### arrival.from/arrival.to и departure.from/departure.to

Информация об отбытии и прибытии

- **datetime** - Дата в секундах
- **railway_station_name** - Информация о вокзале
- **city** - информация о городе
