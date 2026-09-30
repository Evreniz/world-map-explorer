const map = L.map('map', {
  zoomControl: true,
  minZoom: 2,
  maxZoom: 14,
  preferCanvas: true,
  attributionControl: true,
}).setView([20, 0], 2);

const baseLayers = {
  satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri',
    maxZoom: 19,
  }),
  topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenTopoMap',
    maxZoom: 17,
  }),
  dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap, CARTO',
    maxZoom: 19,
  }),
};

baseLayers.satellite.addTo(map);

const layerGroups = {
  terrain: L.layerGroup(),
  cities: L.layerGroup(),
  mountains: L.layerGroup(),
  geology: L.layerGroup(),
  faults: L.layerGroup(),
  underground: L.layerGroup(),
};

const cities = [
  { name: 'İstanbul', lat: 41.0082, lng: 28.9784, elev: 320, type: 'Metropol' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, elev: 430, type: 'Metropol' },
  { name: 'New York', lat: 40.7128, lng: -74.006, elev: 310, type: 'Metropol' },
  { name: 'Lagos', lat: 6.5244, lng: 3.3792, elev: 240, type: 'Kıyı şehri' },
  { name: 'Kahire', lat: 30.0444, lng: 31.2357, elev: 290, type: 'Ova' },
  { name: 'Santiago', lat: -33.4489, lng: -70.6693, elev: 560, type: 'Dağ kenti' },
  { name: 'Cape Town', lat: -33.9249, lng: 18.4241, elev: 380, type: 'Kıyı' },
  { name: 'Mumbai', lat: 19.076, lng: 72.8777, elev: 190, type: 'Kıyı' },
  { name: 'Auckland', lat: -36.8485, lng: 174.7633, elev: 420, type: 'Volkanik' },
  { name: 'Riyad', lat: 24.7136, lng: 46.6753, elev: 680, type: 'Çöl' },
  { name: 'Mexico City', lat: 19.4326, lng: -99.1332, elev: 2250, type: 'Yüksek ova' },
  { name: 'Beijing', lat: 39.9042, lng: 116.4074, elev: 480, type: 'Karasal' },
];

const mountains = [
  { name: 'Everest', lat: 27.9881, lng: 86.925, elev: 8848 },
  { name: 'K2', lat: 35.8817, lng: 76.5144, elev: 8611 },
  { name: 'Kangchenjunga', lat: 27.7025, lng: 88.147, elev: 8586 },
  { name: 'Lhotse', lat: 27.961, lng: 86.933, elev: 8516 },
  { name: 'Makalu', lat: 27.8893, lng: 87.0969, elev: 8485 },
  { name: 'Denali', lat: 63.0691, lng: -151.0063, elev: 6190 },
  { name: 'Aconcagua', lat: -32.6532, lng: -70.0109, elev: 6961 },
  { name: 'Kilimanjaro', lat: -3.0674, lng: 37.3556, elev: 5895 },
  { name: 'Mont Blanc', lat: 45.8326, lng: 6.8652, elev: 4808 },
  { name: 'Elbrus', lat: 43.3556, lng: 42.4437, elev: 5642 },
];

const terrains = [
  { name: 'Yüksek Platolar', lat: 36, lng: 103, radius: 900000, color: '#65a30d', opacity: 0.15 },
  { name: 'Volkanik Bölge', lat: 10, lng: 120, radius: 750000, color: '#ef4444', opacity: 0.16 },
  { name: 'Dağ Kuşağı', lat: 46, lng: 12, radius: 600000, color: '#a78bfa', opacity: 0.14 },
  { name: 'Ova Alanları', lat: 30, lng: 31, radius: 800000, color: '#38bdf8', opacity: 0.12 },
  { name: 'Kıta Yaylası', lat: 33, lng: 90, radius: 1000000, color: '#84cc16', opacity: 0.14 },
  { name: 'Sahara Çölü', lat: 20, lng: 10, radius: 1200000, color: '#fbbf24', opacity: 0.13 },
];

const geology = [
  { name: 'Granit Koruması', color: '#7dd3fc', opacity: 0.18, coords: [[58, -10], [64, -18], [70, -24], [72, -10], [64, 2], [58, 0]] },
  { name: 'Bazaltik Havza', color: '#f87171', opacity: 0.18, coords: [[20, -15], [30, -10], [36, -18], [26, -30], [18, -22]] },
  { name: 'Kretase Şelfi', color: '#86efac', opacity: 0.14, coords: [[20, 38], [28, 42], [34, 52], [26, 60], [15, 55], [14, 46]] },
  { name: 'Bakır Kuşağı', color: '#fbbf24', opacity: 0.16, coords: [[-20, 30], [-10, 34], [-8, 42], [-18, 48], [-26, 42], [-24, 34]] },
  { name: 'Demir Yatağı', color: '#cbd5e1', opacity: 0.14, coords: [[42, 15], [50, 18], [52, 26], [44, 28], [40, 22]] },
];

const faults = [
  [[-15, -75], [0, -80], [20, -110]],
  [[35, 140], [40, 145], [48, 150]],
  [[20, 145], [25, 150], [30, 155]],
  [[20, 0], [30, 15], [38, 25]],
  [[-2, 35], [8, 42], [18, 48]],
  [[35, 70], [42, 75], [50, 82]],
];

