const displayController = (()=>{
    const startMenu = document.querySelector(".start");
    const cpuMenu = document.querySelector(".cpu-selection");
    const gameScreen = document.querySelector(".game");
    const gameOverScreen = document.querySelector(".gameOver");
    const playAI = startMenu.getElementsByTagName("button")[0];
    const playFriend = startMenu.getElementsByTagName("button")[1];
    const title = document.querySelector(".title");
    const result = document.querySelector(".result");
    const mainMenu = document.querySelector(".mainMenu");
    const restart = document.querySelector(".restart");
    const cpuDifficulty = Array.from(cpuMenu.getElementsByTagName("button"));

    cpuDifficulty.forEach((difficulty, index) =>{
        difficulty.addEventListener('click', ()=>{
            cpuMenu.classList.toggle("toggle-display");
            title.classList.toggle("toggle-display");
            gameScreen.classList.toggle("toggle-display");
            const player1 = Player('Player 1', 'X');
            const player2 = Player('AI', 'O');
            if(index == 0){
                game.startGame(player1, player2, "AI", "Normal");
            } else {
                game.startGame(player1, player2, "AI", "Unbeatable");
            }
            
        });
    });
    
    playAI.addEventListener("click", ()=>{
        startMenu.classList.toggle("toggle-display");
        cpuMenu.classList.toggle("toggle-display");
    });

    playFriend.addEventListener("click", ()=>{
        startMenu.classList.toggle("toggle-display");
        title.classList.toggle("toggle-display");
        gameScreen.classList.toggle("toggle-display");
        const player1 = Player('Player 1', 'X');
        const player2 = Player('Player 2', 'O');
        game.startGame(player1, player2, "Multiplayer", "Normal");
    });

    mainMenu.addEventListener("click", ()=>{
        location.reload();
    });

    restart.addEventListener("click", ()=>{
        gameOverScreen.classList.toggle("toggle-display");
        gameScreen.classList.toggle("toggle-display");
        const player1 = Player(gameBoard.player1Tag.innerText, 'X');
        const player2 = Player(gameBoard.player2Tag.innerText, 'O');
        game.startGame(player1, player2, game.getGameMode(), game.getGameDifficulty());
    });

    const gameOver = (gameResult) => {
        gameScreen.classList.toggle("toggle-display");
        if(gameResult == "Tie"){
            result.innerText = "Tie Game!";
        } else {
            if(game.getActiveTag() == "X"){
                result.innerText = `${gameBoard.player1Tag.innerText} Wins!`;
            } else {
                result.innerText = `${gameBoard.player2Tag.innerText} Wins!`;
            }
        }
        
        gameOverScreen.classList.toggle("toggle-display");
    }

    return {
        startMenu,
        cpuMenu,
        gameOver,
    };
})();


const gameBoard = (()=>{
    const gameSpaces = document.querySelectorAll(".game-square");
    const playerTags = document.querySelector(".playerTags");
    const player1Tag = playerTags.getElementsByTagName("p")[0];
    const player2Tag = playerTags.getElementsByTagName("p")[1];

    gameSpaces.forEach((gameSpace, index) => {
        gameSpace.addEventListener("click", ()=>{
            addNewPiece(index, game.getActiveTag());
            gameSpace.disabled = true;
            game.modifyGame(index);

            if(game.didWin(game.getActiveTag())){
                displayController.gameOver("Winner");
                return
            } else if(game.tieGame()){
                displayController.gameOver("Tie");
                return
            }

            changeActivePlayer();
            game.changeActiveTag();
            if(game.getGameMode() == "AI" && game.getActiveTag() == "O"){
                let AIindex;
                if(game.getGameDifficulty() == "Normal"){
                    AIindex = game.normalAIMove();
                    gameSpaces[AIindex].click();
                } else if(game.getGameDifficulty() == "Unbeatable"){
                    AIindex = game.unbeatableAIMove();
                    gameSpaces[AIindex].click();
                }
            }
        });
    })
    
    const clearGameBoard = () => {
        gameSpaces.forEach(gameSpace => {
            while(gameSpace.firstChild) {
                gameSpace.removeChild(gameSpace.firstChild);
                if(gameSpace.disabled){
                    gameSpace.disabled = false;
                }
            }
        })
    }
    
    
    const addNewPiece = (index, activeTag) => {
        const gamePiece = document.createElement("img");
        gamePiece.classList.add("game-piece");
        gamePiece.src = `./img/${activeTag}.svg`;
        gameSpaces[index].appendChild(gamePiece);

    }

    const changeActivePlayer = () => {
        player1Tag.classList.toggle("player-one-turn");
        player2Tag.classList.toggle("player-two-turn");
    }

    const changeTagName = (tag, name) => {
        tag.innerText = name;
    }
    return {
        player1Tag,
        player2Tag,
        changeTagName,
        changeActivePlayer,
        clearGameBoard,
    };
})();

