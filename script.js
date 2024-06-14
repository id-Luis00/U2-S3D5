

const URL = 'https://striveschool-api.herokuapp.com/api/product/'

const container = document.getElementById('cards-container')




window.addEventListener('DOMContentLoaded', () => {

    fetch(URL, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmJjNTdjMjM5YzAwMTUyZjRiNTEiLCJpYXQiOjE3MTgzNTI4MzcsImV4cCI6MTcxOTU2MjQzN30.pz3mCzH8LRoCkcUd22gG9Ml855nmvmuiCr49BUc83_4'

        }
    })
        .then(response => {
            console.log(response)

            return response.json()
        })
        .then(obj => {
            console.log(obj)
            obj.forEach(currentObj => {

                cardGenerate(currentObj)
            });
        })

        .catch(err => console.log(err))


})



const cardGenerate = (obj) => {

    /* <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
    </div> */

    const card = document.createElement('div')
    card.className = 'card'

    const picture = document.createElement('img')
    picture.className = 'card-img-top'
    picture.alt= 'immagine'
    picture.src = obj.imageUrl

    const cardBody = document.createElement('div')
    cardBody.className = 'card-body'

    const cardTitle = document.createElement('h5')
    cardTitle.className = 'card-title'
    cardTitle.innerText = obj.name

    const cardText = document.createElement('p')
    cardText.className = 'card-text'
    cardText.innerText = obj.description + " Prezzo: " + obj.price

    const cardBtn = document.createElement('a')
    cardBtn.className = 'btn btn-primary'
    cardBtn.innerText = 'Dettagli'
    cardBtn.href = './details.html'

    const btnModify = document.createElement('a')
    btnModify.className = 'btn btn-info ml-2'
    btnModify.innerText = 'Modifica'
    btnModify.href = `./backoffice.html?productId=${obj._id}`

    cardBody.append(cardTitle, cardText, cardBtn, btnModify)
    card.append(picture, cardBody)

    container.append(card)


} 



const backOffice = document.getElementById('backoffice')

