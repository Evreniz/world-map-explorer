const map = L.map('map', {
  minZoom: 2,
  maxZoom: 16,
  preferCanvas: true
}).setView([40, 25], 3);

const baseLayers = {
  satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri'
  }),
  topo: L.tileLayer('https://a.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: OpenTopoMap'
  }),
  dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: 'Map data: CartoDB'
  })
};

let activeBase = 'satellite';
baseLayers[activeBase].addTo(map);

const layers = {
  cities: L.layerGroup(),
  mountains: L.layerGroup(),
  geologyLayer: L.layerGroup(),
  faultsLayer: L.layerGroup(),
  custom: L.layerGroup(),
  regionLabels: L.layerGroup(),
  districtLabels: L.layerGroup(),
  neighborhoodLabels: L.layerGroup()
};

const regionLabels = [
  { name: 'Avrupa', lat: 54, lng: 18 },
  { name: 'Asya', lat: 42, lng: 90 },
  { name: 'Orta Doğu', lat: 31, lng: 40 },
  { name: 'Doğu Asya', lat: 36, lng: 120 },
  { name: 'Güney Asya', lat: 22, lng: 78 },
  { name: 'Kuzey Avrupa', lat: 62, lng: 18 },
  { name: 'Balkanlar', lat: 45, lng: 20 },
  { name: 'Karadeniz', lat: 42, lng: 35 }
];

const cityLabels = [
  { name: 'İstanbul', lat: 41.0082, lng: 28.9784, minZoom: 3 },
  { name: 'Ankara', lat: 39.9334, lng: 32.8597, minZoom: 4 },
  { name: 'İzmir', lat: 38.4237, lng: 27.1428, minZoom: 4 },
  { name: 'Berlin', lat: 52.52, lng: 13.405, minZoom: 3 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522, minZoom: 3 },
  { name: 'Londra', lat: 51.5072, lng: -0.1276, minZoom: 3 },
  { name: 'Madrid', lat: 40.4168, lng: -3.7038, minZoom: 4 },
  { name: 'Roma', lat: 41.9028, lng: 12.4964, minZoom: 4 },
  { name: 'Moskova', lat: 55.7558, lng: 37.6173, minZoom: 3 },
  { name: 'Kiev', lat: 50.4501, lng: 30.5234, minZoom: 4 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, minZoom: 4 },
  { name: 'Cairo', lat: 30.0444, lng: 31.2357, minZoom: 4 },
  { name: 'Tehran', lat: 35.6892, lng: 51.389, minZoom: 4 },
  { name: 'Riyadh', lat: 24.7136, lng: 46.6753, minZoom: 4 },
  { name: 'Delhi', lat: 28.6139, lng: 77.209, minZoom: 4 },
  { name: 'Mumbai', lat: 19.076, lng: 72.8777, minZoom: 4 },
  { name: 'Bangkok', lat: 13.7563, lng: 100.5018, minZoom: 4 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, minZoom: 4 },
  { name: 'Hong Kong', lat: 22.3193, lng: 114.1694, minZoom: 4 },
  { name: 'Beijing', lat: 39.9042, lng: 116.4074, minZoom: 4 },
  { name: 'Shanghai', lat: 31.2304, lng: 121.4737, minZoom: 4 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, minZoom: 3 },
  { name: 'Seoul', lat: 37.5665, lng: 126.978, minZoom: 4 },
  { name: 'Osaka', lat: 34.6937, lng: 135.5023, minZoom: 4 },
  { name: 'Bangkok', lat: 13.7563, lng: 100.5018, minZoom: 4 },
  { name: 'Jakarta', lat: -6.2088, lng: 106.8456, minZoom: 4 },
  { name: 'Manila', lat: 14.5995, lng: 120.9842, minZoom: 4 },
  { name: 'Kuala Lumpur', lat: 3.139, lng: 101.6869, minZoom: 4 },
  { name: 'Hanoi', lat: 21.0278, lng: 105.8342, minZoom: 4 },
  { name: 'Baku', lat: 40.4093, lng: 49.8671, minZoom: 4 }
];

