const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const breite2 = div.getAttribute("data2-lat");
const laenge2 = div.getAttribute("data2-lng");
const titel = div.getAttribute("data-titel");
const titel2 = div.getAttribute("data-titel2");

//console.log("breite:", breite, "länge:", laenge, "Titel:", titel);

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
  })
};
//Einen Kartenlayer laden
kartenLayer.osm.addTo(karte);

//auswahlmenü hinzufügen für die Layer
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
}).addTo(karte)


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

// gpx track laden.
var gpx = 'AdlerwegEtappe06.gpx'; // URL to your GPX file or the GPX itself
new L.GPX(gpx, {
  async: true,
  marker_options: {
    startIconUrl: 'images/pin-icon-start.png',
    endIconUrl: 'images/pin-icon-end.png',
    shadowUrl: 'images/pin-shadow.png'
  }
}).on('loaded', function(e) {
  karte.fitBounds(e.target.getBounds());
}).on('addline', function(e) {
  //console.log('linie geladen');
  const controlElevation = L.control.elevation({
    //collapsed: true,        für in Karte Implementierte Höhenprofile.
    detachedView: true,
    position: "bottomright",
  //  elevationDiv: "#elevation-div",
  });
  controlElevation.addTo(karte);
  controlElevation.addData(e.line);
  const gpxline = e.line.getLatLngs();
  //console.log(gpxline);
  for (let i=1; i< gpxline.length; i+=1){
    //console.log(gpxline[i]);
    let p1 = gpxline[i-1];
    let p2 = gpxline[i];
    let dist = karte.distance(
      [p1.lat,p1.lng],
      [p2.lat,p2.lng]
    );
    let delta = (p2.meta.ele - p1.meta.ele);
    let proz = (dist != 0 ? delta / dist * 100.0 : 0).toFixed(1);
    //console.log("Distanze: ", dist, 'höhendif: ', delta, 'steigung: ', proz);
    let farbe =
    proz >= 10? '#d73027':
    proz >= 6? '#fc8d59':
    proz >= 2? '#fee08b':
    proz >= 0? '#ffffbf':
    proz >= -6? '#d9ef8b':
    proz >= -10? '#91cf60':
      '#1a9850';

    L.polyline(
      [
        [p1.lat,p1.lng],
        [p2.lat,p2.lng],
      ], {
        color:farbe,
      }
    ).addTo(karte);
}
});

// for (let blick of adlerblicke) {
//   let blickpin = L.marker(
//     [blick.lat, blick.lng]
//   ).addTo(markerGruppe);
//   blickpin.bindPopup(
//     `<h1> Standort ${blick.standort} </h1>
//     <p> Höhe ${blick.seehoehe} m</p>
//     <em> Kunde: ${blick.kunde}</em>`
//   )
// };

// karte.fitBounds(markerGruppe.getBounds());
// karte.addControl(new L.Control.Fullscreen());
// var hash = new L.Hash(karte);
// var coords = new L.Control.Coordinates();
// coords.addTo(karte);
// karte.on('click', function(e) {
//   coords.setCoordinates(e);
// });
// ///Aufrufen des Höhenprofil Plugins
// //var controlElevation = L.control.elevation({
//
// }).addTo(karte);
