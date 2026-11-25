# TASKFLOW – Görev Yönetimi REST API Projesi

## 1. Proje Hakkında

TASKFLOW, görevlerin oluşturulması, listelenmesi, güncellenmesi ve silinmesi için geliştirdiğim bir REST API projesidir. Projeyi geliştirirken temel amacım Node.js ve Express.js kullanarak backend geliştirme konusunda pratik yapmak ve öğrendiğim konuları gerçek bir proje üzerinde uygulamaktı.

Başlangıçta yalnızca temel görev işlemlerini gerçekleştiren bir API oluşturmayı planladım. Daha sonra projeyi biraz daha geliştirmek için arama, filtreleme, sıralama, sayfalama ve raporlama gibi özellikler de ekledim.

Bu süreçte yalnızca çalışan endpointler oluşturmaya değil, aynı zamanda kodların düzenli ve anlaşılır olmasına da dikkat ettim.

## 2. Kullanılan Teknolojiler

Projeyi JavaScript kullanarak geliştirdim. Backend tarafında Node.js ve Express.js kullandım. Express.js sayesinde API endpointlerini oluşturdum ve gelen HTTP isteklerini ilgili fonksiyonlara yönlendirdim.

API'yi geliştirirken Postman kullandım. Oluşturduğum endpointlere farklı istekler göndererek işlemlerin doğru çalışıp çalışmadığını kontrol ettim.

Projede kullandığım temel teknolojiler:

- **Node.js:** Sunucu tarafında JavaScript kodlarını çalıştırmak için kullandım.
- **Express.js:** API yapısını oluşturmak ve istekleri yönetmek için kullandım.
- **JavaScript:** Görevlerle ilgili işlemleri ve uygulamanın temel mantığını yazmak için kullandım.
- **Postman:** API isteklerini göndermek ve sonuçları test etmek için kullandım.
- **npm:** Proje bağımlılıklarını yönetmek için kullandım.

## 3. Projenin Dosya ve Klasör Yapısı

Projeyi geliştirirken bütün kodları tek bir dosyada tutmak yerine farklı klasörlere ayırdım. Bunun sebebi, proje büyüdükçe kodların birbirine karışmasını önlemek ve her dosyanın belirli bir görevi olmasını sağlamaktı.

Projedeki klasörlerin görevleri şu şekilde:

- **routes:** API endpointlerini tanımladığım ve istekleri ilgili controller fonksiyonlarına yönlendirdiğim bölüm.
- **controllers:** Gelen istekleri karşılayan, gerekli kontrolleri yapan ve istemciye JSON yanıtları döndüren bölüm.
- **services:** Görev oluşturma, listeleme, güncelleme ve silme gibi işlemlerin gerçekleştirildiği bölüm.
- **middleware:** İstekleri loglama ve gelen verileri doğrulama işlemlerini gerçekleştirdiğim bölüm.

Bu yapıyı kullanarak route, controller ve service işlemlerini birbirinden ayırdım. Böylece bir özellik üzerinde değişiklik yapmam gerektiğinde ilgili dosyayı bulup işlem yapabiliyorum.

## 4. Görev Veri Yapısı

Projede oluşturulan görevleri şimdilik JavaScript dizisi içerisinde saklıyorum. Her görev belirli alanlardan oluşuyor.

Bir görevde bulunan alanlar:

- **id:** Her görev için oluşturulan benzersiz kimlik.
- **title:** Görevin başlığı.
- **description:** Görevin açıklaması.
- **status:** Görevin mevcut durumu.
- **priority:** Görevin öncelik seviyesi.
- **assignee:** Görevin atandığı kişi.
- **createdAt:** Görevin oluşturulduğu tarih.

Görev durumlarını `pending`, `in-progress` ve `completed` olarak belirledim. Öncelik seviyelerinde ise `low`, `medium` ve `high` değerlerini kullandım.

