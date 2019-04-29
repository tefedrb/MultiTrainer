
const gameHUD = {
    settings: 10,
    winStreak: 0,
    best: 0,
    answers: [],
    factor: 0,
    findFactors: [],
    collectFactors: [],
    
    setTimer(setting){
        this.settings = setting
        return document.getElementById('timer-counter').innerHTML = setting
    },
    setFactor(num){
        this.factor = num
        return document.getElementById('rando-num').innerText = num
    },

    setWin(num){
        this.winStreak = num  
        return document.getElementById('win-streak').innerText = num
    },  
    
    setBest(num){
        this.best = num
        return document.getElementById('best-counter').innerText = num
    },

    countDown(num, idElement, func){   
        console.log(gameHUD.settings)
        document.getElementById(idElement).innerHTML = num
        const innerCountDown = setInterval(() => {
        document.getElementById(idElement).innerHTML--
        let htmlTimer = parseInt(document.getElementById(idElement).innerHTML)
        if(htmlTimer === 0){
                gameFunc.setDifficulty('clear', 10, 'buttons')
                clearInterval(innerCountDown)
                return func   
            }
        }, 1000)  
    },

    // Finds the factors of the input number (factors 3 - 12)
    isFactors(num){
        let iterateArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        this.collectFactors = []
        let firstRow = gameTable.firstRow
        iterateArr.forEach(function(i){
            firstRow.forEach(function(j){
                if(j * i === num) {
                    gameHUD.collectFactors.push(i)
                }
            })
        })
        return this.collectFactors
    },
   // Choose a random number based on the a tags created under '#inside-game'. Made to be easily updated.
   randomNumber(){
        // This saves the # value of the last child of #inside-game. 
        let highestNum = parseInt(document.getElementById('inside-game').lastChild.innerHTML)
        let chooseNum = 0
        let killSwitch = false;
        // This loop creates a random number and checks it against the collectNumbers array  
        while(!killSwitch) {  
            chooseNum = Math.floor(Math.random()*highestNum)  
            gameHUD.collectFactors.forEach(function(i){
                // Don't want a number below 12
                if(chooseNum === i && chooseNum > 12) {
                    killSwitch = true
                    return chooseNum
                }
            })
        }
        return chooseNum
    } 
 };


 const gameTable = {
    firstRow: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    fullChart: [],
    printRowN(addArr, addHere, createElement, chooseId){
        addArr.forEach(function(e){
            let target = document.getElementById(addHere)
            let newE = document.createElement(createElement)
            newE.setAttribute('href', '#')
            newE.id = chooseId + e
            newE.innerHTML = e
            gameHUD.collectFactors.push(e)
           return target.appendChild(newE)
        })
    },
    nextRowN(newRowArray, exampleArray){
        let holdZero = newRowArray[0] + 1
        let newArry = exampleArray.map(function(e){
            return e * holdZero
        })
        newArry.shift()
        newArry.unshift(holdZero)
        return newArry
    }, 

    renderTable(){
        let newArr = gameTable.firstRow
    for(let i = 1; i < 13; i++) {
        console.log('Iterate')
        gameTable.printRowN(newArr, 'inside-game', 'a', 'numOnBoard')   
        newArr = gameTable.nextRowN(newArr, gameTable.firstRow)    
    }  
    }
 };

 
 const gameFunc = {
     userInputArr: [],

    checkGame(check){
        let gameMessage = document.getElementById('game-messages')
    
        if(gameFunc.userInputArr === gameHUD.findFactors){
            gameMessage.prepend(document.createTextNode('Well done. Next round in...'))
            gameFunc.returnGame('win')
        }  
        if(winLoss === 'loss'){

        }
        if(winLoss === 'pending'){

        }
    },

    /* checkUserInput(num){
        if(userInputArr.includes(num)) {

        }
    }, */

    userInput(num){
        if (typeof num !== "number"){ 
            return console.log('Stop It')
        } 

        const currentRanNum = gameHUD.factor
        const isFactorsArr = gameHUD.isFactors(currentRanNum)
        console.log(isFactorsArr)
        const target = document.getElementById('answers')
        const newSpan = document.createElement('span')
        if(userInputtArr.includes(num)){
            return 
        }
        if(isFactorsArr.includes(num)){
                gameFunc.userInputArr.push(num)
                newSpan.classList.add('correct-user-input')
                newSpan.innerHTML = num
                if(isFactorsArr.reduce((a,b) => {
                    return a+b
                }) === gameFunc.userInputArr.reduce((a,b) => {
                    return a+b
                })) {
                    document.getElementById('rando-num').innerHTML = 'HIYA'
                        gameFunc.userInputArr = []
                        target.appendChild(newSpan) 
                        return gameFunc.returnGame('win') //next round!
                }
                return target.appendChild(newSpan) 
                }
        else {
            newSpan.classList.add('wrong-user-input')
            newSpan.innerHTML = num
            target.appendChild(newSpan)
            gameFunc.returnGame('loss')
            console.log('wrong answer: ' + num) //wrong answer!!
        }
        // might be able to simplify everything using this i/o here
        return num
    },

    setDifficulty(setting, duration, classN){
        gameHUD.settings = duration
        let selectAll = document.getElementsByClassName(classN)
        // Go through each element in the array and re-enable
        for(let i = 0; i < selectAll.length; i++){
            selectAll[i].disabled = false
        }
        //Named Item will search through the HTML collection (array of nodes) and find one with
        // a matching id in it's brackets
        if(setting !== 'clear'){
            selectAll.namedItem(setting).disabled = true
        } else {
            selectAll.namedItem('start-game').disabled = true
        }
    },

    resetGame(func){
        if(document.getElementById('start-game').disabled = true){
            gameFunc.setDifficulty('clear', gameHUD.settings, 'buttons')
        }
        let element = document.getElementById('answers')
        while(element.firstChild){
            element.removeChild(element.firstChild)
       }
       return func
    },

// Code for a win / loss - connects to user input
    returnGame(winLoss){
    console.log('made it through')
        if(winLoss === 'win') {
            gameHUD.winStreak++
            /* document.getElementById('win-counter').innerHTML++ */
            /* let winCounter = document.getElementById('win-counter').innerHTML
            let bestCounter = document.getElementById('best-counter').innerHTML */
            if(gameHUD.best < gameHUD.winStreak){
                gameHUD.best = gameHUD.winStreak
                document.getElementById('best-counter').innerHTML = gameHUD.best
            } 
            return document.getElementById('win-streak').innerHTML = gameHUD.winStreak
            
        } else if(winLoss === 'loss'){
            gameHUD.winStreak = 0
            return document.getElementById('win-streak').innerHTML = 0
            // return newRound('loss')
        }  
    } 
 };


