'use strict'

const PACMAN = '🪲'
var gPacman
var gDegPacMan = 0

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    // DONE: use getNextLocation(), nextCell
    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST && !gGame.isSuper) {
        gameOver()
        return
    }

    if (gGame.isSuper && nextCell === GHOST) {
        killGhost(nextLocation.i, nextLocation.j)
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gFoodCount++
        CheckWin()
    }

    if (nextCell === CHERRY) {
        updateScore(10)
        gFoodCount += 10
        gFoodCountMax += 10
    }

    if (nextCell === SUPER_FOOD) {
        if (gGame.isSuper) return
        gGame.isSuper = true
        gGhostsDie = 0
        changeGhostColor()
        renderGhosts()
        setTimeout(function () {
            gGame.isSuper = false
            changeGhostColorBack()
            for (var i = 0; i < gGhostsDie; i++) {
                createGhost(gBoard)
            }
        }, 5000);



    }

    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, getPacManHTML())
}

function getNextLocation(eventKeyboard) {

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            gDegPacMan = 0
            break;
        case 'ArrowRight':
            nextLocation.j++
            gDegPacMan = 90
            break;
        case 'ArrowDown':
            nextLocation.i++
            gDegPacMan = 180
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gDegPacMan = 270
            break;
    }
    return nextLocation
}

function getPacManHTML() {
    return `<span style="display: inline-block;transform: rotate(${gDegPacMan}deg);">🪲</span>`
}