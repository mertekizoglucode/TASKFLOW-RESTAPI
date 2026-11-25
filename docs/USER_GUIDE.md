# TASKFLOW – Kullanım Rehberi

## 1. Proje Hakkında

TASKFLOW, görevleri yönetebilmek için geliştirdiğim Node.js ve Express.js tabanlı bir REST API projesidir.

Bu projede görev oluşturma, görevleri listeleme, güncelleme ve silme gibi temel işlemleri gerçekleştirdim. Bunların yanında görev arama, filtreleme, sıralama ve raporlama özelliklerini de ekledim.

Projeyi geliştirirken özellikle Node.js, Express.js ve REST API mantığını daha iyi anlamaya ve öğrendiklerimi uygulamaya çalıştım.

## 2. Gerekli Programlar

Projeyi çalıştırmak için bilgisayarda aşağıdaki programların bulunması gerekiyor:

- Node.js
- npm
- Visual Studio Code veya başka bir kod editörü.
- Postman (API isteklerini göndermek ve test etmek için.)

## 3. Projenin Kurulumu

Öncelikle TASKFLOW projesini bilgisayara indirmek ve proje klasörünü terminal üzerinden açmak gerekiyor.

Terminalde proje klasörüne geçmek için:

```bash
cd TASKFLOW
```

Daha sonra gerekli paketleri yüklemek için şu komutu çalıştırmak yeterli:

```bash
npm install
```

Bu komut, `package.json` dosyasında bulunan bağımlılıkları yükler.

## 4. Projeyi Çalıştırma

Gerekli paketler yüklendikten sonra sunucuyu başlatmak için aşağıdaki komutu kullanıyorum:

```bash
node app.js
```

Her şey doğru şekilde kurulduysa terminalde şu mesaj görüntülenir:

```text
TASKFLOW sunucusu çalışıyor. Port: 3000
```

Bundan sonra API'ye aşağıdaki adres üzerinden istek gönderilebilir:

`http://localhost:3000`

## 5. API Endpointleri

Projede görevlerle ilgili işlemleri gerçekleştirmek için farklı endpointler oluşturdum.

### Temel Görev İşlemleri

- `GET /api/tasks` – Oluşturulan bütün görevleri listeler.
- `GET /api/tasks/:id` – ID bilgisine göre belirli bir görevi getirir.
- `POST /api/tasks` – Yeni görev oluşturur.
- `PUT /api/tasks/:id` – Mevcut bir görevi günceller.
- `DELETE /api/tasks/:id` – Belirtilen görevi siler.

### Eklediğim Diğer Özellikler

- `GET /api/tasks/search?keyword=Node` – Görev başlığı ve açıklaması içerisinde arama yapar.
- `GET /api/tasks/assignee/Mustafa` – Belirli bir kişiye atanmış görevleri listeler.
- `GET /api/tasks/reports/completed` – Tamamlanan görevleri listeler.
- `GET /api/tasks/reports/pending` – Bekleyen görevleri listeler.
- `GET /api/tasks/reports/summary` – Görevlerin genel durumunu özetler.

Bunların yanında görevleri durumlarına ve önceliklerine göre filtreleme, sayfalama ve sıralama işlemlerini de destekleyecek şekilde geliştirdim.

Örneğin:

- `GET /api/tasks?status=pending` – Bekleyen görevleri listeler.
- `GET /api/tasks?priority=high` – Yüksek öncelikli görevleri listeler.
- `GET /api/tasks?page=1&limit=5` – İlk sayfada 5 görev gösterir.
- `GET /api/tasks?sortBy=createdAt&order=desc` – Görevleri oluşturulma tarihine göre yeniden eskiye sıralar.

## 6. Postman Kullanımı

Geliştirdiğim API'yi test etmek için Postman kullandım.

Kullanmak için Postman üzerinden yeni bir istek oluşturup ilgili HTTP metodunu ve endpoint adresini girmek gerekiyor.

POST ve PUT isteklerinde gönderilecek verileri `Body` bölümünden `raw` ve `JSON` seçerek gönderebilirsiniz.

Örnek görev verisi:

```json
{
    "title": "Backend geliştirme",
    "description": "Node.js REST API geliştirme",
    "priority": "high",
    "assignee": "Mustafa"
}
```

İstek gönderildikten sonra API'nin döndürdüğü yanıtı ve HTTP durum kodunu Postman üzerinden görebilirsiniz.

## 7. Verilerin Saklanması

Projenin şu anki sürümünde görevleri bir veritabanında tutmuyorum. Bunun yerine JavaScript içerisinde oluşturduğum bir dizi üzerinden yönetiyorum.

Bu tercihi yapmamın nedeni, öncelikle REST API yapısını, CRUD işlemlerini ve backend tarafındaki çalışma mantığını öğrenmeye odaklanmaktı.

Bu nedenle sunucu kapatıldığında veya yeniden başlatıldığında oluşturulan görevler silinir. Mevcut sürümde kalıcı veri saklama özelliği bulunmuyor.

## 8. Genel Bilgi

TASKFLOW'u geliştirirken Node.js ve Express.js kullanarak sıfırdan bir REST API oluşturdum. Projede öğrendiğim konuları uygulayarak temel CRUD işlemlerinin yanında arama, filtreleme, sıralama, sayfalama ve raporlama özelliklerini de geliştirdim.

Bu projeyle backend geliştirme sürecinde kullanılan temel yapıları daha iyi anladım ve öğrendiklerimi uygulamalı olarak pekiştirme fırsatı buldum.