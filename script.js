const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitNextValue = false;



function sendNumberValue(number){
    if(awaitNextValue){
        calculatorDisplay.textContent = number
        awaitNextValue = false;
    }
    else{
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number ;
    }

}
function addDecimal(){
    if(awaitNextValue)return;
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}
const calculate = {
'/':(firstNumber,secondNumber)=>firstNumber/secondNumber,

'*':(firstNumber,secondNumber)=>firstNumber*secondNumber,

'+':(firstNumber,secondNumber)=>firstNumber+secondNumber,

'-':(firstNumber,secondNumber)=>firstNumber-secondNumber,

'=':(firstNumber,secondNumber)=>secondNumber,
};


function useOperator(operator){
if(awaitNextValue && operatorValue){
    operatorValue = operator
    return;
}
const currentValue = Number(calculatorDisplay.textContent);
if(!firstValue){
    firstValue = currentValue
}
else {
    const calculation = calculate[operatorValue](firstValue,currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
}
awaitNextValue = true;
operatorValue = operator;
}
inputBtns.forEach((inputBtn)=>{
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click',()=>{
            sendNumberValue(inputBtn.value);
        });
    }
    else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',()=>{
            useOperator(inputBtn.value);
        });
    }
    else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',()=>{
            addDecimal();
        });
    }
})

function resetAll(){
     firstValue = 0;
    operatorValue = '';
    awaitNextValue = false;
    calculatorDisplay.textContent = "0"
}
clearBtn.addEventListener('click',resetAll)