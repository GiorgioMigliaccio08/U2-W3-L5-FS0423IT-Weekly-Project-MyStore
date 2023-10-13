const trakContent = new URLSearchParams(location.search);
const eventId = trakContent.get("eventId");
console.log(eventId);

if (eventId) {
  fetch(
    "https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/" +
      eventId
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("ERRORE NEL RECUPERO DETTAGLIO");
      }
    })
    .then((eventDetails) => {
      const nameInput = document.getElementById("name");
      const descriptionInput = document.getElementById("description");
      const priceInput = document.getElementById("price");
      const timeInput = document.getElementById("time");

      nameInput.value = eventDetails.name;
      descriptionInput.value = eventDetails.description;
      priceInput.value = eventDetails.price;
      timeInput.value = eventDetails.time.split(".000Z")[0]; // rimuove '.000Z' dalla stringa
    })
    .catch((err) => {
      console.log("errore", err);
    });
}

const formReference = document.getElementById("form");
formReference.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("invio i dati all'API");

  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imageUrlInput = document.getElementById("imageUrl");
  const priceInput = document.getElementById("price");

  const newEvent = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageUrlInput.value,
    price: priceInput.value,
  };

  console.log("Ecco l'oggetto che manderò alle API", newEvent);

  let methodToUse = "POST";
  if (eventId) {
    methodToUse = "PUT";
  }

  fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
    method: "POST",
    body: JSON.stringify(newEvent),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDQ0NjEzOWM0MzAwMTg4MTQ1YzkiLCJpYXQiOjE2OTcxODY4ODYsImV4cCI6MTY5ODM5NjQ4Nn0.g0twYASN7w9eICXO-U1aOBwrme316yIfsj-cYhzrzPU",
    },
  })
    .then((res) => {
      console.log("OGGETTO RESPONSE DELLA NOSTRA CHIAMATA POST", res);
      if (res.ok) {
        alert("EVENTO SALVATO CORRETTAMENTE!");
      } else {
        o;
        alert("ERRORE NEL SALVATAGGIO DELL'EVENTO");
        throw new Error("Errore nella POST");
      }
    })
    .catch((err) => {
      console.log("Si è verificato un errore:", err);
    });
});
