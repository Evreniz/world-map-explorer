const map = L.map('map', {
  zoomControl: true,
  minZoom: 2,
  maxZoom: 12,
  preferCanvas: true,
}).setView([24, 14], 2);

const baseLayers = {
  satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri',
    maxZoom: 19,
  }),
  topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenTopoMap contributors',
    maxZoom: 17,
  }),
  dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: 'Map data © OpenStreetMap contributors, CARTO',
    maxZoom: 19,
  }),
};

baseLayers.satellite.addTo(map);

const layerControls = {
  cities: L.layerGroup(),
  mountains: L.layerGroup(),
  faults: L.layerGroup(),
  geology: L.layerGroup(),
  underground: L.layerGroup(),
  terrain: L.layerGroup(),
};

const cityFeatures = [
  { name: 'İstanbul', lat: 41.0082, lng: 28.9784, elevation: 320, type: 'Metropol' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, elevation: 430, type: 'Metropol' },
  { name: 'New York', lat: 40.7128, lng: -74.006, elevation: 310, type: 'Metropol' },
  { name: 'Lagos', lat: 6.5244, lng: 3.3792, elevation: 240, type: 'Kıyı' },
  { name: 'Kahire', lat: 30.0444, lng: 31.2357, elevation: 290, type: 'Ova' },
  { name: 'Santiago', lat: -33.4489, lng: -70.6693, elevation: 560, type: 'Dağ' },
  { name: 'Cape Town', lat: -33.9249, lng: 18.4241, elevation: 380, type: 'Kıyı' },
  { name: 'Mumbai', lat: 19.076, lng: 72.8777, elevation: 190, type: 'Kıyı' },
  { name: 'Auckland', lat: -36.8485, lng: 174.7633, elevation: 420, type: 'Volkanik' },
  { name: 'Riyad', lat: 24.7136, lng: 46.6753, elevation: 680, type: 'Çöl' },
];

const mountainFeatures = [
  { name: 'Andes', lat: -13.1631, lng: -72.545, elev: 6371 },
  { name: 'Himalaya', lat: 27.9881, lng: 86.925, elev: 8848 },
  { name: 'Alpler', lat: 46.8512, lng: 10.6226, elev: 4810 },
  { name: 'Karakurum', lat: 35.881, lng: 76.5133, elev: 8611 },
  { name: 'Kilimanjaro', lat: -3.0674, lng: 37.3556, elev: 5895 },
  { name: 'Denali', lat: 63.0691, lng: -151.0063, elev: 6190 },
  { name: 'Aconcagua', lat: -32.6532, lng: -70.0109, elev: 6961 },
];

const terrainBands = [
  { name: 'Yüksek platolar', lat: 36, lng: 103, radius: 800000, color: '#65a30d', fillOpacity: 0.14 },
  { name: 'Volkanik kuşak', lat: 10, lng: 120, radius: 700000, color: '#f59e0b', fillOpacity: 0.18 },
  { name: 'Dağ kuşağı', lat: 46, lng: 12, radius: 550000, color: '#a78bfa', fillOpacity: 0.14 },
  { name: 'Ova alanı', lat: 30, lng: 31, radius: 700000, color: '#38bdf8', fillOpacity: 0.12 },
  { name: 'Kıtay yaylası', lat: 33, lng: 90, radius: 900000, color: '#84cc16', fillOpacity: 0.14 },
];

const undergroundSites = [
  { name: 'Bakır kuşağı', lat: 38, lng: 25, depth: '1.8 km', material: 'Bakır + kurşun' },
  { name: 'Bazaltik damar', lat: 10, lng: 120, depth: '3.2 km', material: 'Bazalt + demir' },
  { name: 'Granit kütlesi', lat: -40, lng: 15, depth: '2.6 km', material: 'Granit + uranyum' },
  { name: 'Sediman havzası', lat: 28, lng: 74, depth: '1.4 km', material: 'Petrol + gaz' },
];

function attachLayer(key) {
  if (!map.hasLayer(layerControls[key])) {
    map.addLayer(layerControls[key]);
  }
}

function detachLayer(key) {
  if (map.hasLayer(layerControls[key])) {
    map.removeLayer(layerControls[key]);
  }
}