const game = (()=>{
    let currentGame = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    let activePlayerTag = "X";
    let gameMode = "Multiplayer";
    let gameDifficulty = "Normal";

    const getGameMode = () => gameMode;

    const getGameDifficulty = () => gameDifficulty;

    const getActiveTag = () => {
        return activePlayerTag;
    }

    const tieGame = () => {
        isFilled = true;
        currentGame.forEach(gameSpace => {
            if(gameSpace == " "){
                isFilled = false;
            }
        });
        return isFilled;
    }

    const didWin = (activeTag) => {
        if(currentGame[0] == activeTag && currentGame[1] == activeTag && currentGame[2] == activeTag){
            return true;
        } else if(currentGame[3] == activeTag && currentGame[4] == activeTag && currentGame[5] == activeTag){
            return true;
        } else if(currentGame[6] == activeTag && currentGame[7] == activeTag && currentGame[8] == activeTag){
            return true;
        } else if(currentGame[0] == activeTag && currentGame[3] == activeTag && currentGame[6] == activeTag){
            return true;
        } else if(currentGame[1] == activeTag && currentGame[4] == activeTag && currentGame[7] == activeTag){
            return true;
        } else if(currentGame[2] == activeTag && currentGame[5] == activeTag && currentGame[8] == activeTag){
            return true;
        } else if(currentGame[0] == activeTag && currentGame[4] == activeTag && currentGame[8] == activeTag){
            return true;
        } else if(currentGame[2] == activeTag && currentGame[4] == activeTag && currentGame[6] == activeTag){
            return true;
        } else {
            return false;
        }
    }

    const modifyGame = (index) => {
        currentGame[index] = activePlayerTag;
    }

    const startGame = (player1, player2, mode, difficulty) => {
        currentGame = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        gameBoard.changeTagName(gameBoard.player1Tag, player1.name);
        gameBoard.changeTagName(gameBoard.player2Tag, player2.name);
        activePlayerTag = "X";
        if(!gameBoard.player1Tag.classList.contains("player-one-turn")){
            gameBoard.changeActivePlayer();
        }
        gameBoard.clearGameBoard();
        gameMode = mode;
        gameDifficulty = difficulty;
    }

    const changeActiveTag = () => {
        if(activePlayerTag == "X"){
            activePlayerTag = "O";
        } else if (activePlayerTag == "O"){
            activePlayerTag = "X";
        }
    }

    const normalAIMove = () => {
        let availableSpaces = [];
        currentGame.forEach((gameSpace, index) => {
            if(gameSpace == " "){
                availableSpaces.push(index);
            }
        });

        return availableSpaces[Math.floor(Math.random()*availableSpaces.length)];
        
    }

    const minimax = (newBoard, player) => {
        let availableSpots = emptyIndexies(newBoard);

        if (winning(newBoard, "X")){
            return {score: -10};
        } else if(winning(newBoard, "O")){
            return {score: 10};
        } else if(availableSpots.length === 0){
            return {score: 0};
        }

        let moves = [];

        for(let i = 0; i < availableSpots.length; i++){
            let move = {};
            move.index = newBoard[availableSpots[i]];
            newBoard[availableSpots[i]] = player;

            if(player == "O"){
                let result = minimax(newBoard, "X");
                move.score = result.score;
            } else {
                let result = minimax(newBoard, "O");
                move.score = result.score;
            }

            newBoard[availableSpots[i]] = move.index;

            moves.push(move);
        }

        let bestMove;
        if(player === "O"){
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    }

    const emptyIndexies = (board) => {
        return  board.filter(s => s != "O" && s != "X");
    }

    const winning = (board, player) =>{
        if(
            (board[0] == player && board[1] == player && board[2] == player) ||
            (board[3] == player && board[4] == player && board[5] == player) ||
            (board[6] == player && board[7] == player && board[8] == player) ||
            (board[0] == player && board[3] == player && board[6] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) ||
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[0] == player && board[4] == player && board[8] == player) ||
            (board[2] == player && board[4] == player && board[6] == player)
            ) {
            return true;
        } else {
            return false;
        }
    }

    const unbeatableAIMove = () => {
        let currentCopy = [];
        currentGame.forEach((space,index) =>{
            if(space == " "){
                currentCopy.push(index);
            } else {
                currentCopy.push(space);
            }
        });
        let bestSpot = minimax(currentCopy, "O");
        return bestSpot.index;
    }

    return {
        activePlayerTag,
        startGame,
        didWin,
        changeActiveTag,
        getActiveTag,
        modifyGame,
        tieGame,
        getGameMode,
        getGameDifficulty,
        normalAIMove,
        unbeatableAIMove,
    };
})();

const Player = (name, gameToken) => {
    return { name, gameToken };
};