// L вызов библиотеки Leaflet
// map метод выбора элемента для помещения в него карты
var map = L.map('map',{
    
    // zoomControl дополнительный параметр метода map, настраивающий отображение панели управления маштабом
    // false - скрыть
    // true - показать
    zoomControl: false,
    
    // attributionControl дополнительный параметр метода map, настраивающий отображение данных о аттрибуции
    // false - скрыть
    // true - показать
    attributionControl: false
});

L.control.zoom({
     position:'topright'
}).addTo(map);

// setView метод, который устанавливает представление карты по координатам
// [55.7540, 37.6203] - первый аргумент метода, координаты на карте
// 13 - второй аргумент функции, масштаб карты
map.setView([55.7540, 37.6203], 13);

var marker = L.icon({
    iconUrl: 'img/marker.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [33, 40],
    shadowSize: [42, 36],
    shadowAnchor: [12, 16]
});

var cardOpened = false,
    currentCard,
    sliderImages,
    tabs;

// Функция получает карточку нажатого маркера
// и управляет видимостью всех карточек
var resetCards = function(cCard) {

    var thisTabCard;

    // Сохраняем табы карточки в переменную
    tabs = cCard.querySelectorAll(".js_tab");
    
    // Для каждой табы добавляем отслеживание клика
    for(var i = 0; i < tabs.length; i++){

        tabs[i].addEventListener("click", function(){

            // Если нажали табу закрытого филиала
            if (this.getAttribute("data-tab") == cCard.querySelector(".hidden").getAttribute("id") ) {

                for (var j = 0; j < tabs.length; j++) {
                    // у всех табов убираем активный класс
                    tabs[j].classList.remove("tab-active");
                }

                // добавляем активный класс нажатой табе
                this.classList.add("tab-active");

                // Сохраняем все филиалы на открытой карточке
                var cardsToCheck = cCard.querySelectorAll(".card");

                for (var j = 0; j < cardsToCheck.length; j++) {
                    // скрываем все филиалы на открытой карточке
                    cardsToCheck[j].classList.add("hidden");
                }

                thisTabCard = cCard.querySelector("#" + this.getAttribute("data-tab"));

                // Показываем только филиал, соответствующий нажатой табе
                thisTabCard.classList.remove("hidden");

                initSlider(thisTabCard);
            } 

        });
    }

    // Переключаем видимость карточки
    cCard.classList.toggle("card-active");

    // Сохраняем в переменную все открытые карточки
    var cards = document.getElementsByClassName('card-active');
    //console.log(cards[0]);
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
        // Если есть табы (карточка двойная)
        if (tabs.length) {
            // вызываем слайдер на открытой табе
            //initSlider(thisTabCard);
        }
        // если табов нет (карточка одинарная)
        else {
            // вызываем слайдер на открытой карточке
            //initSlider(cCard.querySelector('.card'));
        }

        // Запускаем слайдер
        initSlider(cCard.querySelector('.card'));
        
        // При клике вне карточки закрываем ее
        // map.on("click", function(){
        //     $(".card-active").removeClass("card-active");
        // });
    }
}

var initSlider = function(cardSlider) {
    console.log('Slider init...');
    // Сбрасываем счетчик слайдера, 
    // чтобы сперва всегда показывать первый слайд
    var numImage = 0;

    // Выбираем все слайды в активной карточке
    sliderImages = cardSlider.querySelectorAll(".slider-images img");

    // Убираем показ всех слайдов 
    for (var i = 0; i < sliderImages.length; i++) {
        sliderImages[i].classList.remove('show-img');
    }

    // Включаем первый слайд
    sliderImages[0].classList.add('show-img');

    var leftButton = cardSlider.querySelector(".left-button");
    //console.log(leftButton);
    leftButton.addEventListener("click", function(){
        console.log('Left button pressed on the ' + cardSlider.parentNode.getAttribute('id') + ' card.');
        console.log(numImage);
        sliderImages[numImage].classList.remove('show-img');
        numImage--;
        if (numImage < 0) {
           numImage = sliderImages.length - 1; 
        }

        sliderImages[numImage].classList.add('show-img');
    });

    var rightButton = cardSlider.querySelector(".right-button");
    rightButton.addEventListener("click", function(){
        console.log('Right button pressed on the ' + cardSlider.parentNode.getAttribute('id') + ' card.');
        console.log(numImage);
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
L.marker([55.758737, 37.820825], {icon: marker}).addTo(map)
    .on("click", function(){
        currentCard = document.querySelector("#MosArt");
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
    
} else{
    
    // вывод в консоль
    //console.log('не удалось загрузить метки');
}

// При клике вне карточки закрываем ее
map.on("click", function(){
    //resetCards($(".card-active"[0]));
    $(".card-active").removeClass("card-active");
    //console.log($(".card-active"));
});

// Сохраняем кнопки закрытия карточек в переменную
var closeButton = document.getElementsByClassName("exitImg");

// Всем этим кнопкам добавляем отслеживане события "клик
for(var i = 0; i < closeButton.length; i++){
    closeButton[i].addEventListener("click", function(){
        this.parentElement.classList.toggle("card-active");
    });
}

