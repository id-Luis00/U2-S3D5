
const id = new URLSearchParams(window.location.search).get("productId");


const URL = id ? "https://striveschool-api.herokuapp.com/api/product/" + id : "https://striveschool-api.herokuapp.com/api/agenda/";
const apiKey = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmJjNTdjMjM5YzAwMTUyZjRiNTEiLCJpYXQiOjE3MTgzNTI4MzcsImV4cCI6MTcxOTU2MjQzN30.pz3mCzH8LRoCkcUd22gG9Ml855nmvmuiCr49BUc83_4'


const method = id ? "PUT" : "POST"

window.addEventListener('DOMContentLoaded', () => {

    const btn1 = document.createElement('button')
    btn1.className = 'btn btn-outline-success'

    const btn2 = document.createElement('button')
    btn2.className = 'btn btn-outline-danger'

    const buttonsForm = document.getElementById('buttonForm')
    buttonsForm.append(btn1, btn2)

    const titleMethod = document.getElementById('modify-add')
    titleMethod.innerText = ''

    const form = document.querySelector('form')

    form.onsubmit = handleSubmit;


    if (id) {
        titleMethod.innerText = 'Modifica'
        btn1.innerText = 'Modifica'
        btn2.innerText = 'Rimuovi'

        btn2.onclick = handleRemove;


        fetch(URL, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': apiKey
            }
        }
        )

            .then(resp => {

                if (resp) {

                    console.log(resp)
                    return resp.json()

                }
                else {
                    throw new Error('Fallito!!!!!')
                }

            })
            .then(productObj => {
                console.log('nostro array di oggetti  ---->', productObj)

                const { name, brand, description, imageUrl, price } = productObj

                document.getElementById('inputName').value = name
                document.getElementById('inputBrand').value = brand
                document.getElementById('inputDesc').value = description
                document.getElementById('inputImg').value = imageUrl
                document.getElementById('inputPrice').value = price
            })

            .catch(err => console.log(err))





    } else {
        titleMethod.innerText = 'Aggiungi'
        btn1.innerText = 'Aggiungi'
        btn2.innerText = 'Reset'
        btn2.type = 'reset'
    }



})

const handleRemove = (e) => {

    e.preventDefault()

    const Conferma = confirm("sei sicuro di voler eliminare questo appuntamento?");

    fetch(URL, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": apiKey
        }
    })
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            }
        })
        .then(deletedProduct => {
            alert("Hai eliminato il prodotto " + deletedProduct.name);
            window.location.assign("/");
        })
        .catch(err => console.log(err));
}


const handleSubmit = e => {

    e.preventDefault();

    const newProduct = {
        name: document.getElementById('inputName').value,
        brand: document.getElementById('inputBrand').value,
        description: document.getElementById('inputDesc').value,
        imageUrl: document.getElementById('inputImg').value,
        price: document.getElementById('inputPrice').value

    }
    console.log(newProduct)


    fetch(URL, {
        method: method,
        body: JSON.stringify(newProduct),
        headers: {
            "Content-Type": "application/json",
            "Authorization": apiKey
        }
    })
        .then(resp => {
            if (resp.ok) {
                return resp.json()
            }
            else {
                throw new Error('errore nella creazione del prodotto ------------>');
            }
        })
        .then(createdProduct => {
            console.log("PRODOTTO CREATO", createdProduct)
            alert('Prodotto creato!!!')
        })
        .catch(err => console.log(err))
}