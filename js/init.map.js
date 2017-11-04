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

var marker = L.icon({
    iconUrl: 'img/marker.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [33, 40],
    shadowSize: [42, 36],
    shadowAnchor: [12, 16]
});
// L.marker([55.759458, 37.665983], {icon: marker}).addTo(map)
//     .bindPopup('Здание Coddy: ' +
//                         ' тут проходят курсы:' +
//                         ' Графический дизайн Photoshop,' +
//                         ' Этичный хакер,' +
//                         ' Игровое 3D-моделирование,' +
//                         ' Игровое программирование на C#,' +
//                         ' Программирование игр на JavaScript,' +
//                         ' Игровое 3D моделирование с Blender,' +
//                         ' Web приложения,' +
//                         ' Гарвардский курс.' +
//               '<br>Адрес: Actis Wunderman, Курская (Нижний сусальный пер., 5с19)')
//     .openPopup();

L.marker([55.759458, 37.665983], {icon: marker}).addTo(map)
    .on("click", function(){
        document.querySelector("#actis").classList.toggle("hidden");
        document.querySelector("#actis").classList.toggle("card-active");
    });   

L.marker([55.8063202, 37.5914289], {icon: marker}).addTo(map)
    .on("click", function(){
        document.querySelector("#ibs").classList.toggle("hidden");
    }); 

L.marker([55.778399, 37.5841413], {icon: marker}).addTo(map)
    .on("click", function(){
        document.querySelector("#deloitte").classList.toggle("hidden");
    });

L.marker([55.753781, 37.6815132], {icon: marker}).addTo(map)
    .on("click", function(){
        document.querySelector("#krock").classList.toggle("hidden");
    }); 
L.marker([55.767828, 37.6041913], {icon: marker}).addTo(map)
    .on("click", function(){
        document.querySelector("#finam").classList.toggle("hidden");
    }); 
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
if(loaded_points.status == true ){
    
    // load_points.data.points
    // forEach метод работы с массивами, пробежка по каждому элементу
    // function(point) выполняет действие с передачей load_points.data.points в переменную point
    loaded_points.data.point.forEach(function(point){
        
        // create_marker вызов ранее объявленой функции
        // map первый аргумент функции, подставляем значение переменной map
        // location.geo.latitude подставка значение переменной point > location> geo > latitude
        // location.geo.longitude подставка значение переменной point > location> geo > longitude
        create_marker(map, point.location.geo.latitude, point.location.geo.longitude);
        
    });
    
    // var объявляет переменную
    // track название переменной
    // points_array вызов ранее объявленной функции
    // loaded_points подставка раннее объявленной переменной
    var track = points_array(loaded_points);
    
    // create_track вызов ранее объявленной функции
    // map параметр функции, подставляется ранее объявленная переменная map
    // track ранее обявленная переменная, подставляется в параметр latlngs
    create_track(map, track);
    
}else{
    
    // вывод в консоль
    //console.log('не удалось загрузить метки');
}
var closeButton = document.getElementsByClassName("exitImg");
for(var i = 0; i < closeButton.length; i++){
closeButton[i].addEventListener("click", function(){
    this.parentElement.classList.toggle("hidden");
    this.parentElement.classList.toggle("card-active")
});
}

var leftButton = document.getElementsByClassName("left-button");
for(var i = 0; i < leftButton.length; i++){
    leftButton[i].addEventListener("click", function(){
        // this.parentElement.classList.toggle("hidden");
        console.log('Нажата левая кнопка');
    });
}

var rightButton = document.getElementsByClassName("right-button");
for(var i = 0; i < rightButton.length; i++){
    rightButton[i].addEventListener("click", function(){
        // this.parentElement.classList.toggle("hidden");
        console.log('Нажата правая кнопка');
    });
}

var sliderImages = document.querySelector(".card-active");
console.log(sliderImages);