function addCityMarkers() {
  cityFeatures.forEach((city) => {
    const marker = L.circleMarker([city.lat, city.lng], {
      radius: 5 + city.elevation / 180,
      color: '#a7f3d0',
      fillColor: '#34d399',
      fillOpacity: 0.9,
      weight: 1,
    }).bindPopup(`<strong>${city.name}</strong><br>Tip: ${city.type}<br>Yükseklik: ${city.elevation} m`);

    const label = L.marker([city.lat + 1.5, city.lng], {
      icon: L.divIcon({
        html: `<div class="marker-label">${city.name}</div>`,
        className: '',
        iconSize: [80, 20],
        iconAnchor: [10, 10],
      }),
    });

    layerControls.cities.addLayer(marker);
    layerControls.cities.addLayer(label);
  });
}

function addMountainMarkers() {
  mountainFeatures.forEach((peak) => {
    const marker = L.circleMarker([peak.lat, peak.lng], {
      radius: 6,
      color: '#f9d89c',
      fillColor: '#f59e0b',
      fillOpacity: 0.85,
      weight: 1.3,
    }).bindPopup(`<strong>${peak.name}</strong><br>Zirve: ${peak.elev.toLocaleString()} m`);

    const label = L.marker([peak.lat + 1.8, peak.lng], {
      icon: L.divIcon({
        html: `<div class="marker-label">${peak.name}</div>`,
        className: '',
        iconSize: [70, 20],
        iconAnchor: [10, 10],
      }),
    });

    layerControls.mountains.addLayer(marker);
    layerControls.mountains.addLayer(label);
  });
}

function addTerrainBands() {
  terrainBands.forEach((band) => {
    const circle = L.circle([band.lat, band.lng], {
      radius: band.radius,
      color: band.color,
      fillColor: band.color,
      fillOpacity: band.fillOpacity,
      weight: 1,
    }).bindPopup(`<strong>${band.name}</strong><br>Yüzey alanı / arazi yapısı`);

    layerControls.terrain.addLayer(circle);
  });
}

function addFaults() {
  const faultCoords = [
    [[-15, -75], [0, -80], [20, -110]],
    [[35, 140], [40, 145], [48, 150]],
    [[20, 145], [25, 150], [30, 155]],
    [[20, 0], [30, 15], [38, 25]],
    [[-2, 35], [8, 42], [18, 48]],
  ];

  faultCoords.forEach((coords) => {
    const line = L.polyline(coords, { color: '#fca5a5', weight: 2.2, opacity: 0.8 });
    layerControls.faults.addLayer(line);
  });
}

function addGeology() {
  const geologyPolygons = [
    {
      name: 'Granit koruması',
      color: '#7dd3fc',
      opacity: 0.18,
      coords: [[58, -10], [64, -18], [70, -24], [72, -10], [64, 2], [58, 0]],
    },
    {
      name: 'Bazaltik havza',
      color: '#fca5a5',
      opacity: 0.18,
      coords: [[20, -15], [30, -10], [36, -18], [26, -30], [18, -22]],
    },
    {
      name: 'Kretase şelfi',
      color: '#86efac',
      opacity: 0.14,
      coords: [[20, 38], [28, 42], [34, 52], [26, 60], [15, 55], [14, 46]],
    },
    {
      name: 'Bakır kuşağı',
      color: '#fbbf24',
      opacity: 0.15,
      coords: [[-20, 30], [-10, 34], [-8, 42], [-18, 48], [-26, 42], [-24, 34]],
    },
  ];

  geologyPolygons.forEach((area) => {
    const polygon = L.polygon(area.coords, {
      color: area.color,
      fillColor: area.color,
      fillOpacity: area.opacity,
      weight: 1.5,
    }).bindPopup(`<strong>${area.name}</strong><br>Jeolojik yapı / tabaka alanı`);

    layerControls.geology.addLayer(polygon);
  });
}

