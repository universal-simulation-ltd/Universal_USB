import type { Article } from './types'

const articles: Article[] = [
  {
    id: 'usb-versions-and-speeds',
    title: "Versioni e velocità USB, spiegate",
    summary: "Perché due chiavette USB identiche all'aspetto possono funzionare a velocità molto diverse.",
    group: "Le basi",
    body: `L'USB esiste dagli anni Novanta, e ogni nuova versione ha aumentato la velocità massima continuando a far funzionare i dispositivi più vecchi. Questa retrocompatibilità è comoda, ma significa anche che la forma di una spina dice ben poco sulla velocità di un collegamento.

## I livelli di velocità

Ogni versione dell'USB ha aggiunto un nuovo livello di velocità:

- **Low Speed** — 1,5 Mbps, per dispositivi semplici come tastiere e mouse.
- **Full Speed** — 12 Mbps, dall'USB 1.1.
- **High Speed** — 480 Mbps, dall'USB 2.0.
- **SuperSpeed** — 5 Gbps, dall'USB 3.0.
- **SuperSpeed+** — 10 Gbps, e 20 Gbps su alcuni collegamenti USB 3.2.

Gli standard più recenti, come USB4, sono ancora più veloci.

## La versione non coincide con la velocità

Un dispositivo dichiara per quale versione dell'USB è stato progettato. La velocità a cui funziona davvero viene concordata quando lo colleghi, e non può superare quella dell'elemento più lento della catena: il dispositivo, il cavo, un eventuale hub e la porta del tuo computer. Una chiavetta USB 3 in una porta USB 2, o collegata con un cavo USB 2, funziona a velocità USB 2.

Ecco perché Universal USB Detector mostra entrambe: la versione dichiarata dal dispositivo e la velocità che ha negoziato con il tuo computer.

## La forma della spina non coincide con la velocità

USB-A, USB-B, micro-USB e USB-C sono forme di connettore. Un cavo USB-C può essere di tutto, da un lento cavo di ricarica a un cavo dati velocissimo, e molti dispositivi USB-C comunicano solo a velocità USB 2. L'unico modo per sapere che cosa ottieni è guardare che cosa riporta effettivamente il collegamento.

## Megabit, non megabyte

Le velocità sono indicate in bit al secondo. Un byte è composto da otto bit, e una parte del collegamento è usata dal protocollo stesso, quindi le copie reali di file sono sempre più lente di quanto lasci intendere il valore dichiarato.`,
  },
  {
    id: 'usb-power-explained',
    title: "Come funziona l'alimentazione USB",
    summary: "Che cosa chiede un dispositivo, che cosa fornisce una porta e dove si colloca l'USB-C Power Delivery.",
    group: "Le basi",
    body: `Ogni porta USB fornisce alimentazione oltre ai dati. L'alimentazione di base è di 5 volt, e ogni dispositivo comunica al computer quanta corrente gli serve.

## Che cosa chiede un dispositivo

Quando colleghi un dispositivo, questo si descrive al computer, indicando anche la corrente massima che prevede di assorbire. Una porta USB 2 standard è progettata per fornire fino a 500 mA e una porta USB 3 fino a 900 mA, quindi un dispositivo che chiede più di quanto offre la sua porta potrebbe non funzionare bene, oppure avere bisogno di un alimentatore proprio o di un hub alimentato.

Il valore indicato da un dispositivo è una richiesta e un limite massimo, non una misura in tempo reale. Un mouse che chiede 100 mA può consumare molto meno per la maggior parte del tempo.

## Watt, volt e ampere

La potenza in watt è data dai volt moltiplicati per gli ampere. A 5 volt, 500 mA corrispondono a 2,5 W e 900 mA a 4,5 W. Universal USB Detector converte la richiesta di ogni dispositivo in watt a 5 volt, così i numeri sono più facili da confrontare.

## USB-C Power Delivery

La ricarica rapida via USB-C funziona in modo diverso. Con l'USB Power Delivery, il caricabatterie e il dispositivo negoziano tra loro una tensione e una corrente più alte, fino a 240 W con l'ultima versione dello standard. Questa negoziazione avviene in chip dedicati a ciascuna estremità del cavo, non nella normale comunicazione USB che il software del computer può vedere.

Per questo nessuna app comune può dirti quale potenza un caricabatterie USB-C ha concordato con il tuo portatile. Per misurarla ti serve un piccolo tester hardware da collegare in linea tra il caricabatterie e il dispositivo.

## I caricabatterie non sono dispositivi USB

Un caricabatterie fornisce alimentazione ma non si identifica come dispositivo sul collegamento USB, quindi non compare mai nell'elenco dei dispositivi. Universal USB Detector mostra invece la ricarica in un pannello separato, usando ciò che il sistema operativo riporta sull'alimentazione e sulla batteria.`,
  },
  {
    id: 'charge-only-cables',
    title: "Perché alcuni cavi servono solo a ricaricare",
    summary: "Come un cavo può sembrare perfetto e non trasportare comunque alcun dato.",
    group: "Le basi",
    body: `Un cavo USB contiene fili separati per l'alimentazione e per i dati. Alcuni cavi più economici, spesso quelli forniti con piccoli gadget, includono solo i fili di alimentazione. Ricaricano un telefono senza problemi, ma un computer non vedrà mai nulla di ciò che è collegato tramite loro.

I due tipi di solito sono identici all'aspetto e raramente sono etichettati. Per questo un cavo di sola ricarica è una delle cause più comuni di un dispositivo «non riconosciuto».

## Perché un software non può semplicemente controllare un cavo

Un computer vede sempre e solo dispositivi, mai cavi. Un cavo da solo non ha nulla da comunicare, quindi nessuna app può esaminare un cavo e leggere di che cosa è capace. Alcuni cavi USB-C contengono un piccolo chip marcatore che ne descrive la corrente nominale e la velocità, ma per leggerlo serve un tester hardware.

## La prova pratica

Il modo affidabile per scoprirlo è provare: collega tramite il cavo un dispositivo che sai funzionare e guarda se il computer lo rileva. Se il dispositivo compare, il cavo trasporta dati oltre all'alimentazione. Universal USB Detector offre una versione guidata di questa prova; consulta l'articolo su come testare un cavo.

## Segnali di un cavo di sola ricarica

- Il dispositivo si ricarica, ma il computer non reagisce quando lo colleghi.
- Lo stesso dispositivo viene riconosciuto subito con un altro cavo.
- Il cavo era fornito con un prodotto che aveva bisogno solo di essere ricaricato, come una lampada, un ventilatore o degli auricolari wireless.

Quando ne trovi uno, conviene etichettarlo così non ti trarrà più in inganno.`,
  },
  {
    id: 'what-the-app-reads',
    title: "Che cosa legge l'app, e come",
    summary: "Da dove arriva ogni valore e quali sono i limiti di ciò che un software può vedere.",
    group: "Come funziona",
    body: `Universal USB Detector è un'app desktop per Windows e macOS. Quando colleghi un dispositivo USB, questo si descrive al computer in un formato standard. L'app legge questa descrizione, la trasforma in un linguaggio semplice e aggiorna l'elenco non appena qualcosa viene collegato o scollegato.

## Che cosa significa ogni valore

- **Versione USB** — la versione per cui il dispositivo dichiara di essere stato progettato.
- **Velocità** — la velocità che il computer ha negoziato con il dispositivo. Su alcuni sistemi, in particolare Windows, la velocità effettiva non è disponibile; in quel caso l'app mostra il massimo consentito dalla versione USB del dispositivo, indicato con «fino a», invece di fingere di averla misurata.
- **Ruolo** — che tipo di dispositivo è, ad esempio archiviazione, tastiera o mouse, fotocamera, audio o hub, in base ai codici di classe standard dichiarati dal dispositivo. Un dispositivo può averne più di uno.
- **Potenza richiesta** — la corrente massima richiesta dal dispositivo, mostrata in milliampere e in watt a 5 volt.
- **Produttore, prodotto e numero di serie** — il nome che il dispositivo dà a se stesso. Questi dati sono forniti nei limiti del possibile: su Windows spesso sono vuoti per i dispositivi che il sistema ha già preso in carico con un proprio driver.
- **Dati** — tutto ciò che compare nell'elenco ha linee dati funzionanti, perché un dispositivo può comparire solo se ha comunicato con il computer.

## Il pannello di ricarica

I caricabatterie non compaiono mai come dispositivi USB, quindi la ricarica ha un pannello tutto suo. Su Windows mostra se sei collegato alla rete elettrica o a batteria, il livello e la tensione della batteria e la velocità con cui l'energia entra nella batteria o ne esce. Sugli altri sistemi è disponibile solo l'informazione sul collegamento dell'alimentatore di rete.

La velocità di ricarica è ciò che fluisce nella batteria, non ciò che il caricabatterie è in grado di erogare. Una batteria quasi carica assorbe solo un filo di corrente, anche con un caricabatterie potente.

## Che cosa non può dirti

- La potenza negoziata da un caricabatterie USB-C. Per questo serve un tester hardware in linea.
- La corrente nominale di un cavo o il suo chip marcatore.
- Qualunque cosa riguardo ai file su un'unità. L'app legge la descrizione del dispositivo, non il suo contenuto.

## Organizzare l'elenco

I dispositivi che colleghi mentre l'app è aperta, e qualunque chiavetta o disco, compaiono nell'area principale. I dispositivi integrati e gli hub si trovano in una sezione compressa; puoi mostrarne uno qualsiasi e l'app se ne ricorderà. Puoi anche nascondere un dispositivo e ripristinarlo in seguito.`,
  },
  {
    id: 'testing-a-cable',
    title: "Testare un cavo",
    summary: "Una verifica passo passo che dimostra se un cavo trasporta dati.",
    group: "Come funziona",
    body: `Poiché un computer non può vedere direttamente un cavo, il test del cavo funziona aspettando che un dispositivo compaia attraverso di esso.

## Come eseguirlo

1. Apri **Testa un cavo**. L'app prende nota di tutti i dispositivi collegati in quel momento.
2. Collega il cavo al computer.
3. Collega all'altra estremità del cavo un dispositivo che sai funzionare, come una chiavetta, una tastiera o un telefono.
4. Attendi. L'app resta in attesa di un nuovo dispositivo per un massimo di 30 secondi.

## Come leggere il risultato

- **Compare un dispositivo** — il cavo trasporta dati oltre all'alimentazione. L'app mostra ciò che ha trovato e puoi testarne un altro.
- **Non compare nulla** — il cavo potrebbe essere di sola ricarica. È anche possibile che il dispositivo usato non si presenti come dispositivo dati, o che abbia bisogno di un alimentatore proprio. Riprova con un altro dispositivo che sai funzionare prima di dare la colpa al cavo.

## Consigli

- Usa un dispositivo semplice per il test. Una chiavetta o una tastiera con filo è l'ideale, perché compare subito e non richiede configurazione.
- Alcuni telefoni compaiono come dispositivo dati solo dopo averli sbloccati o aver consentito il collegamento sullo schermo del telefono.
- Collega il cavo direttamente al computer e non tramite un hub, così non finisci per testare l'hub.
- Un test superato dimostra che il cavo trasporta dati. Non ti dice la velocità massima del cavo né per quanta corrente è certificato.`,
  },
  {
    id: 'privacy-and-security',
    title: "Che cosa esce dal tuo computer",
    summary: "Nulla sui tuoi dispositivi viene caricato online, e non c'è alcun account.",
    group: "Privacy e sicurezza",
    body: `Universal USB Detector funziona interamente sul tuo computer. Legge in locale i tuoi dispositivi USB e lo stato dell'alimentazione e te li mostra. Nessuna di queste informazioni viene caricata da nessuna parte.

## Nessun account

Non c'è niente a cui accedere, e l'app non offre alcun accesso.

## Che cosa invia l'app

La barra dei menu condivisa in cima a ogni app UNI·SIM mostra quante persone usano l'app. Per contarti, l'app invia un piccolo segnale mentre è aperta, composto da un numero casuale creato per questa installazione e dal tipo di dispositivo su cui è in esecuzione. Non contiene nulla sui tuoi dispositivi USB, sulla tua batteria o sui tuoi file. Il menu può anche caricare l'elenco delle modifiche recenti all'app.

## Che cosa resta sul tuo computer

L'app ricorda quali dispositivi hai nascosto e quali dispositivi integrati hai scelto di mostrare, così l'elenco ha lo stesso aspetto la volta successiva. Queste informazioni vengono salvate dall'app su questo computer e da nessun'altra parte.

## Che cosa fa l'app ai tuoi dispositivi

Si limita a leggere. Per conoscere il nome di un dispositivo, l'app lo apre brevemente, gli chiede nome, produttore e numero di serie, poi lo richiude. Non modifica le impostazioni dei tuoi dispositivi, non vi scrive nulla e non guarda i file su un'unità.

## Come è costruita l'app

La parte dell'app che comunica con l'hardware USB è separata da quella che disegna la finestra. La finestra in sé non ha alcun accesso diretto al tuo sistema; riceve soltanto l'elenco finale dei dispositivi. L'app è open source, quindi chiunque può verificare esattamente che cosa fa.`,
  },
]

export default articles
