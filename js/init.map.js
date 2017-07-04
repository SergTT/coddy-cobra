// var объявляет переменную
// map название переменной
// L вызов библиотеки Leaflet
// map метод выбора элемента для помещения в него карты
var map = L.map('map',{
    
    // zoomControl дополнительный параметр метода map, настраивающий отображение панели управления маштабом
    // false (логическое значение) скрыть
    // true (логическое значение) показать
    zoomControl: false,
    
    // attributionControl дополнительный параметр метода map, настраивающий отображение данных о аттрибуции
    // false (логическое значение) скрыть
    // true (логическое значение) показать
    attributionControl: false
});

// map ранее объявленная переменая
// setView метод, который устанавливает представление карты по координатам
// [12.34, 12.34] первый аргумент метода, координаты на карте
// 13 второй аргумент функции, масштаб карты
map.setView([55.7540, 37.6203],13);

// L вызывает библеотеку Leaflet
// метод tileLayer назначает карте нужный слой с элемента карты(тайлами)
L.tileLayer('http://{s}.tile.osm.kosmosnimki.ru/kosmo/{z}/{x}/{y}.png', {
    
    // параметр метода attribution вписывает описание о лицензии
    //на основе которой используются те или иные слои тайлов
    attribution: 'даные &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> обеденение, ' +
    'Фрагменты @ <a href="http://kosmosnimki.ru">Kosmosnimki</a>',
    
    // параметры метода minZoom устанавливает минимальное приближение маштаба
    minZoom: 4,
    
    // параметры метода maxZoom устанавливает максимальное приближение маштаба
    maxZoom: 18
    
}).addTo(map);


var loaded_points = load_points();

// if условный оператор "если"
// load_points переменная
// == оператор сравние на точное совпадение или равенства
if(load_points.status == true ){
    
    // load_points.data.points
    // forEach метод работы с массивами, пробежка по каждому элементу
    // function(point) выполняет действие с передачей load_points.data.points в переменную point
    load_points.data.point.forEach(function(point){
        
        // create_marker вызов ранее объявленой функции
        // map первый аргумент функции, подставляем значение переменной map
        // location.geo.latitude подставка значение переменной point > location> geo > latitude
        // location.geo.longitude подставка значение переменной point > location> geo > longitude
        create_marker(map, point.location.geo.latitude, point.location.geo.longitude);
        
    });
    
}else{
    
    // вывод в консоль
    console.log('не удалось загрузить метки');
}