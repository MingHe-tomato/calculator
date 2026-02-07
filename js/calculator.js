
function calculate(v1,operator,v2){
    var result='';
    if(operator==='add'){
        result=parseFloat(v1)+parseFloat(v2);
    }else if(operator==='subtract'){
        result=parseFloat(v1)-parseFloat(v2);
    }else if(operator==='multiply'){
        result=parseFloat(v1)*parseFloat(v2);
    }else if(operator==='divide'){
        result=parseFloat(v1)/parseFloat(v2);
    }
    return result;
}
var calculator=document.querySelector('.calculator');
    display=document.querySelector('.display'),
        keysContainer=document.querySelector('.keys');
keysContainer.addEventListener('click',function(e){
    if(e.target.matches('button')){
        var key=e.target,
            keyContent = key.textContent,
            displayNumber=display.textContent,
            action=key.dataset.action,
            previousKeyType=calculator.dataset.previousKeyType;

        for(var i=0,keys=keysContainer.children;i<keys.length;i++){
            keys[i].classList.remove('is-depressed');
        }
        if(!action){
            if(displayNumber==='0'||previousKeyType==='operator'){
                display.textContent=keyContent;
            }else{
                display.textContent=displayNumber+keyContent;//因为是字符串
            }
            calculator.dataset.previousKeyType='number';
        }

        if(action === 'decimal'){
            if(!displayNumber.includes('.')&& previousKeyType!=='operator'){
                display.textContent=displayNumber+'.';
            }else if(previousKeyType==='operator'){
                display.textContent='0.'
            }
            calculator.dataset.previousKeyType='decimal';
        }
        if(action==='add' || action==='subtract'
            ||action==='multiply'||action==='divide'){
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue=displayNumber;
            calculator.dataset.operator=action;
        }

        if(action==='equal'){
            var firstValue=calculator.dataset.firstValue,
                secondValue=displayNumber,
                operator=calculator.dataset.operator;
            display.textContent=calculate(firstValue,operator,secondValue);
        }
    }
});