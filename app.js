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

    });



    return {
        startMenu,
        cpuMenu,
    };
})();


const gameBoard = (()=>{

    return {

    };
})();