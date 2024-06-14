const isLoading = bool => {
    const spinner = document.querySelector(".spinner-border");
  
    if (bool) {
      spinner.classList.remove("d-none");
    } else {
      spinner.classList.add("d-none");
    }
  };
  
  window.addEventListener("DOMContentLoaded", function () {
    // al caricamento del dom (pagina), avviamo una chiamata HTTP di tipo GET (implicito)
    fetch("https://striveschool-api.herokuapp.com/api/agenda/")
      .then(resp => {
        if (resp.ok) {
          // restituiamo il dato convertito in array da JSON
          return resp.json();
        }
      })
      .then(appointments => {
        // otteniamo l'array come parametro appointments
        // qui dentro ci saremo nel momento esatto in cui avremo ricevuto il dato,
        // è il punto giusto per fare tutta la dom manipulation che serve
        isLoading(false); // stiamo rendendo invisibile lo spinner perché in qualche istante verranno generati gli elementi
  
        const list = document.getElementById("appointments-list");
  
        // cicliamo appointments per generare tanti elementi "li" nella pagina quanti sono gli oggetti contenuti nell'array
        appointments.forEach(app => {
          const listItem = document.createElement("li");
          listItem.className = "list-group-item d-flex align-items-center";
          listItem.innerHTML = `<span>${app.name}</span> <span class="badge ms-auto me-2 ${app.price ? "text-bg-dark" : "text-bg-success"}">${
            app.price ? app.price + "€" : "gratis"
          }</span> <a href="./details.html?appointmentId=${app._id}">VEDI DETTAGLI</a>`;
  
          list.appendChild(listItem);
        });
      })
      .catch(err => console.log(err));
  });