const districtLabels = [
  { name: 'Kadıköy', lat: 40.981, lng: 29.037, minZoom: 8 },
  { name: 'Beşiktaş', lat: 41.042, lng: 29.008, minZoom: 8 },
  { name: 'Fatih', lat: 41.012, lng: 28.958, minZoom: 8 },
  { name: 'Şişli', lat: 41.061, lng: 28.987, minZoom: 8 },
  { name: 'Kensington', lat: 51.5014, lng: -0.194, minZoom: 9 },
  { name: 'Westminster', lat: 51.4978, lng: -0.135, minZoom: 9 },
  { name: 'Le Marais', lat: 48.857, lng: 2.358, minZoom: 9 },
  { name: 'Montmartre', lat: 48.886, lng: 2.343, minZoom: 9 },
  { name: 'Shibuya', lat: 35.6595, lng: 139.7006, minZoom: 9 },
  { name: 'Shinjuku', lat: 35.6938, lng: 139.7006, minZoom: 9 },
  { name: 'Ginza', lat: 35.6719, lng: 139.767, minZoom: 9 },
  { name: 'Chaoyang', lat: 39.921, lng: 116.443, minZoom: 9 },
  { name: 'Connaught Place', lat: 28.6328, lng: 77.2167, minZoom: 9 },
  { name: 'Downtown', lat: 25.1979, lng: 55.2744, minZoom: 9 }
];

const neighborhoodLabels = [
  { name: 'Sultanahmet', lat: 41.0059, lng: 28.977, minZoom: 11 },
  { name: 'Cihangir', lat: 41.035, lng: 28.984, minZoom: 11 },
  { name: 'Galata', lat: 41.025, lng: 28.974, minZoom: 11 },
  { name: 'Camden Town', lat: 51.539, lng: -0.142, minZoom: 11 },
  { name: 'Soho', lat: 51.513, lng: -0.136, minZoom: 11 },
  { name: 'Shibuya Scramble', lat: 35.6595, lng: 139.7006, minZoom: 11 },
  { name: 'Asakusa', lat: 35.7148, lng: 139.7967, minZoom: 11 }
];

const $ = (id) => document.getElementById(id);

function labelIcon(text, kind = 'city') {
  return L.divIcon({
    className: 'label-wrapper',
    html: `<div class="map-label ${kind}">${text}</div>`,
    iconSize: [160, 24],
    iconAnchor: [80, 12]
  });
}

function addTextLabels(group, items, kind) {
  items.forEach((item) => {
    const marker = L.marker([item.lat, item.lng], {
      icon: labelIcon(item.name, kind),
      keyboard: false,
      bounceOnAdd: false
    });
    marker.addTo(group);
  });
}

function renderMapLabels() {
  const zoom = map.getZoom();
  layers.regionLabels.clearLayers();
  layers.cities.clearLayers();
  layers.districtLabels.clearLayers();
  layers.neighborhoodLabels.clearLayers();

  if (zoom <= 5) {
    addTextLabels(layers.regionLabels, regionLabels, 'region');
  }

  if (zoom >= 3) {
    cityLabels.forEach((item) => {
      if (zoom >= item.minZoom) {
        const marker = L.marker([item.lat, item.lng], { icon: labelIcon(item.name, 'city') });
        marker.addTo(layers.cities);
      }
    });
  }

  if (zoom >= 8) {
    districtLabels.forEach((item) => {
      if (zoom >= item.minZoom) {
        const marker = L.marker([item.lat, item.lng], { icon: labelIcon(item.name, 'district') });
        marker.addTo(layers.districtLabels);
      }
    });
  }

  if (zoom >= 11) {
    neighborhoodLabels.forEach((item) => {
      if (zoom >= item.minZoom) {
        const marker = L.marker([item.lat, item.lng], { icon: labelIcon(item.name, 'neighborhood') });
        marker.addTo(layers.neighborhoodLabels);
      }
    });
  }

  layers.regionLabels.addTo(map);
  layers.cities.addTo(map);
  layers.districtLabels.addTo(map);
  layers.neighborhoodLabels.addTo(map);
}

