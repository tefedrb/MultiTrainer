

/* gameFunc.toggleInput() */

document.getElementById('easy').addEventListener('click', ()=> {gameFunc.setDifficulty('easy', 15, true)})
document.getElementById('medium').addEventListener('click', ()=> {gameFunc.setDifficulty('medium', 10, true)})
document.getElementById('hard').addEventListener('click', ()=> {gameFunc.setDifficulty('hard', 5, true)})

// Start button event handler // I added a reset game paramater
document.getElementById('start-game').addEventListener('click', ()=> {
    gameFunc.HUD.gameOn = true
    gameFunc.resetGame()
    gameFunc.startGame('New Round Starts in...', 5)
});

// Stop button event handler
document.getElementById('stop-game').addEventListener('click', ()=>{gameFunc.stopGame()})

// Input field event handler (after hitting enter)
document.getElementById('inputN').addEventListener('keydown', function(e){
    
    const keyC = e.keyCode
    let currentInput = 0
    if (keyC === 13){
        currentInput = parseInt(document.getElementById('inputN').value)
        gameFunc.userInput(currentInput)
        document.getElementById('inputN').value = ''
    }
});

// load-game button event handler
document.querySelector('#load-game').addEventListener('click', function(e){ 
    document.querySelector('#load-game').disabled = true;
    // Checks to see if table is already showing.
    if(document.querySelector('#numOnBoard1')) return;
    gameFunc.toggleInput('off')
    // Show game-hud
    document.querySelector('#game-hud').style.display = 'block'
    // Show Buttons by adding a class to the corresponding elements using class 'buttons'
    let getButtons = document.getElementsByClassName('buttons')
    for(let i = 0; i < getButtons.length; i++){
        getButtons[i].style.display = 'block' /*
        maybe delete this from styles.css if all works
         classList.add('buttonsAppear\') */
    } 
    /* I'm using this function to grey out "start-game" until
     the user clicks on a difficulty */
    gameFunc.setDifficulty('easy', 15, true)
    // By default we want the stop-game button disabled until we start the game
    document.querySelector('#stop-game').disabled = true
    // This code sets up the multiplication chart
    gameTable.renderTable()  

    // add table.js to index.html
    const htmlBody = document.querySelector('body');
    let newScript = document.createElement('script')
    newScript.setAttribute('type', 'text/javascript')
    newScript.setAttribute('src', 'table.js')
    htmlBody.appendChild(newScript)
}, false);


const setIntervals = {
    intervals: [],
        
    make(func, delay) {
        let newInterval = setInterval(func, delay);
        this.intervals.push(newInterval, `${func.name}`);
        return newInterval;
    },

    // clear a single interval
    clear(item) {
        let interval = this.intervals
        let itemIndex = interval.indexOf(item) - 1
        clearInterval(interval[itemIndex])
        return interval.splice(itemIndex, (itemIndex + 2))
    },

    // clear all intervals
    clearAll() {
        let interval = this.intervals
        for (let i = 0; i < interval.length; i++){
            clearInterval(interval[i])
        }
        interval.splice(0)
    },
    
};

