// import {checkGame} from './main.js'
let anyNum = document.querySelector('.numOnBoard')
let body = document.querySelector('body')
let gameCenter = document.querySelector('.game-center')
const fullTable = Array.from(document.querySelectorAll('.numOnBoard'));
const currentMouseOver = [anyNum];

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


// I'M TRYING TO TURN THIS LIST OF NODES INTO AN ACTUAL ARRAY
const getFactorRefer = (arr) => {
    const newArr = arr.map(element => {
        let nodeList = document.querySelectorAll('#numOnBoard'+element);
        return Array.from(nodeList)
    });
    
    // I don't think I need this...
    const flatOutput = newArr.reduce((acc, cur) => {
        return acc.concat(cur)  
    }, [])
    
    return flatOutput;
};

const highlightFactors = (arr) => {
    // when element is highlighted, we want to highlight nums in array
    for(let i = 0; i < arr.length; i++){
        arr[i].style.opacity = 1;
    }
    /*nodeList.forEach(node => {
        node.style.opacity = 1;
    }); */
};

const unHighlightFactors = (arr, all) => {
    if(all){
        fullTable.forEach(boardNum => {boardNum.style.opacity = .2})
        return
    } else {
        for(let i = 0; i < arr.length; i++){
            arr[i].style.opacity = .2;
        }
    }
}

/* 
    We want to be able to move our mouse over the numbers on the grid and have 
    them light up with their factors on the x - y axis
*/

// Create seperate arrays that holds the x & y factors / nodes - 1 - 12

const yTableFactors = () => {
    let counter = 1;
    const yTable = fullTable.filter(element => {
        if(counter === 1){
            counter++
            return true;
        } else if(counter === 12){
            counter = 1
            return false;
        } else {
            counter++
            return false;
        }
    })
    return yTable
};

const xTableFactors = () => {
    return fullTable.slice(0, 12)
};

// Write Out Logic for moused over numbers within game table

const whatToHighlight = (boardNum) => {
    /* We need to first check to the left of each numBoard# to see when it 
     hits our y axis value - with this number(inner html) we multiply by 12
     and if we go back by that amount using our index value, we get to our
     x axis value that matches */
    // const xFactors = xTableFactors();
    const yFactors = yTableFactors();
    const xFactors = xTableFactors();
    const indexNumRef = fullTable.indexOf(boardNum)
    const output = [];
    const yFacIndex = [];

    for(let i = indexNumRef; i > 1; i--){
        if(yFactors.includes(fullTable[i])){
            output.push(fullTable[i])
            yFacIndex.push(i)
            break;
        }
    }
    // Iterate through xFactors array using parseInt & .innerHTML and find the product that matches boardNum
    for(let i = 0; i < xFactors.length; i++){
        let multiplyYbyX = parseInt(fullTable[yFacIndex[0]].innerHTML) * parseInt(xFactors[i].innerHTML);
        if(multiplyYbyX === parseInt(boardNum.innerHTML)){
            output.push(xFactors[i])
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

gameCenter.addEventListener('click', (e) => {
    if(e.target.closest('.numOnBoard')){   
        console.log(e.target.id, 'was clicked!')
        let target = parseInt(e.target.innerHTML)
        const allInstancesVar = allInstances(target)
        // let getIndexOf = fullTable.indexOf(target)
        highlightFactors(allInstancesVar)

        for(let i = 0; i < allInstancesVar.length; i++){
            highlightFactors(whatToHighlight(allInstancesVar[i]))
        }
        e.preventDefault()
    }
});

gameCenter.addEventListener('mouseover', function(e){
    let closestTarget = e.target.closest('.numOnBoard')
    const yFactors = yTableFactors();
    const xFactors = xTableFactors();

    if(yFactors.includes(closestTarget) || xFactors.includes(closestTarget)){
        return;
    }
    if(closestTarget){   
        let target = e.target
        let getIndexOf = fullTable.indexOf(target)
        let targetID = fullTable[getIndexOf]
        target.style.opacity = 1;
        // Pushing the target in order to mouseout and use unhighlight
        currentMouseOver.splice(0)
        currentMouseOver.push(target)
        console.log(currentMouseOver, 'current mouse over')
        highlightFactors(whatToHighlight(targetID))
    }
})

gameCenter.addEventListener('mouseout', function(){
    console.log('eh?')
    unHighlightFactors(null, 'all');
})