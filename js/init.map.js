// Функция отвечает за получение данных филиалов и формирование HTML-разметки для них
function setCardData(cardObj) {

    // Если есть табы
    if (cardObj.tabs) {
        var dataTab = '<div class="tabs">';
        // Получаем табы и формируем для них HTML-разметку
        cardObj.tabs.forEach(function(cardTab){
            dataTab += '<p id="' + cardTab.tabId +
                '" class="' + (cardTab.tabActive ? 'tab-active js_tab' : 'js_tab') +
                '" data-tab="' + cardTab.cardId +
                '">' + cardTab.name + '</p>';
        });
        dataTab += '</div>';
    }

    // Получаем данные карточек и формируем для них HTML-разметку
    var cardContent = '';
    cardObj.cards.forEach(function(cardInfo){

        // Получаем список изображений для слайдера и помещаем их в тег img
        var dataSlider = '';
        cardInfo.images.forEach(function(cardSliderArr){
            dataSlider+='<img src="img/slider/' + cardSliderArr + '">';
        });

        // Формируем разметку для описания филиала (разбиваем на параграфы)
        var dataDescription = '';
        var cardDescRaw = cardInfo.description.split('\n');
        cardDescRaw.forEach(function(cardDescParagraph){
            dataDescription += '<p class="card__description">' + cardDescParagraph + '</p>';
        });

        cardContent += (cardInfo.cardId ? '<div id="' + cardInfo.cardId + '" ' : '<div ') +
            (cardInfo.hidden ? 'class="hidden card">' : 'class="card">') +
            '<img class="card__logo" src="img/' + cardInfo.logo + '">' +
            '<div class="slider"><div class="slider-images">' + dataSlider + '</div>' +
            '<div class="slider-control"><img class="left-button" src="img/left.png"><img class="right-button" src="img/right.png"></div></div>' + dataDescription +
            '<p class="card__site"><a href="' + cardInfo.site + '" target="_blank">Сайт компании</a></p>' +
            '<p class="metro">' + cardInfo.metro + '</p>' +
            '<p class="card__adress">' + cardInfo.adress + '</p>' +
            '<p class="card__route"><a target="_blank" href="' + cardInfo.routeGoogle + '" >Схема проезда (Google Maps)</a></p>' +
            '<p class="card__route"><a target="_blank" href="img/pdf/' + cardInfo.routePDF + '" >Схема проезда (PDF)</a></p>' +
            '<p class="card__sotial">' +
            (cardInfo.fb ? '<a target="_blank" href="' + cardInfo.fb + '"><img src="img/logo-fb.png"></a>' : '') +
            (cardInfo.vk ? '<a target="_blank" href="' + cardInfo.vk + '"><img src="img/logo-vk.png"></a>' : '') + '</p></div>';
    });

    var cardData = '<div id="' + cardObj.id + '" class="card-container">' +
        '<img class="exitImg" src="img/exit.svg">' +
        (dataTab ? dataTab : '') + cardContent + '</div>';

    // Вставляем HTML-разметку филиалов на страницу
    $('.map').after(cardData);

}

// Получаем информацию о филиалах из JSON-файла настроек
var coddyData = load_points();

if(coddyData.status == true ){
    // Из данных филиалов получаем HTML-разметку
    coddyData.data.forEach(setCardData);
} else{
    var $loadingFailedMessage = $('body').append('<div class="loading-failed-message hidden">Не удалось загрузить информацию о филиалах. <br /> Убедитесь, что файл настроек доступен и содержит корректную информацию. </div>');
    console.log('не удалось загрузить метки');
}

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
// 12 - второй аргумент функции, масштаб карты
map.setView([55.7540, 37.6203], 12);

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
    cards,
    numImage,
    leftButton,
    rightButton,
    thisTabCard,
    tabs;

