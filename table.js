// import {checkGame} from './main.js'
let anyNum = document.querySelector('.numOnBoard')
let body = document.querySelector('body')
let gameCenter = document.querySelector('#inside-game')
const fullTable = Array.from(document.querySelectorAll('.numOnBoard'));
const checkStartButton = document.querySelector('#start-game')

const allBoardNums = () => {
    let nodelist = document.querySelectorAll('.numOnBoard')
    return Array.from(nodelist);
};

const flatOutput = (arr) => {
    const output = arr.reduce((acc, cur) => {
        return acc.concat(cur)
    }, [])

    return output;
};


// Create an array containing data for if statement to check;
// Or, use getElementsByClassName then run a loop on it's return value.

const gameMessageMultiply = (numOnBoardId) => {
    const boardNumber = parseInt(numOnBoard.innerHTML);
    const gameCenter = document.querySelector('.game-center');

};

const findFactors = (num, gridSize) => {
    const output = [];  
    for(let i = 1; i <= gridSize; i++) {
       if((num % i) === 0){
           output.push(i)
       }
    };
    output.push(num) // Add num itself to list of factors
    return output;
};


const getFactorRefer = (arr) => {
    const newArr = arr.map(element => {
        let nodeList = document.querySelectorAll('#numOnBoard'+element);
        return Array.from(nodeList)
    });
    const output = flatOutput(newArr) 
    return output;
};

const highlightFactors = (elementArr, color) => {
    // when element is highlighted, we want to highlight nums in array
    for(let i = 0; i < elementArr.length; i++){
        elementArr[i].style.opacity = 1;
        if(color){
            elementArr[i].style.backgroundColor = color
        }
    }
};

const unHighlightFactors = (arr, all, color) => {
    const removeColor = (e)=> {e.style.backgroundColor = 'yellow'}
    if(all){
        fullTable.forEach(boardNum => {
            if(color) {removeColor(boardNum)}
            boardNum.style.opacity = .2
        })
    } else {
        for(let i = 0; i < arr.length; i++){
            arr[i].style.opacity = .2;
        }
    }
};


// Create seperate arrays that holds the x & y factors / nodes - 1 - 12
const yTableFactors = () => {
    let counter = 1;
    const yTable = fullTable.filter(element => {
        if(counter === 1){
            counter++
            return element;
        } else if(counter === 12){
            counter = 1
            return false;
        } else {
            counter++
            return false;
        }
    })
    return yTable;
};

const xTableFactors = () => {
    return fullTable.slice(0, 12)
};

// whatToHighLight is designed for mouseover

const whatToHighlight = (boardNum, add1) => {
    /* We need to first check to the left of each numBoard# to see when it 
     hits our y axis value - with this number(inner html) we multiply by 12
     and if we go back by that amount using our index value, we get to our
     x axis value that matches */
    const yFactors = yTableFactors();
    const xFactors = xTableFactors();
    const indexNumRef = fullTable.indexOf(boardNum);
    const output = [];
    // Holds the y factor of our boardNum
    const yFacIndex = [];
   if(xFactors.includes(fullTable[indexNumRef])){
       yFacIndex.push(0)
   } else {
    // This is used to find our corresponding Y (factor) index number (of boardNum)
        for(let i = indexNumRef; i > 1; i--){
            if(yFactors.includes(fullTable[i])){
                output.push(fullTable[i])
                // console.log(fullTable[i], `fullTable I, ${boardNum}`)
                yFacIndex.push(i)
                break;
            }
        }
    };
    // Iterate through xFactors array using parseInt & .innerHTML and find the factors that multiply into boardNum
    // then push those factors
    if(add1) {output.push(xFactors[0])}
    for(let i = 0; i < xFactors.length; i++){     
        let multiplyYbyX = parseInt(fullTable[yFacIndex[0]].innerHTML) * parseInt(xFactors[i].innerHTML);
        if(multiplyYbyX === parseInt(boardNum.innerHTML)){
            output.push(xFactors[i])
            //console.log(xFactors[i], 'xFactors[i]')
        }
    };
    return output;
};

const allInstances = (num) => {
    const findAll = fullTable.reduce((acc, cur) => {    
        if(typeof num === 'object'){
            let element = parseInt(num.innerHTML)
            if(element == cur){
                acc.push(cur)
            }
        } else if(typeof num === 'number'){
            let getElement = parseInt(cur.innerHTML)
            if(getElement == num){
                acc.push(cur)
            }
        }
        return acc
    }, [])
    return findAll
};

// Highlights
gameCenter.addEventListener('click', (e) => { 
    if(checkStartButton.disabled){
        return;
    };

    if(e.target.tagName == 'A'){    
        let target = parseInt(e.target.innerHTML);
        const allInstancesVar = allInstances(target);
        console.log(allInstancesVar)
        // let getIndexOf = fullTable.indexOf(target)
        highlightFactors(allInstancesVar);
        /* 
            This highlights all the factors of all the instances of what needs to
            be factored. 
        */
        for(let i = 0; i < allInstancesVar.length; i++){  
            highlightFactors(whatToHighlight(allInstancesVar[i], 'add1'), 'blue')
        };
        e.preventDefault();
    };
});

gameCenter.addEventListener('mouseover', function(e){
    if(checkStartButton.disabled){
        return;
    };
    if(e.target.tagName == 'A'){
        let target = e.target
        const yFactors = yTableFactors();
        const xFactors = xTableFactors();
        highlightFactors([target], 'red')
        if(yFactors.includes(target) || xFactors.includes(target)){
            return;
        };             
            let getIndexOf = fullTable.indexOf(target)
            let targetID = fullTable[getIndexOf]
            target.style.opacity = 1;
            // Pushing the target in order to mouseout and use the unhighlight function
            highlightFactors(whatToHighlight(targetID))
    };
});


gameCenter.addEventListener('mouseout', function(e){  
    if(e.target.tagName == 'A'){
        unHighlightFactors(null, 'all', 'color');
    } 
});


/* by-passes the need to communicate with main.js to check if the startbutton is pressed in order to
 blur out text. */
document.addEventListener('click', function(){
    const allNums = allBoardNums()
    if(checkStartButton.disabled){
        allNums.forEach(num => {
            num.classList.add('blurry-text')
        })
    };
    if(!checkStartButton.disabled){
        allNums.forEach(num => {
            num.classList.remove('blurry-text')
        })
    };  
});



// Easy Mode should show how many factors there are under answers
// Rules Button (On Right) should activate a transparent cover for the game
// Change font (matrix? vscode glow)

// Logic for showing factors during count down after guessing
const displayAnswers = (num) => {
    const allIn = allInstances(num)
    // I need to unblur these blocks
    allIn.forEach(e => {
        e.style.opacity = 1;
    });
    highlightFactors(allIn)
    for(let i = 0; i < allIn.length; i++){
        let factor = whatToHighlight(allIn[i])
        highlightFactors(factor)
        factor.style.opacity = 1;
    }; 
    // I want to change the background red and have the text be red
};


