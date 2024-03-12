let descriptionInput = document.getElementById('Description');
let amountInput = document.getElementById('Amount');
let dateInput = document.getElementById('date');
let deleteBtn = document.getElementById('btnDel');
let incomeInput = document.getElementById('income1');
let incomeBtn = document.getElementById('btnIncome');
let inputSearch = document.getElementById('search');
let newTransition = document.getElementById('newTransition');
let productConatiner = [];



if (localStorage.getItem('products') != null) {

    let expenceStorage = 0;
    let incomeStorage = 0;
    productConatiner = JSON.parse(localStorage.getItem('products'));
    displayInTable(productConatiner);
    expenceStorage = JSON.parse(localStorage.getItem('totalExp'));
    document.getElementById('expence').innerHTML = expenceStorage;
    incomeStorage = JSON.parse(localStorage.getItem('income'));
    document.getElementById('incomeNum').innerHTML = incomeStorage;

}

// calculate old expence 
function getExpence() {

    let totalExpence = 0
    productConatiner = JSON.parse(localStorage.getItem('products'));
    for (let x = 0; x < productConatiner.length; x++) {
        totalExpence += Number(productConatiner[x].amount);
    }
    document.getElementById('expence').innerHTML = totalExpence + "$";
    localStorage.setItem('totalExp', JSON.stringify(totalExpence + "$"));
    return totalExpence;
}



// get input and store in localstorage .
function getInput() {

    let transition = {
        name: descriptionInput.value,
        amount: amountInput.value,
        date: dateInput.value
    }
    amount = transition.amount;
    productConatiner.push(transition);
    localStorage.setItem("products", JSON.stringify(productConatiner));
    displayInTable(productConatiner);
    clearInput(); // clear input after add
    getExpence();

}

newTransition.addEventListener('click', function () {

    let income = JSON.parse(localStorage.getItem('income'));
    let expense = JSON.parse(localStorage.getItem('totalExp'));
    income = income.slice(0, -1);
    expense = expense.slice(0, -1);

    if (expense == income) {
        alert('you dont have much money');
    }
    else {
        getInput();
    }

})

//add new income
incomeBtn.addEventListener('click', function () {

    let newIncome = incomeInput.value;
    document.getElementById('incomeNum').innerHTML = newIncome + '$';
    localStorage.setItem('income', JSON.stringify(newIncome + '$'));

})

// clear input after add
function clearInput() {
    descriptionInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
}

//display in table
function displayInTable(arr) {
    let cartoona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartoona += `<tr>
        <td>${arr[i].name}</td>
        <td>${arr[i].amount}</td>
        <td>${arr[i].date}</td>
        <td><button  class="btn btn-outline-danger btn-sm" id="btnDel" onclick="deleteI(${i});">Delete</button></td>
    </tr>`
    }
    document.getElementById("addrow").innerHTML = cartoona;
};


// delete from table
function deleteI(x) {
    productConatiner.splice(x, 1);
    localStorage.setItem("products", JSON.stringify(productConatiner));
    displayInTable(productConatiner);
    getExpence();
}

//search item
function searchItem(term) {
    let container = []
    for (let j = 0; j < productConatiner.length; j++) {
        if (productConatiner[j].name.toLowerCase().includes(term.toLowerCase()) == true) {
            container.push(productConatiner[j]);
        }
    } displayInTable(container)
}

inputSearch.addEventListener('input', function () {
    searchItem(inputSearch.value)
})