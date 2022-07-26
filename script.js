const GameBoard = ((doc) => {
    /*
    - Display gameboard in DOM
    - Update board UI
     */
    const board = ['', '', '', '', '', '', '', '', '']
    const fields = doc.querySelectorAll('.field')

    fields.forEach(field => {
        field.addEventListener('click', (e) => {
            let playerMove = e.target.dataset.index
            GameController.makeMove(playerMove)
        })
    })

    const updateDisplay = () => {
        for (let i = 0; i < board.length; i++) {
            fields[i].textContent = board[i]
        }
    }

    const updateMessage = (str) => {
        let gameMessage = doc.querySelector('.message')
        gameMessage.textContent = str
    }

    return {
        board,
        updateDisplay,
        updateMessage,
    }
})(document)

const Player = (sign) => {
    this.sign = sign
    const getSign = () => {
        return sign
    }

    return {getSign}
}

const GameController = (() => {
    /*
    - Make Player move
    - Reset game
    - Determine winner or tie
     */
    const playerX = Player('X')
    const playerO = Player('O')
    const winScenarios = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const checkForWin = (player) => {
        winScenarios.forEach(arr => {
            if (arr.every(index => GameBoard.board[index] === player)) {
                GameBoard.updateMessage(`Player ${player} wins!`)
            }
        })
    }

    let turn = 1

    const makeMove = (index) => {
        let playerTurn = turn % 2 === 1 ? playerX.getSign() : playerO.getSign()
        let nextPlayer = playerTurn === 'X' ? 'O' : 'X'
        turn++

        GameBoard.board[index] = playerTurn
        GameBoard.updateDisplay()
        GameBoard.updateMessage(`Player ${nextPlayer}'s move.`)
        if (turn > 5) {
            checkForWin(playerTurn)
        }
    }

    return {
        makeMove,
        checkForWin,
    }
})()

GameBoard.updateDisplay()
