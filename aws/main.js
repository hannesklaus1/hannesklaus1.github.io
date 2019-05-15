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
      //console.log("Datum: ", date);
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
  /// windgeschwindiketie mit der Farbpalette hinterlegen
  const windlayer = L.featureGroup();
  const windpalette = [
        [11, "#00b900"],
        [28, "#10cd24"],
        [38, "#72d475"],
        [49, "#fed6d3"],
        [61, "#ffb6b3"],
        [74, "#ff9e9a"],
        [88, "#ff8281"],
        [102, "#ff6160"],
        [117, "#ff453c"],
        [1000, "#ff200e"],

];


  L.geoJson(stations, {
    pointToLayer: function(feature, latlng) {
      if (feature.properties.WG) {
        let color = windpalette[windpalette.length -1][1];
        for (let i = 0; i < windpalette.length; i++) {
                    //console.log(farbPalette[i],feature.properties.LT);
                    if (feature.properties.WG < windpalette[i][0]) {
                        // der Temperaturwert ist kleiner als die Schwelle -> die entsprechende Farbe zuweisen
                        color = windpalette[i][1];
                        //console.log(color, "windfarbe");
                        break;
                      } else {

                      }
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
  function getColor(d) {
      return d < 11 ? '#00b900' :
             d < 28  ? '#10cd24' :
             d < 38  ? '#72d475' :
             d < 49  ? '#fed6d3' :
             d < 61   ? '#ffb6b3' :
             d < 74   ? '#ff9e9a' :
             d < 88   ? '#ff8281' :
             d < 102   ? '#ff6160' :
             d < 117   ? '#ff453c' :
                        '#ff200e';
  }

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (karte) {

      var div = L.DomUtil.create('div', 'info legend'),
          grades = [11, 28, 38, 49, 61, 74, 88, 102, 117, 120],
          labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + ' [km/h]'+'<br>' : '+');
      }

      return div;
  };

  legend.addTo(karte);
/// toDo: wäre cool wenn der layer sich mit der auswahl des Layers ein und Auschalten würden!!!
windlayer.addTo(karte)

  // todo: erstellen der komplettenfarbpalette https://st.wetteronline.de/mdr/p_city_colormap/1.0.84/img/symbology/www/MaximumTemperature.svg
  // Danke Janina für die klickarbeit ;))
const temppalette =[
          [-28, "#646664"],
          [-26, "#8c8a8c"],
          [-24, "#b4b2b4"],
          [-22, "#cccecc"],
          [-20, "#e4e6e4"],
          [-18, "#772d76"],
          [-16, "#b123b0"],
          [-14, "#d219d1"],
          [-12, "#f0f"],
          [-10, "#ff94ff"],
          [-8, "#3800d1"],
          [-6, "#325afe"],
          [-4, "#2695ff"],
          [-2, "#00cdff"],
          [0, "#007800"],
          [2, "#009d00"],
          [4, "#00bc02"],
          [6, "#00e200"],
          [8, "#0f0"],
          [10, "#fcff00"],
          [12, "#fdf200"],
          [14, "#fde100"],
          [16, "#ffd100"],
          [18, "#ffbd00"],
          [20, "#ffad00"],
          [22, "#ff9c00"],
          [24, "#ff7800"],
          [26, "red"],
          [28, "#f30102"],
          [30, "#d20000"],
          [32, "#c10000"],
          [34, "#b10000"],
          [36, "#a10000"],
          [38, "#900000"],
          [40, "#770100"],
          [42, "#5f0100"],
          [44, "#460101"],
          [46, "#2e0203"],
  ];

  /// Die For Schleife weißt die Tempwerte der farbpalette zu! - hoffentlich
  const templayer = L.featureGroup();
  L.geoJson(stations, {
    pointToLayer: function(feature, latlng) {
      if (feature.properties.LT) {
        for(let i=0; i<temppalette.length; i++){
        //  console.log(farbpalette[i],feature.properties.LT);
          if(feature.properties.LT < temppalette[i][0]){
            color= temppalette[i][1];
            //console.log(color, feature.properties.LT)
            break;
          }else{

          }
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
  //templayer.addTo(karte)

/// Die For Schleife weißt die feuchte der farbpalette zu!
const feuchtelayer = L.featureGroup();
const feuchtpalette =[
   [30, "#EEE"],
   [40, "#DDD"],
   [50, "#C6C9CE"],
   [60, "#BBB"],
   [70, "#AAC"],
   [80, "#9998DD"],
   [90, "#8788EE"],
   [100, "#7677E1"],

];
L.geoJson(stations, {
  pointToLayer: function(feature, latlng) {
    if (feature.properties.RH) {
      let color = feuchtpalette[feuchtpalette.length -1][1];
      for(let i=0; i<feuchtpalette.length; i++){
        if(feature.properties.RH < feuchtpalette[i][0]){
          color= temppalette[i][1];
          console.log(color, feature.properties.RH)
          break;
        }else{

        }
        }
      return L.marker(latlng, {
        icon: L.divIcon({
          html: `<div class="feuchtlabel"style="background-color:${color}">${feature.properties.RH}</div>`
        })
      });
    }
  }
}).addTo(feuchtelayer);
layerControl.addOverlay(feuchtelayer, "Relative Feuchte");
//feuchtelayer.addTo(karte)

}


loadStations();