// Обрабатываем событие нажатой табы
var tabPressed = function(evt) {

    // Если нажали табу закрытого филиала
    if (this.getAttribute("data-tab") == evt.target.cardParent.querySelector(".hidden").getAttribute("id") ) {

        for (var j = 0; j < tabs.length; j++) {
            // у всех табов убираем активный класс
            tabs[j].classList.remove("tab-active");
        }

        // добавляем активный класс нажатой табе
        this.classList.add("tab-active");

        // Сохраняем все филиалы на открытой карточке
        var cardsToCheck = evt.target.cardParent.querySelectorAll(".card");

        for (var j = 0; j < cardsToCheck.length; j++) {
            // скрываем все филиалы на открытой карточке
            cardsToCheck[j].classList.add("hidden");
        }

        thisTabCard = evt.target.cardParent.querySelector("#" + this.getAttribute("data-tab"));

        // Показываем только филиал, соответствующий нажатой табе
        thisTabCard.classList.remove("hidden");

        // Вызываем слайдер на активной табе
        initSlider(thisTabCard);
    }
}

// Функция получает карточку нажатого маркера
// и управляет видимостью всех карточек
var resetCards = function(cCard) {

    if(coddyData.status == true ) {
        // Сохраняем табы карточки в переменную
        tabs = cCard.querySelectorAll(".js_tab");

        // Для каждой табы добавляем отслеживание клика
        for(var i = 0; i < tabs.length; i++){

            // Добавляем параметр - карточку, на которой расположена таба
            tabs[i].cardParent = cCard;

            // При нажатии на табу вызываем обработку клика
            tabs[i].addEventListener("click", tabPressed);
        }

        // Переключаем видимость карточки
        cCard.classList.toggle("card-active");

        // Сохраняем в переменную все открытые карточки
        cards = document.getElementsByClassName('card-active');

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
            initSlider(cCard.querySelector('.card:not(.hidden)'));
        }
    } else {
        // если не удалось загрузить файлы настроек,
        // показываем сообщение об ошибке
        $('.loading-failed-message').fadeIn(500);
    }
}

var leftButtonPressed = function(evt) {
        sliderImages[numImage].classList.remove('show-img');
        numImage--;
        if (numImage < 0) {
           numImage = sliderImages.length - 1;
        }

        sliderImages[numImage].classList.add('show-img');
}

var rightButtonPressed = function(evt) {
        sliderImages[numImage].classList.remove('show-img');
        numImage++;
        if (numImage > sliderImages.length - 1) {
           numImage = 0;
        }

        sliderImages[numImage].classList.add('show-img');
}

var initSlider = function(cardSlider) {

    // Сбрасываем счетчик слайдера,
    // чтобы сперва всегда показывать первый слайд
    numImage = 0;

    // Выбираем все слайды в активной карточке
    sliderImages = cardSlider.querySelectorAll(".slider-images img");

    // Убираем показ всех слайдов
    for (var i = 0; i < sliderImages.length; i++) {
        sliderImages[i].classList.remove('show-img');
    }

    // Включаем первый слайд
    sliderImages[0].classList.add('show-img');

    // Сохраняем кнопки слайдера в переменные
    leftButton = cardSlider.querySelector(".left-button");
    rightButton = cardSlider.querySelector(".right-button");

    // Добавляем отслеживание клика на кнопки слайдера
    leftButton.addEventListener("click", leftButtonPressed, false);
    rightButton.addEventListener("click", rightButtonPressed, false);

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

// При клике вне карточки закрываем ее
map.on("click", function(){
    $(".card-active").removeClass("card-active");
    $(".loading-failed-message").fadeOut(500);
});

// Сохраняем кнопки закрытия карточек в переменную
var closeButton = document.getElementsByClassName("exitImg");

// Всем этим кнопкам добавляем отслеживане события "клик
for(var i = 0; i < closeButton.length; i++){
    closeButton[i].addEventListener("click", function(){
        this.parentElement.classList.toggle("card-active");
    });
}

