'use strict'

const GHOST = '👻'
var gGhosts = []

var gIntervalGhosts
var gGhostsDie = 0

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    gIntervalGhosts = setInterval(moveGhosts, 1000)

}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        color: getRandomColor(),
        currCellContent: FOOD
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
    // console.log('')
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL || nextCell === GHOST){
        moveGhost(ghost)
        return
    } 
    

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN && !gGame.isSuper) {
        gameOver()
        return
    }

    if (gGame.isSuper && nextCell === PACMAN) {
        killGhost(ghost.location.i, ghost.location.j)
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        renderCell(ghost.location, ghost.currCellContent)
        return
    }

    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span style="background-color:${ghost.color}; transform:rotate(+90deg); ">${GHOST}</span>`
}

function changeGhostColor() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        ghost.color = 'blue'
    }
}

function changeGhostColorBack() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        ghost.color = getRandomColor()
    }
}

function killGhost(i, j) {
    console.log('kill g');
    console.log(i, j);
    for (var n = 0; n < gGhosts.length; n++) {
        var currGhost = gGhosts[n]
        if (currGhost.location.i === i && currGhost.location.j === j) {
            if (currGhost.currCellContent === FOOD) {
                updateScore(1)
                gFoodCount++
            }
            gGhosts.splice(n, 1)
        }
    }
    gGhostsDie++
}

function renderGhosts() {
    for(var i = 0; i < gGhosts.length; i++){
        const currGhost = gGhosts[i]
        renderCell(currGhost.location, getGhostHTML(currGhost))
    }
}