function addUndergroundSites() {
  undergroundSites.forEach((site) => {
    const halo = L.circle([site.lat, site.lng], {
      radius: 120000,
      color: '#8b5cf6',
      fillColor: '#8b5cf6',
      fillOpacity: 0.08,
      weight: 1,
    }).bindPopup(`<strong>${site.name}</strong><br>Derinlik: ${site.depth}<br>Malzeme: ${site.material}`);

    const marker = L.circleMarker([site.lat, site.lng], {
      radius: 8,
      color: '#a78bfa',
      fillColor: '#8b5cf6',
      fillOpacity: 0.8,
      weight: 1.2,
    }).bindPopup(`<strong>${site.name}</strong><br>Derinlik: ${site.depth}<br>Malzeme: ${site.material}`);

    layerControls.underground.addLayer(halo);
    layerControls.underground.addLayer(marker);
  });
}

function loadGeoJSON(path, targetLayer, styleFn) {
  fetch(path)
    .then((response) => response.json())
    .then((data) => {
      L.geoJSON(data, {
        style: styleFn,
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: 6,
            color: '#fbbf24',
            fillColor: '#facc15',
            fillOpacity: 0.8,
          });
        },
      }).addTo(targetLayer);
    })
    .catch((error) => {
      console.warn(`GeoJSON load failed for ${path}:`, error);
    });
}

function bindLayerToggles() {
  document.querySelectorAll('[data-layer]').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const layerKey = event.target.dataset.layer;
      const isChecked = event.target.checked;
      if (isChecked) {
        attachLayer(layerKey);
      } else {
        detachLayer(layerKey);
      }
    });
  });
}

function bindMapViewButtons() {
  document.getElementById('focusGlobal').addEventListener('click', () => {
    map.setView([24, 14], 2, { animate: true });
  });

  document.getElementById('focusAlps').addEventListener('click', () => {
    map.setView([46.8, 10.6], 6, { animate: true });
  });

  document.getElementById('focusAndes').addEventListener('click', () => {
    map.setView([-13.2, -72.5], 5, { animate: true });
  });

  document.getElementById('focusHimalaya').addEventListener('click', () => {
    map.setView([28.0, 86.9], 5, { animate: true });
  });
}

function bindBaseLayerSelector() {
  const select = document.getElementById('baseLayerSelect');
  select.addEventListener('change', (event) => {
    const selected = event.target.value;
    Object.entries(baseLayers).forEach(([name, layer]) => {
      if (name === selected) {
        if (!map.hasLayer(layer)) layer.addTo(map);
      } else if (map.hasLayer(layer)) {
        map.removeLayer(layer);
      }
    });
  });
}

function bindElevationControl() {
  const range = document.getElementById('elevationRange');
  range.addEventListener('input', (event) => {
    const level = Number(event.target.value) / 100;

    layerControls.cities.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) {
        layer.setStyle({ opacity: 0.35 + level * 0.65 });
      }
    });

    layerControls.mountains.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) {
        layer.setStyle({ opacity: 0.3 + level * 0.7 });
      }
    });

    layerControls.geology.eachLayer((layer) => {
      if (layer instanceof L.Polygon) {
        layer.setStyle({ fillOpacity: 0.08 + level * 0.2 });
      }
    });
  });
}

function bindDownloadButton() {
  document.getElementById('downloadLayers').addEventListener('click', () => {
    const payload = {
      geology: 'data/geology.geojson',
      faults: 'data/faults.geojson',
      note: 'Yeraltı katmanı örnek veri dosyaları. Gerçek jeolojik ve topo veriler daha sonra yerel/ulusal veri kaynakları ile genişletilebilir.',
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'terrain-atlas-layer-list.json';
    a.click();
    URL.revokeObjectURL(url);
  });
}

function init() {
  addCityMarkers();
  addMountainMarkers();
  addTerrainBands();
  addFaults();
  addGeology();
  addUndergroundSites();

  Object.entries(layerControls).forEach(([key, layer]) => {
    attachLayer(key);
  });

  loadGeoJSON('./data/geology.geojson', layerControls.geology, (feature) => ({
    color: '#34d399',
    fillColor: '#34d399',
    fillOpacity: 0.12,
    weight: 1.2,
  }));

  loadGeoJSON('./data/faults.geojson', layerControls.faults, (feature) => ({
    color: '#fca5a5',
    weight: 2.2,
    opacity: 0.8,
    fillOpacity: 0,
  }));

  bindLayerToggles();
  bindMapViewButtons();
  bindBaseLayerSelector();
  bindElevationControl();
  bindDownloadButton();
}

init();
