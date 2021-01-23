const displayController = (()=>{
    const startMenu = document.querySelector(".start");
    const cpuMenu = document.querySelector(".cpu-selection");
    const gameScreen = document.querySelector(".game");
    const gameOverScreen = document.querySelector(".gameOver");
    const playAI = startMenu.getElementsByTagName("button")[0];
    const playFriend = startMenu.getElementsByTagName("button")[1];
    const title = document.querySelector(".title");
    
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
        game.startGame(player1, player2);
    });



    return {
        startMenu,
        cpuMenu,
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
            //TODO: Check if someone won
            changeActivePlayer();
            game.changeActiveTag();
        });
    })
    
    const clearGameBoard = () => {
        gameSpaces.forEach(gameSpace => {
            while(gameSpace.firstChild) {
                gameSpace.removeChild(gameSpace.firstChild);
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

    const getActiveTag = () => {
        return activePlayerTag;
    }
    const didWin = () => {

    }
    const startGame = (player1, player2) => {
        currentGame = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        gameBoard.changeTagName(gameBoard.player1Tag, player1.name);
        gameBoard.changeTagName(gameBoard.player2Tag, player2.name);
        activePlayerTag = "X";
        if(!gameBoard.player1Tag.classList.contains("player-one-turn")){
            gameBoard.changeActivePlayer();
        }
        gameBoard.clearGameBoard();
    }

    const changeActiveTag = () => {
        if(activePlayerTag == "X"){
            activePlayerTag = "O";
        } else if (activePlayerTag == "O"){
            activePlayerTag = "X";
        }
    }
    return {
        activePlayerTag,
        startGame,
        didWin,
        changeActiveTag,
        getActiveTag,
    };
})();

const Player = (name, gameToken) => {
    return { name, gameToken };
};