
const PI = 3.14;
let radius = 3;
                  

const one = 1;
const two = '2';

area = radius * radius * PI;

console.log(area);

let result = one + Number(two);
console.log(result);

result = one * two;
console.log(result);


let course = "CSE131"; //global scope
if (true) {
    let student = "John";
    console.log(course);  //works just fine, course is global
    console.log(student); //works just fine, it's being accessed within the block
}
console.log(course); //works fine, course is global
// console.log(student); //does not work, can't access a block variable outside the block


let selectElem = document.getElementById('webdevlist');
selectElem.addEventListener('change', function(){
    let codeValue = selectElem.value;
    console.log(codeValue);
    document.getElementById(codeValue).style.color = 'red';

})
                