# TASKFLOW – Test Dokümantasyonu

## 1. Test Süreci

TASKFLOW projesini geliştirirken oluşturduğum API endpointlerinin düzgün çalışıp çalışmadığını kontrol etmek için Postman kullandım.

Testlerde temel CRUD işlemlerini, middleware yapılarını, görev arama ve filtreleme özelliklerini ve raporlama işlemlerini kontrol ettim.

API'yi yerel ortamda `http://localhost:3000` adresi üzerinden çalıştırarak testleri gerçekleştirdim.

## 2. CRUD Testleri

İlk olarak görevlerle ilgili temel işlemleri test ettim.

### Görev oluşturma (POST)

`POST /api/tasks` endpointini kullanarak yeni görevler oluşturdum. Görev başlığı, açıklaması, önceliği ve atanacak kişi bilgilerini gönderdim.

Yeni görev oluşturulduğunda otomatik ID ve oluşturulma tarihi bilgileriyle birlikte görev verisinin döndüğünü kontrol ettim.

### Görevleri listeleme (GET)

`GET /api/tasks` endpointi üzerinden oluşturduğum görevleri listeledim. Görevlerin doğru şekilde döndüğünü kontrol ettim.

### ID ile görev görüntüleme (GET)

`GET /api/tasks/:id` endpointini kullanarak belirli bir görevi ID üzerinden görüntüledim.

### Görev güncelleme (PUT)

`PUT /api/tasks/:id` endpointi üzerinden mevcut bir görevin bilgilerini değiştirdim. Güncelleme sonrasında yeni bilgilerin response içerisinde doğru şekilde döndüğünü kontrol ettim.

### Görev silme (DELETE)

`DELETE /api/tasks/:id` endpointini kullanarak bir görevi sildim. Silme işleminden sonra aynı görevi tekrar görüntülemeyi deneyerek sistemin `404 Not Found` yanıtı verdiğini kontrol ettim.

## 3. Middleware Testleri

Projede kullandığım middleware yapılarını da ayrıca test ettim.

### Logger Middleware

API'ye gönderdiğim isteklerin terminale kaydedilip kaydedilmediğini kontrol ettim. İsteklerin HTTP metodu, endpoint bilgisi ve tarih-saat bilgisinin terminalde görüntülendiğini gördüm.

### Validation Middleware

Görev oluşturma ve güncelleme işlemlerinde hatalı veri göndererek doğrulama kontrollerini test ettim.

Özellikle şu durumları kontrol ettim:

- Görev başlığının boş bırakılması.
- Geçersiz öncelik değeri gönderilmesi.
- Geçersiz görev durumu gönderilmesi.

Bu kontrollerde hatalı verilerin kabul edilmediğini ve API'nin `400 Bad Request` yanıtı döndürdüğünü doğruladım.

## 4. Gelişmiş API Testleri

Temel CRUD işlemlerinden sonra API'ye eklediğim diğer özellikleri test ettim.

### Görev arama

`GET /api/tasks/search?keyword=Node`

Bu endpoint üzerinden görev başlığı veya açıklamasında belirli bir kelime bulunan görevleri aradım.

### Atanan kişiye göre listeleme

`GET /api/tasks/assignee/Mustafa`

Bu endpoint ile belirli bir kişiye atanmış görevleri listeledim.

### Duruma göre filtreleme

`GET /api/tasks?status=pending`

Görevleri mevcut durumlarına göre filtreledim.

### Önceliğe göre filtreleme

`GET /api/tasks?priority=high`

Yüksek öncelikli görevleri listeledim.

### Sayfalama (Pagination)

`GET /api/tasks?page=1&limit=2`

Sayfalama özelliğini kullanarak bir sayfada en fazla iki görev görüntülenmesini kontrol ettim.

### Sıralama (Sorting)

`GET /api/tasks?sortBy=createdAt&order=desc`

Görevleri oluşturulma tarihine göre azalan şekilde sıralamak için bu endpointi kullandım. İstek üzerinden sıralama parametrelerini gönderdim ve API yanıtını kontrol ettim.

## 5. Raporlama Testleri

Görevlerin mevcut durumları hakkında bilgi alabilmek için üç farklı raporlama endpointi oluşturdum.

**Tamamlanan görevler:**

`GET /api/tasks/reports/completed`

**Bekleyen görevler:**

`GET /api/tasks/reports/pending`

**Genel görev özeti:**

`GET /api/tasks/reports/summary`

İlk iki endpoint ile tamamlanan ve bekleyen görevleri ayrı ayrı listeledim.

Özet raporlama endpointinde ise toplam görev sayısını ve görevlerin durumlarına göre dağılımını kontrol ettim.

Yaptığım testlerde toplam görev, tamamlanan görev, bekleyen görev ve devam eden görev sayılarının doğru hesaplandığını gördüm.

## 6. Genel Değerlendirme

Test sürecinde oluşturduğum endpointlerin temel işlevlerini Postman üzerinden kontrol ettim.

CRUD işlemlerinin, middleware yapılarının, arama ve filtreleme özelliklerinin ve raporlama işlemlerinin beklenen şekilde çalıştığını doğruladım.

Bu süreçte API isteklerinin nasıl çalıştığını, HTTP metotlarının kullanımını, middleware mantığını ve REST API yapısının uygulama içerisindeki işleyişini daha iyi anladım.

## 7. Test Ekran Görüntüleri

Postman üzerinden gerçekleştirdiğim testlerin ekran görüntülerini proje içerisinde ayrı bir klasörde topladım.

Ekran görüntülerine aşağıdaki dosya yolundan ulaşılabilir:

`docs/screenshots/`

Bu klasörde CRUD işlemleri, middleware kontrolleri, gelişmiş API özellikleri ve raporlama testlerine ait sonuçlar bulunmaktadır.