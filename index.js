let main = document.querySelector('div');
let img = document.querySelector('img');

main.style.width = img.offsetWidth + 'px';
main.style.height = img.offsetHeight + 'px';
main.className = 'main';
main.id = 'id';

let input = document.querySelector('input');


function addDiv (e) {

    let container = document.createElement('div');

    container.className = 'container';

    let childDiv = document.createElement('div');


    childDiv.className = 'childDiv';

    let x = document.createElement('div');

    x.innerText = ' X';

    x.className = 'close';

    x.style.display = 'none';

    if(input.value !== ''){
        childDiv.innerText = input.value;
        input.value = '';

        container.style.top = e.y - main.offsetTop + 'px';
        container.style.left = e.x - main.offsetLeft - 25 + 'px';

        childDiv.addEventListener('click', close);

        x.addEventListener('click', removeDiv);

        container.appendChild(childDiv);
        container.appendChild(x);
        main.appendChild(container);
    }
}

main.addEventListener('click', addDiv);


function close (e) {
    e.path[1].children[1].style.display = 'block';

    let kub = e.path[1];

    let mainDiv = main.getBoundingClientRect();

    kub.onmousedown = function () {
        moveAt(e);

            function moveAt(e) {

                if(e.x > mainDiv.left && e.x < mainDiv.right){
                    kub.style.left = e.pageX - 240 - kub.offsetWidth / 2 + 'px';
                }
                if(e.y < mainDiv.bottom && e.y > mainDiv.top){
                    kub.style.top = e.pageY - 50 - kub.offsetHeight / 2 + 'px';
                }
            }

            document.onmousemove = function(e) {
                moveAt(e);
            };

            document.onmouseup = function() {
                document.onmousemove = null;
                kub.onmouseup = null;
            };
    };
}

function removeDiv(e) {
    e.path[1].remove();
}
