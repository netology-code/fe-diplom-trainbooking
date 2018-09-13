### Поиск городов

GET /routes/cities

Поиск городов среди возможных направлений
(для подсказок в процессе ввода города на главном экране). Выдаёт первые 10 результатов.

## Параметры

- **name** - Город (допускается указывать часть названия)

## Пример

```javascript
fetch( 'https://netology-trainbooking.herokuapp.com/routes/cities?name=мос' )
    .then( response => response.json())
    .then( data => console.log( data ));
```

## Результат

Массив объектов со свойствами:

- **_id** - идентификатор города
- **name** - имя города
