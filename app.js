const board = document.querySelector('#board');
const reset = document.querySelector('#reset');
const color_selected = document.querySelectorAll('#color_selected');
const border = document.querySelector('#border')
const clear = document.querySelector('#clear')

let size = 16
let color = "black";
let border_value = 1;

window.addEventListener('load' , setDefaultBoard);
reset.addEventListener("click", changeSize);
color_selected.forEach(color_selected => color_selected.addEventListener("click", selectColor));
border.addEventListener('click', formBorder);
clear.addEventListener('click', clear_all)


function setDefaultBoard() {
    setBoard(size)
    fillBoard(size)
}

function setBoard(size){
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}

function fillBoard(size) {

    for (let i = 0; i < size*size; i++) {
        const box = document.createElement('div');
        box.classList = "grid-element";
        box.addEventListener("mouseover", changeColor);
        board.appendChild(box);
    }
}

function selectColor(e){
    switch (e.target.dataset.color){
        case 'rainbow':
            color = 'rainbow';
            break;  
        case 'grey':
            color = 'grey';
            break;
        case 'eraser':
            color = 'eraser';
            break;
        default:
            color = 'black';
            break;
    }
}

function changeColor(e) {
    switch(color){
        case 'rainbow':
            let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
            e.target.style.backgroundColor = randomColor;
            break;
        case 'eraser':
            e.target.style.backgroundColor = "#ffffff";
            break;
        case 'grey' :
            let value = Math.random() * 0xFF | 0;
            let grayscale = (value << 16) | (value << 8) | value;
            let randomGrey = '#' + grayscale.toString(16);
            e.target.style.backgroundColor = randomGrey;
            break;
        default:
            e.target.style.backgroundColor = "#000000"
    }
}

function changeSize() {
    let newSize = prompt("Enter new size");

    if (newSize !== null){
        newSize = parseInt(newSize);

        if (newSize < 1 || Number.isNaN(newSize)) {
            alert("Enter a number from 1-64 range");
            changeSize();
        } else {
            size = newSize
            clearBoard();
            setBoard(size);
            fillBoard(size);
        }
    }
}

function clearBoard() {
    const boardArray = Array.from(board.childNodes);
    boardArray.forEach((element) => {
        board.removeChild(element);
    });
}

function formBorder(){
    if (border_value == 1){
        border_value = 0;
        const boardArray = Array.from(board.childNodes);
        boardArray.forEach((element) => {
            element.style.border = 'none';
        })
    } else {
        border_value = 1;
        const boardArray = Array.from(board.childNodes);
        boardArray.forEach((element) => {
            element.style.border = '1px solid';
        })
    }
}

function clear_all(){
    clearBoard();
    setBoard(size);
    fillBoard(size);
}