'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '🍓'
const CHERRY = '🍒'

var gFoodCountMax = -1
var gFoodCount = 0
var gIntervalCherry = 0

const gGame = {
    score: 0,
    isOn: false,
    isWin: false
}
var gBoard

function onInit() {
    gFoodCountMax = -1
    gFoodCount = 0
    gGame.isWin = false
    gGame.score = 0
    updateScore(0)

    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    const elPanel = document.querySelector('.endGamePanel')
    elPanel.style.display = 'none'
    gIntervalCherry = setInterval(addCherry, 15000)
    console.log(gFoodCountMax);
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gFoodCountMax++

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gFoodCountMax--
            }
        }
    }
    board[1][1] = SUPER_FOOD
    board[1][8] = SUPER_FOOD
    board[8][1] = SUPER_FOOD
    board[8][8] = SUPER_FOOD
    gFoodCountMax -= 4

    return board
}

function addCherry() {
    var emptyCells = getEmptyCells()
    if (!emptyCells.length ) return
    var randIndx = getRandomIntInclusive(0, emptyCells.length)
    var i = emptyCells[randIndx].i
    var j = emptyCells[randIndx].j
    gBoard[i][j] = CHERRY
    renderCell(emptyCells[randIndx], CHERRY)
    setTimeout(function () {
        gBoard[i][j] = EMPTY
        renderCell(emptyCells[randIndx], EMPTY)
    }, 5000);


}


function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function updateScore(diff) {
    // DONE: update model and dom

    // update model
    gGame.score += diff
    // update dom
    document.querySelector('.score').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '🪦')
    displayEndGamePanel()
    gGame.isOn = false
}

function CheckWin() {
    if (gFoodCountMax === gFoodCount) {
        console.log(gFoodCountMax,gFoodCount);
        gGame.isWin = true
        clearInterval(gIntervalGhosts)
        displayEndGamePanel()
        gGame.isOn = false
    }
}

function displayEndGamePanel() {
    clearInterval(gIntervalCherry)
    const elPanel = document.querySelector('.endGamePanel')
    elPanel.style.display = 'block'

    const elPanelText = document.querySelector('.endGamePanel h1')
    const elPanelBtn = document.querySelector('.endGamePanel button')
    if (gGame.isWin) {
        elPanelText.innerText = 'YOU WIN! 👍'
        elPanelBtn.innerText = 'Play Again'
    } else {
        elPanelText.innerText = 'YOU DIED ☠️'
        elPanelBtn.innerText = 'Restart'
    }

}

function getEmptyCells() {
    var emptyCell = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if(gBoard[i][j] === EMPTY) emptyCell.push({i,j})
        }
    }
    return emptyCell
}