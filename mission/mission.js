let selectElem = document.querySelector('#theme-select');
let pageContent = document.querySelector('body');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current === 'Dark') {
        document.body.style.color = "white";
        document.body.style.backgroundColor = "black";
        document.getElementById("logo").src = "byui-logo-white.png";

    } else if (current === 'Light') {
        document.body.style.color = "black";
        document.body.style.backgroundColor = "white";
        document.getElementById("logo").src = "byui-logo-blue.webp";
    }
}
          