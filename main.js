// First row of table
const toTwelve = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
// This saves the numbers that are generated for the user to see - the 12x12 table.
let collectNumbers = []

const gameHUD = {
    settings: 10,
    winStreak: 0,
    best: 0,
    answers: [],
    factor: 0,
    findFactors: [],
    
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
        return document.getElementById('win-counter').innerText = num
    },  
    
    setBest(num){
        this.best = num
        return document.getElementById('best-counter').innerText = num
    },
 }


 const gameTable = {
    firstRow: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    // This replaces chart
    fullChart: [],
    collectFactors: [],
    printRowN(addArr, addHere, createElement, chooseId){
        addArr.forEach(function(e){
            let target = document.getElementById(addHere)
            let newE = document.createElement(createElement)
            newE.setAttribute('href', '#')
            newE.id = chooseId + e
            newE.innerHTML = e
            // Adding to global variable (an array) 'collectNumbers'
            gameTable.collectFactors.push(e)
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
    isFactorsN(num){
        let iterateArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        this.collectFactors = []
        let firstRow = this.firstRow
        iterateArr.forEach(function(i){
            firstRow.forEach(function(j){
                if(j * i === num) {
                    gameTable.collectFactors.push(i)
                }
            })
        })
        return this.collectFactors
    }
 }


const countDownN = (num, idElement) => {   
    console.log(gameHUD.settings)
    document.getElementById(idElement).innerHTML = num
    const innerCountDown = setInterval(() => {
    document.getElementById(idElement).innerHTML--
    let htmlTimer = parseInt(document.getElementById(idElement).innerHTML)
    if(htmlTimer === 0){
            clearInterval(innerCountDown)
        }
    }, 1000)  
}


// Input field event handler
const inputField = document.getElementById('inputN')

inputField.addEventListener('keydown', function(e){
    const keyC = e.keyCode
    let currentInput = 0
    if (keyC === 13){
        currentInput = parseInt(document.getElementById('inputN').value)
        userInput(currentInput)
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
    setDifficulty('start-game', 15, 'buttons')
    
    // This code sets up the multiplication chart
    let newArr = toTwelve
    for(let i = 1; i < 13; i++) {
        console.log('Iterate')
        gameTable.printRowN(newArr, 'inside-game', 'a', 'numOnBoard')   
        newArr = gameTable.nextRowN(newArr, toTwelve)    
    }  
}, false)


// Choosing difficulty 
const setDifficulty = (setting, duration, classN) => {
    gameHUD.settings = duration
    let selectAll = document.getElementsByClassName(classN)
   
    // Go through each element in the array and re-enable
    for(let i = 0; i < selectAll.length; i++){
        selectAll[i].disabled = false
    }
    //Named Item will search through the HTML collection (array of nodes) and find one with
    // a matching id in it's brackets
    selectAll.namedItem(setting).disabled = true
}

// FUNCTION WITHIN A FUNCTION AND NOW THESE WORK??
document.getElementById('easy').addEventListener('click', ()=> {setDifficulty('easy', 15, 'buttons')})
document.getElementById('medium').addEventListener('click', ()=> {setDifficulty('medium', 10, 'buttons')})
document.getElementById('hard').addEventListener('click', ()=> {setDifficulty('hard', 5, 'buttons')})


// Choosing difficulty - the code directly above is suppose to replace what's below
/* document.querySelector('.easy').addEventListener('click', function(e){
    gameHUD.settings = 15
    document.querySelector('.easy').disabled = true;
    document.querySelector('.medium').disabled = false;
    document.querySelector('.hard').disabled = false;
    document.querySelector('.start-game').disabled = false;
})

document.querySelector('.medium').addEventListener('click', function(e){
    gameHUD.settings = 10
    document.querySelector('.easy').disabled = false;
    document.querySelector('.medium').disabled = true;
    document.querySelector('.hard').disabled = false;
    document.querySelector('.start-game').disabled = false;
})

document.querySelector('.hard').addEventListener('click', function(e){
    gameHUD.settings = 5
    document.querySelector('.easy').disabled = false;
    document.querySelector('.medium').disabled = false;
    document.querySelector('.hard').disabled = true;
    document.querySelector('.start-game').disabled = false;
}) */


// Start button event handler
document.getElementById('start-game').addEventListener('click', function(e){
    
    resetGame()
    
    let gameMessage = document.getElementById('game-messages')
    gameMessage.prepend(document.createTextNode('Game Starts in...'))

    /* let gameHUD = document.getElementById('game-start-timer') */

    document.getElementById('game-start-timer').innerHTML = 3
    
    const gameStartCount = setInterval(() => {
    document.getElementById('game-start-timer').innerHTML--
    let htmlTimer = parseInt(document.getElementById('game-start-timer').innerHTML)
    
    if(htmlTimer === 0){
            document.getElementById('game-messages').textContent = ''
            document.getElementById('game-start-timer').textContent = ''
            /* document.getElementById('rando-num').innerHTML = randomNumber() */
            
            gameHUD.setFactor(randomNumber())

            console.log(gameHUD.settings)
            countDownN(gameHUD.settings, 'timer-counter')
            clearInterval(gameStartCount)
        }
    }, 1000)  
})





/* Enter an array. Target = where the elements will be made. 
newE = new element. Set attributes than name based off of the value of within 
the given index #.
*/
/* const printRow = (addArray, addHere, createElement, chooseId) => {
    addArray.forEach(function(e){
        let target = document.getElementById(addHere)
        let newE = document.createElement(createElement)
        newE.setAttribute('href', '#')
        newE.id = chooseId + e
        newE.innerHTML = e
        // Adding to global variable (an array) 'collectNumbers'
        collectNumbers.push(e)
       return target.appendChild(newE)
    })
} */


// Helps generate new rows based off of the toTwelve array
/* const nextRow = (newRowArray, exampleArray) => {
    let holdZero = newRowArray[0] + 1
    let newArry = exampleArray.map(function(e){
        return e * holdZero
    })
    newArry.shift()
    newArry.unshift(holdZero)
    return newArry
}
 */

// Finds the factors of the input number (factors 1 - 12)
const isFactors = (num) => {
    let toTwelveTwo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let collectFactors = []
    toTwelveTwo.forEach(function(i){
        toTwelve.forEach(function(j){
            if(j * i === num) {
                collectFactors.push(i)
            }
        })
    })
    return collectFactors
}


// Choose a random number based on the a tags created under '#inside-game'. Made to be easily updated.
const randomNumber = () => {
    // This saves the # value of the last child of #inside-game. 
    let highestNum = parseInt(document.getElementById('inside-game').lastChild.innerHTML)
    let chooseNum = 0
    let killSwitch = false;
    // This loop creates a random number and checks it against the collectNumbers array  
    while(!killSwitch) {  
        chooseNum = Math.floor(Math.random()*highestNum)  
        gameTable.collectFactors.forEach(function(i){
            // Don't want a number below 12
            if(chooseNum === i && chooseNum > 12) {
                killSwitch = true
                return chooseNum
            }
        })
    }
    return chooseNum
} 


let compareArr = []

// Code for the input field
const userInput = (num) => {
    if (typeof num !== "number"){ 
        return console.log('Stop It')
    }
    const currentRanNum = gameHUD.factor //parseInt(document.getElementById('rando-num').innerHTML)
    const isFactorsArr = gameTable.isFactorsN(currentRanNum)

    console.log(isFactorsArr)
    const target = document.querySelector('#answers')
    const newSpan = document.createElement('span')
    
    if(isFactorsArr.includes(num)){
            compareArr.push(num)
            newSpan.classList.add('correct-user-input')
            newSpan.innerHTML = num
 
            if(isFactorsArr.reduce((a,b) => {
                return a+b
            }) === compareArr.reduce((a,b) => {
                return a+b
            })) {
                document.getElementById('rando-num').innerHTML = 'HIYA'
                    compareArr = []
                    target.appendChild(newSpan) 
                    return returnGame('win') //next round!
            }
            return target.appendChild(newSpan) 
            }
    else {
        newSpan.classList.add('wrong-user-input')
        newSpan.innerHTML = num
        target.appendChild(newSpan)
        returnGame('loss')
        console.log('wrong answer: ' + num) //wrong answer!!
    }
    // might be able to simplify everything using this i/o here
    return num
} 

/// WORK HERE
// Code for a win / loss - connects to user input
 const returnGame = (winLoss) => {
    console.log('made it through')
    if(winLoss === 'win') {
        gameHUD.winCounter++
        /* document.getElementById('win-counter').innerHTML++ */
        /* let winCounter = document.getElementById('win-counter').innerHTML
        let bestCounter = document.getElementById('best-counter').innerHTML */
        
        if(gameHUD.best < gameHUD.winStreak){
            return gameHUD.winStreak = winCounter
        }
        // return newRound('win')
    } else if(winLoss === 'loss'){
        return document.getElementById('win-counter').innerHTML = 0
        // return newRound('loss')
    }  
} 

 
const resetGame = () => {
   let element = document.getElementById('answers')
   while(element.firstChild){
    element.removeChild(element.firstChild)
   }
}



// --------------------------------------------------------------------------------------------
                            /* Notes to self  */

// Choose random number from table that has factors

// Add input that accepts the right factors

// Can you beat my score?? Time My Score

// On hitting return in the input field clear the field.

// Create functions for changing html etc.

// 

// --------------------------------------------------------------------------------------------

                        /* Extra Stuff/Pending */

/* const userInput = (num) => {
    if (typeof num !== "number"){ 
        return console.log('Stop It')
    }

    const currentRanNum = parseInt(document.getElementById('rando-num').innerHTML)
    const isFactorsArr = isFactors(currentRanNum)
    console.log(isFactorsArr)
    const target = document.querySelector('#answers')
    const newSpan = document.createElement('span')
    
    if(isFactorsArr.includes(num)){
            compareArr.push(num)
            newSpan.classList.add('correct-user-input')
            newSpan.innerHTML = num
 
            if(isFactorsArr.reduce((a,b) => {
                return a+b
            }) === compareArr.reduce((a,b) => {
                return a+b
            })) {
                document.getElementById('rando-num').innerHTML = 'HIYA'
                    compareArr = []
                    target.appendChild(newSpan) 
                    return returnGame('win') //next round!
            }
            return target.appendChild(newSpan) 
            }
    else {
        newSpan.classList.add('wrong-user-input')
        newSpan.innerHTML = num
        target.appendChild(newSpan)
        returnGame('loss')
        console.log('wrong answer: ' + num) //wrong answer!!
    }
    // might be able to simplify everything using this i/o here
    return num
}  */

/// changed the collectNumbers array to collectFactors property in gameTable
/* const randomNumber = () => {
    // This saves the # value of the last child of #inside-game. 
    let highestNum = parseInt(document.getElementById('inside-game').lastChild.innerHTML)
    let chooseNum = 0
    let killSwitch = false;
    // This loop creates a random number and checks it against the collectNumbers array  
    while(!killSwitch) {  
        chooseNum = Math.floor(Math.random()*highestNum)  
        collectNumbers.forEach(function(i){
            // Don't want a number below 12
            if(chooseNum === i && chooseNum > 12) {
                killSwitch = true
                return chooseNum
            }
        })
    }
    return chooseNum
} 
*/