# TASKFLOW – API Documentation

**Geliştirici:** Mustafa Mert Ekizoğlu

**Proje:** TASKFLOW

**Teknolojiler:** Node.js, Express.js

**API Mimarisi:** REST API

**Veri Saklama:** In-Memory Storage

**Port:** 3000

---

## 1. Projenin Amacı

TASKFLOW'u Node.js ve Express.js kullanarak bir REST API geliştirme çalışması olarak hazırladım.

Projenin temel amacı, görev yönetimi işlemlerini HTTP istekleri üzerinden gerçekleştirebilen modüler bir backend yapısı oluşturmaktı.

Geliştirme sürecinde yalnızca CRUD işlemlerini gerçekleştirmeye odaklanmadım. Aynı zamanda routing, middleware kullanımı, veri doğrulama, filtreleme, arama, sıralama ve sayfalama gibi backend geliştirme süreçlerinde kullanılan yapıları da projeye dahil ettim.

Projenin mevcut sürümünde görevler kalıcı bir veritabanı yerine JavaScript dizisi içerisinde tutuluyor. Bu tercihi, öncelikle API mimarisini ve backend işlem akışını öğrenmeye ve uygulamaya odaklanmak için yaptım.

## 2. Proje Mimarisi

Projeyi daha düzenli ve yönetilebilir tutmak için modüler bir klasör yapısı kullandım.

Uygulamada temel olarak dört bölüm bulunuyor:

- **Routes:** Gelen HTTP isteklerini ilgili controller fonksiyonlarına yönlendiriyor.
- **Controllers:** İstekleri karşılıyor, gerekli parametreleri alıyor ve HTTP yanıtlarını oluşturuyor.
- **Services:** Görevlerle ilgili iş mantığını ve veri işlemlerini yürütüyor.
- **Middleware:** İsteklerin işlenmesi sırasında loglama ve veri doğrulama işlemlerini gerçekleştiriyor.

Bu ayrım sayesinde uygulamanın farklı sorumluluklarını birbirinden ayırdım. Böylece kodun okunabilirliğini ve bakımını kolaylaştırmayı amaçladım.

## 3. Görev Veri Yapısı

TASKFLOW içerisinde her görev aşağıdaki alanlardan oluşuyor:

- **id:** Her göreve özel olarak oluşturulan benzersiz kimlik numarasıdır.
- **title:** Görevin başlığını belirtir. Boş bırakılamaz.
- **description:** Görevle ilgili açıklama bilgisidir.
- **status:** Görevin mevcut durumunu belirtir. Üç farklı değer alabilir:
  - `pending`: Bekliyor.
  - `in-progress`: Devam ediyor.
  - `completed`: Tamamlandı.
- **priority:** Görevin öncelik seviyesini belirtir:
  - `low`: Düşük.
  - `medium`: Orta.
  - `high`: Yüksek.
- **assignee:** Görevin atandığı kişiyi belirtir.
- **createdAt:** Görevin oluşturulduğu tarih ve saati ISO 8601 formatında tutar.

Görevler şu an veritabanı yerine JavaScript dizisi içerisinde saklanıyor. Bu nedenle sunucu yeniden başlatıldığında oluşturulan görevler siliniyor.

## 4. Temel API İşlemleri (CRUD)

Görev yönetiminin temelini oluşturan CRUD işlemlerini geliştirdim.

### 4.1 Görevleri Listeleme

**Method:** GET

**Endpoint:** `/api/tasks`

Sistemde bulunan görevleri listeler. Bu endpoint üzerinden filtreleme, sıralama ve sayfalama işlemleri de gerçekleştirilebilir.

Örnek:

`GET http://localhost:3000/api/tasks`

### 4.2 ID ile Görev Görüntüleme

**Method:** GET

**Endpoint:** `/api/tasks/:id`

Belirtilen ID değerine sahip görevi getirir. İlgili ID sistemde bulunmuyorsa 404 yanıtı döndürülür.

### 4.3 Yeni Görev Oluşturma

**Method:** POST

**Endpoint:** `/api/tasks`

Yeni bir görev oluşturmak için kullanılır.

Örnek istek gövdesi:

```json
{
    "title": "Backend geliştirme",
    "description": "Node.js API geliştirme",
    "priority": "high",
    "assignee": "Mustafa"
}
```

Görev oluşturulurken ID ve oluşturulma tarihi otomatik olarak belirlenir. Durum varsayılan olarak `pending` atanır.

Başarılı oluşturma işleminde HTTP 201 yanıtı döndürülür.

### 4.4 Görev Güncelleme

**Method:** PUT

**Endpoint:** `/api/tasks/:id`

Belirtilen görevin bilgilerini güncellemek için kullanılır.

Örnek:

`PUT http://localhost:3000/api/tasks/1795599839166`

```json
{
    "status": "completed"
}
```

Mevcut uygulamada yalnızca gönderilen alanlar güncellenir, diğer alanlar korunur.

### 4.5 Görev Silme

**Method:** DELETE

**Endpoint:** `/api/tasks/:id`

Belirtilen ID değerine sahip görevi sistemden siler. Görev bulunamazsa 404 yanıtı döndürülür.

