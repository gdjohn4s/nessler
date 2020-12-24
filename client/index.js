const container = document.querySelector('.container');
const form = document.querySelector('form'); // grabbing an element on the page
const API_URL = "http://127.0.0.1:3000/v1/";


function getAllNes() {
    const card = document.querySelector('card');
    const cardBody = document.querySelector('card-body');

    fetch(`${API_URL}`)
        .then(response => response.json())
        .then(nes => {
            console.log(nes);
        });

    cardBody.innerHTML = <h1> PUCCHIACCA </h1>;
        
}

form.addEventListener('submit', (event) => {
    console.log('form was clicked');
    const formData = new FormData();
    var nameIn = document.querySelector('input').value;
    var message = document.querySelector('textarea').value;

    event.preventDefault();

    var schema = {
        user: nameIn,
        nessler: message
    }

    if (nameIn && message){
        schema = JSON.stringify(schema);
    
        fetch(`${API_URL}addNessler`, {
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
