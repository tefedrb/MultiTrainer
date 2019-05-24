// import {checkGame} from './main.js'
let anyNum = document.querySelector('.numOnBoard')
let body = document.querySelector('body')
let gameCenter = document.querySelector('.game-center')
document.querySelector('.numOnBoard').addEventListener('click', (e)=> {
    
    e.preventDefault()
    console.log('clicked')
    
})

anyNum.addEventListener('mouseenter', (e) => {
    this.style.color = 'red'
})

gameCenter.addEventListener('click', (e) => {
    if(e.target.closest('.numOnBoard')){
        
        
        console.log(e.target.id, 'was clicked!')
        e.preventDefault()
    }
});

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
    return output;
};


// I'M TRYING TO TURN THIS LIST OF NODES INTO AN ACTUAL ARRAY
const getFactorRefer = (arr) => {
    const newArr = arr.map(element => {
        let holdThis = document.querySelectorAll('#numOnBoard'+element);
        return Array.from(holdThis)
    });
    
    const flatOutput = newArr.reduce((acc, cur) => {
        return acc.concat(cur)  
    }, [])
    
    return flatOutput;
};

const highLightFactors = (arr) => {
    // when element is highlighted, we want to highlight nums in array
    for(let i = 0; i < nodeList.length; i++){
        for(let j = 0; j < nodeList[i].length; j++){
          nodeList[i][j].style.opacity = 1;  
        }
    }
    /*nodeList.forEach(node => {
        node.style.opacity = 1;
    }); */
};