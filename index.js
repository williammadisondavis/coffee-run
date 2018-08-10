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
    
    var order = {coffee: coffeeName, emailAddress: custEmail, size: custSize, flavor: custFlavor};

    orderRow(order);

    return order
};

var orderRow = function(order) {
    var deleteButton = document.createElement('input')
    deleteButton.setAttribute('type', 'button')
    deleteButton.setAttribute('value', 'Remove Order')
    deleteButton.setAttribute('class', 'DeleteButton')
    deleteButton.addEventListener('click', function(event) {
        deleteOrder(event, order.emailAddress)
    })

    var row = document.createElement('li');
    var textContainer = document.createElement('div');

    textContainer.textContent = 'Order: ' + order.coffee + ' Email: ' + order.emailAddress + ' Size:' + order.size + ' Flavor:' + order.flavor
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
};

$.ajax('https://dc-coffeerun.herokuapp.com/api/coffeeorders', { method: 'GET'
})
// synchronous or blocking in python specifically - this program is blocked on this line of code until it executes
// below is a callback function
//javascript is called synchronous pogramming or callback oriented, which means it continues until the server responds to pick the task back up
// the call back is first introduced as the function
.then(function(data) {
    Object.values(data).forEach(function(order) {
        orderRow(order);
    })
})

// var coffeeOrdersPromise = $.get('https://dc-coffeerun.herokuapp.com/api/coffeeorders'/jonathan@digitacrafts.com/)
// $.get gives us back a PROMISE, an object with key value pairs
//.then is a method, or function of the promise
//coffeeOrdersPromise.then(function(response){
    // var toJSONPromise = response.json()
    //^ this gives another promise, so put it into a variable called toJSONPromise for example
    // toJSONPromise.then(function(orders) {
        // console.log(orders);
    // })
    //
    // console.log('DONE!');
// });
//the callback is the same callback that would usually be the seconds argument of our .get request

//fetch is a function you can call anywhere, it is the same as .ajax but it's the real deal built in to every browser
//no need for jQuery
//fetch api does not JSON parse our information we receive, automatically
//.then will not have order in it, it will have a response object like a 200 code
//