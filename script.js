const GameBoard = ((doc) => {
    let board = ['', '', '', '', '', '', '', '', '']
    const fields = doc.querySelectorAll('.field')

    fields.forEach(field => {
        field.addEventListener('click', (e) => {
            let playerMove = e.target.dataset.index
            if (board[playerMove]) return
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

    const resetGame = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = ''
        }
        fields.forEach(field => field.textContent = '')
    }

    return {
        board,
        updateDisplay,
        updateMessage,
        resetGame,
    }
})(document)

const Player = (sign) => {
    const getSign = () => sign
    return {getSign}
}

const GameController = (() => {
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
    let turn = 1

    const checkForWin = (player) => {
        let win = false
        winScenarios.forEach(arr => {
            if (arr.every(index => GameBoard.board[index] === player)) {
                win = true
            }
        })
        return win
    }

    const makeMove = (index) => {
        const playerMove = turn % 2 === 1 ? playerX.getSign() : playerO.getSign()
        const nextPlayer = playerMove === 'X' ? 'O' : 'X'
        GameBoard.board[index] = playerMove

        if (checkForWin(playerMove)) {
            console.log('WIN!!!')
            GameBoard.updateMessage(`Player ${playerMove} wins!`)
            GameBoard.resetGame()
            turn = 1
            return
        }
        // console.log('Board: ', GameBoard.board)
        // console.log('Move: ', playerMove)

        turn++

        GameBoard.updateDisplay()
        GameBoard.updateMessage(`Player ${nextPlayer}'s move.`)
        
        if (turn > 5) {
            checkForWin(playerMove)
        }
    }

    return {
        makeMove,
    }
})()

GameBoard.updateDisplay()
