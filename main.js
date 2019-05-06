
const toggleInput = (t) => {
    const userInput = document.querySelector('#inputN')
    if(t === 'on'){
        userInput.disabled = false
        userInput.setAttribute('placeholder', '#');
        return userInput.focus()
    } else {
        userInput.setAttribute('placeholder', 'X');
        return userInput.disabled = true
    }
}

toggleInput()

function insertGameMessage(message, duration, clock, func, val){
    const messageNode = document.getElementById('game-messages')
    const visualClock = document.getElementById('game-start-timer')
    let timer = parseInt(duration, 10)
    if(typeof duration === 'string') {
        visualClock.innerHTML = duration
    }
        if(typeof duration === 'number'){   
            const messageTimer = setInterval(() => {
                if(duration && clock){
                    visualClock.innerHTML = timer   
                    timer-- 
                } else {
                    timer--
                }
                if (timer === -1 && func) {
                    messageNode.textContent = ''
                    visualClock.textContent = ''
                    func(val)
                    return clearInterval(messageTimer)
                }
                if(timer === -1){
                    messageNode.textContent = ''
                    visualClock.textContent = ''
                    return clearInterval(messageTimer)
                }
            }, 1000)
        }  
    return messageNode.innerHTML = message
}


function buttonDisplay(toggleAll, except, exceptToggle, stopOff){
    let exempt = document.querySelector('#' + except)
    let allButtons = document.getElementsByClassName('buttons')
    let stopButton = stopOff
        for(let i = 0; i < allButtons.length; i++){
            allButtons[i].disabled = toggleAll
        }
        if(except){
            exempt.disabled = exceptToggle
            console.log('Passed the except conditional')
        }
        if(stopButton === 'stopon'){
            document.getElementById('stop-game').disabled = false 
            console.log('Passed the stopbutton conditional')
         } else {
            document.getElementById('stop-game').disabled = true
         }
    } 
 


// Check this with CD to figure out how to reset game / check game for conditions / stop setInterval
// Might need to refer to a global variable for a kill switch
function startGame(message, timer = 3){
    toggleInput()
    //button Display
    buttonDisplay(true, undefined, undefined, 'stopon')
    /* document.getElementById('stop-game').disabled = false */
    if(gameHUD.gameOn === false){
        return resetGame('advanced')
    }
    insertGameMessage(message)

    document.getElementById('game-start-timer').innerHTML = timer
    
    const gameStartCount = setInterval(() => {
        // THIS IS AT THE BOTTOM OF THE GAME
        document.getElementById('game-start-timer').innerHTML--
        let htmlTimer = parseInt(document.getElementById('game-start-timer').innerHTML)
    
        if (htmlTimer === 0 || htmlTimer < 0){
                // New addition - trying to fix issues
                toggleInput('on')
                document.getElementById('game-messages').textContent = ''
                document.getElementById('game-start-timer').textContent = ''
                
                gameHUD.setFactor(gameHUD.randomNumber())
                
                clearInterval(gameStartCount)
                // This should always be the first time gameOn becomes true
                gameHUD.gameOn = true
                //This is part of the gameOn loop
            return gameHUD.countDown(gameHUD.settings, 'timer-counter', gameFunc.checkGame)   
        }
    }, 1000)
}



// Choosing difficulty - Selected setting will disable corresponding button and renable all others
// FUNCTION WITHIN A FUNCTION AND NOW THESE WORK??



document.getElementById('easy').addEventListener('click', ()=> {gameFunc.setDifficulty('easy', 15, true)})
document.getElementById('medium').addEventListener('click', ()=> {gameFunc.setDifficulty('medium', 10, true)})
document.getElementById('hard').addEventListener('click', ()=> {gameFunc.setDifficulty('hard', 5, true)})

// Start button event handler // I added a reset game paramater
document.getElementById('start-game').addEventListener('click', ()=> {
    gameHUD.gameOn = true
    startGame('New Round Starts in...', 5)})

// Stop button event handler
document.getElementById('stop-game').addEventListener('click', ()=>{stopGame()})

function stopGame(){
    toggleInput()
    gameHUD.gameOn = false;
    gameFunc.resetGame('basic')
}



// Input field event handler (after hitting enter)
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
    gameFunc.setDifficulty('start-game', 15)
    // By default we want the stop-game button disabled until we start the game
    document.getElementById('stop-game').disabled = true
    // This code sets up the multiplication chart
    gameTable.renderTable()  
}, false)



