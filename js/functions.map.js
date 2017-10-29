// function объявляет функцию
// load_tracks название функции
function load_tracks(){
    
    // var объявляет переменную
    // function_result название переменной (ассоциативный массив, объект)
    var function_result = {
        
        // status вложенный параметр массива, объекта, или вложенная переменная
        // false логическое (булевое) значение - ложь
        status: false,
        
        // data вложенный параметр массива, объекта, или вложенная переменная
        // null нулевое (пустое значение)
        data: null
    };
    
    // jQuery вызов библиотеки jQuery
    // ajax метод фонового http-запроса на отправку или прием данных
    jQuery.ajax({
        
        // async параметр метода ajax
        // определяет будет ли данный запрос выполняться синхронно всему алгоритму или сам по себе
        async: false,
        
        // type параметр метода ajax
        // определяет тип http-запроса
        type: 'get',
        
        // dataType параметр метода ajax
        // определяет какой тип/формат данных будет получен в результате запроса
        dataType: 'json',
        
        // url параметр метода ajax
        // адрес, на который отправляется запрос
        url: 'js/json/map.tracks.json',
        
        // success параметр метода ajax
        // выполняет действие в случае успешного запроса
        success: function(data){
            
            // вызов переменной function_result (ранее была объявлена, является массивом)
            // внутренние параметры переопределяются
            function_result = {
                
                // status вложенный параметр массива, объекта, или вложенная переменная
                // true логическое (булевое) значение - истинное
                status: true,
                
                // data вложенный параметр массива, объекта, или вложенная переменная
                // data в значении подставляет параметр функции data, как результат успешного запроса
                data: data
            }
            
        },
        
        // error параметр метода ajax
        // выполняет действие в случае неудачного запроса
        error: function(data){
            
            // вызов переменной function_result (ранее была объявлена, является массивом)
            // внутренние параметры переопределяются
            function_result = {
                
                // status вложенный параметр массива, объекта, или вложенная переменная
                // false логическое (булевое) значение - ложь
                status: false,
                
                // data вложенный параметр массива, объекта, или вложенная переменная
                // null нулевое (пустое значение)
                data: data
            }
            
        }
        
    });
    
    // return возвращает результат функции
    // function_result подставляет значение переменной (ранее была объявлена, является массивом)
    return function_result;
    
}



// function объявляет функцию
// load_points название функции
function load_points(){
    
    // var объявляет переменную
    // function_result название переменной (ассоциативный массив, объект)
    var function_result = {
        
        // status вложенный параметр массива, объекта, или вложенная переменная
        // false логическое (булевое) значение - ложь
        status: false,
        
        // data вложенный параметр массива, объекта, или вложенная переменная
        // null нулевое (пустое значение)
        data: null
    };
    
    // jQuery вызов библеотеки jQuery
    // ajax метод фонового http-запроса на отправку или прием данных
    jQuery.ajax({
            
        // async параметр метода ajax
        // определяет будет ли данный запрос выполняться синхронно всему алгоритму или сам по себе
        async: false,
        
        // type параметр метода ajax
        // определяет тип http-запроса
        type: 'get',
        
        // dataType параметр метода ajax
        // определяет какой тип/формат данных будет получен в результате запроса
        dataType: 'json',
        
        // url параметр метода ajax
        // адрес, на который отправляется запрос
        url: 'js/json/map.points.json',
        
        // success параметр метода ajax
        // выполняет действие в случае успешного запроса
        success: function(data){
            
            // вызов переменной function_result (ранее была объявлена, является массивом)
            // внутренние параметры переопределяются
            function_result = {
                
                // status вложенный параметр массива, объекта, или вложенная переменная
                // true логическое (булевое) значение - истинное
                status: true,
                
                // data вложенный параметр массива, объекта, или вложенная переменная
                // data в значении подставляет параметр функции data, как результат успешного запроса
                data: data
            }
            
        },
                
        // error параметр метода ajax
        // выполняет действие в случае неудачного запроса
        error: function(data){
            
            // вызов переменной function_result (ранее была объявлена, является массивом)
            // внутренние параметры переопределяются
            function_result = {
                    
                // status вложенный параметр массива, объекта, или вложенная переменная
                // false логическое (булевое) значение - ложь
                status: false,
                
                // data вложенный параметр массива, объекта, или вложенная переменная
                // null нулевое (пустое значение)
                data: data
            }
            
        }
        
    });
    
    // return возвращяет результат функции
    // function_return подставляет значение переменной (ранее была объявлена, является массивом)
    return function_result;
    
}


// function объявляет функцию
// load_points название функции
function create_marker(map,lat,lng){
    
    // L вызывает библеотеку Leaflet
    // marker метод, который создает объкт маркера карты
    // addTo метод, который добавляет объект маркера на карту
    L.marker([lat, lng]).addTo(map);
}

// function объявляет функцию
// load_points название функции
// map (в скобках) параметр функции
// latlngs (в скобках) параметр функции
function create_track(map,latlngs){
    
    // L вызывает библеотеку Leaflet
    // polyline метод, который создает обект линии на карте
    // addTo метод, который добавляет обект линии на карте
    L.polyline(latlngs, {color: 'red'}).addTo(map);
}


// function объявляет функцию
// points_array название функции
// object (в скобках) параметр функции
function points_array(object){
    
    // var объявляет переменную
    // [] скобки обозначение индексированного массива
    var result = [];
    
    // for цикл (повтор действия)
    // i переменная, основной аргумент цикла, начинается с еденицы
    // object.lenght, object параметр массива, lenght метод получения кол-ва элементов массива
    // i++ запускает цикл
    for(i = 1; i <= object.length; i++){
        
        // var объявляет переменную
        // latitude название переменной
        var latitude = object.point[i].location.geo.latitude;
        
        // var объявляет переменную
        // longitude название переменной
        var longitude = object.point[i].location.geo.longitude;
        
        // result ранее объявленная переменная
        // push метод, помещяющий новый элемент в массив
        result.push({ latitude, longitude });
        
    }
    
    // console.log (выводит значение в консоль)
    // result ранее объявленная переменная
    console.log(result);
    
    // result возврощяет результат функции
    return result;
    
}