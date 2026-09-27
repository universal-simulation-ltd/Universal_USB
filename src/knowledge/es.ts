import type { Article } from './types'

const articles: Article[] = [
  {
    id: 'usb-versions-and-speeds',
    title: "Versiones y velocidades de USB, explicadas",
    summary: "Por qué dos memorias USB que parecen iguales pueden funcionar a velocidades muy distintas.",
    group: "Lo básico",
    body: `El USB existe desde los años noventa, y cada nueva versión ha aumentado la velocidad máxima sin dejar de funcionar con los dispositivos antiguos. Esa compatibilidad con versiones anteriores es cómoda, pero también significa que la forma de un conector dice muy poco sobre la rapidez de una conexión.

## Los niveles de velocidad

Cada versión de USB añadió un nuevo nivel de velocidad:

- **Low Speed** — 1,5 Mbps, para dispositivos sencillos como teclados y ratones.
- **Full Speed** — 12 Mbps, desde USB 1.1.
- **High Speed** — 480 Mbps, desde USB 2.0.
- **SuperSpeed** — 5 Gbps, desde USB 3.0.
- **SuperSpeed+** — 10 Gbps, y 20 Gbps en algunas conexiones USB 3.2.

Los estándares más recientes, como USB4, son aún más rápidos.

## La versión no es lo mismo que la velocidad

Un dispositivo indica para qué versión de USB se fabricó. La velocidad a la que funciona realmente se acuerda al conectarlo, y solo puede ser tan rápida como la parte más lenta de la cadena: el dispositivo, el cable, cualquier concentrador y el puerto de su ordenador. Una memoria USB 3 en un puerto USB 2, o a través de un cable USB 2, funciona a velocidad de USB 2.

Por eso Universal USB Detector muestra ambas cosas: la versión que declara el dispositivo y la velocidad que ha negociado con su ordenador.

## La forma del conector no es lo mismo que la velocidad

USB-A, USB-B, micro-USB y USB-C son formas de conector. Un cable USB-C puede ser desde un cable de carga lento hasta un cable de datos muy rápido, y muchos dispositivos USB-C solo se comunican a velocidades de USB 2. La única forma de saber lo que obtiene es fijarse en lo que la conexión informa realmente.

## Megabits, no megabytes

Las velocidades se expresan en bits por segundo. Un byte tiene ocho bits, y parte del enlace lo utiliza el propio protocolo, así que las copias de archivos reales siempre son más lentas de lo que sugiere la cifra anunciada.`,
  },
  {
    id: 'usb-power-explained',
    title: "Cómo funciona la alimentación USB",
    summary: "Lo que pide un dispositivo, lo que suministra un puerto y qué papel tiene USB-C Power Delivery.",
    group: "Lo básico",
    body: `Todos los puertos USB suministran energía además de datos. La alimentación básica es de 5 voltios, y cada dispositivo indica al ordenador cuánta corriente necesita.

## Lo que pide un dispositivo

Cuando se conecta un dispositivo, este se describe ante el ordenador, incluida la corriente máxima que espera consumir. Un puerto USB 2 estándar está diseñado para suministrar hasta 500 mA y un puerto USB 3 hasta 900 mA, por lo que un dispositivo que pida más de lo que ofrece su puerto puede no funcionar correctamente, o necesitar su propia fuente de alimentación o un concentrador alimentado.

La cifra que da un dispositivo es una petición y un límite, no una medición en tiempo real. Un ratón que pide 100 mA puede consumir mucho menos la mayor parte del tiempo.

## Vatios, voltios y amperios

La potencia en vatios es el resultado de multiplicar voltios por amperios. A 5 voltios, 500 mA son 2,5 W y 900 mA son 4,5 W. Universal USB Detector convierte la petición de cada dispositivo en vatios a 5 voltios para que las cifras sean más fáciles de comparar.

## USB-C Power Delivery

La carga rápida por USB-C funciona de otra manera. Con USB Power Delivery, el cargador y el dispositivo negocian entre ellos una tensión y una corriente más altas, hasta 240 W con la última versión del estándar. Esa negociación tiene lugar en chips dedicados en cada extremo del cable, no en la comunicación USB normal que puede ver el software del ordenador.

Por eso ninguna aplicación corriente puede decirle qué potencia ha acordado un cargador USB-C con su portátil. Para medirla necesita un pequeño comprobador de hardware que se coloca entre el cargador y el dispositivo.

## Los cargadores no son dispositivos USB

Un cargador suministra energía, pero no se identifica como dispositivo en la conexión USB, así que nunca aparece en la lista de dispositivos. En su lugar, Universal USB Detector muestra la carga en un panel aparte, a partir de lo que su sistema operativo informa sobre la fuente de alimentación y la batería.`,
  },
  {
    id: 'charge-only-cables',
    title: "Por qué algunos cables solo cargan",
    summary: "Cómo un cable puede parecer perfecto y aun así no transmitir datos.",
    group: "Lo básico",
    body: `Un cable USB contiene hilos separados para la energía y para los datos. Algunos cables más baratos, a menudo los que vienen con pequeños aparatos, solo incluyen los hilos de alimentación. Cargan un teléfono sin ningún problema, pero un ordenador nunca verá nada conectado a través de ellos.

Los dos tipos suelen tener un aspecto idéntico y rara vez están etiquetados. Eso hace que un cable solo de carga sea una de las causas más habituales de que un dispositivo «no se reconozca».

## Por qué el software no puede simplemente comprobar un cable

Un ordenador solo ve dispositivos, nunca cables. Un cable por sí solo no tiene nada que informar, así que ninguna aplicación puede examinar un cable y leer de qué es capaz. Algunos cables USB-C contienen un pequeño chip marcador que describe su corriente nominal y su velocidad, pero para leerlo hace falta un comprobador de hardware.

## La prueba práctica

La forma fiable de averiguarlo es probar: conecte a través del cable un dispositivo que sepa que funciona y compruebe si el ordenador lo detecta. Si el dispositivo aparece, el cable transmite datos además de energía. Universal USB Detector incluye una versión guiada de esta prueba; consulte el artículo sobre cómo probar un cable.

## Señales de un cable solo de carga

- El dispositivo se carga, pero el ordenador no reacciona al conectarlo.
- El mismo dispositivo se reconoce al instante con otro cable.
- El cable venía con un producto que solo necesitaba cargarse, como una lámpara, un ventilador o unos auriculares inalámbricos.

Cuando encuentre uno, merece la pena etiquetarlo para que no vuelva a pillarle desprevenido.`,
  },
  {
    id: 'what-the-app-reads',
    title: "Qué lee la aplicación y cómo",
    summary: "De dónde sale cada dato y los límites de lo que puede ver el software.",
    group: "Cómo funciona",
    body: `Universal USB Detector es una aplicación de escritorio para Windows y macOS. Cuando se conecta un dispositivo USB, este se describe ante su ordenador en un formato estándar. La aplicación lee esa descripción, la convierte en lenguaje sencillo y actualiza la lista en cuanto se conecta o se retira algo.

## Qué significa cada dato

- **Versión de USB** — la versión para la que el dispositivo dice haber sido fabricado.
- **Velocidad** — la velocidad que su ordenador ha negociado con el dispositivo. En algunos sistemas, sobre todo en Windows, la velocidad real no está disponible; entonces la aplicación muestra el máximo que permite la versión USB del dispositivo, marcado como «hasta», en lugar de fingir que la ha medido.
- **Función** — qué tipo de dispositivo es, como almacenamiento, teclado o ratón, cámara, audio o concentrador, según los códigos de clase estándar que declara el dispositivo. Un dispositivo puede tener más de una.
- **Potencia solicitada** — la corriente máxima que pide el dispositivo, en miliamperios y en vatios a 5 voltios.
- **Fabricante, producto y número de serie** — el nombre que el propio dispositivo se da. Estos datos se obtienen en la medida de lo posible: en Windows suelen aparecer vacíos en los dispositivos que el sistema ya ha asumido con su propio controlador.
- **Datos** — todo lo que aparece en la lista tiene líneas de datos que funcionan, porque un dispositivo solo puede aparecer si se ha comunicado con su ordenador.

## El panel de carga

Los cargadores nunca aparecen como dispositivos USB, así que la carga tiene su propio panel. En Windows muestra si está conectado a la red eléctrica o funcionando con batería, el nivel y la tensión de la batería y el ritmo al que la energía entra en la batería o sale de ella. En otros sistemas solo se sabe si el adaptador de corriente está conectado.

El ritmo de carga es lo que fluye hacia la batería, no lo que el cargador puede suministrar. Una batería casi llena solo admite un hilo de corriente, incluso con un cargador potente.

## Lo que no puede decirle

- La potencia que ha negociado un cargador USB-C. Para eso hace falta un comprobador de hardware en línea.
- La corriente nominal de un cable o su chip marcador.
- Nada sobre los archivos de una unidad. La aplicación lee la descripción del dispositivo, no su contenido.

## Organizar la lista

Los dispositivos que conecte mientras la aplicación está abierta, y cualquier memoria USB o disco, aparecen en la zona principal. Los dispositivos integrados y los concentradores están en una sección contraída; puede mostrar cualquiera de ellos y la aplicación lo recordará. También puede ocultar un dispositivo y restaurarlo más tarde.`,
  },
  {
    id: 'testing-a-cable',
    title: "Probar un cable",
    summary: "Una comprobación paso a paso que demuestra si un cable transmite datos.",
    group: "Cómo funciona",
    body: `Como un ordenador no puede ver un cable directamente, la prueba de cable consiste en esperar a que aparezca un dispositivo conectado a través de él.

## Cómo hacerla

1. Abra **Probar un cable**. La aplicación anota todos los dispositivos conectados en ese momento.
2. Conecte el cable a su ordenador.
3. Conecte en el otro extremo del cable un dispositivo que sepa que funciona, como una memoria USB, un teclado o un teléfono.
4. Espere. La aplicación vigila la aparición de un nuevo dispositivo durante un máximo de 30 segundos.

## Cómo interpretar el resultado

- **Aparece un dispositivo** — el cable transmite datos además de energía. La aplicación muestra lo que ha encontrado y puede probar otro.
- **No aparece nada** — puede que el cable sea solo de carga. También es posible que el dispositivo utilizado no se presente como dispositivo de datos, o que necesite su propia fuente de alimentación. Vuelva a intentarlo con otro dispositivo que sepa que funciona antes de culpar al cable.

## Consejos

- Utilice un dispositivo sencillo para la prueba. Una memoria USB o un teclado con cable es ideal, porque aparece al instante y no necesita configuración.
- Algunos teléfonos solo aparecen como dispositivo de datos después de desbloquearlos o de permitir la conexión en su pantalla.
- Conecte directamente al ordenador en lugar de a través de un concentrador, para no acabar probando el concentrador.
- Una prueba superada demuestra que el cable transmite datos. No le indica la velocidad máxima del cable ni la corriente para la que está diseñado.`,
  },
  {
    id: 'privacy-and-security',
    title: "Qué sale de su ordenador",
    summary: "No se sube nada sobre sus dispositivos y no hay ninguna cuenta.",
    group: "Privacidad y seguridad",
    body: `Universal USB Detector funciona íntegramente en su ordenador. Lee sus dispositivos USB y el estado de la alimentación de forma local y se los muestra. Nada de esa información se sube a ninguna parte.

## Sin cuenta

No hay nada en lo que iniciar sesión, y la aplicación no ofrece inicio de sesión.

## Lo que sí envía la aplicación

La barra de menú compartida en la parte superior de todas las aplicaciones de UNI·SIM muestra cuántas personas usan la aplicación. Para contarle, la aplicación envía una pequeña señal mientras está abierta, formada por un número aleatorio creado para esta instalación y el tipo de dispositivo en el que se ejecuta. No contiene nada sobre sus dispositivos USB, su batería ni sus archivos. El menú también puede cargar la lista de cambios recientes de la aplicación.

## Lo que se guarda en su ordenador

La aplicación recuerda qué dispositivos ha ocultado y qué dispositivos integrados ha decidido mostrar, para que la lista tenga el mismo aspecto la próxima vez. La aplicación lo guarda en este ordenador y en ningún otro sitio.

## Lo que la aplicación hace con sus dispositivos

Solo lee. Para conocer el nombre de un dispositivo, la aplicación lo abre brevemente, le pide su nombre, fabricante y número de serie, y vuelve a cerrarlo. No cambia la configuración de sus dispositivos, no escribe en ellos ni examina los archivos de una unidad.

## Cómo está construida la aplicación

La parte de la aplicación que se comunica con el hardware USB está separada de la parte que dibuja la ventana. La ventana en sí no tiene acceso directo a su sistema; solo recibe la lista final de dispositivos. La aplicación es de código abierto, así que cualquiera puede comprobar exactamente lo que hace.`,
  },
]

export default articles