const underground = [
  { name: 'Bakır Kuşağı', lat: 38, lng: 25, depth: '1.8 km', material: 'Bakır + Kurşun + Çinko' },
  { name: 'Bazaltik Damar', lat: 10, lng: 120, depth: '3.2 km', material: 'Bazalt + Demir + Nikel' },
  { name: 'Granit Kütlesi', lat: -40, lng: 15, depth: '2.6 km', material: 'Granit + Uranyum + Altın' },
  { name: 'Sediman Havzası', lat: 28, lng: 74, depth: '1.4 km', material: 'Petrol + Doğal Gaz' },
  { name: 'Mangan Alanı', lat: 12, lng: 35, depth: '2.1 km', material: 'Mangan + Kobalt' },
  { name: 'Lityum Yatağı', lat: -20, lng: -68, depth: '1.2 km', material: 'Lityum + Bor' },
];

function initTerrain() {
  terrains.forEach((t) => {
    const circle = L.circle([t.lat, t.lng], {
      radius: t.radius,
      color: t.color,
      fillColor: t.color,
      fillOpacity: t.opacity,
      weight: 1,
      dashArray: '5, 3',
    }).bindPopup(`<b>${t.name}</b><br>Arazi Türü`);
    layerGroups.terrain.addLayer(circle);
  });
}

function initCities() {
  cities.forEach((city) => {
    const marker = L.circleMarker([city.lat, city.lng], {
      radius: 4 + city.elev / 200,
      color: '#10b981',
      fillColor: '#34d399',
      fillOpacity: 0.85,
      weight: 1.5,
    }).bindPopup(`<b>${city.name}</b><br>Tip: ${city.type}<br>Yükseklik: ${city.elev} m`);

    const label = L.marker([city.lat + 1.2, city.lng], {
      icon: L.divIcon({
        html: `<div class="marker-label">${city.name}</div>`,
        className: '',
        iconSize: [90, 24],
        iconAnchor: [45, 12],
      }),
    });

    layerGroups.cities.addLayer(marker);
    layerGroups.cities.addLayer(label);
  });
}

function initMountains() {
  mountains.forEach((peak) => {
    const marker = L.circleMarker([peak.lat, peak.lng], {
      radius: 5,
      color: '#f59e0b',
      fillColor: '#fbbf24',
      fillOpacity: 0.85,
      weight: 1.5,
    }).bindPopup(`<b>${peak.name}</b><br>Zirve: ${peak.elev.toLocaleString()} m`);

    const label = L.marker([peak.lat + 1.5, peak.lng], {
      icon: L.divIcon({
        html: `<div class="marker-label">${peak.name}</div>`,
        className: '',
        iconSize: [80, 24],
        iconAnchor: [40, 12],
      }),
    });

    layerGroups.mountains.addLayer(marker);
    layerGroups.mountains.addLayer(label);
  });
}

function initGeology() {
  geology.forEach((area) => {
    const polygon = L.polygon(area.coords, {
      color: area.color,
      fillColor: area.color,
      fillOpacity: area.opacity,
      weight: 1.5,
    }).bindPopup(`<b>${area.name}</b><br>Jeolojik Yapı`);
    layerGroups.geology.addLayer(polygon);
  });
}

function initFaults() {
  faults.forEach((coords) => {
    const line = L.polyline(coords, {
      color: '#ff6b6b',
      weight: 2.5,
      opacity: 0.8,
      dashArray: '8, 4',
    }).bindPopup('<b>Fay Hattı</b><br>Deprem Bölgesi');
    layerGroups.faults.addLayer(line);
  });
}

function initUnderground() {
  underground.forEach((site) => {
    const halo = L.circle([site.lat, site.lng], {
      radius: 150000,
      color: '#8b5cf6',
      fillColor: '#8b5cf6',
      fillOpacity: 0.1,
      weight: 1,
      dashArray: '4, 2',
    });

    const marker = L.circleMarker([site.lat, site.lng], {
      radius: 7,
      color: '#a78bfa',
      fillColor: '#8b5cf6',
      fillOpacity: 0.85,
      weight: 1.3,
    }).bindPopup(`<b>${site.name}</b><br>Derinlik: ${site.depth}<br>Malzeme: ${site.material}`);

    layerGroups.underground.addLayer(halo);
    layerGroups.underground.addLayer(marker);
  });
}

function bindControls() {
  document.getElementById('baseLayerSelect').addEventListener('change', (e) => {
    const selected = e.target.value;
    Object.entries(baseLayers).forEach(([name, layer]) => {
      if (name === selected) {
        if (!map.hasLayer(layer)) layer.addTo(map);
      } else {
        map.removeLayer(layer);
      }
    });
  });

  document.querySelectorAll('[data-layer]').forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      const key = e.target.dataset.layer;
      const layer = layerGroups[key];
      if (!layer) return;
      if (e.target.checked) {
        map.addLayer(layer);
      } else {
        map.removeLayer(layer);
      }
    });
  });

  const elevationRange = document.getElementById('elevationRange');
  elevationRange.addEventListener('input', (e) => {
    const level = Number(e.target.value) / 100;
    document.getElementById('elevationValue').textContent = e.target.value + '%';

    layerGroups.cities.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) {
        layer.setStyle({ opacity: 0.4 + level * 0.6 });
      }
    });

    layerGroups.mountains.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) {
        layer.setStyle({ opacity: 0.3 + level * 0.7 });
      }
    });
  });

  document.getElementById('focusGlobal').addEventListener('click', () => {
    map.setView([20, 0], 2, { animate: true });
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

  document.getElementById('downloadData').addEventListener('click', () => {
    const data = {
      terrain: terrains,
      cities: cities,
      mountains: mountains,
      geology: geology,
      underground: underground,
      faults: faults,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'terrain-atlas-data.json';
    a.click();
    URL.revokeObjectURL(url);
  });
}

function init() {
  initTerrain();
  initCities();
  initMountains();
  initGeology();
  initFaults();
  initUnderground();

  Object.values(layerGroups).forEach((layer) => {
    map.addLayer(layer);
  });

  bindControls();
  console.log('✅ Terrain Atlas initialized successfully');
}

init();