













// function объявляет функцию
// dom_window_show название функции
function dom_window_show(name){
    
    // jQuery вызывает библеотеку jQuery
    // .window селектор html-элемент класса window
    // name подставляет значения параметра функции
    jQuery('.window.' + name)
        // addClass метод библеотеки jQuery, добавляющий класс выбранному элементу
        .addClass('active')
        // siblings метод библеотеки jQuery, который переключаются от выбранного элемента на соседние
        .sibling()
        // removeClass метод библеотеки jQuery, удаляющий класс выбранному элементу
        .removeClass('active');
}

// function объявляет функций
// dom_window_hide название функции
function dom_window_hide(name){
    
    // jQuery вызывает библеотеку jQuery
    // .window селектор html-элемент класса window
    // name подставляет значения параметра функции
    jQuery('.window.' + name)
        // addClass метод библеотеки jQuery, добавляющий класс выбранному элементуss('active')
        .removeCla
        // siblings метод библеотеки jQuery, который переключаются от выбранного элемента на соседние
        .sibling()
        // removeClass метод библеотеки jQuery, удаляющий класс выбранному элементу
        .removeClass('active');
}









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