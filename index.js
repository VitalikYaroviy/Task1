let main = document.querySelector('div');
let img = document.querySelector('img');

main.style.width = img.offsetWidth + 'px';
main.style.height = img.offsetHeight + 'px';
main.className = 'main';

let mainDiv = main.getBoundingClientRect();

let input = document.querySelector('input');


function addDiv(e) {
    let container = document.createElement('div');
    container.className = 'container';
    let childDiv = document.createElement('div');
    childDiv.className = 'childDiv';
    let x = document.createElement('div');
    x.innerText = ' X';
    x.className = 'close';
    x.style.display = 'none';

    if (input.value !== '') {
        childDiv.innerText = input.value;
        input.value = '';

        container.style.top = e.y - main.offsetTop + 'px';
        container.style.left = e.x - main.offsetLeft - 25 + 'px';

        childDiv.addEventListener('click', close);

        x.addEventListener('click', removeDiv);

        container.appendChild(childDiv);
        container.appendChild(x);
        main.appendChild(container);
        checkingCoordinates(mainDiv, container);

    }
}

main.addEventListener('click', addDiv);

function close(e) {
        let kub = e.path[1];
        let data = kub.getBoundingClientRect();
        e.path[1].children[1].style.display = 'block';
        let body = document.body;

        kub.onmousedown = function () {
            e.preventDefault();
            moveAt(e);

            function moveAt(e) {
                if ((e.x + (data.width / 2)) < mainDiv.right)  {
                    kub.style.left = e.pageX - mainDiv.x - kub.offsetWidth / 2 + 'px';
                    checkingCoordinates(mainDiv, kub);
                }

                if (e.y + 17 < mainDiv.bottom && e.y > mainDiv.top) {
                    kub.style.top = e.pageY - 50 - kub.offsetHeight / 2 + 'px';
                }

                checkingCoordinates(mainDiv, kub);
            }

            document.onmousemove = function (e) {
                moveAt(e);
            };

            body.onmouseup = function () {
                document.onmousemove = null;
                body.onmouseup = null;
            };
        };

        kub.addEventListener('touchmove', function (e) {

            e.preventDefault();
            moveMobil(e);
            revers(data, kub);
            function moveMobil(e) {
                let touch = e.targetTouches[0];
                if (touch.pageX > mainDiv.left + 24 && touch.pageX + data.width - 17  < mainDiv.right) {
                    kub.style.left = touch.pageX - 260 + 'px';
                }
                if (touch.pageY < mainDiv.bottom - 30 && touch.pageY > mainDiv.top) {
                    kub.style.top = touch.pageY - main.offsetTop + 'px';
                }
                checkingCoordinates(mainDiv, kub)
            }
        })
}


function removeDiv(e) {
    e.path[1].remove();
}

function checkingCoordinates(mainDiv, kub) {
    let data = kub.getBoundingClientRect();

    if (mainDiv.top > data.top) {
        kub.style.top = parseFloat(kub.style.top) - (data.top - mainDiv.top) + 'px';
    }

    if (mainDiv.bottom < data.bottom) {
        kub.style.bottom = parseFloat(kub.style.bottom) - (data.bottom - mainDiv.bottom) + 'px';
    }

    if (mainDiv.right < data.right) {
        kub.style.right = parseFloat(kub.style.right) - (data.right - mainDiv.right) + 'px';
    }

    if (mainDiv.left > data.left) {
        kub.style.left = parseFloat(kub.style.left) - (data.left - mainDiv.left) + 'px'
    }

    revers(data, kub)
}

function revers(data, kub) {

    if (data.right >= (mainDiv.right - 30)) {
        kub.style.flexDirection = 'row-reverse'
    }
}
