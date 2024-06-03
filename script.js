// let price = 1.87;
// let cid = [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.1],
//   ["QUARTER", 4.25],
//   ["ONE", 90],
//   ["FIVE", 55],
//   ["TEN", 20],
//   ["TWENTY", 60],
//   ["ONE HUNDRED", 100]
// ];
let price = 19.5;
let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0.00],
  ["DIME", 0.00],
  ["QUARTER", 0.00],
  ["ONE", 0.00],
  ["FIVE", 0.00],
  ["TEN", 0.00],
  ["TWENTY", 0.00],
  ["ONE HUNDRED", 0.00]
];

const changeDue = document.getElementById('change-due');
const inputCash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const [...coinsArr ]= document.querySelectorAll('.coins span');

document.getElementById('total').textContent += price;

const step = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
let res = [];

const changeScreen = (arr)=>{
    for (let i=0; i<coinsArr.length; i++){
        coinsArr[i].textContent = arr[i][1] 
    }
}

const getCustomerAmount = ()=>{
    return inputCash.value
}

const calculateChange = ( change, index ) => {
    const rate = step[index];
    if(index < 0){
        return ''
    } else{
        if( change >= rate && cid[index][1]>0){
            const integer = parseFloat((Math.floor(change/rate) * rate).toFixed(2));
            const restInKasa = parseFloat((cid[index][1] - integer).toFixed(2));
            const rest = restInKasa < 0 ? Math.abs(restInKasa) + parseFloat((change%rate).toFixed(2)) : parseFloat((change%rate).toFixed(2));           
            res.push([cid[index][0], restInKasa <0? cid[index][1] : integer]);
            cid[index][1] =  restInKasa > 0 ? restInKasa : 0.00;
            return calculateChange(rest, index-1)
        } else{
            return calculateChange(change, index-1)
        }
    }
    
}

const reset = ()=>{
    res = [];
    inputCash.value = '';
}
const countKasa = (arr)=>{
    let sum = 0;
    arr.forEach(el=>{
        sum += el[1]
    })
    return sum
}

const changeStatus = ()=>{
    const cash = getCustomerAmount();
    const change = parseFloat((cash - price).toFixed(2));
    if (cash < price){
        alert('Customer does not have enough money to purchase the item')
    } else if( cash == price){
        changeDue.textContent = "No change due - customer paid with exact cash";
    } else if(countKasa(cid) < change){
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS"
    } else{
      calculateChange(change, 8)
      if(countKasa(cid) == 0){
            changeDue.textContent = `Status: CLOSED `
            res.forEach(el=>{
                changeDue.textContent += `\n${el[0]}: $${el[1]}`;
            })
            changeScreen(cid)
        } else if( parseFloat(countKasa(res).toFixed(2)) != change){
            changeDue.textContent = "Status: INSUFFICIENT_FUNDS"
        } else {
            changeDue.textContent = `Status: OPEN`;
            res.forEach(el=>{
                changeDue.textContent += `\n${el[0]}: $${el[1]}`;
            })
            changeScreen(cid)
        }
        reset()
    }
}

purchaseBtn.addEventListener('click', changeStatus)


changeScreen(cid)
