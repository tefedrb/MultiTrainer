
/* The rough idea for this interaction with the input field - 
take a number and display all it's factors - timer test for numbers
Finding factors math
*/

// First row of table
const toTwelve = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// This saves the numbers that are generated for the user to see - the 12x12 table.
let collectNumbers = []

/* $('body').on('keydown', function (e) {
    const keyC = e.keyCode
    if (keyC === 13){
        let varN = document.getElementById('inputN').value
        varN = varN / 2 *3 + 2
        $('.game-center p').text(varN)
        console.log('we happened')
    }
}) */

const gameTimer = {
    settings: 10,
    setTimer(setting){
        return document.getElementById('timer-counter').innerHTML = setting
    },       
 }

    const countDownN = (num) => {   
            console.log(gameTimer.settings)
            document.getElementById('timer-counter').innerHTML = num
            const innerCountDown = setInterval(() => {
                document.getElementById('timer-counter').innerHTML--
                let htmlTimer = parseInt(document.getElementById('timer-counter').innerHTML)
                if(htmlTimer === 0){
                        clearInterval(innerCountDown)
                    }
                }, 1000)  
            }
    

function changeDoc(element, clId, html){
    if(html === html && clId === cl || clId === iD ){
      return document.querySelector(element).innerHTML
    }
    if(clId === cl){
      return document.querySelector(element)
    }
    if(clId === iD){
      return document.getElementById(element)
    }
    if(clId === cls){
       return document.getElementsByClassName(element)
    }
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

// Show table button event handler
document.addEventListener('click', function(e){
    /* Event handler checks to see if what was clicked was the button
       that triggers this event. Else, return. */
    if(!e.target.matches('#show-table')) return;   
    // Checks to see if table is already showing.
    if(document.querySelector('#numOnBoard1')) return;
    // Show game-hud
    document.getElementById('game-hud').style.display = 'block'
    
    // Show Buttons by adding a class to the corresponding elements
    let getButtons = document.getElementsByClassName('buttons')
    for(let i = 0; i < getButtons.length; i++){
        getButtons[i].classList.add('buttonsAppear')
    }
    
    //Grey out start button until difficulty is chosen
    document.querySelector('.start-game').disabled = true;

    let newArr = toTwelve
    for(let i = 1; i < 13; i++) {
        console.log('Iterate')
        printRow(newArr)   
        newArr = nextRow(newArr)    
    }  
}, false)


//Choosing difficulty
document.querySelector('.easy').addEventListener('click', function(e){
    gameTimer.settings = 15
    document.querySelector('.easy').disabled = true;
    document.querySelector('.medium').disabled = false;
    document.querySelector('.hard').disabled = false;
    document.querySelector('.start-game').disabled = false;
})

document.querySelector('.medium').addEventListener('click', function(e){
    gameTimer.settings = 10
    document.querySelector('.easy').disabled = false;
    document.querySelector('.medium').disabled = true;
    document.querySelector('.hard').disabled = false;
    document.querySelector('.start-game').disabled = false;
})

document.querySelector('.hard').addEventListener('click', function(e){
    gameTimer.settings = 5
    document.querySelector('.easy').disabled = false;
    document.querySelector('.medium').disabled = false;
    document.querySelector('.hard').disabled = true;
    document.querySelector('.start-game').disabled = false;
})





// Start button event handler
document.addEventListener('click', function(e){
    if(!event.target.matches('.start-game')) return;
    resetGame()
    
    let gameMessage = document.querySelector('.game-messages')
    gameMessage.prepend(document.createTextNode('Game Starts in...'))
    let gameTimer = document.getElementById('game-start-timer')

    document.getElementById('game-start-timer').innerHTML = 3
    
    const gameStartCount = setInterval(() => {
    document.getElementById('game-start-timer').innerHTML--
    let htmlTimer = parseInt(document.getElementById('game-start-timer').innerHTML)
    
    if(htmlTimer === 0){
            document.querySelector('.game-messages').textContent = ''
            document.getElementById('game-start-timer').textContent = ''
            document.getElementById('rando-num').innerHTML = randomNumber()
            console.log(gameTimer.settings)
            countDownN(gameTimer.settings)
            clearInterval(gameStartCount)
        }
    }, 1000)  
   
})


/* Enter an array. Target = where the elements will be made. 
newE = new element. Set attributes than name based off of the value of within 
the given index #.
*/
const printRow = (varN) => {
    varN.forEach(function(e){
        let target = document.querySelector('.inside-game')
        let newE = document.createElement('a')
        newE.setAttribute('href', '#')
        newE.id = 'numOnBoard' + e
        newE.innerHTML = e
        //Adding to global variable (an array) 'collectNumbers'
        collectNumbers.push(e)
       return target.appendChild(newE)
    })
}

// Helps generate new rows based off of the toTwelve array
const nextRow = (varN) => {
    let holdZero = varN[0] + 1
    let newArry = toTwelve.map(function(e){
        return e * holdZero
    })
    newArry.shift()
    newArry.unshift(holdZero)
    return newArry
}

//Finds the factors of the input number (factors 1 - 12)
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

// Choose a random number based on the a tags created under '.inside-game'. Made to be easily updated.
const randomNumber = () => {
    // This saves the # value of the last child of div.inside-game. 
    let highestNum = parseInt(document.querySelector('.inside-game').lastChild.innerHTML)
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


let compareArr = []

// Code for the input field
const userInput = (num) => {
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
 
            if (isFactorsArr.reduce((a,b) => {
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


// Code for a win / loss - connects to user input
 const returnGame = (winLoss) => {
    console.log('made it through')
    if(winLoss === 'win') {
        document.getElementById('counter').innerHTML++
        let winCounter = document.getElementById('counter').innerHTML
        let bestCounter = document.getElementById('best-counter').innerHTML
        
        if(bestCounter < winCounter){
            return document.getElementById('best-counter').innerHTML = winCounter
        }
        // return newRound('win')
    } else if(winLoss === 'loss'){
        return document.getElementById('counter').innerHTML = 0
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

// on hitting return in the input field clear the field

// Create functions for changing html etc.

// --------------------------------------------------------------------------------------------

                        /* Extra Stuff/Pending */
/*
let seconds = 0;
let minutes = 0; 
*/


/* WHY ISN'T THIS WORKING
function removeElement(parentDiv, childDiv){
    if (childDiv == parentDiv) {
         alert("The parent div cannot be removed.");
    }
    else if (document.querySelector(childDiv)) {  
        console.log('check')
         var child = document.querySelector(childDiv);
         var parent = document.querySelector(parentDiv);
         parent.removeChild(child);
    }
    else {
         ;
         return false;
    }
}
*/


