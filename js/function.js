var calc = function (first, second) {
	return first + second;
}

console.log(calc(3, 2));

// DOM - Document Object Model
// 1 Выбрать элемент
// 2 Что-то сделать с этим элементом

var h1 = document.querySelector('h1');
h1.addEventListener('click', function(){
	h1.classList.add('red');	
});