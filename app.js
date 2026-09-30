const viewer = new Cesium.Viewer('cesiumContainer', {
  terrain: Cesium.Terrain.fromWorldTerrain(),
  animation: false,
  baseLayerPicker: true,
  fullscreenButton: true,
  geocoder: true,
  homeButton: true,
  infoBox: true,
  sceneModePicker: true,
  timeline: false,
  navigationHelpButton: false,
  selectionIndicator: true,
  imageryProvider: new Cesium.UrlTemplateImageryProvider({
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/Tile/{z}/{y}/{x}',
    credit: 'Esri World Imagery'
  }),
  terrainProvider: Cesium.createWorldTerrain(),
  shouldAnimate: false,
  skyAtmosphere: true,
  skyBox: true,
  shadows: false,
  contextOptions: {
    webgl: { alpha: true }
  }
});

viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(30, 42, 6000000),
  orientation: {
    heading: Cesium.Math.toRadians(0),
    pitch: Cesium.Math.toRadians(-45),
    roll: 0
  }
});

const entityData = [
  { name: 'İstanbul', lon: 28.9784, lat: 41.0082, color: '#4ec5ff' },
  { name: 'Ankara', lon: 32.8597, lat: 39.9334, color: '#4ec5ff' },
  { name: 'Berlin', lon: 13.405, lat: 52.52, color: '#66d9ff' },
  { name: 'Paris', lon: 2.3522, lat: 48.8566, color: '#66d9ff' },
  { name: 'London', lon: -0.1276, lat: 51.5072, color: '#66d9ff' },
  { name: 'Rome', lon: 12.4964, lat: 41.9028, color: '#66d9ff' },
  { name: 'Moskova', lon: 37.6173, lat: 55.7558, color: '#66d9ff' },
  { name: 'Dubai', lon: 55.2708, lat: 25.2048, color: '#4ec5ff' },
  { name: 'Cairo', lon: 31.2357, lat: 30.0444, color: '#4ec5ff' },
  { name: 'Tehran', lon: 51.389, lat: 35.6892, color: '#4ec5ff' },
  { name: 'Delhi', lon: 77.209, lat: 28.6139, color: '#4ec5ff' },
  { name: 'Mumbai', lon: 72.8777, lat: 19.076, color: '#4ec5ff' },
  { name: 'Bangkok', lon: 100.5018, lat: 13.7563, color: '#4ec5ff' },
  { name: 'Tokyo', lon: 139.6503, lat: 35.6762, color: '#4ec5ff' },
  { name: 'Seoul', lon: 126.978, lat: 37.5665, color: '#4ec5ff' },
  { name: 'Beijing', lon: 116.4074, lat: 39.9042, color: '#4ec5ff' },
  { name: 'Shanghai', lon: 121.4737, lat: 31.2304, color: '#4ec5ff' },
  { name: 'Singapore', lon: 103.8198, lat: 1.3521, color: '#4ec5ff' },
  { name: 'Hong Kong', lon: 114.1694, lat: 22.3193, color: '#4ec5ff' },
  { name: 'Jakarta', lon: 106.8456, lat: -6.2088, color: '#4ec5ff' }
];

const regionEntity = viewer.entities.add({
  name: 'Eurasia region',
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      -10, 35,  20, 35, 30, 42, 55, 52, 85, 55, 120, 52, 150, 30, 150, 10, 120, 5, 90, 8, 66, 14, 45, 20, 20, 25, -10, 35
    ]),
    material: new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString('#7cf7d1').withAlpha(0.7)),
    width: 3,
    clampToGround: true
  }
});

const cityEntities = [];
entityData.forEach((city) => {
  const entity = viewer.entities.add({
    name: city.name,
    position: Cesium.Cartesian3.fromDegrees(city.lon, city.lat),
    point: {
      pixelSize: 8,
      color: Cesium.Color.fromCssColorString(city.color),
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 1,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    },
    label: {
      text: city.name,
      font: '14px Segoe UI',
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 1,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      pixelOffset: new Cesium.Cartesian2(0, -20),
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    }
  });
  cityEntities.push(entity);
});

const markers = new Cesium.EntityCollection();
viewer.entities.add(markers);

const searchInput = document.getElementById('searchInput');
const regionSummary = document.getElementById('regionSummary');

function focusByName(value) {
  const target = entityData.find((city) => city.name.toLowerCase().includes(value.toLowerCase()));
  if (!target) return;

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(target.lon, target.lat, 1500000),
    duration: 2.0,
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-35),
      roll: 0
    }
  });

  regionSummary.textContent = `${target.name} için 3D görünüm odaklandı. Avrupa ve Asya şehir etiketleri aktif.`;
}

searchInput.addEventListener('input', (event) => {
  const query = event.target.value.trim();
  if (!query) {
    regionSummary.textContent = 'Avrupa ve Asya sınırları, şehir etiketleri ve 3D arazi görünümü aktif.';
    return;
  }
  focusByName(query);
});

document.getElementById('btnWorld').addEventListener('click', () => {
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(30, 42, 6000000),
    orientation: { heading: 0, pitch: Cesium.Math.toRadians(-45), roll: 0 }
  });
});

document.getElementById('btnEurasia').addEventListener('click', () => {
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(60, 41, 3500000),
    orientation: { heading: 0, pitch: Cesium.Math.toRadians(-30), roll: 0 }
  });
});

document.getElementById('btnCities').addEventListener('click', () => {
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(35, 32, 2000000),
    orientation: { heading: 0, pitch: Cesium.Math.toRadians(-20), roll: 0 }
  });
});

document.getElementById('btnReset').addEventListener('click', () => {
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(30, 42, 6000000),
    orientation: { heading: 0, pitch: Cesium.Math.toRadians(-45), roll: 0 }
  });
});

viewer.scene.globe.depthTestAgainstTerrain = true;
