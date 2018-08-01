var storageArray = [];


var coffeeOrderForm = document.querySelector('.coffee-order-form')
coffeeOrderForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var newObj = makeOrder();
    pushOrder(newObj);
});

// var submitButton = document.querySelector('[name=submit]')
// console.log(submitButton)

// document.getElementById('coffee-order-form').addEventListener('submit', function(evt){
//     evt.preventDefault();
//     document.getElementById('form').style.display = 'none';
//     document.getElementById('form-group').style.display = 'none';
// })
var makeOrder = function() {
    var coffee = document.querySelector('.nameInput');
    // console.log(coffee.value)
    var coffeeName = coffee.value

    var email = document.querySelector('.emailInput');
    // console.log(email.value)
    var custEmail = email.value

    var size = document.querySelector('[name=optradio]');
    // console.log(size.value)
    var custSize = size.value

    var flavorShot = document.querySelector('.form-control')
    // console.log(flavorShot.value)
    var custFlavor = flavorShot.value
    
    var myObj = {coffee: coffeeName, emailAddress: custEmail, size: custSize, flavor: custFlavor};

    orderRow(myObj);

    return myObj
};

var orderRow = function(order) {
    var deleteButton = document.createElement('input')
    deleteButton.setAttribute('type', 'button')
    deleteButton.setAttribute('value', 'Delete Order')
    deleteButton.addEventListener('click', function(event) {
        deleteOrder(event, order.emailAddress)
    })

    var row = document.createElement('li');
    var textContainer = document.createElement('div');

    textContainer.textContent = 'Order: ' + order.coffee + ' ' + order.emailAddress + ' Size:' + order.size + ' Flavor:' + order.flavor
    // make this below portion a new function
    
    storageArray.push(order);
    console.log(storageArray);
    

    localStorage.setItem('order', JSON.stringify(storageArray));
    
    var list = document.querySelector('.order-list');
    row.appendChild(deleteButton);
    row.appendChild(textContainer);
    list.appendChild(row);
}

var deleteOrder = function(event, emailAddress) {
    console.log('Hello')
    console.log(event.target)

    var button = event.target;
    var item = button.parentNode;
    var list1 = item.parentNode;
    list1.removeChild(item);
    
    $.ajax('https://dc-coffeerun.herokuapp.com/api/coffeeorders/' + emailAddress, 
    {
        method: 'DELETE',
        contentType: 'application/json'
    })
};

var pushOrder = function(orderObject) {
    pushObject = JSON.stringify(orderObject);
    console.log(pushObject);
    
    $.ajax('https://dc-coffeerun.herokuapp.com/api/coffeeorders', 
    {method: 'POST', data: pushObject, contentType: 'application/json'
})
}

$.ajax('https://dc-coffeerun.herokuapp.com/api/coffeeorders', { method: 'GET'
})
.then(function(data) {
    Object.values(data).forEach(function(order) {
        orderRow(order);
    })
})
//once it 