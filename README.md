# README #

### Описание ###

Скрипт отображает на карте филиалы школы Coddy.

Версия 1.02.

Технологии: JS, библиотеки jQuery v.3.1.1 и Leaflet v. 1.0.3

Внешние библиотеки хранятся локально в папке js/library. При желании можно подключить обновляемые версии с CDN.

Вся информация о филиалах хранится в файле js/json/map.points.json

### Установка ###

1. Скопируйте папки img, css и js в проект.

2. Внутри тега `<head>` подключите стили.
	```
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="css/ui/layout/section.css">
	```

3. Перед закрывающим тегом `</body>` подключите внешнюю библиотеку jQuery и Leaflet. Ниже подключите само приложение (скрипты functions.map.js и init.map.js).
	```
	<script type="text/javascript" src="js/library/jquery/jquery.3.1.1.js"></script>
	<script type="text/javascript" src="js/library/lealfet/leaflet.1.0.3.js"></script>
	<link rel="stylesheet" type="text/css" href="js/library/lealfet/leaflet.1.0.3.css">
	<script type="text/javascript" src="js/functions.map.js"></script>
	<script type="text/javascript" src="js/init.map.js"></script>
	```

4. Добавьте на страницу контейнер карты.
	```
    <div class="section map">
        <div class="inner" id="map">
        </div>
    </div>
	```

### Как менять/задавать информацию о филиалах ###

Вся информация о филиалах хранится в файле js/json/map.points.json. Это массив из объектов-филиалов.

#### Параметры в файле настроек ####

* __id.__ Идентификатор карточки с филиалами/филиалом. Используется при построении HTML-разметки. Обязательный.
+ __tabs.__ Массив с вкладками. Если на карточке нужно отобразить несколько филиалов с вкладками, то есть несколько филиалов расположенны по одному адресу, то добавляем этот параметр.
	* __tabId.__ Идентификатор вкладки. Используется при построении HTML-разметки. Обязательный, если добавляем вкладки.
	* __tabActive.__ Признак активной вкладки: `true`. Указываем только на той вкладке, которая должна быть видна при открытии карточки. Обязательный, если добавляем вкладки.
	* __cardId.__ Идентификатор филиала. Служит для связи филиала и его вкладки. Обязательный, если добавляем вкладки.
	* __name.__ Название вкладки, как оно будет отображаться на странице. Обязательный, если добавляем вкладки.
+ __latitude.__ Широта метки филиала.
+ __longitude.__ Долгота метки филиала.
+ __cards.__ Массив с объектами-филиалами. Обязательный.
	* __cardId.__ Идентификатор филиала. Используется при построении HTML-разметки. Если включены вкладки, совпадает с параметром `cardId` объекта внутри массива `tabs`.
	* __logo.__ Название файла с логотипом филиала. Расширение тоже указываем. Обязательный.
	* __description.__ Описание филиала. Абзацы разделяем последовательностью `\n`. Обязательный.
	* __site.__ Адрес сайта филиала. Обязательный.
	* __metro.__ Метро филиала. Обязательный.
	* __adress.__ Физический адрес филиала. Обязательный.
	* __routeGoogle.__ Ссылка на гугл-карту филиала. Обязательный.
	* __routePDF.__ Название pdf-схемы проезда до филиала. Все схемы по умолчанию лежат в img/pdf. Обязательный.
	* __fb.__ Ссылка на Фейсбук филиала. Необязательный.
	* __vk.__ Ссылка на Вокнтакте филиала. Необязательный.
	* __images.__ Массив с названиями файлов-картинок для слайдера. Расришерине файла указываем. Все изображения для слайдера по умолчанию лежат в img/slider. Обязательный.