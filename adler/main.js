const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const breite2 = div.getAttribute("data2-lat");
const laenge2 = div.getAttribute("data2-lng");
const titel = div.getAttribute("data-titel");
const titel2 = div.getAttribute("data-titel2");

console.log("breite:", breite, "länge:", laenge, "Titel:", titel);

// initialieren der Karte

let karte = L.map("map");
//console.log(karte);

// auf Ausschnitt zoomen
karte.setView(
  [47.2, 11.2],
  8
);


//Openstreetmap einbinden

L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

//Positionsmarker Hinzufügen
let Start = L.marker(
  [breite, laenge]
).addTo(karte);

let Ende = L.marker(
  [breite2, laenge2]
).addTo(karte);

//popup an Pin setzten
Start.bindPopup(titel).openPopup();
Ende.bindPopup(titel2).openPopup();

const blick1 = { // ein Objekt "blick1" erstellt mit div werten
  kunde: " Wilder Kaiser ",
  standort: "Gruttenhütte",
  seehoehe: "1640",
  lat: "47.55564",
  lng: "12.31861",
};

const blick2 = { // ein Objekt "blick1" erstellt mit div werten
  kunde: " Bergbahnen Scheffau",
  standort: "Brandstadl",
  seehoehe: "1640",
  lat: "47.491200",
  lng: "12.24805556",
};

const blick3 = { // ein Objekt "blick1" erstellt mit div werten
  kunde: " Lechtal Tourismus ",
  standort: "Sonnalm Jöchelspitze",
  seehoehe: "1786",
  lat: "47.275325",
  lng: "10.364524",
};


const adlerblicke = [ // ein array erstellen damit man mit schleife druchgehen kann
  { // ein Objekt "blick1" erstellt mit div werten
    kunde: " Wilder Kaiser ",
    standort: "Gruttenhütte",
    seehoehe: "1640",
    lat: "47.55564",
    lng: "12.31861",
  },
  { // ein Objekt "blick1" erstellt mit div werten
    kunde: " Bergbahnen Scheffau",
    standort: "Brandstadl",
    seehoehe: "1640",
    lat: "47.491200",
    lng: "12.24805556",
  },
  {
    kunde: " Lechtal Tourismus ",
    standort: "Sonnalm Jöchelspitze",
    seehoehe: "1786",
    lat: "47.275325",
    lng: "10.364524",
  }
];

for (let blick of adlerblicke) {
  let blickpin = L.marker(
    [blick.lat, blick.lng]
  ).addTo(karte);
  blickpin.bindPopup(
    `<h1> Standort ${blick.standort} </h1>
    <p> Höhe ${blick.seehoehe} m</p>
    <em> Kunde: ${blick.kunde}</em>`

  )
}