---

## 5. Gelişmiş API Özellikleri

Temel CRUD işlemlerine ek olarak görevlerin daha kolay yönetilebilmesi için bazı özellikler geliştirdim.

### 5.1 Filtreleme

Görevleri durumlarına ve öncelik seviyelerine göre filtrelemek mümkün.

Duruma göre:

`GET /api/tasks?status=pending`

Önceliğe göre:

`GET /api/tasks?priority=high`

İki filtre aynı istekte birlikte de kullanılabilir.

### 5.2 Görev Arama

**Method:** GET

**Endpoint:** `/api/tasks/search`

Görevlerin başlık ve açıklama alanlarında kelime bazlı arama yapar.

Örnek:

`GET /api/tasks/search?keyword=backend`

Arama işlemi büyük ve küçük harf farklılıklarını dikkate almadan gerçekleştirilir.

### 5.3 Atanan Kişiye Göre Listeleme

**Method:** GET

**Endpoint:** `/api/tasks/assignee/:assignee`

Belirli bir kişiye atanmış görevleri listeler.

Örnek:

`GET /api/tasks/assignee/Mustafa`

### 5.4 Sayfalama (Pagination)

Görev sayısı arttığında bütün kayıtları tek seferde döndürmek yerine sayfalama sistemi kullandım.

Örnek:

`GET /api/tasks?page=1&limit=10`

Burada:

- `page`: Görüntülenmek istenen sayfa.
- `limit`: Bir sayfada gösterilecek görev sayısı.

API yanıtında toplam görev sayısı, toplam sayfa sayısı, mevcut sayfa ve sayfa başına kayıt sayısı da döndürülür.

### 5.5 Sıralama (Sorting)

Görevlerin belirli alanlara göre artan veya azalan şekilde sıralanmasını sağlayan bir yapı geliştirdim.

Örnek:

`GET /api/tasks?sortBy=createdAt&order=desc`

Desteklenen alanlar:

- `createdAt`
- `title`
- `priority`
- `status`

Sıralama yönü için `asc` ve `desc` değerleri kullanılır.

Filtreleme, sayfalama ve sıralama aynı istek içerisinde birlikte kullanılabilir.

---

## 6. Raporlama İşlemleri

Görevlerin mevcut durumunu takip edebilmek için üç raporlama endpointi geliştirdim.

**Tamamlanan görevler:**

`GET /api/tasks/reports/completed`

**Bekleyen görevler:**

`GET /api/tasks/reports/pending`

**Genel görev özeti:**

`GET /api/tasks/reports/summary`

Summary endpointi toplam görev sayısını ve durumlara göre görev dağılımını gösterir.

Örnek yanıt:

```json
{
    "message": "Görev özeti başarıyla oluşturuldu.",
    "summary": {
        "totalTasks": 3,
        "completedTasks": 1,
        "pendingTasks": 1,
        "inProgressTasks": 1
    }
}
```

## 7. Middleware Kullanımı

### 7.1 Logger Middleware

API'ye gelen istekleri takip edebilmek için Logger Middleware geliştirdim.

Her istekte aşağıdaki bilgileri terminale yazdırıyorum:

- HTTP Method
- İstek adresi (Endpoint)
- İstek zamanı (Timestamp)

Bu sayede API'ye gelen istekleri terminal üzerinden takip edebiliyorum.

### 7.2 Validation Middleware

Görev oluşturma ve güncelleme işlemlerinde gönderilen verilerin kontrol edilmesi için Validation Middleware kullandım.

Görev başlığının boş bırakılmamasını sağlıyorum. Ayrıca açıklama, öncelik, atanan kişi ve görev durumu alanlarını, istekte gönderildiklerinde kontrol ediyorum.

Geçersiz verilerde işlem devam ettirilmeden HTTP 400 yanıtı döndürülüyor.

---

## 8. HTTP Durum Kodları

API geliştirme sürecinde işlemin sonucunu belirtmek için uygun HTTP durum kodlarını kullandım.

- **200:** İstek başarılı.
- **201:** Yeni görev oluşturuldu.
- **400:** Geçersiz istek veya veri doğrulama hatası.
- **404:** İstenen görev bulunamadı.

## 9. Veri Saklama Yöntemi

TASKFLOW'un mevcut sürümünde verileri JavaScript dizisi içerisinde saklıyorum.

Bu yöntem geliştirme ve test aşamasında API işlemlerini uygulamak için yeterli olsa da kalıcı veri saklama sağlamıyor.

Sunucu yeniden başlatıldığında bellekteki görevler siliniyor. Bu nedenle mevcut sürümde PostgreSQL veya başka bir veritabanı bağlantısı bulunmuyor.

## 10. API'yi Çalıştırma

Projeyi çalıştırmak için öncelikle proje dizininde bağımlılıkların yüklenmesi gerekiyor.

```bash
npm install
```

Ardından Express sunucusu aşağıdaki komutla başlatılabilir:

```bash
node app.js
```

Sunucu varsayılan olarak `3000` portunda çalışır.

**Base URL:**

`http://localhost:3000/api`

API isteklerini Postman üzerinden göndererek test ettim.