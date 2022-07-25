const GameBoard = ((doc) => {
    /*
    - Display gameboard in DOM
    - Update board UI
     */
    const board = ['X', 'X', 'O', 'X', 'O', 'O', 'X', 'O', 'O']
    const fields = doc.querySelectorAll('.field')

    fields.forEach(field => {
        field.addEventListener('click', (e) => {
            console.log(e.target)
        })
    })

    const updateDisplay = () => {
        for (let i = 0; i < board.length; i++) {
            fields[i].textContent = board[i]
        }
    }

    return {
        updateDisplay,
    }
})(document)

const GameController = (() => {
    /*
    - Make Player move
    - Reset game
    - Determine winner or tie
     */
})()

const Player = (sign) => {
    /*
    - Get sign
     */
}

GameBoard.updateDisplay()