// Input field event handler
document.getElementById('inputN').addEventListener('keydown', function(e){
    const keyC = e.keyCode
    let currentInput = 0
    if (keyC === 13){
        currentInput = parseInt(document.getElementById('inputN').value)
        gameFunc.userInput(currentInput)
        document.getElementById('inputN').value = ''
        console.log('done')
    }
})

// Show-table button event handler
document.getElementById('show-table').addEventListener('click', function(e){ 
    // Checks to see if table is already showing.
    if(document.querySelector('#numOnBoard1')) return;
    // Show game-hud
    document.getElementById('game-hud').style.display = 'block'
    // Show Buttons by adding a class to the corresponding elements using class 'buttons'
    let getButtons = document.getElementsByClassName('buttons')
    for(let i = 0; i < getButtons.length; i++){
        getButtons[i].style.display = 'block' /*
        maybe delete this from styles.css if all works
         classList.add('buttonsAppear\') */
    } 
    /* I'm using this function to grey out "start-game" until
     the user clicks on a difficulty */
    gameFunc.setDifficulty('start-game', 15, 'buttons')
    // This code sets up the multiplication chart
    gameTable.renderTable()  
}, false)


// Choosing difficulty - Selected setting will disable corresponding button and renable all others
// FUNCTION WITHIN A FUNCTION AND NOW THESE WORK??
document.getElementById('easy').addEventListener('click', ()=> {gameFunc.setDifficulty('easy', 15, 'buttons')})
document.getElementById('medium').addEventListener('click', ()=> {gameFunc.setDifficulty('medium', 10, 'buttons')})
document.getElementById('hard').addEventListener('click', ()=> {gameFunc.setDifficulty('hard', 5, 'buttons')})


// Start button event handler
document.getElementById('start-game').addEventListener('click', ()=> {startGame('Game Starts in...')})

