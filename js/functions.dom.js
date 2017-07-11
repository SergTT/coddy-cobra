// function объявляет функцию
// developer_map_show_latlng название функции 
function developer_map_show_latlng(

    // latitude параметр функции, по умолчанию имеет значение null
    latitude = null,
    // longitude параметр функции, по умолчанию имеет значение null
    longitude = null
     
){
    // if условный оператор если
    // latitude переменная (объявленная, как параметр функции)
    // longtitude переменная (объявленная, как параметр функции)
    // проверяется что значение latitude и longitude не равно null
    if(latitude != null && longitude != null){
        
        // jQuery вызов библиотеки jQuery
        // в скобках выбирается html-элемент с атрибутом name и значение name=dev-map-cursor-latitude
        // val метод устанавливает значение html-элементу, в данном случае из параметра функции latitude
        jQuery('[name="dev-map-cursor-latitude"]').val(latitude);
        
        // jQuery вызов библиотеки jQuery
        // в скобках выбирается html-элемент с атрибутом name и значение name=dev-map-cursor-longitude
        // val метод устанавливает значение html-элементу, в данном случае из параметра функции longitude
        jQuery('[name="dev-map-cursor-longitude"]').val(longitude);
        
    }
        
 }