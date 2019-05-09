let karte = L.map("map");

const kartenLayer = {
  osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
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

const layerControl = L.control.layers({
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
  [47.267222, 11.392778], 15
);

async function loadStations() {
  const response = await fetch("https://aws.openweb.cc/stations");
  const stations = await response.json();
  const awsTirol = L.featureGroup();
  L.geoJson(stations)
    .bindPopup(function(layer) {
      //console.log("layer ", layer);
      const date = new Date(layer.feature.properties.date);
      console.log("Datum: ", date);
      return `<h4>${layer.feature.properties.name}</h4>
    Höhe (m): ${layer.feature.geometry.coordinates[2]}
    Temperatur: ${layer.feature.properties.LT} °C <br>
    Datum: ${date.toLocaleDateString("de-AT")}
    Time: ${date.toLocaleTimeString("de-AT")}<br>
    Windspeed: ${layer.feature.properties.WG ? layer.feature.properties.WG + ' km/h:' : 'keine Daten'}
    <hr>
    <footer> Land Tirol - <a href="https://data.tirol.gv.at" >data.tirol.gv.at </a></footer>
    `;
    })
    .addTo(awsTirol);
  ///awsTirol.addTo(karte);
  karte.fitBounds(awsTirol.getBounds());
  layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");

  /// Windrichtung Anzeigen lassen.
  const windlayer = L.featureGroup();
  L.geoJson(stations, {
    pointToLayer: function(feature, latlng) {
      if (feature.properties.WR) {
        let color = 'black';
        if (feature.properties.WG > 20) {
          color = 'red';
        }
        return L.marker(latlng, {
          icon: L.divIcon({
            html: `<i style= "color: ${color}; transform: rotate(${feature.properties.WR}deg" class="fas fa-chevron-up fa-3x"></i>`
          })
        });
      }
    }
  }).addTo(windlayer);
  layerControl.addOverlay(windlayer, "WindRichtungen");
  ///windlayer.addTo(karte)

  // todo: erstellen der komplettenfarbpalette https://st.wetteronline.de/mdr/p_city_colormap/1.0.84/img/symbology/www/MaximumTemperature.svg

const farbpalette =[
  //  [0,"blue"],
  //  [1, "#00537f"],
  //  [2, "none"],
  //  [3,"none"],
  //  [0, "#ffffff"],
  // [1, "#646664"],
  //  [2, "#8c8a8c"],
  //  [3, "#b4b2b4"],
  //  [4, "#cccecc"],
  //  [5, "#e4e6e4"],
  //  [6, "#772d76"],
  //  [7, "#b123b0"],
  //  [8, "#d219d1"],
  //  [9, "#f0f"],
  //  [10, "#ff94ff"],
  //  [11, "#3800d1"],
  //  [12, "#325afe"],
  //  [13, "#2695ff"],
  //  [14, "#00cdff"],
    [1, "#007800"],
    [2, "#009d00"],
    [3, "#00bc02"],
    [4, "#00e200"],
    [5, "#0f0"],
    [6, "#fcff00"],
    [7, "#fdf200"],
    [8, "#fde100"],
    [9, "#ffd100"],
    [10, "#ffbd00"],
    [11, "#ffad00"],
    [12, "#ff9c00"],
    [13, "#ff7800"],
    [14, "red"],
    [15, "#f30102"],
    [16, "#d20000"],
    [17, "#c10000"],
    [18, "#b10000"],
    [19, "#a10000"],
    [20, "#900000"],
    [21, "#770100"],
    [22, "#5f0100"],
    [23, "#460101"],
    [24, "#2e0203"],
    [25, "#00fffe"],
 ];

  /// Die For Schleife weißt die Tempwerte der farbpalette zu! - hoffentlich
  const templayer = L.featureGroup();
  L.geoJson(stations, {
    pointToLayer: function(feature, latlng) {
      if (feature.properties.LT) {
        let color = 'red';
        for(let i=0; i<farbpalette.length; i++){
        //  console.log(farbpalette[i],feature.properties.LT);
          if(feature.properties.LT < farbpalette[i][0]){
            color= farbpalette[i][1];
            console.log(color, feature.properties.LT)
            break;
          }
        }
        if (feature.properties.LT < 0) {
          color = 'blue';
        }
        return L.marker(latlng, {
          icon: L.divIcon({
            html: `<div class="temperaturlabel"style="background-color:${color}">${feature.properties.LT}</div>`
          })
        });
      }
    }
  }).addTo(templayer);
  layerControl.addOverlay(templayer, "Temperatur");
  templayer.addTo(karte)
}

loadStations();
