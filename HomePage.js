const visualizzaBrani = function (allTraks) {
  // riferimento alla riga
  const row = document.getElementById("brani");

  allTraks.forEach((event) => {
    const newColonna = document.createElement("div");
    newColonna.classList.add("col", "col-12", "col-sm-6", "col-md-3");

    newColonna.innerHTML = `
      <div class="card">
          <div class="card-body">
              <h5 class="card-name">${event.name}</h5>
              <p class="card-text">${event.description}</p>
              <p class="card-text">${event.brand}</p>
              <img class="card-img">${event.imageUrl}</img>
              < class="card-text"> ${event.price}€</p>
              <a href="./detail.html?eventId=${event._id}" class="btn btn-primary">SALVA BRANO</a>
          </div>
      </div>
      `;
    row.appendChild(newColonna);
  });
};

const getTraks = function () {
  fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDQ0NjEzOWM0MzAwMTg4MTQ1YzkiLCJpYXQiOjE2OTcxODY4ODYsImV4cCI6MTY5ODM5NjQ4Nn0.g0twYASN7w9eICXO-U1aOBwrme316yIfsj-cYhzrzPU",
    },
  })
    .then((res) => {
      hideSpinner();

      console.log("Response ottenuta dalla GET", res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel contattare il server");
      }
    })
    .then((events) => {
      console.log("Brani Inseriti:", events);

      visualizzaBrani(events);
    })
    .catch((err) => {
      hideSpinner();
      console.log("Si è verificato un errore:", err);
    });
};

getEvents();
