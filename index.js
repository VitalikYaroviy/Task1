let div = document.querySelector('div');
let img = document.querySelector('img');

div.style.width = img.offsetWidth + 'px';
div.className = 'main';

let input = document.querySelector('input');


function addDiv (e) {
    let container = document.createElement('div');
    container.className = 'flex';
    let childDiv = document.createElement('div');
    childDiv.className = 'childDiv';
    let x = document.createElement('div');
    x.innerText = ' X';
    x.className = 'close';
    x.style.display = 'none';

    if(input.value !== ''){
        let val = input.value;
        container.style.top = e.y + 'px';
        container.style.left = e.x + 'px';
        childDiv.innerText = val;
        let imageParam = div.getBoundingClientRect();
        container.style.left = (e.x - imageParam.left - imageParam.width / 16)  + 'px';
        container.style.top = (e.y - imageParam.top - imageParam.height) + 'px';

        input.value = '';
        container.appendChild(childDiv);
        container.appendChild(x);
        childDiv.addEventListener('click', close);
        x.addEventListener('click', removeDiv);
        div.appendChild(container);
    }
}

img.addEventListener('click', addDiv);


function close (e) {
    e.path[1].children[1].style.display = 'block';
    let kub = e.path[1];
    let my = kub.getBoundingClientRect();

    kub.onmousedown = function(e) {

        let coordinates = getCoordinates(kub);
        let mainDiv = div.getBoundingClientRect();
        let shiftX = e.pageX - coordinates.left;
        let shiftY = e.pageY - coordinates.top;

        kub.style.position = 'absolute';
        document.body.appendChild(kub);
        moveAt(e);

        kub.style.zIndex = 1000;

        function moveAt(e) {
            if(mainDiv.right > e.pageX && mainDiv.left < e.pageX && mainDiv.top < e.pageY && mainDiv.bottom > e.pageY){
                kub.style.left = e.pageX - shiftX + 'px';
                kub.style.top = e.pageY - shiftY + 'px';
            }

        }

        document.onmousemove = function(e) {
            moveAt(e);
        };

        kub.onmouseup = function() {
            document.onmousemove = null;
            kub.onmouseup = null;
        };

    }

}

function getCoordinates(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function removeDiv(e) {
    e.path[1].remove();
}
