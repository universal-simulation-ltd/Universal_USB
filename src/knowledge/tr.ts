import type { Article } from './types'

const articles: Article[] = [
  {
    id: 'usb-versions-and-speeds',
    title: "USB sürümleri ve hızları",
    summary: "Birbirinin aynısı görünen iki USB belleğin neden çok farklı hızlarda çalışabildiği.",
    group: "Temel bilgiler",
    body: `USB 1990'lardan beri var ve her yeni sürüm, eski cihazların çalışmaya devam etmesini sağlarken en yüksek hızı artırdı. Bu geriye dönük uyumluluk kullanışlıdır, ancak aynı zamanda bir fişin şeklinin bir bağlantının ne kadar hızlı olduğu hakkında çok az şey söylediği anlamına gelir.

## Hız kademeleri

Her USB sürümü yeni bir hız kademesi ekledi:

- **Low Speed** — 1,5 Mbps, klavye ve fare gibi basit cihazlar için.
- **Full Speed** — 12 Mbps, USB 1.1 ile.
- **High Speed** — 480 Mbps, USB 2.0 ile.
- **SuperSpeed** — 5 Gbps, USB 3.0 ile.
- **SuperSpeed+** — 10 Gbps ve bazı USB 3.2 bağlantılarında 20 Gbps.

USB4 gibi daha yeni standartlar bundan da hızlıdır.

## Sürüm, hızla aynı şey değildir

Bir cihaz, hangi USB sürümü için üretildiğini bildirir. Gerçekte çalıştığı hız ise takıldığında belirlenir ve zincirin en yavaş halkası kadar hızlı olabilir: cihaz, kablo, varsa hub ve bilgisayarınızdaki port. USB 2 portuna takılan ya da USB 2 kablosuyla bağlanan bir USB 3 bellek, USB 2 hızında çalışır.

Universal USB Detector bu yüzden ikisini de gösterir: cihazın bildirdiği sürümü ve bilgisayarınızla anlaştığı hızı.

## Fiş şekli, hızla aynı şey değildir

USB-A, USB-B, micro-USB ve USB-C konnektör şekilleridir. Bir USB-C kablo, yavaş bir şarj kablosundan çok hızlı bir veri kablosuna kadar her şey olabilir ve pek çok USB-C cihaz yalnızca USB 2 hızlarında iletişim kurar. Ne elde ettiğinizi bilmenin tek yolu, bağlantının gerçekte ne bildirdiğine bakmaktır.

## Megabyte değil, megabit

Hızlar saniye başına bit olarak belirtilir. Bir byte sekiz bittir ve bağlantının bir kısmını protokolün kendisi kullanır; bu nedenle gerçek dosya kopyalamaları her zaman öne çıkan rakamın düşündürdüğünden daha yavaştır.`,
  },
  {
    id: 'usb-power-explained',
    title: "USB gücü nasıl çalışır",
    summary: "Bir cihazın ne istediği, bir portun ne sağladığı ve USB-C Power Delivery'nin bu tabloda nereye oturduğu.",
    group: "Temel bilgiler",
    body: `Her USB portu veriyle birlikte güç de sağlar. Temel besleme 5 volttur ve her cihaz bilgisayara ne kadar akıma ihtiyaç duyduğunu bildirir.

## Bir cihaz ne ister

Bir cihaz takıldığında kendini bilgisayara tanıtır; buna çekmeyi beklediği en yüksek akım da dahildir. Standart bir USB 2 portu en fazla 500 mA, bir USB 3 portu ise en fazla 900 mA sağlayacak şekilde tasarlanmıştır; bu nedenle portunun sunduğundan fazlasını isteyen bir cihaz düzgün çalışmayabilir ya da kendi güç kaynağına veya harici beslemeli bir hub'a ihtiyaç duyabilir.

Cihazın verdiği değer bir istek ve bir üst sınırdır, anlık bir ölçüm değildir. 100 mA isteyen bir fare çoğu zaman çok daha azını kullanabilir.

## Watt, volt ve amper

Watt cinsinden güç, voltun amperle çarpımıdır. 5 voltta 500 mA 2,5 W, 900 mA ise 4,5 W eder. Universal USB Detector, sayıları karşılaştırmayı kolaylaştırmak için her cihazın isteğini 5 voltta watt değerine çevirir.

## USB-C Power Delivery

USB-C üzerinden hızlı şarj farklı çalışır. USB Power Delivery ile şarj cihazı ve cihaz kendi aralarında daha yüksek bir voltaj ve akım üzerinde anlaşır; standardın en son sürümünde bu 240 W'a kadar çıkar. Bu anlaşma, bilgisayar yazılımının görebildiği normal USB iletişiminde değil, kablonun iki ucundaki özel yongalarda gerçekleşir.

Bu yüzden hiçbir sıradan uygulama, bir USB-C şarj cihazının dizüstü bilgisayarınızla hangi güç değerinde anlaştığını size söyleyemez. Bunu ölçmek için şarj cihazı ile cihaz arasına hat üzerinde takılan küçük bir donanım test cihazına ihtiyacınız vardır.

## Şarj cihazları USB cihazı değildir

Bir şarj cihazı güç sağlar ancak USB bağlantısında kendini bir cihaz olarak tanıtmaz; bu nedenle cihaz listesinde hiçbir zaman görünmez. Universal USB Detector bunun yerine şarj durumunu, işletim sisteminizin güç kaynağı ve pil hakkında bildirdiklerini kullanarak ayrı bir panelde gösterir.`,
  },
  {
    id: 'charge-only-cables',
    title: "Bazı kablolar neden yalnızca şarj eder",
    summary: "Bir kablo nasıl kusursuz görünüp yine de hiç veri taşımayabilir.",
    group: "Temel bilgiler",
    body: `Bir USB kablosunda güç ve veri için ayrı teller bulunur. Bazı ucuz kablolar, çoğu zaman küçük aletlerle birlikte gelenler, yalnızca güç tellerini içerir. Bir telefonu gayet iyi şarj ederler, ancak bilgisayar bunlar üzerinden takılan hiçbir şeyi görmez.

İki tür genellikle birbirinin aynısı görünür ve üzerlerinde nadiren etiket bulunur. Bu da yalnızca şarj eden kabloyu, bir cihazın "tanınmamasının" en yaygın nedenlerinden biri yapar.

## Yazılım bir kabloyu neden doğrudan kontrol edemez

Bir bilgisayar yalnızca cihazları görür, kabloları asla görmez. Tek başına bir kablonun bildirecek hiçbir şeyi yoktur; bu yüzden hiçbir uygulama bir kabloya bakıp neler yapabildiğini okuyamaz. Bazı USB-C kablolarda akım değerini ve hızını tanımlayan küçük bir işaretleyici yonga bulunur, ancak bunu okumak için bir donanım test cihazı gerekir.

## Pratik test

Bunu öğrenmenin güvenilir yolu denemektir: çalıştığını bildiğiniz bir cihazı kablo üzerinden takın ve bilgisayarın onu fark edip etmediğine bakın. Cihaz görünürse kablo güçle birlikte veri de taşıyordur. Universal USB Detector bu testin adım adım yönlendirmeli bir sürümünü sunar; kablo test etme hakkındaki makaleye bakın.

## Yalnızca şarj eden bir kablonun belirtileri

- Cihaz şarj oluyor ancak taktığınızda bilgisayar hiçbir tepki vermiyor.
- Aynı cihaz farklı bir kabloyla hemen tanınıyor.
- Kablo, yalnızca şarj edilmesi gereken bir ürünle birlikte geldi; örneğin bir lamba, bir vantilatör ya da kablosuz kulaklık.

Böyle bir kablo bulduğunuzda, sizi bir daha şaşırtmaması için üzerine etiket yapıştırmanız faydalı olur.`,
  },
  {
    id: 'what-the-app-reads',
    title: "Uygulama neyi, nasıl okur",
    summary: "Her değerin nereden geldiği ve yazılımın görebildiklerinin sınırları.",
    group: "Nasıl çalışır",
    body: `Universal USB Detector, Windows ve macOS için bir masaüstü uygulamasıdır. Bir USB cihaz takıldığında kendini bilgisayarınıza standart bir biçimde tanıtır. Uygulama bu tanımı okur, sade bir dile çevirir ve bir şey takılır ya da çıkarılır çıkarılmaz listeyi günceller.

## Her değer ne anlama gelir

- **USB sürümü** — cihazın, üretildiğini söylediği sürüm.
- **Hız** — bilgisayarınızın cihazla anlaştığı hız. Bazı sistemlerde, özellikle Windows'ta, anlık hız bilgisi alınamaz; uygulama bu durumda hızı ölçmüş gibi davranmak yerine cihazın USB sürümünün izin verdiği en yüksek değeri "en fazla" ibaresiyle gösterir.
- **Rol** — cihazın türü; örneğin depolama, klavye veya fare, kamera, ses ya da hub. Bu bilgi cihazın bildirdiği standart sınıf kodlarından gelir. Bir cihazın birden fazla rolü olabilir.
- **İstenen güç** — cihazın istediği en yüksek akım; miliamper ve 5 voltta watt olarak gösterilir.
- **Üretici, ürün ve seri numarası** — cihazın kendine verdiği ad. Bunlar elden geldiğince okunur: Windows'ta, sistemin kendi sürücüsüyle zaten sahiplendiği cihazlar için çoğu zaman boştur.
- **Veri** — listede görünen her şeyin veri hatları çalışıyordur, çünkü bir cihaz ancak bilgisayarınızla iletişim kurduysa görünebilir.

## Şarj paneli

Şarj cihazları hiçbir zaman USB cihazı olarak görünmez; bu yüzden şarj durumunun kendi paneli vardır. Windows'ta bu panel şebeke gücüyle mi yoksa pille mi çalıştığınızı, pil seviyesini ve voltajını ve pile giren ya da pilden çıkan gücün hızını gösterir. Diğer sistemlerde yalnızca şebeke adaptörünün bağlı olup olmadığı bilgisi alınabilir.

Şarj hızı, pile akan güçtür; şarj cihazının sağlayabileceği güç değildir. Neredeyse dolu bir pil, güçlü bir şarj cihazından bile ancak çok az akım çeker.

## Size söyleyemedikleri

- Bir USB-C şarj cihazının anlaştığı güç değeri. Bunun için hat üzerinde bir donanım test cihazı gerekir.
- Bir kablonun akım değeri ya da işaretleyici yongası.
- Bir sürücüdeki dosyalar hakkında herhangi bir şey. Uygulama cihazın içeriğini değil, tanımını okur.

## Listeyi düzenleme

Uygulama açıkken taktığınız cihazlar ile her türlü USB bellek ya da disk ana alanda görünür. Dahili cihazlar ve hub'lar daraltılmış bir bölümde durur; bunlardan herhangi birini görünür yapabilirsiniz ve uygulama bunu hatırlar. Bir cihazı gizleyip daha sonra geri de getirebilirsiniz.`,
  },
  {
    id: 'testing-a-cable',
    title: "Kablo test etme",
    summary: "Bir kablonun veri taşıyıp taşımadığını kanıtlayan adım adım kontrol.",
    group: "Nasıl çalışır",
    body: `Bir bilgisayar kabloyu doğrudan göremediği için kablo testi, kablo üzerinden bir cihazın görünüp görünmediğini izleyerek çalışır.

## Nasıl yapılır

1. **Kablo test et** bölümünü açın. Uygulama o anda bağlı olan tüm cihazları not eder.
2. Kabloyu bilgisayarınıza takın.
3. Çalıştığını bildiğiniz bir cihazı, örneğin bir USB bellek, klavye ya da telefonu, kablonun diğer ucuna takın.
4. Bekleyin. Uygulama en fazla 30 saniye boyunca yeni bir cihaz olup olmadığını izler.

## Sonucu yorumlama

- **Bir cihaz görünür** — kablo güçle birlikte veri de taşır. Uygulama bulduğu şeyi gösterir ve başka bir kabloyu test edebilirsiniz.
- **Hiçbir şey görünmez** — kablo yalnızca şarj amaçlı olabilir. Kullandığınız cihazın kendini bir veri cihazı olarak tanıtmıyor olması ya da kendi güç kaynağına ihtiyaç duyması da mümkündür. Kabloyu suçlamadan önce çalıştığını bildiğiniz başka bir cihazla yeniden deneyin.

## İpuçları

- Test için basit bir cihaz kullanın. Bir USB bellek ya da kablolu bir klavye idealdir, çünkü hemen görünür ve kurulum gerektirmez.
- Bazı telefonlar ancak kilidini açtığınızda ya da telefon ekranında bağlantıya izin vermeyi seçtiğinizde veri cihazı olarak görünür.
- Test ettiğiniz şeyin sonunda hub olmaması için kabloyu bir hub yerine doğrudan bilgisayara takın.
- Başarılı bir test, kablonun veri taşıdığını kanıtlar. Kablonun en yüksek hızını ya da hangi akım değeri için tasarlandığını söylemez.`,
  },
  {
    id: 'privacy-and-security',
    title: "Bilgisayarınızdan dışarı ne çıkar",
    summary: "Cihazlarınızla ilgili hiçbir şey yüklenmez ve hesap yoktur.",
    group: "Gizlilik ve güvenlik",
    body: `Universal USB Detector tamamen bilgisayarınızda çalışır. USB cihazlarınızı ve güç durumunuzu yerel olarak okur ve size gösterir. Bu bilgilerin hiçbiri herhangi bir yere yüklenmez.

## Hesap yok

Giriş yapılacak hiçbir şey yoktur ve uygulama giriş yapma seçeneği sunmaz.

## Uygulamanın gönderdikleri

Her UNI·SIM uygulamasının üstündeki ortak menü çubuğu, uygulamayı kaç kişinin kullandığını gösterir. Sizi saymak için uygulama açıkken küçük bir sinyal gönderir; bu sinyal bu kurulum için oluşturulmuş rastgele bir sayıdan ve uygulamanın çalıştığı cihazın türünden oluşur. USB cihazlarınız, piliniz ya da dosyalarınız hakkında hiçbir şey içermez. Menü ayrıca uygulamadaki son değişikliklerin listesini de yükleyebilir.

## Bilgisayarınızda saklananlar

Uygulama, listenin bir dahaki sefere de aynı görünmesi için hangi cihazları gizlediğinizi ve hangi dahili cihazları göstermeyi seçtiğinizi hatırlar. Bu bilgi uygulama tarafından bu bilgisayarda saklanır, başka hiçbir yerde değil.

## Uygulamanın cihazlarınıza yaptıkları

Yalnızca okur. Bir cihazın adını öğrenmek için uygulama cihazı kısa bir süreliğine açar, adını, üreticisini ve seri numarasını sorar, ardından yeniden kapatır. Cihazlarınızın ayarlarını değiştirmez, onlara veri yazmaz ve bir sürücüdeki dosyalara bakmaz.

## Uygulama nasıl yapılmıştır

Uygulamanın USB donanımıyla iletişim kuran kısmı, pencereyi çizen kısmından ayrı tutulur. Pencerenin kendisinin sisteminize doğrudan erişimi yoktur; yalnızca cihazların hazır listesini alır. Uygulama açık kaynaklıdır, bu nedenle herkes tam olarak ne yaptığını kontrol edebilir.`,
  },
]

export default articles
