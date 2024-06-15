

const id = new URLSearchParams(window.location.search).get("productId");

const URL = id ? "https://striveschool-api.herokuapp.com/api/product/" + id : "https://striveschool-api.herokuapp.com/api/product/";
const apiKey = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmJjNTdjMjM5YzAwMTUyZjRiNTEiLCJpYXQiOjE3MTgzNTI4MzcsImV4cCI6MTcxOTU2MjQzN30.pz3mCzH8LRoCkcUd22gG9Ml855nmvmuiCr49BUc83_4'


window.addEventListener('DOMContentLoaded', () => {

    fetch(URL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": apiKey
        }
    }
    )
        .then(resp => {

            console.log('REPONSE --->', resp)

            if (resp.ok) {
                return resp.json()
            } else {
                throw new Error('ERRORE NEL RESPONSE --->')
            }
        })
        .then(myProduct => {

            const { name, brand, price, description, imageUrl } = myProduct;

            document.getElementById('inputName').value = name
            document.getElementById('inputBrand').value = brand
            document.getElementById('inputDesc').value = description
            document.getElementById('img-details').src = imageUrl
            document.getElementById('inputPrice').value = price
        })
        .catch(err => console.log(err))

})