function addCities() {
  renderMapLabels();
}

function addMountains() {
  const points = [
    ['Everest', 27.9881, 86.9250],
    ['K2', 35.8825, 76.5133],
    ['Kilimanjaro', -3.0674, 37.3556],
    ['Alps', 46.4, 8.5]
  ];

  points.forEach(([name, lat, lng]) => {
    const marker = L.marker([lat, lng], {
      icon: L.divIcon({
        html: `<div class="peak-marker"><i class="fa-solid fa-mountain"></i></div>`,
        className: '',
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      })
    });

    marker.bindPopup(`<strong>${name}</strong>`);
    marker.addTo(layers.mountains);
  });

  layers.mountains.addTo(map);
}

function addGeoLayers() {
  fetch('data/geology.geojson')
    .then((response) => response.json())
    .then((data) => {
      L.geoJSON(data, {
        style: { color: '#7c4dff', weight: 1.4, fillOpacity: 0.3 },
        onEachFeature: (feature, layer) => {
          const props = feature.properties || {};
          layer.bindPopup(`<strong>${props.name || 'Jeolojik Alan'}</strong><br>${props.type || 'Kaynak'}`);
        }
      }).addTo(layers.geologyLayer);
    })
    .catch(() => {
      const demoGeo = {
        type: 'FeatureCollection',
        features: [
          { type: 'Feature', properties: { name: 'Bazalt Havzası', type: 'Volkanik bölge' }, geometry: { type: 'Polygon', coordinates: [[[-10, 15], [10, 15], [10, 35], [-10, 35], [-10, 15]]] } },
          { type: 'Feature', properties: { name: 'Bakır Kuşağı', type: 'Metal yatağı' }, geometry: { type: 'Polygon', coordinates: [[[-80, -20], [-50, -20], [-50, 10], [-80, 10], [-80, -20]]] } }
        ]
      };
      L.geoJSON(demoGeo, {
        style: { color: '#7c4dff', weight: 1.4, fillOpacity: 0.3 },
        onEachFeature: (feature, layer) => layer.bindPopup(`<strong>${feature.properties.name}</strong><br>${feature.properties.type}`)
      }).addTo(layers.geologyLayer);
    });

  fetch('data/faults.geojson')
    .then((response) => response.json())
    .then((data) => {
      L.geoJSON(data, {
        style: { color: '#ff4d4f', weight: 2 },
        onEachFeature: (feature, layer) => layer.bindPopup('<strong>Fay Hattı</strong><br>Deprem riski bölgesi')
      }).addTo(layers.faultsLayer);
    })
    .catch(() => {
      const demoFaults = {
        type: 'FeatureCollection',
        features: [
          { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [[-120, 35], [-100, 40], [-80, 48]] } },
          { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [[70, 30], [90, 42], [110, 58]] } }
        ]
      };
      L.geoJSON(demoFaults, { style: { color: '#ff4d4f', weight: 2 } }).addTo(layers.faultsLayer);
    });

  layers.geologyLayer.addTo(map);
  layers.faultsLayer.addTo(map);
}

function setMapView(view) {
  const target = {
    global: [40, 25],
    terrain: [43, 20],
    geology: [35, 38]
  };

  map.setView(target[view] || [40, 25], view === 'global' ? 3 : 4);
}

