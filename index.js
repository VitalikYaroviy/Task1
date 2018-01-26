let mainDiv = document.querySelector('div');
let img = document.querySelector('img');

mainDiv.style.width = img.offsetWidth + 'px';
mainDiv.style.height = img.offsetHeight + 'px';
mainDiv.className = 'main';

let mainData = mainDiv.getBoundingClientRect();

let input = document.querySelector('input');
input.setAttribute('placeholder', 'Enter the text');
input.setAttribute('maxlength', '20');


const addDiv = (e) => {
    let container = document.createElement('div');
    container.className = 'container';
    let childDiv = document.createElement('div');
    childDiv.className = 'childDiv';
    let closeDiv = document.createElement('div');
    closeDiv.innerText = ' X';
    closeDiv.className = 'close';
    closeDiv.style.display = 'none';
    checkingCoordinates(mainData, container);

    if (input.value !== '') {
        childDiv.innerText = input.value;

        input.value = '';

        container.style.top = e.y - mainDiv.offsetTop + 'px';
        container.style.left = e.x - mainDiv.offsetLeft - 30 + 'px';

        closeDiv.addEventListener('click', removeElement);

        container.appendChild(childDiv);
        container.appendChild(closeDiv);
        mainDiv.appendChild(container);
        container.addEventListener('click', moveContainer);
        checkingCoordinates(mainData, container);

    }
};

mainDiv.addEventListener('click', addDiv);


const moveContainer = (e) => {
    let element = e.currentTarget;
    let elementData = element.getBoundingClientRect();
    element.getElementsByClassName('close')[0].style.display = 'block';


    element.addEventListener('mousedown', function () {
        e.preventDefault();
        moveElement(e);

        function moveElement(e) {
            if ((e.x + (elementData.width / 2)) < mainData.right) {
                element.style.left = e.pageX - mainData.x - element.offsetWidth / 2 + 'px';
                checkingCoordinates(mainData, element);
            }

            if (e.y < mainData.top) {
                element.style.top = mainData.top - mainData.bottom + 'px';
            }

            if (e.y > mainData.bottom) {
                element.style.top = mainData.bottom - mainData.top - 32 + 'px';
            }

            if ((e.x + (elementData.width / 2)) > mainData.right) {
                element.style.left = mainData.right - mainData.left - elementData.width - elementData.height + 24 + 'px';
                checkingCoordinates(mainData, element);
            }

            if (e.y + 17 < mainData.bottom && e.y > mainData.top) {
                element.style.top = e.pageY - 50 - element.offsetHeight / 2 + 'px';
            }

            checkingCoordinates(mainData, element);
        }

        document.onmousemove = function (e) {
            moveElement(e);
            checkingCoordinates(mainData, element);
        };

        document.onmouseup = function () {
            document.onmousemove = null;
        };
    });

    element.addEventListener('touchstart', function (e) {
        let touch = e.targetTouches[0];
        element.style.left = touch.pageX - 250 + 'px';
        element.style.top = touch.pageY - 30 + 'px';
    });


    element.addEventListener('touchmove', function (e) {
        e.preventDefault();
        moveMobil(e);

        function moveMobil(e) {
            let touch = e.targetTouches[0];
            if (touch.pageX > mainData.left + 24 && touch.pageX + elementData.width - 17 < mainData.right) {
                element.style.left = touch.pageX - 260 + 'px';
            }
            if (touch.pageX < mainData.left) {
                element.style.left = mainData.left - mainData.right + 'px'
            }
            if (touch.pageX > mainData.right) {
                element.style.left = mainData.right - mainData.left - elementData.width - 20 + 'px'
            }
            if (touch.pageY < mainData.bottom - 30 && touch.pageY > mainData.top) {
                element.style.top = touch.pageY - mainDiv.offsetTop + 'px';
            }
            if (touch.pageY > mainData.bottom) {
                element.style.top = mainData.bottom - mainData.top - 25 + 'px';
            }
            if (touch.pageY < mainData.top) {
                element.style.top = mainData.top - mainData.bottom + 'px'
            }

            if (elementData.right >= (mainData.right - 30)) {
                element.style.flexDirection = 'row-reverse';
            }
            checkingCoordinates(mainData, element)
        }
    })
};

const removeElement = (e) => {
    e.currentTarget.parentNode.remove();
};

const checkingCoordinates = (mainData, element) => {
    let elementData = element.getBoundingClientRect();

    if (mainData.top > elementData.top) {
        element.style.top = parseFloat(element.style.top) - (elementData.top - mainData.top) + 'px';
    }

    if (mainData.bottom < elementData.bottom) {
        element.style.bottom = parseFloat(element.style.bottom) - (elementData.bottom - mainData.bottom) + 'px';
    }

    if (mainData.right < elementData.right) {
        element.style.right = parseFloat(element.style.right) - (elementData.right - mainData.right) + 'px';
    }

    if (mainData.left > elementData.left) {
        element.style.left = parseFloat(element.style.left) - (elementData.left - mainData.left) + 'px'
    }

    revers(elementData, element)
};

const revers = (elementData, element) => {
    if (elementData.right >= (mainData.right - 30)) {
        element.style.flexDirection = 'row-reverse';
        elementData = element.offsetLeft + 'px'
    }
    if (elementData.right < mainData.right) {
        element.style.flexDirection = 'row'
    }
};