Projede şu an herhangi bir veritabanı bağlantısı bulunmuyor. Görevler uygulama çalışırken bellekte tutuluyor. Bu nedenle sunucu yeniden başlatıldığında oluşturulan görevler siliniyor. Bu yöntemi projenin mevcut kapsamı içerisinde temel API işlemlerine odaklanmak için tercih ettim.

## 5. API Üzerinde Gerçekleştirilen İşlemler

Projenin temelini CRUD işlemleri oluşturuyor. Bu işlemler sayesinde görevler üzerinde temel yönetim işlemlerini gerçekleştirebiliyorum.

- **GET:** Bütün görevleri listelemek veya belirli bir görevi ID üzerinden görüntülemek için kullanıyorum.
- **POST:** Yeni bir görev oluşturmak için kullanıyorum.
- **PUT:** Mevcut bir görevi güncellemek için kullanıyorum.
- **DELETE:** Belirtilen görevi silmek için kullanıyorum.

Bu işlemlerin yanında projeye farklı özellikler de ekledim. Görev başlığı ve açıklaması üzerinden arama yapabiliyorum. Ayrıca görevleri atanan kişiye, durumuna ve öncelik seviyesine göre listeleyebiliyorum.

Görev sayısı arttığında sonuçları daha düzenli görüntüleyebilmek için pagination özelliğini ekledim. Sorting özelliğiyle de görevleri oluşturulma tarihi, başlık, öncelik ve durum gibi alanlara göre sıralayabiliyorum.

## 6. Middleware ve Veri Doğrulama

Projede iki farklı middleware kullandım.

İlk olarak logger middleware geliştirdim. Bu middleware gelen isteklerin HTTP metodunu, endpoint adresini ve zaman bilgisini terminale yazdırıyor. Böylece API'ye hangi isteklerin geldiğini takip edebiliyorum.

İkinci olarak validation middleware oluşturdum. Bu middleware ile görev oluşturma ve güncelleme sırasında gönderilen verileri kontrol ediyorum.

Örneğin görev başlığının boş bırakılmasını, geçersiz öncelik değerleri kullanılmasını veya görev durumunun tanımladığım değerlerin dışında olmasını engelliyorum. Geçersiz bir veri gönderildiğinde API üzerinden uygun hata mesajı ve HTTP 400 durum kodunu döndürüyorum.

## 7. Test Süreci

Geliştirdiğim API endpointlerini Postman üzerinden test ettim. Öncelikle görev oluşturma, listeleme, görüntüleme, güncelleme ve silme işlemlerini kontrol ettim.

Daha sonra eklediğim arama, filtreleme, sıralama, sayfalama ve raporlama özelliklerini farklı istekler göndererek test ettim.

Validation middleware için de boş başlık, geçersiz öncelik ve geçersiz görev durumu gibi örnekler kullandım. Böylece yalnızca başarılı istekleri değil, hatalı istekleri de kontrol etmiş oldum.

Test sırasında aldığım ekran görüntülerini `docs/screenshots/` klasöründe topladım. Ayrıca API'nin kullanımı, endpointler ve test işlemleri hakkında ayrı dokümantasyon dosyaları hazırladım.

## 8. Sonuç ve Kazanımlar

TASKFLOW projesini geliştirirken Node.js ve Express.js kullanarak bir REST API'nin nasıl oluşturulduğunu uygulamalı olarak deneyimledim.

Özellikle HTTP metotlarının kullanımı, endpointlerin düzenlenmesi, routing işlemleri, controller ve service ayrımı, middleware geliştirme ve Postman ile API test etme konularında pratik kazandım.

Projenin başlangıcında yalnızca temel CRUD işlemlerini gerçekleştirebilen bir API oluşturmayı hedeflemiştim. Geliştirme sürecinde yeni özellikler ekleyerek projeyi daha kapsamlı hale getirdim.

Sonuç olarak TASKFLOW, backend geliştirme sürecinde öğrendiğim konuları uyguladığım ve kendi başıma geliştirdiğim bir görev yönetimi REST API projesi oldu.