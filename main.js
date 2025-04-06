let total = document.getElementById('total');
let price = document.getElementById('price');
let count = document.getElementById('count');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let submit = document.getElementById('submit');
let category = document.getElementById('category');
let title = document.getElementById('title');

let mood = 'create';
var tmp;

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

let dataPro = [];
if (localStorage.product != null)
{
    dataPro = JSON.parse(localStorage.product);
}
else
{

    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        category:category.value.toLowerCase(),
        total:total.innerHTML,
        
    }
    if(mood === 'create'){
    if( newPro.count > 1){
            for(let i = 0; i < newPro.count;i++)
            {
                dataPro.push(newPro);

            }
        }
        else{
            dataPro.push(newPro);

        }
    }
    else{
        dataPro[tmp] = newPro;
        mood = 'create';
        count.style.display = 'block';
        submit.innerHTML = 'Submit';
    }
    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
}


//clear inputs

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}
//read

function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `  <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                        <td><button onclick ="deleteData(${i})" id="delete">Delete</button></td>

                    </tr>
                    `

    }
    document.getElementById('tbody').innerHTML = table; 
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0 )
    {
        btnDelete.innerHTML = `
                                <button onclick ="deleteAll()">Delete All</button>
        `
    }
    else
    {
        btnDelete.innerHTML = '';
    }

}
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();

}
showData()
//delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
//count


//update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    count.value = dataPro[i].count;
    taxes.value = dataPro[i].taxes;
    tmp = i;

    getTotal();  
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    scroll({
        top:0,
        behavior:'smooth'
    })
     
}

//search
let searchMood = 'title';
function search(id){
   
    let search = document.getElementById("search");
    search.focus();
    if(id === 'searchTitle')
    {
        searchMood = 'title';
        search.placeholder = "Search By Title";
    }
    else{
        searchMood = 'category';
        search.placeholder = "Search By Category";

    }
    search.onblur = function(){
        search.placeholder = "Search";
    }
 
    search.value = '';
    showData();
}

function searchData(value)
{
    let table = '';
    for(let i = 0; i < dataPro.length; i++)
    {
        if(searchMood == 'title')
        { 
            if(dataPro[i].title.includes(value.toLowerCase()))
            {
                table += `  <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                        <td><button onclick ="deleteData(${i})" id="delete">Delete</button></td>

                    </tr>
                    `
            }

        }
        else
        {
            searchMood = 'category';
            if(dataPro[i].category.includes(value.toLowerCase()))
            {
                table += `  <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                        <td><button onclick ="deleteData(${i})" id="delete">Delete</button></td>

                    </tr>
                    `

            }

        }
    }
  
    document.getElementById('tbody').innerHTML = table; 

}


//clean data