const insertGameMessage = (message, duration, clock, func) => {
        const messageNode = document.getElementById('game-messages')
        const visualClock = document.getElementById('game-start-timer')
        let timer = parseInt(duration, 10)
        const innerFunction = func

        if(duration){   
                const messageTimer = setInterval(() => {
                    if(duration && clock){
                        visualClock.innerHTML = timer   
                        timer-- 
                    } else {
                        timer--
                    }
                if(timer === -1){
                        messageNode.textContent = ''
                        visualClock.textContent = ''
                        clearInterval(messageTimer)
                        return func()
                }
            }, 1000)
        }  
    return messageNode.innerHTML = message
}



const startGame = (message, timer = 3) => {
    gameFunc.resetGame()
    let allButtons = document.getElementsByClassName('buttons')
    for(let i = 0; i < allButtons.length; i++){
        allButtons[i].disabled = true
    }
    
    
    let gameMessage = document.getElementById('game-messages')
    gameMessage.prepend(document.createTextNode(message))

    document.getElementById('game-start-timer').innerHTML = timer
    
    const gameStartCount = setInterval(() => {
    document.getElementById('game-start-timer').innerHTML--
    let htmlTimer = parseInt(document.getElementById('game-start-timer').innerHTML)
    
    if(htmlTimer === 0){
            document.getElementById('game-messages').textContent = ''
            document.getElementById('game-start-timer').textContent = ''
            
            gameHUD.setFactor(gameHUD.randomNumber())

            console.log(gameHUD.settings)
            gameHUD.countDown(gameHUD.settings, 'timer-counter')
            clearInterval(gameStartCount)
        }
    }, 1000)
}



/*
const gameStartsMessage = (message, timer, func) => {
    let userInputFunction = func
    let gameMessage = document.getElementById('game-messages')
    gameMessage.prepend(document.createTextNode(message))
    
    document.getElementById('game-start-timer').innerHTML = timer
    
    const gameStartCount = setInterval(() => {
    document.getElementById('game-start-timer').innerHTML--
    let htmlTimer = document.getElementById('game-start-timer').innerHTML.value

    if(htmlTimer === 0){
            document.getElementById('game-messages').textContent = ''
            document.getElementById('game-start-timer').textContent = ''
            clearInterval(gameStartCount)
        }
    }, 1000)  
} */

// --------------------------------------------------------------------------------------------
                            /* Notes to self  */

// Choose random number from table that has factors

// Can you beat my score?? Time My Score

// On hitting return in the input field clear the field.

// Create functions for changing html etc.
 
// Functions within functions - call back functions - hoisting - the order of click handlers in the event loop

// --------------------------------------------------------------------------------------------

                        /* Extra Stuff/Pending */


/// this is inside the start-button handler 
/* let gameMessage = document.getElementById('game-messages')
    gameMessage.prepend(document.createTextNode('Game Starts in...'))

    document.getElementById('game-start-timer').innerHTML = 3
    
    const gameStartCount = setInterval(() => {
    document.getElementById('game-start-timer').innerHTML--
    let htmlTimer = parseInt(document.getElementById('game-start-timer').innerHTML)
    
    if(htmlTimer === 0){
            document.getElementById('game-messages').textContent = ''
            document.getElementById('game-start-timer').textContent = ''
            
            gameHUD.setFactor(gameHUD.randomNumber())

            console.log(gameHUD.settings)
            gameHUD.countDown(gameHUD.settings, 'timer-counter')
            clearInterval(gameStartCount)
        }
    }, 1000)   */




// The below code was all wrapped up in the event handler for the start button
/*
    const startGame = (message, timer, func) => {
        gameFunc.resetGame()
        let allButtons = document.getElementsByClassName('buttons')
        for(let i = 0; i < allButtons.length; i++){
            allButtons[i].disabled = true
        }
        
        
        let gameMessage = document.getElementById('game-messages')
        gameMessage.prepend(document.createTextNode('Game Starts in...'))
    
        document.getElementById('game-start-timer').innerHTML = 3
        
        const gameStartCount = setInterval(() => {
        document.getElementById('game-start-timer').innerHTML--
        let htmlTimer = parseInt(document.getElementById('game-start-timer').innerHTML)
        
        if(htmlTimer === 0){
                document.getElementById('game-messages').textContent = ''
                document.getElementById('game-start-timer').textContent = ''
                
                gameHUD.setFactor(gameHUD.randomNumber())
    
                console.log(gameHUD.settings)
                gameHUD.countDown(gameHUD.settings, 'timer-counter')
                clearInterval(gameStartCount)
            }
        }, 1000)
    }
    */