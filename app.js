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

const cityData = [
  { name: 'İstanbul', lon: 28.9784, lat: 41.0082, category: 'city', color: '#4ec5ff' },
  { name: 'Ankara', lon: 32.8597, lat: 39.9334, category: 'city', color: '#4ec5ff' },
  { name: 'Berlin', lon: 13.405, lat: 52.52, category: 'city', color: '#66d9ff' },
  { name: 'Paris', lon: 2.3522, lat: 48.8566, category: 'city', color: '#66d9ff' },
  { name: 'London', lon: -0.1276, lat: 51.5072, category: 'city', color: '#66d9ff' },
  { name: 'Rome', lon: 12.4964, lat: 41.9028, category: 'city', color: '#66d9ff' },
  { name: 'Moskova', lon: 37.6173, lat: 55.7558, category: 'city', color: '#66d9ff' },
  { name: 'Dubai', lon: 55.2708, lat: 25.2048, category: 'city', color: '#4ec5ff' },
  { name: 'Cairo', lon: 31.2357, lat: 30.0444, category: 'city', color: '#4ec5ff' },
  { name: 'Tehran', lon: 51.389, lat: 35.6892, category: 'city', color: '#4ec5ff' },
  { name: 'Delhi', lon: 77.209, lat: 28.6139, category: 'city', color: '#4ec5ff' },
  { name: 'Mumbai', lon: 72.8777, lat: 19.076, category: 'city', color: '#4ec5ff' },
  { name: 'Bangkok', lon: 100.5018, lat: 13.7563, category: 'city', color: '#4ec5ff' },
  { name: 'Tokyo', lon: 139.6503, lat: 35.6762, category: 'city', color: '#4ec5ff' },
  { name: 'Seoul', lon: 126.978, lat: 37.5665, category: 'city', color: '#4ec5ff' },
  { name: 'Beijing', lon: 116.4074, lat: 39.9042, category: 'city', color: '#4ec5ff' },
  { name: 'Shanghai', lon: 121.4737, lat: 31.2304, category: 'city', color: '#4ec5ff' },
  { name: 'Singapore', lon: 103.8198, lat: 1.3521, category: 'city', color: '#4ec5ff' },
  { name: 'Hong Kong', lon: 114.1694, lat: 22.3193, category: 'city', color: '#4ec5ff' },
  { name: 'Jakarta', lon: 106.8456, lat: -6.2088, category: 'city', color: '#4ec5ff' }
];

const districtData = [
  { name: 'Kadıköy', lon: 29.037, lat: 40.981, category: 'district', color: '#7cf7d1' },
  { name: 'Beşiktaş', lon: 29.008, lat: 41.042, category: 'district', color: '#7cf7d1' },
  { name: 'Fatih', lon: 28.958, lat: 41.012, category: 'district', color: '#7cf7d1' },
  { name: 'Shibuya', lon: 139.7006, lat: 35.6595, category: 'district', color: '#7cf7d1' },
  { name: 'Shinjuku', lon: 139.7006, lat: 35.6938, category: 'district', color: '#7cf7d1' },
  { name: 'Soho', lon: -0.136, lat: 51.513, category: 'district', color: '#7cf7d1' },
  { name: 'Montmartre', lon: 2.343, lat: 48.886, category: 'district', color: '#7cf7d1' },
  { name: 'Connaught Place', lon: 77.2167, lat: 28.6328, category: 'district', color: '#7cf7d1' }
];

const regionData = [
  { name: 'Avrupa', lon: 18, lat: 54, category: 'region', color: '#ffb066' },
  { name: 'Asya', lon: 90, lat: 42, category: 'region', color: '#ffb066' },
  { name: 'Orta Doğu', lon: 40, lat: 31, category: 'region', color: '#ffb066' },
  { name: 'Doğu Asya', lon: 120, lat: 36, category: 'region', color: '#ffb066' },
  { name: 'Güney Asya', lon: 78, lat: 22, category: 'region', color: '#ffb066' }
];

const regionEntity = viewer.entities.add({
  name: 'Eurasia region',
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      -10, 35, 20, 35, 30, 42, 55, 52, 85, 55, 120, 52, 150, 30, 150, 10, 120, 5, 90, 8, 66, 14, 45, 20, 20, 25, -10, 35
    ]),
    material: new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString('#7cf7d1').withAlpha(0.7)),
    width: 3,
    clampToGround: true
  }
});

const labelEntitySets = {
  region: [],
  city: [],
  district: []
};

function addLabelEntity(item) {
  const entity = viewer.entities.add({
    name: item.name,
    position: Cesium.Cartesian3.fromDegrees(item.lon, item.lat),
    point: {
      pixelSize: item.category === 'region' ? 7 : 6,
      color: Cesium.Color.fromCssColorString(item.color),
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 1,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    },
    label: {
      text: item.name,
      font: item.category === 'region' ? '16px Segoe UI' : '13px Segoe UI',
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 1,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      pixelOffset: new Cesium.Cartesian2(0, item.category === 'region' ? -18 : -14),
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, item.category === 'region' ? 10000000 : 6000000)
    }
  });

  labelEntitySets[item.category].push(entity);
}

regionData.forEach(addLabelEntity);
cityData.forEach(addLabelEntity);
districtData.forEach(addLabelEntity);

const searchInput = document.getElementById('searchInput');
const regionSummary = document.getElementById('regionSummary');

function getEntityByName(query) {
  const value = query.toLowerCase();
  const pool = [...regionData, ...cityData, ...districtData];
  return pool.find((item) => item.name.toLowerCase().includes(value));
}

function focusByName(value) {
  const target = getEntityByName(value);
  if (!target) return;

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(target.lon, target.lat, target.category === 'region' ? 3000000 : 1200000),
    duration: 2.0,
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-35),
      roll: 0
    }
  });

  regionSummary.textContent = `${target.name} için 3D görünüm odaklandı. Bölgeler, şehirler ve ilçeler aktif.`;
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
