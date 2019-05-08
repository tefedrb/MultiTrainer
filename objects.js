/* const gameFunc.HUD = {
    settings: 10,
    setTimer(setting){
        return document.getElementById('timer-counter').innerHTML = setting
    },       
 }
 */


 /* Interval Object - adding all setIntervals into an object 
 https://stackoverflow.com/questions/8635502/how-do-i-clear-all-intervals */


const allIntervals = {
        rightVal: 5,
        leftVal: 6,

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
            return interval.splice(itemIndex, (itemIndex + 1))
        },
    
        // clear all intervals
        clearAll() {
            let interval = this.intervals
            for (let i = 0; i < interval.length; i++){
                clearInterval(interval[i])
            }
            interval.splice(0)
        },

        changeColor(intervalName){
            document.querySelector('body').style.backgroundColor = `rgb(${allIntervals.leftVal++}, 0, ${allIntervals.rightVal++})`
        }
    }; 
    
    /* const changeColor = (intervalName) => {
        document.querySelector('body').style.backgroundColor = `rgb(${allIntervals.leftVal++}, 0, ${allIntervals.rightVal++})`
        if(allIntervals.rightVal === 255){
            clearInterval(intervalName)
        }
    }; */

    let middleVal = 1
    let newLeft = 1
    let newRight = 1

    function changeColorInner(intervalName){
        document.querySelector('.game-center').style.backgroundColor = `rgb(${newLeft++}, ${middleVal++}, ${newRight++})`
        if(newRight === 255){
            clearInterval(intervalName)
        }
    };

document.querySelector('#new-button').addEventListener('click', function(e){
    allIntervals.make(allIntervals.changeColor, 1000) 
});

document.querySelector('.game-center').addEventListener('click', function(e){
    allIntervals.make(changeColorInner, 1000)
});

    


/* 
    gameStartCount: setInterval(() => {
        // THIS IS AT THE BOTTOM OF THE GAME
        document.getElementById('game-start-timer').innerHTML--
        let htmlTimer = parseInt(document.getElementById('game-start-timer').innerHTML)
    
        if (htmlTimer === 0 || htmlTimer < 0){
                // New addition - trying to fix issues
                toggleInput('on')
                document.getElementById('game-messages').textContent = ''
                document.getElementById('game-start-timer').textContent = ''
                
                gameFunc.HUD.setFactor(gameFunc.HUD.randomNumber())
                
                clearInterval(allIntervals.gameStartCount)
                // This should always be the first time gameOn becomes true
                gameFunc.HUD.gameOn = true
                //This is part of the gameOn loop
            return gameFunc.HUD.countDown(gameFunc.HUD.settings, 'timer-counter', gameFunc.checkGame)   
        }
    }, 1000),
    
    clear(id){ 
        return clearInterval(id)
    } */