const gameTable = {
    firstRow: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    fullChart: [],
    printRowN(addArr, addHere, createElement, chooseId){ // old param chooseId
        addArr.forEach(function(e){
            let target = document.querySelector(addHere)
            let newE = document.createElement(createElement)
            newE.setAttribute('href', '#')
            newE.classList.add('numOnBoard')
            newE.id = chooseId + e
            newE.innerHTML = e
            gameFunc.HUD.collectFactors.push(e)
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
            gameTable.printRowN(newArr, '#inside-game', 'a', 'numOnBoard')   // old arg 'numOnBoard'
            newArr = gameTable.nextRowN(newArr, gameTable.firstRow)    
        }  
    }
 };

 
 const gameFunc = {
    HUD: {
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
        
        setFactor(num){
            gameFunc.HUD.factor = num
            document.querySelector('#rando-num').innerText = ''
            return document.querySelector('#rando-num').innerText = num
        },

        // Finds the factors of the input number (factors 2 - 12)
        isFactors(num){
            let iterateArr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            gameFunc.HUD.ranNumberFactors = []
            let firstRow = gameTable.firstRow
            iterateArr.forEach(function(i){
                firstRow.forEach(function(j){
                    if(j * i === num) {
                        gameFunc.HUD.ranNumberFactors.push(i)
                    }
                })
            })
            return gameFunc.HUD.ranNumberFactors
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
                gameFunc.HUD.collectFactors.forEach(function(i){
                    // Don't want a number below 12
                    if(chooseNum === i && chooseNum > 12) {
                        killSwitch = true
                        return chooseNum
                    }
                })
            }
            return chooseNum
        } 
    },

    startGame(message, timer = 3){     
        gameFunc.toggleInput()
        //button Display
        gameFunc.buttonDisplay(true, undefined, undefined, 'stopon')
        
        gameFunc.insertGameMessage(message)
    
        document.querySelector('#game-start-timer').innerHTML = timer
        
        const gameStartCount = () => {
            // THIS IS AT THE BOTTOM OF THE GAME
            document.querySelector('#game-start-timer').innerHTML--
            let htmlTimer = parseInt(document.querySelector('#game-start-timer').innerHTML)
        
            if (htmlTimer === 0 || htmlTimer < 0){
                    // New addition - trying to fix issues
                    gameFunc.toggleInput('on')
                    document.querySelector('#game-messages').textContent = ''
                    document.querySelector('#game-start-timer').textContent = ''
                    
                    gameFunc.HUD.setFactor(gameFunc.HUD.randomNumber())
                    
                    setIntervals.clear('gameStartCount')
                    // This should always be the first time gameOn becomes true
                    gameFunc.HUD.gameOn = true
                    //This is part of the gameOn loop
                return gameFunc.countDown(gameFunc.HUD.settings, '#game-timer', gameFunc.checkGame)   
            }
        }

        return setIntervals.make(gameStartCount, 1000)
    },
    
    stopGame(){
        gameFunc.toggleInput()
        gameFunc.HUD.gameOn = false;
        gameFunc.resetGame('basic')
        setIntervals.clearAll()
    },
    
    resetGame(resetType, userMessage){
        let resetLevel = resetType
        let element = document.querySelector('#answers')

        if(document.querySelector('#start-game').disabled = true && resetLevel === 'basic'){
            return gameFunc.setDifficulty(undefined, gameFunc.HUD.settings, 'buttons')
        }
        
        while(element.childNodes[3]){
            element.removeChild(element.childNodes[3])
        }

       gameFunc.HUD.setFactor('')
       gameFunc.insertGameMessage('','')

       if(resetLevel === 'advanced') {
            setIntervals.clearAll()
            if(userMessage){
                document.querySelector('#rando-num').innerHTML = userMessage
            }
            gameFunc.insertGameMessage('')
            gameFunc.HUD.rightInputs = []
            gameFunc.HUD.wrongInputs = []
        return gameFunc.HUD.gameOn = false;
       }
    },

    // Code for a win / loss - connects to user input
    returnGame(winLoss){
            if(winLoss === 'win') {
                gameFunc.HUD.winStreak++
                if(gameFunc.HUD.best < gameFunc.HUD.winStreak){
                    gameFunc.HUD.best = gameFunc.HUD.winStreak
                    document.getElementById('best-counter').innerHTML = gameFunc.HUD.best
                } 
                return document.getElementById('win-streak').innerHTML = gameFunc.HUD.winStreak
                
            } else if(winLoss === 'loss'){
                gameFunc.HUD.winStreak = 0
                return document.getElementById('win-streak').innerHTML = 0
                // return newRound('loss')
            }  
        },

    // Checks status of game, i.e. If difficultly is high, check to see if there are too many wrong inputs
     checkGame(check){
        // Checks if game clock is at zero (write code here...)
        let gameTimer = parseInt(document.querySelector('#game-timer').innerHTML)
        
        // This also seems to be creating the game loop
        
        if(gameTimer === 0 || gameTimer < 0){
            gameFunc.resetGame('advanced', `Time's Up!`)
            gameFunc.returnGame('loss')
            gameFunc.startGame('New Round Starts in...', 3)
        }
        // Checks game difficulty and runs a check for amount of wrong guesses by user accordingly
        if(gameFunc.HUD.settings === 5) {
            if(gameFunc.HUD.wrongInputs.length > 1){
                gameFunc.resetGame('advanced', 'ಥ_ಥ')
                gameFunc.returnGame('loss')
                gameFunc.startGame('Too many guesses. New Round Starts in...', 3)  
            }
        }
        if(gameFunc.HUD.settings === 10) {
            if(gameFunc.HUD.wrongInputs.length > 2){
                gameFunc.resetGame('advanced', 'ಥ_ಥ')
                gameFunc.returnGame('loss')
                gameFunc.startGame('Too many guesses. New Round Starts in...', 3)  
            }
        }
        if(gameFunc.HUD.settings === 15) {
            if(gameFunc.HUD.wrongInputs.length > 3){
                gameFunc.resetGame('advanced', 'ಥ_ಥ')
                gameFunc.returnGame('loss')
                gameFunc.startGame('Too many guesses. New Round Starts in...', 3)  
            }
        }
    },   

    setDifficulty(setting, duration){
        gameFunc.HUD.settings = duration  
        // buttonDisplay ?
        if(setting !== 'clear'){
            
            gameFunc.buttonDisplay(false, setting, true, true)
        } else {
            gameFunc.buttonDisplay(false,'start-game', true, true)
        }
    },
    
    /* This method is responsible for the game timer (might need to make the htmlTimer 
        variable global in order to stop this started by setInterval) */
    countDown(num, nodeId, func, fSettings){   
        const targetNode = document.querySelector(nodeId)
        targetNode.innerHTML = num
        
        const innerCountDown = () => {
        let clock = Number(targetNode.innerHTML)
        clock--
        targetNode.innerHTML = clock

        if(gameFunc.HUD.gameOn === false){
            return setIntervals.clear(innerCountDown)
        }

        if(clock === 0 || clock < 0){
                // Part of gameOn loop affecting while loop maybe
                /* checkGame() */
                setIntervals.clear(innerCountDown)
                gameFunc.checkGame()
                return func(fSettings)   
            }
        } 
        return setIntervals.make(innerCountDown, 1000)
    },
    
    insertGameMessage(message, duration, clock, func, val){
        const messageNode = document.getElementById('game-messages')
        const visualClock = document.getElementById('game-start-timer')

        let timer = parseInt(duration)

        if(typeof duration === 'string') {
            visualClock.innerHTML = duration
        }
            if(typeof duration === 'number'){   
               
                const messageTimer = () => {
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
                        return setIntervals.clear(messageTimer)
                    }
                    if(timer === -1){
                        messageNode.textContent = ''
                        visualClock.textContent = ''
                        return setIntervals.clear(messageTimer)
                    }
                }
                setIntervals.make(messageTimer, 1000)
            }  
        return messageNode.innerHTML = message
    },

    toggleInput(t){
        const userInput = document.querySelector('#inputN')
        if(t === 'on'){
            userInput.disabled = false
            userInput.setAttribute('placeholder', '#')
            return userInput.focus()
        } else {
            userInput.setAttribute('placeholder', 'X')
            return userInput.disabled = true
        }
    }, 

    buttonDisplay(toggleAll, except, exceptToggle, stopOff){
        let exempt = document.querySelector('#' + except)
        let allButtons = document.getElementsByClassName('buttons')
        let stopButton = stopOff
            for(let i = 0; i < allButtons.length; i++){
                allButtons[i].disabled = toggleAll
            }
            if(except){
                exempt.disabled = exceptToggle
            }
            if(stopButton === 'stopon'){
                document.getElementById('stop-game').disabled = false 
             } else {
                document.getElementById('stop-game').disabled = true
             }
        },

    userInput(num){
        if(!num < 145 && !num > 1 || isNaN(num) === true){ 
            gameFunc.insertGameMessage(`Choose a number between 2 & 145`, 2)
            return;
        }
        //Check Game
        const currentRanNum = gameFunc.HUD.factor
        const isFactorsArr = gameFunc.HUD.isFactors(currentRanNum)
        console.log('current factors user needs to guess ' + isFactorsArr)
        const target = document.querySelector('#answers')
        const newSpan = document.createElement('span')
        
        // Checks to see if the (correct) input number was already chosen by user
        if(gameFunc.HUD.rightInputs.includes(num)){
            gameFunc.insertGameMessage('')
            return gameFunc.insertGameMessage(`${num} was already chosen.`, 2)
        }

        // Checks to see if the input number is correct (fits with the current random #), if it does push into array
        if(isFactorsArr.includes(num)){
                gameFunc.HUD.rightInputs.push(num)
                newSpan.classList.add('correct-user-input')
                newSpan.innerHTML = num
            
            /* Checks to see if all correct factors have been input by user (by adding all digits from each array)
                THIS IS A WIN !!! RESTART ROUND FROM HERE */
                if(isFactorsArr.reduce((a,b) => {
                    return a+b
                }) === gameFunc.HUD.rightInputs.reduce((a,b) => {
                    return a+b
                })) {
                        gameFunc.resetGame('advanced', `(^_^)`)
                        gameFunc.returnGame('win') //next round!
                        return gameFunc.startGame('Good Job! New Round Starts in...', 3)    
                }
                
                // If the above check doesn't apply, add the number to the screen
                return target.appendChild(newSpan) 
                
                // Checks to see if the input number isn't included
            } else if(!isFactorsArr.includes(num)){
                    
                // Checks to see if the (wrong) input number was already chosen by user
                    if(gameFunc.HUD.wrongInputs.includes(num)){
                        gameFunc.insertGameMessage('')
                        return gameFunc.insertGameMessage('Already Tried ' + num, 2)
                    }
                    
                    // Adds wrong input to Array
                    else {
                        gameFunc.HUD.wrongInputs.push(num)
                        newSpan.classList.add('wrong-user-input')
                        newSpan.innerHTML = num
                        target.appendChild(newSpan)
                        gameFunc.insertGameMessage('')
                        gameFunc.insertGameMessage(`${num} doesn't work.`, 2)
                        return gameFunc.checkGame()
                    }
                }
        // might be able to simplify everything using this i/o here
        return num
    },
 };

// export {checkGame};




