# TASKFLOW

TASKFLOW, Node.js ve Express.js kullanarak geliştirdiğim bir görev yönetimi REST API projesidir.

Bu projede görev oluşturma, listeleme, güncelleme ve silme gibi temel işlemleri gerçekleştirdim. Bunların yanında görev arama, filtreleme, sıralama ve raporlama özelliklerini de ekledim.

Projeyi geliştirirken özellikle REST API mantığını, HTTP metotlarının kullanımını, middleware yapısını ve backend tarafındaki dosya organizasyonunu uygulamalı olarak öğrenmeye odaklandım.

## Kullanılan Teknolojiler

- Node.js
- Express.js
- JavaScript
- Postman

## Proje Özellikleri

Projede gerçekleştirdiğim işlemler:

- Görev oluşturma.
- Bütün görevleri listeleme.
- ID üzerinden görev görüntüleme.
- Mevcut görevleri güncelleme.
- Görev silme.
- Görev başlığı ve açıklamasına göre arama.
- Atanan kişiye göre görev listeleme.
- Durum ve önceliğe göre filtreleme.
- Sayfalama (Pagination).
- Sıralama (Sorting).
- Tamamlanan ve bekleyen görevleri listeleme.
- Genel görev özeti oluşturma.
- İstekleri terminale kaydeden Logger Middleware.
- Gelen verileri kontrol eden Validation Middleware.

## Proje Yapısı

Projeyi daha düzenli tutabilmek için dosyaları farklı klasörlere ayırdım.

```text
TASKFLOW/
│
├── src/
│   ├── controllers/
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   ├── logger.js
│   │   └── validateTask.js
│   │
│   ├── routes/
│   │   └── taskRoutes.js
│   │
│   └── services/
│       └── taskService.js
│
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── TESTING_DOCUMENTATION.md
│   ├── USER_GUIDE.md
│   ├── PROJECT_OVERVIEW.md
│   └── screenshots/
│
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## Kurulum

Projeyi bilgisayarıma indirdikten sonra terminal üzerinden proje klasörüne geçerek gerekli paketleri yükledim.

Projeyi kendi bilgisayarında çalıştırmak isteyenler de aşağıdaki komutları kullanabilir.

```bash
cd TASKFLOW
npm install
```

## Projeyi Çalıştırma

Sunucuyu başlatmak için:

```bash
node app.js
```

Sunucu başarılı şekilde başladığında terminalde 3000 portunda çalıştığına dair mesaj görüntülenir.

API adresi:

`http://localhost:3000`

## API Endpointleri

Projede kullandığım temel endpointler:

**Görev işlemleri:**

- `GET /api/tasks` – Bütün görevleri listeler.
- `GET /api/tasks/:id` – ID üzerinden görev getirir.
- `POST /api/tasks` – Yeni görev oluşturur.
- `PUT /api/tasks/:id` – Mevcut görevi günceller.
- `DELETE /api/tasks/:id` – Görevi siler.

**Diğer işlemler:**

- `GET /api/tasks/search?keyword=Node` – Görev araması yapar.
- `GET /api/tasks/assignee/:assignee` – Atanan kişiye göre görevleri listeler.
- `GET /api/tasks/reports/completed` – Tamamlanan görevleri getirir.
- `GET /api/tasks/reports/pending` – Bekleyen görevleri getirir.
- `GET /api/tasks/reports/summary` – Genel görev özetini oluşturur.

**Filtreleme, sayfalama ve sıralama örnekleri:**

- `GET /api/tasks?status=pending` – Bekleyen görevleri listeler.
- `GET /api/tasks?priority=high` – Yüksek öncelikli görevleri listeler.
- `GET /api/tasks?page=1&limit=5` – İlk sayfada 5 görev listeler.
- `GET /api/tasks?sortBy=createdAt&order=desc` – Görevleri oluşturulma tarihine göre yeniden eskiye sıralar.

Bu işlemler aynı istekte birden fazla sorgu parametresi kullanılarak da gerçekleştirilebilir.

## Veri Saklama

Projenin mevcut sürümünde herhangi bir veritabanı bağlantısı kullanmadım. Görevleri JavaScript dizisi içerisinde saklıyorum.

Bu nedenle sunucu yeniden başlatıldığında oluşturulan görevler siliniyor. Şu anki projede önceliğim veritabanı bağlantısından ziyade REST API yapısını ve backend işlemlerini doğru şekilde uygulamaktı.

## Dokümantasyon

Projenin geliştirme ve kullanım detaylarını `docs` klasöründe topladım.

- `API_DOCUMENTATION.md` – API endpointleri ve çalışma mantığı.
- `TESTING_DOCUMENTATION.md` – Postman üzerinden yaptığım testler.
- `USER_GUIDE.md` – Projenin kurulumu ve kullanımı.
- `PROJECT_OVERVIEW.md` – Projenin amacı ve genel tanıtımı.
- `screenshots/` – Test sonuçlarına ait ekran görüntüleri.

## Geliştirme Hakkında

TASKFLOW'u geliştirirken Node.js ve Express.js kullanarak modüler bir REST API yapısı oluşturdum. Bu süreçte öğrendiğim konuları uygulayarak CRUD işlemlerini, middleware yapılarını ve API tarafındaki diğer özellikleri projeye ekledim.