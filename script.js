




const cellElements = document.querySelectorAll('[data-cell]')

const board = document.getElementById('data-board')

const winningMessageTextElement = document.getElementById('winning-message-text')

const winningMessage = document.getElementById('winning-message')

const button = document.getElementById('winning-message-button')

let isCircleTurn;

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const startGame = () => {
    isCircleTurn = false


    for(const cell of cellElements){
        cell.classList.remove('circle')
        cell.classList.remove('x')
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click',handleClick,{once: true})
    }
    setBoardHoverclass()
winningMessage.classList.remove('show-winning-message')

}

const endGame = (isdraw) => {
    if(isdraw){
    winningMessageTextElement.innerText = 'Empate!'
    }else{
        winningMessageTextElement.innerText = isCircleTurn ? 'Bola Venceu!' : 'X Venceu!'
    }
    winningMessage.classList.add('show-winning-message')
}



let checkForWin = (currentPlayer) => {

    return winningCombinations.some((combination) =>{
    return combination.every((index) =>{
        return cellElements[index].classList.contains(currentPlayer)
    })
    })

}

const checkForDraw = () => {
    return [...cellElements].every(cell=>{
        return cell.classList.contains('x') || cell.classList.contains('circle')
    })
}

const placeMark = (cell, classToAdd) =>{

    cell.classList.add(classToAdd);

}

const setBoardHoverclass = () =>{
    board.classList.remove('circle')
    board.classList.remove('x')


    if(isCircleTurn){
        board.classList.add('circle')
        
    }else{
        board.classList.add('x')
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverclass()
  
}

const handleClick = (e) => {
//colocar a marca (X ou Circle)

const cell = e.target

    const classToAdd = isCircleTurn ? "circle" : "x";

    
placeMark(cell,classToAdd);{
    

//virificar por vitoria

const isWin = checkForWin(classToAdd)

//verificar por empate
const isDraw = checkForDraw();

if(isWin){
    endGame(false)
}else if(isDraw){
    endGame(true)
}else{}

//mudar o simbolo

swapTurns()


}


}

startGame()

button.addEventListener('click',startGame)
