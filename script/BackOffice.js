const trakContent = new URLSearchParams(location.search);
const eventId = trakContent.get("eventId");
console.log(eventId);

if (eventId) {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + eventId)
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
      const brandInput = document.getElementById("brand");
      const imageUrl = document.getElementById("imagUrl");
      const priceInput = document.getElementById("price");

      nameInput.value = eventDetails.name;
      descriptionInput.value = eventDetails.description;
      brandInput.value = eventDetails.brand;
      imageUrl.value = eventDetails.imageUrl;
      priceInput.value = eventDetails.price;
    })
    .catch((err) => {
      console.log("errore", err);
    });
}

const formReference = document.getElementById("form");
formReference.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("invio brano all'API");

  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imageUrlInput = document.getElementById("imageUrl");
  const priceInput = document.getElementById("price");

  const newTrak = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageUrlInput.value,
    price: priceInput.value,
  };

  console.log("Oggetto caricato nell' API", newTrak);

  let methodToUse = "POST";
  if (eventId) {
    methodToUse = "PUT";
  }

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    body: JSON.stringify(newTrak),

    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDQ0NjEzOWM0MzAwMTg4MTQ1YzkiLCJpYXQiOjE2OTcxODY4ODYsImV4cCI6MTY5ODM5NjQ4Nn0.g0twYASN7w9eICXO-U1aOBwrme316yIfsj-cYhzrzPU",
    },
  })
    .then((res) => {
      console.log("Oggetto Post", res);
      if (res.ok) {
        alert("Brano salvato!");
      } else {
        alert("Errore nel salvataggio del brano");
        throw new Error("Errore nella POST");
      }
    })
    .catch((err) => {
      console.log("Si è verificato un errore:", err);
    });
});
