# 🌍 Terrain Atlas - Dünya Haritası

Çok katmanlı, etkileşimli dünya haritası uygulaması. Yer üstü ve yer altı jeolojik verilerini görüntüleme ve analiz etme.

## 🎯 Özellikler

### Yer Üstü Katmanları
- 🛰️ **Uydu görünümü** - Esri World Imagery
- 🗻 **Topografya** - OpenTopoMap
- 🌙 **Koyu Dünya** - CARTO Dark
- 🏙️ **Şehirler** - 12 büyük dünya şehri ve metropol alanları
- ⛰️ **Zirveler** - Dünyanın en yüksek 10 dağı
- 🏔️ **Arazi Örtüsü** - Platolar, volkanik bölgeler, dağ kuşakları, ovalar, yaylalar

### Yer Altı Katmanları
- 🪨 **Jeolojik Alanlar** - Granit, bazalt, kretase, bakır ve demir yatakları
- ⚡ **Fay Hatları** - Tektonik sınırlar ve deprem bölgeleri

### İnteraktif Kontroller
- 📍 Harita görünümü seçimi (3 seçenek)
- 📊 Yükseklik görünürlüğü sürgüsü
- 🌎 Bölgesel odaklama butonları (Dünya, Alpler, Andes, Himalaya)
- 💾 Veri dosyaları indirme

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Modern web tarayıcısı (Chrome, Firefox, Safari, Edge)
- Python 3 (yerel sunucu için)

### Adımlar

1. **Depoyu klonla veya dosyaları indir:**
   ```bash
   git clone https://github.com/Evreniz/world-map-explorer.git
   cd world-map-explorer
   ```

2. **Yerel sunucu başlat:**
   ```bash
   python3 -m http.server 8000
   ```

3. **Tarayıcıda aç:**
   ```
   http://localhost:8000
   ```

## 📁 Dosya Yapısı

```
world-map-explorer/
├── index.html           # Ana HTML dosyası
├── styles.css           # Stil ve tasarım
├── app.js              # Harita mantığı ve etkileşimler
├── README.md           # Dokümantasyon
└── data/
    ├── geology.geojson # Jeolojik alanlar
    └── faults.geojson  # Fay hatları
```

## 🗺️ Katmanlar Hakkında

### Jeolojik Alanlar
- **Granit Koruması** - Eski, kararlı kütleler
- **Bazaltik Havza** - Volkanik bölgeler
- **Kretase Şelfi** - Sediman tabakası
- **Bakır Kuşağı** - Metal yatakları
- **Demir Yatağı** - Demir cevheri bölgeleri

### Yeraltı Kaynakları
- Bakır, kurşun, çinko
- Bazalt, demir, nikel
- Granit, uranyum, altın
- Petrol, doğal gaz
- Mangan, kobalt, lityum, bor

## 🎨 Renkler ve Semboller

- 🟢 Yeşil: Şehirler ve yerleşim alanları
- 🟠 Turuncu: Dağ zirveleri
- 🟣 Mor: Yeraltı kaynakları
- 🔴 Kırmızı: Fay hatları ve deprem bölgeleri
- 🔵 Mavi: Su alanları ve ovalar

## 🔧 Teknoloji

- **Leaflet.js** - Etkileşimli harita kütüphanesi
- **OpenStreetMap** - Harita veri kaynağı
- **GeoJSON** - Jeolojik veri formatı
- **Vanilla JavaScript** - Framework'siz uygulama

## 📊 Veri Kaynakları

- Esri World Imagery
- OpenTopoMap
- OpenStreetMap
- CARTO
- USGS Geological Data
- Natural Earth Dataset

## 🌐 API ve Bağlantılar

- Leaflet: https://leafletjs.com/
- OpenStreetMap: https://www.openstreetmap.org/
- Esri: https://www.esri.com/
- GeoJSON Spec: https://tools.ietf.org/html/rfc7946

## 📝 Notlar

- Haritadaki veriler örnek/yaklaşık değerlerdir
- Gerçek jeolojik veriler için profesyonel kaynaklar kullanılmalıdır
- Derinlik ve malzeme bilgileri referans amaçlıdır
- Deprem riski değerlendirmesi için resmi kaynaklar kontrol edilmelidir

## 👨‍💻 Geliştiri

Projeyi geliştirmek ve katkı sağlamak için:

1. Fork et
2. Feature branch oluştur (`git checkout -b feature/amazing-feature`)
3. Değişiklikleri commit et (`git commit -m 'Add amazing feature'`)
4. Push et (`git push origin feature/amazing-feature`)
5. Pull Request aç

## 📄 Lisans

MIT License - Özgürce kullan ve değiştir

## 📧 İletişim

- GitHub: [@Evreniz](https://github.com/Evreniz)
- Sorular ve öneriler için Issues sekmesini kullan

---

**Son Güncelleme:** 2026-09-30
**Versiyon:** 1.0.0 - Full Release
