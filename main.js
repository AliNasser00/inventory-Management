let total = document.getElementById('total');
let price = document.getElementById('price');
let count = document.getElementById('count');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let submit = document.getElementById('submit');
let category = document.getElementById('category');
let title = document.getElementById('title');

//get total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +ads.value + +taxes.value) - +discount.value;
        total.textContent = result;
        total.style.backgroundColor = '#040'
    }
    else
    {
        total.textContent = '';
        total.style.backgroundColor = 'rgb(133, 14, 6)'

    }
}






//creata a product 
//save to localstorage
//clear inputs
//read
//count
//delete
//update
//search
//clean data