function updateAnalytics(regionName) {
  const normalized = regionName.toLowerCase();
  const regionMap = {
    avrupa: { name: 'Avrupa', elevation: 440, resources: ['Demir', 'Bakır', 'Doğalgaz'], risk: 41 },
    asya: { name: 'Asya', elevation: 1500, resources: ['Lityum', 'Bakır', 'Doğalgaz'], risk: 58 },
    'orta doğu': { name: 'Orta Doğu', elevation: 680, resources: ['Petrol', 'Doğalgaz', 'Bakır'], risk: 63 },
    'doğu asya': { name: 'Doğu Asya', elevation: 900, resources: ['Demir', 'Lityum', 'Kömür'], risk: 50 },
    'güney asya': { name: 'Güney Asya', elevation: 1100, resources: ['Demir', 'Maden', 'Su'], risk: 61 },
    default: { name: 'Avrupa', elevation: 440, resources: ['Demir', 'Bakır', 'Doğalgaz'], risk: 41 }
  };

  const region = regionMap[normalized] || regionMap.default;

  $('regionSummary').innerHTML = `
    <h3>${region.name}</h3>
    <p>Yükseklik ortalaması: ${region.elevation} m</p>
    <p>Risk skoru: ${region.risk}/100</p>
    <p>Temel kaynaklar: ${region.resources.join(', ')}</p>
  `;

  $('metrics').innerHTML = `
    <div class="metric"><span>Kaynak</span><strong>${region.resources.length}</strong></div>
    <div class="metric"><span>Risk</span><strong>${region.risk}</strong></div>
    <div class="metric"><span>Yükseklik</span><strong>${region.elevation}m</strong></div>
  `;
}

function applySearch(query) {
  const value = query.trim().toLowerCase();
  if (!value) {
    updateAnalytics('Avrupa');
    return;
  }

  const matches = [
    ...regionLabels.map((item) => ({ ...item, type: 'region' })),
    ...cityLabels.map((item) => ({ ...item, type: 'city' }))
  ].find((item) => item.name.toLowerCase().includes(value));

  if (!matches) {
    $('regionSummary').innerHTML = '<p>Sonuç bulunamadı. Farklı bir terim deneyin.</p>';
    return;
  }

  map.flyTo([matches.lat, matches.lng], matches.type === 'region' ? 3 : 6, { duration: 1.2 });
  updateAnalytics(matches.name);
}

function toggleLayer(name, checked) {
  const layer = layers[name];
  if (!layer) return;
  if (checked) layer.addTo(map); else map.removeLayer(layer);
}

function bindControls() {
  $('menuBtn').addEventListener('click', () => {
    $('sidebar').classList.toggle('open');
    $('overlay').style.display = $('sidebar').classList.contains('open') ? 'block' : 'none';
  });

  $('closeBtn').addEventListener('click', () => {
    $('sidebar').classList.remove('open');
    $('overlay').style.display = 'none';
  });

  document.querySelectorAll('.view-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      setMapView(button.dataset.view);
    });
  });

  document.querySelectorAll('[data-layer]').forEach((input) => {
    input.addEventListener('change', (event) => {
      toggleLayer(event.target.dataset.layer, event.target.checked);
    });
  });

  $('searchInput').addEventListener('input', (event) => applySearch(event.target.value));
  $('focusWorldBtn').addEventListener('click', () => setMapView('global'));

  $('saveBtn').addEventListener('click', () => {
    const snapshot = { center: map.getCenter(), zoom: map.getZoom(), ts: new Date().toISOString() };
    localStorage.setItem('terrain-atlas-snapshots', JSON.stringify(snapshot));
    $('continueBtn').classList.add('saved');
    $('continueBtn').textContent = 'Kayıtlandı';
  });

  $('continueBtn').addEventListener('click', () => {
    const snapshot = JSON.parse(localStorage.getItem('terrain-atlas-snapshots') || '{}');
    if (snapshot.center) {
      map.flyTo([snapshot.center.lat, snapshot.center.lng], snapshot.zoom || 3, { duration: 1.5 });
    }
  });

  $('overlay').addEventListener('click', () => {
    $('sidebar').classList.remove('open');
    $('overlay').style.display = 'none';
  });
}

function init() {
  addCities();
  addMountains();
  addGeoLayers();
  bindControls();
  updateAnalytics('Avrupa');
  setMapView('global');
  map.on('zoomend', renderMapLabels);
  map.on('moveend', renderMapLabels);
}

init();
