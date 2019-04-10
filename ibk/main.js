let karte = L.map("map");

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
  }),
  stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
    subdomains: ["a", "b", "c"],
    attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
  }),
  stamen_relief: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
    subdomains: ["a", "b", "c"],
    attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
  }),
  stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
    subdomains: ["a", "b", "c"],
    attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
  }),
};

kartenLayer.osm.addTo(karte);

  L.control.layers({
    "Geoland Basemap Map1": kartenLayer.geolandbasemap1,
    "Geoland Basemap Overlay": kartenLayer.geolandbasemap_overlay,
    "Geoland Basemap Grau": kartenLayer.geolandbasemap_grau,
    "Geoland Basemap HDPI": kartenLayer.geolandbasemap_hdpi,
    "Geoland Basemap Orthofoto": kartenLayer.geolandbasemap_ortho,
    "Geoland Basemap Gelaende": kartenLayer.geolandbasemap_gelande,
    "Geoland Basemap Oberflaeche": kartenLayer.geolandbasemap_oberfl,
    "STAMEN Toner": kartenLayer.stamen_toner,
    "STAMEN relief": kartenLayer.stamen_relief,
    "STAMEN watercolor": kartenLayer.stamen_watercolor,
  }).addTo(karte);

karte.setView(
  [47.267222, 11.392778],15
)
let positionsMarker = L.marker([47,11]).addTo(karte);


for (let staette of SPORTSTAETTEN) {   ///For Schleife welche auf die "Objekte des Sport.js file zugreift und jedes einzeln abfragt und ein Icon zuordnet."
  var piktogramm = L.icon({           /// dem Icon ein Piktogramm zuordnen.
  iconUrl: `icons/icon_${staette.ICON}_schwarz_auf_weiss_250px.png`, // gibt den Pfad zu den Icons an.
  iconSize: [20, 20]})    // größe der Icons
//marker Zeichnen
  let coords = L.marker(
    [staette.lat, staette.lng],{
      icon: piktogramm

    }).addTo(karte);
//popup hinzufügen
  coords.bindPopup(
    `<h1> ${staette.Name} </h1>
    <p> ${staette.typ} m</p>`   /// beschriftet die Popups

)};
