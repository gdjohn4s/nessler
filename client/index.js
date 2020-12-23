const container = document.querySelector('.container');
const form = document.querySelector('form'); // grabbing an element on the page
const API_URL = "http://localhost:3000/v1/addNessler/";

form.addEventListener('submit', (event) => {
    console.log('form was clicked');
    var nameIn = document.querySelector('input').value;
    var message = document.querySelector('textarea').value;

    var schema = {
        user: nameIn,
        nessler: message
    }

    if (nameIn && message){
        schema = JSON.stringify(schema);
    
        fetch(API_URL, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: schema
            })
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                console.log(JSON.stringify(data))
            })
        console.log(schema);
    } else {
        alert('Please insert the name or the message! Thanks')
    }
});