const gameHUD = {
    settings: 10,
    winStreak: 0,
    best: 0,
    // Collects user inputs
    rightInputs: [],
    wrongInputs: [],
    factor: 0,
    // This array gathers the factors of the current number to be factored
    collectFactors: [],
    ranNumFactors: [],
    gameOn: false,
    
    setTimer(setting){
        this.settings = setting
        return document.getElementById('timer-counter').innerHTML = setting
    },
    setFactor(num){
        this.factor = num
        document.getElementById('rando-num').innerText = ''
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

    /* This method is responsible for the game timer (might need to make the htmlTimer 
        variable global in order to stop this started by setInterval) */
    countDown(num, idElement, func, fSettings){   
        console.log(gameHUD.settings)
        document.getElementById(idElement).innerHTML = num
        
        const innerCountDown = setInterval(() => {
        document.getElementById(idElement).innerHTML--
        let gameClock = parseInt(document.getElementById(idElement).innerHTML)
        // if(checkGame)

        if(gameHUD.gameOn === false){
            return clearInterval(innerCountDown)
        }

        if(gameClock === 0 || gameClock < 0){
                // Part of gameOn loop affecting while loop maybe
                gameFunc.setDifficulty('clear', num)
                clearInterval(innerCountDown)
                return func(fSettings)   
            }
        }, 1000)  
    },

    // Finds the factors of the input number (factors 2 - 12)
    isFactors(num){
        let iterateArr = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        this.ranNumberFactors = []
        let firstRow = gameTable.firstRow
        iterateArr.forEach(function(i){
            firstRow.forEach(function(j){
                if(j * i === num) {
                    gameHUD.ranNumberFactors.push(i)
                }
            })
        })
        return this.ranNumberFactors
    },
   // Choose a random number based on the a tags created under '#inside-game'. Made to be easily updated.
   randomNumber(){
        // This saves the # value of the last child of #inside-game. 
        let highestNum = parseInt(document.getElementById('inside-game').lastChild.innerHTML)
        let chooseNum = 0
        let killSwitch = false;

        // Searches for a random number that fits the given parameters
        while(killSwitch === false) {  
            chooseNum = Math.floor(Math.random()*highestNum)  
            gameHUD.collectFactors.forEach(function(i){
                // Don't want a number below 12
                if(chooseNum === i && chooseNum > 12) {
                    killSwitch = true
                    return chooseNum
                }
                console.log('went through WHILE LOOP')
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
    
    // Checks status of game, i.e. If difficultly is high, check to see if there are too many wrong inputs
    checkGame(check){
        // Checks if game clock is at zero (write code here...)
        let gameClock = parseInt(document.querySelector('#timer-counter').innerHTML)
        
        // This also seems to be creating the game loop
        
        if(gameClock === 0 || gameClock < 0){
            gameFunc.resetGame('advanced', `Time's Up!`)
            gameFunc.returnGame('loss')
            return startGame('New Round Starts in...', 3)
        }
        // Checks game difficulty and runs a check for amount of wrong guesses by user accordingly
        if(gameHUD.settings === 5) {
            if(gameHUD.wrongInputs.length > 1){
                gameFunc.resetGame('advanced', 'ಥ_ಥ')
                gameFunc.returnGame('loss')
                return startGame('Too many guesses. New Round Starts in...', 3)  
            }
        }
        if(gameHUD.settings === 10) {
            if(gameHUD.wrongInputs.length > 2){
                gameFunc.resetGame('advanced', 'ಥ_ಥ')
                gameFunc.returnGame('loss')
                return startGame('Too many guesses. New Round Starts in...', 3)  
            }
        }
        if(gameHUD.settings === 15) {
            if(gameHUD.wrongInputs.length > 3){
                gameFunc.resetGame('advanced', 'ಥ_ಥ')
                gameFunc.returnGame('loss')
                return startGame('Too many guesses. New Round Starts in...', 3)  
            }
        }
        ///////////////////////////////////////////////////////////////////////////////////////

    },   

    userInput(num){
        if (typeof num !== "number"){ 
            return console.log('Stop It')
        } 
        
        //Check Game
        const currentRanNum = gameHUD.factor
        const isFactorsArr = gameHUD.isFactors(currentRanNum)
        console.log('current factors user needs to guess ' + isFactorsArr)
        const target = document.getElementById('answers')
        const newSpan = document.createElement('span')
        
        // Checks to see if the (correct) input number was already chosen by user
        if(gameHUD.rightInputs.includes(num)){
            insertGameMessage('')
            return insertGameMessage(`${num} was already chosen.`, 2)
        }

        // Checks to see if the input number is correct (fits with the current random #), if it does push into array
        if(isFactorsArr.includes(num)){
                gameHUD.rightInputs.push(num)
                newSpan.classList.add('correct-user-input')
                newSpan.innerHTML = num
            
            /* Checks to see if all correct factors have been input by user (by adding all digits from each array)
                THIS IS A WIN !!! RESTART ROUND FROM HERE*/
                if(isFactorsArr.reduce((a,b) => {
                    return a+b
                }) === gameHUD.rightInputs.reduce((a,b) => {
                    return a+b
                })) {
                        gameFunc.resetGame('advanced', `(^_^)`)
                        gameFunc.returnGame('win') //next round!
                        return startGame('Good Job! New Round Starts in...', 3)    
                }
                
                // If the above check doesn't apply, add the number to the screen
                return target.appendChild(newSpan) 
                
                // Checks to see if the input number isn't included
            } else if(!isFactorsArr.includes(num)){
                    
                // Checks to see if the (wrong) input number was already chosen by user
                    if(gameHUD.wrongInputs.includes(num)){
                        insertGameMessage('')
                        return insertGameMessage('Already Tried ' + num, 2)
                    }
                    
                    // Adds wrong input to Array
                    else {
                        gameHUD.wrongInputs.push(num)
                        newSpan.classList.add('wrong-user-input')
                        newSpan.innerHTML = num
                        target.appendChild(newSpan)
                        insertGameMessage('')
                        insertGameMessage(`${num} doesn't work.`, 2)
                        return gameFunc.checkGame()
                    }
                }
        // might be able to simplify everything using this i/o here
        return num
    },

    setDifficulty(setting, duration){
        gameHUD.settings = duration
        
        // buttonDisplay ?
        if(setting !== 'clear'){
            /* selectAll.namedItem(setting).disabled = true */
            buttonDisplay(false, setting, true, true)
        } else {
            /* selectAll.namedItem('start-game').disabled = true */
            buttonDisplay(false,'start-game', true, true)
        }
    },

    resetGame(resetType, userMessage){
        let resetLevel = resetType

        if(document.getElementById('start-game').disabled = true && resetLevel === 'basic'){
            return gameFunc.setDifficulty(undefined, gameHUD.settings, 'buttons')
        }
        
        let element = document.getElementById('answers')
        while(element.firstChild){
            element.removeChild(element.firstChild)
        }

       gameHUD.setFactor('')
       insertGameMessage('','')

       if(resetLevel === 'advanced') {
            document.getElementById('rando-num').innerHTML = userMessage
            insertGameMessage('')
            gameHUD.rightInputs = []
            gameHUD.wrongInputs = []
        return gameHUD.gameOn = false;
       }
    },

// Code for a win / loss - connects to user input
    returnGame(winLoss){
    console.log('made it through')
        if(winLoss === 'win') {
            gameHUD.winStreak++
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


/* Interval Object - adding all setIntervals into an object 
 https://stackoverflow.com/questions/8635502/how-do-i-clear-all-intervals */
/*
 
const allIntervals = {
    gameStartCount: setInterval(() => {
            // THIS IS AT THE BOTTOM OF THE GAME
            document.getElementById('game-start-timer').innerHTML--
            let htmlTimer = parseInt(document.getElementById('game-start-timer').innerHTML)
        
            if (htmlTimer === 0 || htmlTimer < 0){
                    // New addition - trying to fix issues
                    toggleInput('on')
                    document.getElementById('game-messages').textContent = ''
                    document.getElementById('game-start-timer').textContent = ''
                    
                    gameHUD.setFactor(gameHUD.randomNumber())
                    
                    clearInterval(allIntervals.gameStartCount)
                    // This should always be the first time gameOn becomes true
                    gameHUD.gameOn = true
                    //This is part of the gameOn loop
                return gameHUD.countDown(gameHUD.settings, 'timer-counter', gameFunc.checkGame)   
            }
        }, 1000),
        
        clear(id){ 
            return clearInterval(id)
        }
    };
*/

// --------------------------------------------------------------------------------------------
                            /* Notes to self  */

// Choose random number from table that has factors

// Can you beat my score?? Time My Score

// On hitting return in the input field clear the field.

// Create functions for changing html etc.
 
// Functions within functions - call back functions - hoisting - the order of click handlers in the event loop

// --------------------------------------------------------------------------------------------

                        /* Extra Stuff/Pending */




