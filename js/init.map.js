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

L.control.zoom({
     position:'topright'
}).addTo(map);

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

var numImage = 0;
var cardOpened = false;
var currentCard;
var sliderImages;
var rightButton;
var leftButton;

// Функция получает карточку нажатого маркера
// и управляет видимостью всех карточек
var resetCards = function(cCard) {

    // Переключаем видимость карточки
    cCard.classList.toggle("card-active");

    var cards = document.getElementsByClassName('card-active');

    // Если есть открытая карточка
    if (cards.length) {
        // Проверяем, нажат ли новый маркер
        for (var i = 0; i < cards.length; i++) {
            if ( cards[i].getAttribute('id') !== cCard.getAttribute('id') ) {
                    // Если нажат, у всех остальных карточек убираем активный класс
                    cards[i].classList.remove('card-active');
                }
        }

        // Запускаем слайдер
        initSlider();
        
        map.on("click", function(){
            $(".card-active").removeClass("card-active");
        });
    }
}

var initSlider = function() {
    // Сбрасываем счетчик слайдера, 
    // чтобы сперва всегда показывать первый слайд
    numImage = 0;

    // Выбираем все слайды в активной карточке
    sliderImages = document.querySelectorAll(".card-active .slider-images img");

    // Убираем показ всех слайдов 
    for (var i = 0; i < sliderImages.length; i++) {
        sliderImages[i].classList.remove('show-img');
    }

    // Включаем первый слайд
    sliderImages[numImage].classList.add('show-img');

    leftButton = document.querySelector(".card-active .left-button");
    leftButton.addEventListener("click", function(){
        sliderImages[numImage].classList.remove('show-img');
        numImage--;
        if (numImage < 0) {
           numImage = sliderImages.length - 1; 
        }

        sliderImages[numImage].classList.add('show-img');
    });

    rightButton = document.querySelector(".card-active .right-button");
    rightButton.addEventListener("click", function(){
        sliderImages[numImage].classList.remove('show-img');
        numImage++;
        if (numImage > sliderImages.length - 1) {
           numImage = 0; 
        }
        
        sliderImages[numImage].classList.add('show-img');
    });
}

L.marker([55.759458, 37.665983], {icon: marker}).addTo(map)
    .on("click", function(){
        currentCard = document.querySelector("#actis-glowbite");
        // При клике на маркер запускаем обработку видимости карточек
        resetCards(currentCard);
    });

L.marker([55.8063202, 37.5914289], {icon: marker}).addTo(map)
    .on("click", function(){
        currentCard = document.querySelector("#ibs");
        // При клике на маркер запускаем обработку видимости карточек
        resetCards(currentCard);
    }); 

L.marker([55.778299, 37.5870413], {icon: marker}).addTo(map)
    .on("click", function(){
        currentCard = document.querySelector("#deloitte");
        // При клике на маркер запускаем обработку видимости карточек
        resetCards(currentCard);
    });

L.marker([55.753781, 37.6815132], {icon: marker}).addTo(map)
    .on("click", function(){
        currentCard = document.querySelector("#krock");
        // При клике на маркер запускаем обработку видимости карточек
        resetCards(currentCard);
    }); 

L.marker([55.767828, 37.6041913], {icon: marker}).addTo(map)
    .on("click", function(){
        currentCard = document.querySelector("#finam");
        
        resetCards(currentCard);
        //cardOpened = !cardOpened;
    });
L.marker([55.707740, 37.724175], {icon: marker}).addTo(map)
    .on("click", function(){
        currentCard = document.querySelector("#nexTouch");
        // При клике на маркер запускаем обработку видимости карточек
        resetCards(currentCard);
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
    this.parentElement.parentElement.classList.toggle("card-active")
});
}

