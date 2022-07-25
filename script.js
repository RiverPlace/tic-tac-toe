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
            console.log('Player Move: ', playerMove)
            GameController.makeMove(playerMove)
        })
    })

    const updateDisplay = () => {
        for (let i = 0; i < board.length; i++) {
            fields[i].textContent = board[i]
        }
    }

    return {
        board,
        updateDisplay,
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
    let turn = 1

    const makeMove = (index) => {
        let playerTurn = turn % 2 === 1 ? playerX.getSign() : playerO.getSign()
        turn++

        GameBoard.board[index] = playerTurn
        GameBoard.updateDisplay()
    }

    return {
        makeMove,
    }
})()

GameBoard.updateDisplay()
