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
//kann duch Markergruppe und fit to bounds automatisch gerufen werden

//Openstreetmap einbinden

const kartenLayer = {
  osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    subdomains: ["a", "b", "c"],
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
  }),
  geolandbasemap1: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="://https:basemap.at“> basemap.at </a>'
  }),
  geolandbasemap_overlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="://https:basemap.at“> basemap.at </a>'
  }),
  geolandbasemap_grau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="://https:basemap.at“> basemap.at </a>'
  }),
  geolandbasemap_hdpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="://https:basemap.at“> basemap.at </a>'
  }),
  geolandbasemap_ortho: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="://https:basemap.at“> basemap.at </a>'
  }),
  geolandbasemap_gelande: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="://https:basemap.at“> basemap.at </a>'
  }),
  geolandbasemap_oberfl: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="://https:basemap.at“> basemap.at </a>'
  })
};

//kartenLayer.osm.addTo(karte);
//kartenLayer.geolandbasemap.addTo(karte);
//kartenLayer.geolandbasemap1.addTo(karte);
//kartenLayer.geolandbasemap_overlay.addTo(karte);
//kartenLayer.geolandbasemap_grau.addTo(karte);
//kartenLayer.geolandbasemap_hdpi.addTo(karte);
//kartenLayer.geolandbasemap_ortho.addTo(karte);
kartenLayer.geolandbasemap_gelande.addTo(karte);
//kartenLayer.geolandbasemap_oberfl.addTo(karte);

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

let markerGruppe = L.featureGroup().addTo(karte);

for (let blick of adlerblicke) {
  let blickpin = L.marker(
    [blick.lat, blick.lng]
  ).addTo(markerGruppe);
  blickpin.bindPopup(
    `<h1> Standort ${blick.standort} </h1>
    <p> Höhe ${blick.seehoehe} m</p>
    <em> Kunde: ${blick.kunde}</em>`

  )
};

karte.fitBounds(markerGruppe.getBounds());
