import type { Article } from './types'

const articles: Article[] = [
  {
    id: 'usb-versions-and-speeds',
    title: "USB-Versionen und Geschwindigkeiten erklärt",
    summary: "Warum zwei USB-Sticks, die gleich aussehen, sehr unterschiedlich schnell sein können.",
    group: "Grundlagen",
    body: `USB gibt es seit den 1990er-Jahren, und jede neue Version hat die Höchstgeschwindigkeit angehoben, ohne dass ältere Geräte ihren Dienst versagen. Diese Abwärtskompatibilität ist praktisch, bedeutet aber auch, dass die Form eines Steckers sehr wenig darüber verrät, wie schnell eine Verbindung ist.

## Die Geschwindigkeitsstufen

Jede USB-Version hat eine neue Geschwindigkeitsstufe hinzugefügt:

- **Low Speed** — 1,5 Mbit/s, für einfache Geräte wie Tastaturen und Mäuse.
- **Full Speed** — 12 Mbit/s, ab USB 1.1.
- **High Speed** — 480 Mbit/s, ab USB 2.0.
- **SuperSpeed** — 5 Gbit/s, ab USB 3.0.
- **SuperSpeed+** — 10 Gbit/s und bei manchen USB-3.2-Verbindungen 20 Gbit/s.

Neuere Standards wie USB4 sind noch schneller.

## Version ist nicht gleich Geschwindigkeit

Ein Gerät meldet, für welche USB-Version es gebaut wurde. Die Geschwindigkeit, mit der es tatsächlich läuft, wird beim Einstecken ausgehandelt und kann nur so hoch sein wie die des langsamsten Glieds der Kette: das Gerät, das Kabel, ein etwaiger Hub und der Anschluss an Ihrem Computer. Ein USB-3-Stick an einem USB-2-Anschluss oder über ein USB-2-Kabel läuft mit USB-2-Geschwindigkeit.

Deshalb zeigt Universal USB Detector beides an: die Version, die das Gerät angibt, und die Geschwindigkeit, die es mit Ihrem Computer ausgehandelt hat.

## Steckerform ist nicht gleich Geschwindigkeit

USB-A, USB-B, Micro-USB und USB-C sind Steckerformen. Ein USB-C-Kabel kann alles sein, vom langsamen Ladekabel bis zum sehr schnellen Datenkabel, und viele USB-C-Geräte kommunizieren nur mit USB-2-Geschwindigkeit. Die einzige Möglichkeit herauszufinden, was Sie bekommen, ist ein Blick darauf, was die Verbindung tatsächlich meldet.

## Megabit, nicht Megabyte

Geschwindigkeiten werden in Bit pro Sekunde angegeben. Ein Byte hat acht Bit, und ein Teil der Verbindung wird vom Protokoll selbst belegt, daher sind echte Dateikopien immer langsamer, als die angegebene Zahl vermuten lässt.`,
  },
  {
    id: 'usb-power-explained',
    title: "So funktioniert die Stromversorgung über USB",
    summary: "Was ein Gerät anfordert, was ein Anschluss liefert und welche Rolle USB-C Power Delivery spielt.",
    group: "Grundlagen",
    body: `Jeder USB-Anschluss liefert neben Daten auch Strom. Die Grundversorgung beträgt 5 Volt, und jedes Gerät teilt dem Computer mit, wie viel Strom es benötigt.

## Was ein Gerät anfordert

Wenn ein Gerät eingesteckt wird, beschreibt es sich dem Computer gegenüber, einschließlich der maximalen Stromstärke, die es voraussichtlich aufnimmt. Ein normaler USB-2-Anschluss ist für bis zu 500 mA ausgelegt und ein USB-3-Anschluss für bis zu 900 mA. Ein Gerät, das mehr anfordert, als sein Anschluss bietet, funktioniert daher möglicherweise nicht richtig oder braucht ein eigenes Netzteil oder einen Hub mit eigener Stromversorgung.

Der Wert, den ein Gerät angibt, ist eine Anforderung und eine Obergrenze, keine laufende Messung. Eine Maus, die 100 mA anfordert, verbraucht die meiste Zeit womöglich weit weniger.

## Watt, Volt und Ampere

Die Leistung in Watt ergibt sich aus Volt mal Ampere. Bei 5 Volt entsprechen 500 mA 2,5 W und 900 mA 4,5 W. Universal USB Detector rechnet die Anforderung jedes Geräts in Watt bei 5 Volt um, damit sich die Zahlen leichter vergleichen lassen.

## USB-C Power Delivery

Schnellladen über USB-C funktioniert anders. Mit USB Power Delivery handeln Ladegerät und Gerät untereinander eine höhere Spannung und Stromstärke aus, mit der neuesten Version des Standards bis zu 240 W. Diese Aushandlung findet in eigenen Chips an beiden Enden des Kabels statt, nicht in der normalen USB-Kommunikation, die die Software des Computers sehen kann.

Deshalb kann Ihnen keine gewöhnliche App sagen, welche Leistung ein USB-C-Ladegerät mit Ihrem Laptop vereinbart hat. Um sie zu messen, brauchen Sie ein kleines Hardware-Messgerät, das zwischen Ladegerät und Gerät gesteckt wird.

## Ladegeräte sind keine USB-Geräte

Ein Ladegerät liefert Strom, gibt sich auf der USB-Verbindung aber nicht als Gerät zu erkennen und erscheint daher nie in der Geräteliste. Universal USB Detector zeigt das Laden stattdessen in einem eigenen Bereich an und stützt sich dabei auf das, was Ihr Betriebssystem über Stromversorgung und Akku meldet.`,
  },
  {
    id: 'charge-only-cables',
    title: "Warum manche Kabel nur laden",
    summary: "Wie ein Kabel einwandfrei aussehen und trotzdem keine Daten übertragen kann.",
    group: "Grundlagen",
    body: `Ein USB-Kabel enthält getrennte Adern für Strom und für Daten. Manche günstigeren Kabel, oft die, die kleinen Gadgets beiliegen, enthalten nur die Stromadern. Sie laden ein Telefon problemlos, aber ein Computer wird nie etwas sehen, das über sie angeschlossen ist.

Die beiden Arten sehen meist völlig gleich aus und sind selten gekennzeichnet. Deshalb ist ein reines Ladekabel einer der häufigsten Gründe dafür, dass ein Gerät „nicht erkannt“ wird.

## Warum Software ein Kabel nicht einfach prüfen kann

Ein Computer sieht immer nur Geräte, nie Kabel. Ein Kabel allein hat nichts zu melden, daher kann keine App ein Kabel untersuchen und auslesen, was es kann. Manche USB-C-Kabel enthalten einen kleinen Markierungschip, der ihre Strombelastbarkeit und Geschwindigkeit beschreibt, doch zum Auslesen braucht man ein Hardware-Messgerät.

## Der praktische Test

Zuverlässig finden Sie es heraus, indem Sie es ausprobieren: Schließen Sie über das Kabel ein Gerät an, von dem Sie wissen, dass es funktioniert, und sehen Sie nach, ob der Computer es bemerkt. Erscheint das Gerät, überträgt das Kabel neben Strom auch Daten. Universal USB Detector bietet eine geführte Version dieses Tests; siehe den Artikel zum Testen eines Kabels.

## Anzeichen für ein reines Ladekabel

- Das Gerät lädt, aber der Computer reagiert nicht, wenn Sie es einstecken.
- Dasselbe Gerät wird mit einem anderen Kabel sofort erkannt.
- Das Kabel lag einem Produkt bei, das nur geladen werden musste, etwa einer Lampe, einem Ventilator oder kabellosen Ohrhörern.

Wenn Sie eines gefunden haben, lohnt es sich, es zu beschriften, damit es Sie nicht noch einmal in die Irre führt.`,
  },
  {
    id: 'what-the-app-reads',
    title: "Was die App ausliest und wie",
    summary: "Woher jeder Wert stammt und wo die Grenzen dessen liegen, was Software sehen kann.",
    group: "So funktioniert es",
    body: `Universal USB Detector ist eine Desktop-App für Windows und macOS. Wenn ein USB-Gerät eingesteckt wird, beschreibt es sich Ihrem Computer gegenüber in einem Standardformat. Die App liest diese Beschreibung, übersetzt sie in verständliche Sprache und aktualisiert die Liste, sobald etwas eingesteckt oder entfernt wird.

## Was die einzelnen Werte bedeuten

- **USB-Version** — die Version, für die das Gerät nach eigener Angabe gebaut wurde.
- **Geschwindigkeit** — die Geschwindigkeit, die Ihr Computer mit dem Gerät ausgehandelt hat. Auf manchen Systemen, vor allem unter Windows, ist die tatsächliche Geschwindigkeit nicht verfügbar; die App zeigt dann das Maximum, das die USB-Version des Geräts erlaubt, mit dem Zusatz „bis zu“, statt so zu tun, als hätte sie es gemessen.
- **Funktion** — welche Art von Gerät es ist, etwa Speicher, Tastatur oder Maus, Kamera, Audio oder Hub, anhand der Standard-Klassencodes, die das Gerät angibt. Ein Gerät kann mehrere haben.
- **Angeforderte Leistung** — die höchste Stromstärke, die das Gerät anfordert, angezeigt in Milliampere und in Watt bei 5 Volt.
- **Hersteller, Produkt und Seriennummer** — der Name, den sich das Gerät selbst gibt. Diese Angaben sind ohne Gewähr: Unter Windows sind sie oft leer bei Geräten, die das System bereits mit einem eigenen Treiber belegt hat.
- **Daten** — alles, was in der Liste erscheint, hat funktionierende Datenleitungen, denn ein Gerät kann nur erscheinen, wenn es mit Ihrem Computer kommuniziert hat.

## Der Ladebereich

Ladegeräte erscheinen nie als USB-Geräte, deshalb hat das Laden einen eigenen Bereich. Unter Windows zeigt er, ob Sie am Netz oder im Akkubetrieb sind, den Ladestand und die Spannung des Akkus sowie die Rate, mit der Energie in den Akku fließt oder ihn verlässt. Auf anderen Systemen ist nur verfügbar, ob das Netzteil angeschlossen ist.

Die Laderate ist das, was in den Akku fließt, nicht das, was das Ladegerät liefern kann. Ein fast voller Akku nimmt selbst an einem leistungsstarken Ladegerät nur ein Rinnsal auf.

## Was sie Ihnen nicht sagen kann

- Die Leistung, die ein USB-C-Ladegerät ausgehandelt hat. Dafür ist ein zwischengestecktes Hardware-Messgerät nötig.
- Die Strombelastbarkeit eines Kabels oder seinen Markierungschip.
- Irgendetwas über die Dateien auf einem Laufwerk. Die App liest die Beschreibung des Geräts, nicht seinen Inhalt.

## Die Liste ordnen

Geräte, die Sie bei geöffneter App einstecken, sowie jeder USB-Stick und jedes Laufwerk erscheinen im Hauptbereich. Eingebaute Geräte und Hubs befinden sich in einem eingeklappten Abschnitt; Sie können jedes davon einblenden, und die App merkt sich das. Sie können auch ein Gerät ausblenden und es später wiederherstellen.`,
  },
  {
    id: 'testing-a-cable',
    title: "Ein Kabel testen",
    summary: "Eine Schritt-für-Schritt-Prüfung, die zeigt, ob ein Kabel Daten überträgt.",
    group: "So funktioniert es",
    body: `Da ein Computer ein Kabel nicht direkt sehen kann, funktioniert der Kabeltest so, dass auf ein Gerät gewartet wird, das über das Kabel erscheint.

## So führen Sie ihn durch

1. Öffnen Sie **Kabel testen**. Die App merkt sich alle Geräte, die in diesem Moment angeschlossen sind.
2. Stecken Sie das Kabel in Ihren Computer.
3. Schließen Sie am anderen Ende des Kabels ein Gerät an, von dem Sie wissen, dass es funktioniert, etwa einen USB-Stick, eine Tastatur oder ein Telefon.
4. Warten Sie. Die App achtet bis zu 30 Sekunden lang auf ein neues Gerät.

## Das Ergebnis verstehen

- **Ein Gerät erscheint** — das Kabel überträgt neben Strom auch Daten. Die App zeigt, was sie gefunden hat, und Sie können ein weiteres testen.
- **Nichts erscheint** — das Kabel ist möglicherweise ein reines Ladekabel. Es ist auch möglich, dass sich das verwendete Gerät nicht als Datengerät zu erkennen gibt oder ein eigenes Netzteil braucht. Versuchen Sie es mit einem anderen Gerät, von dem Sie wissen, dass es funktioniert, bevor Sie dem Kabel die Schuld geben.

## Tipps

- Verwenden Sie für den Test ein einfaches Gerät. Ein USB-Stick oder eine kabelgebundene Tastatur ist ideal, weil sie sofort erscheinen und keine Einrichtung brauchen.
- Manche Telefone erscheinen erst als Datengerät, wenn Sie sie entsperren oder die Verbindung auf dem Bildschirm des Telefons zulassen.
- Stecken Sie direkt am Computer ein statt über einen Hub, damit Sie am Ende nicht den Hub testen.
- Ein bestandener Test beweist, dass das Kabel Daten überträgt. Er sagt Ihnen weder die Höchstgeschwindigkeit des Kabels noch, für welche Stromstärke es ausgelegt ist.`,
  },
  {
    id: 'privacy-and-security',
    title: "Was Ihren Computer verlässt",
    summary: "Nichts über Ihre Geräte wird hochgeladen, und es gibt kein Konto.",
    group: "Datenschutz und Sicherheit",
    body: `Universal USB Detector arbeitet vollständig auf Ihrem Computer. Die App liest Ihre USB-Geräte und Ihren Stromversorgungsstatus lokal aus und zeigt sie Ihnen an. Keine dieser Informationen wird irgendwohin hochgeladen.

## Kein Konto

Es gibt nichts, bei dem Sie sich anmelden müssten, und die App bietet keine Anmeldung an.

## Was die App sendet

Die gemeinsame Menüleiste oben in jeder UNI·SIM-App zeigt, wie viele Menschen die App nutzen. Um Sie mitzuzählen, sendet die App ein kleines Signal, solange sie geöffnet ist. Es besteht aus einer Zufallszahl, die für diese Installation erzeugt wurde, und der Art des Geräts, auf dem sie läuft. Es enthält nichts über Ihre USB-Geräte, Ihren Akku oder Ihre Dateien. Das Menü kann außerdem die Liste der letzten Änderungen an der App laden.

## Was auf Ihrem Computer gespeichert wird

Die App merkt sich, welche Geräte Sie ausgeblendet und welche eingebauten Geräte Sie eingeblendet haben, damit die Liste beim nächsten Mal gleich aussieht. Das speichert die App auf diesem Computer und nirgendwo sonst.

## Was die App mit Ihren Geräten macht

Sie liest nur. Um den Namen eines Geräts zu erfahren, öffnet die App es kurz, fragt Name, Hersteller und Seriennummer ab und schließt es wieder. Sie ändert keine Einstellungen an Ihren Geräten, schreibt nicht darauf und sieht sich keine Dateien auf einem Laufwerk an.

## Wie die App aufgebaut ist

Der Teil der App, der mit der USB-Hardware kommuniziert, ist von dem Teil getrennt, der das Fenster darstellt. Das Fenster selbst hat keinen direkten Zugriff auf Ihr System; es erhält nur die fertige Geräteliste. Die App ist Open Source, sodass jeder genau prüfen kann, was sie tut.`,
  },
]

export default articles
