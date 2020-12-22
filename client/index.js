function insertNessler() {
    var nameIn = document.querySelector('input').value;
    var message = document.querySelector('textarea').value;

    var schema = {
        user: nameIn,
        nessler: message
    }

    schema = JSON.stringify(schema);

    fetch("http://localhost:3000/v1/addNessler/", {
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
}