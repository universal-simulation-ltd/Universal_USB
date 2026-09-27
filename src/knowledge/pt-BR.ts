import type { Article } from './types'

const articles: Article[] = [
  {
    id: 'usb-versions-and-speeds',
    title: "Versões e velocidades do USB, explicadas",
    summary: "Por que dois pendrives que parecem iguais podem ter velocidades muito diferentes.",
    group: "O básico",
    body: `O USB existe desde a década de 1990, e cada nova versão aumentou a velocidade máxima sem deixar de funcionar com os dispositivos mais antigos. Essa compatibilidade com versões anteriores é prática, mas também significa que o formato de um plugue diz muito pouco sobre a velocidade de uma conexão.

## Os níveis de velocidade

Cada versão do USB acrescentou um novo nível de velocidade:

- **Low Speed** — 1,5 Mbps, para dispositivos simples como teclados e mouses.
- **Full Speed** — 12 Mbps, a partir do USB 1.1.
- **High Speed** — 480 Mbps, a partir do USB 2.0.
- **SuperSpeed** — 5 Gbps, a partir do USB 3.0.
- **SuperSpeed+** — 10 Gbps, e 20 Gbps em algumas conexões USB 3.2.

Padrões mais recentes, como o USB4, são ainda mais rápidos.

## Versão não é o mesmo que velocidade

Um dispositivo informa para qual versão do USB ele foi fabricado. A velocidade em que ele realmente funciona é definida quando ele é conectado, e só pode ser tão alta quanto a da parte mais lenta da cadeia: o dispositivo, o cabo, qualquer hub e a porta do seu computador. Um pendrive USB 3 em uma porta USB 2, ou ligado por um cabo USB 2, funciona na velocidade do USB 2.

É por isso que o Universal USB Detector mostra as duas coisas: a versão que o dispositivo declara e a velocidade que ele negociou com o seu computador.

## Formato do plugue não é o mesmo que velocidade

USB-A, USB-B, micro-USB e USB-C são formatos de conector. Um cabo USB-C pode ser qualquer coisa, de um cabo de carregamento lento a um cabo de dados muito rápido, e muitos dispositivos USB-C só se comunicam em velocidades de USB 2. A única forma de saber o que você está recebendo é ver o que a conexão realmente informa.

## Megabits, não megabytes

As velocidades são indicadas em bits por segundo. Um byte tem oito bits, e parte da conexão é usada pelo próprio protocolo, então cópias reais de arquivos são sempre mais lentas do que o número anunciado sugere.`,
  },
  {
    id: 'usb-power-explained',
    title: "Como funciona a energia do USB",
    summary: "O que um dispositivo pede, o que uma porta fornece e onde entra o USB-C Power Delivery.",
    group: "O básico",
    body: `Toda porta USB fornece energia além de dados. O fornecimento básico é de 5 volts, e cada dispositivo informa ao computador de quanta corrente precisa.

## O que um dispositivo pede

Quando um dispositivo é conectado, ele se descreve para o computador, incluindo a corrente máxima que espera consumir. Uma porta USB 2 padrão foi projetada para fornecer até 500 mA e uma porta USB 3 até 900 mA, então um dispositivo que pede mais do que a sua porta oferece pode não funcionar direito, ou pode precisar de fonte de alimentação própria ou de um hub alimentado.

O valor informado pelo dispositivo é um pedido e um limite máximo, não uma medição em tempo real. Um mouse que pede 100 mA pode usar bem menos na maior parte do tempo.

## Watts, volts e amperes

A potência em watts é a tensão em volts multiplicada pela corrente em amperes. A 5 volts, 500 mA equivalem a 2,5 W e 900 mA a 4,5 W. O Universal USB Detector converte o pedido de cada dispositivo em watts a 5 volts para facilitar a comparação dos números.

## USB-C Power Delivery

O carregamento rápido por USB-C funciona de outro jeito. Com o USB Power Delivery, o carregador e o dispositivo negociam entre si uma tensão e uma corrente mais altas, chegando a até 240 W na versão mais recente do padrão. Essa negociação acontece em chips dedicados em cada ponta do cabo, e não na comunicação USB normal que o software do computador consegue ver.

É por isso que nenhum aplicativo comum consegue dizer qual potência um carregador USB-C combinou com o seu notebook. Para medir isso, você precisa de um pequeno testador de hardware ligado em linha entre o carregador e o dispositivo.

## Carregadores não são dispositivos USB

Um carregador fornece energia, mas não se identifica como dispositivo na conexão USB, então nunca aparece na lista de dispositivos. Em vez disso, o Universal USB Detector mostra o carregamento em um painel separado, usando o que o seu sistema operacional informa sobre a fonte de alimentação e a bateria.`,
  },
  {
    id: 'charge-only-cables',
    title: "Por que alguns cabos só carregam",
    summary: "Como um cabo pode parecer perfeito e mesmo assim não transmitir dados.",
    group: "O básico",
    body: `Um cabo USB tem fios separados para energia e para dados. Alguns cabos mais baratos, muitas vezes os que vêm com pequenos aparelhos, têm apenas os fios de energia. Eles carregam um celular perfeitamente, mas o computador nunca vai enxergar nada conectado por eles.

Os dois tipos geralmente parecem idênticos e raramente vêm identificados. Isso faz do cabo que só carrega um dos motivos mais comuns para um dispositivo "não ser reconhecido".

## Por que o software não consegue simplesmente verificar um cabo

Um computador só enxerga dispositivos, nunca cabos. Um cabo sozinho não tem nada a informar, então nenhum aplicativo consegue olhar para um cabo e ler do que ele é capaz. Alguns cabos USB-C têm um pequeno chip marcador que descreve a corrente suportada e a velocidade, mas para lê-lo é preciso um testador de hardware.

## O teste prático

A forma confiável de descobrir é testar: conecte pelo cabo um dispositivo que você sabe que funciona e veja se o computador o detecta. Se o dispositivo aparecer, o cabo transmite dados além de energia. O Universal USB Detector tem uma versão guiada desse teste; veja o artigo sobre como testar um cabo.

## Sinais de um cabo que só carrega

- O dispositivo carrega, mas o computador não reage quando você o conecta.
- O mesmo dispositivo é reconhecido na hora com outro cabo.
- O cabo veio com um produto que só precisava ser carregado, como uma luminária, um ventilador ou fones de ouvido sem fio.

Quando encontrar um, vale a pena identificá-lo com uma etiqueta para não ser pego de surpresa de novo.`,
  },
  {
    id: 'what-the-app-reads',
    title: "O que o aplicativo lê, e como",
    summary: "De onde vem cada valor e os limites do que o software consegue ver.",
    group: "Como funciona",
    body: `O Universal USB Detector é um aplicativo de desktop para Windows e macOS. Quando um dispositivo USB é conectado, ele se descreve para o seu computador em um formato padrão. O aplicativo lê essa descrição, transforma em linguagem simples e atualiza a lista assim que algo é conectado ou removido.

## O que cada valor significa

- **Versão do USB** — a versão para a qual o dispositivo diz ter sido fabricado.
- **Velocidade** — a velocidade que o seu computador negociou com o dispositivo. Em alguns sistemas, principalmente no Windows, a velocidade real não está disponível; nesse caso, o aplicativo mostra o máximo que a versão do USB do dispositivo permite, marcado como "até", em vez de fingir que mediu.
- **Função** — o tipo de dispositivo, como armazenamento, teclado ou mouse, câmera, áudio ou hub, com base nos códigos de classe padrão que o dispositivo declara. Um dispositivo pode ter mais de uma.
- **Energia solicitada** — a corrente máxima que o dispositivo pede, mostrada em miliamperes e em watts a 5 volts.
- **Fabricante, produto e número de série** — o nome que o próprio dispositivo usa para si. Esses dados são obtidos na medida do possível: no Windows, muitas vezes ficam em branco para dispositivos que o sistema já assumiu com o próprio driver.
- **Dados** — tudo o que aparece na lista tem as linhas de dados funcionando, porque um dispositivo só pode aparecer se tiver se comunicado com o seu computador.

## O painel de carregamento

Carregadores nunca aparecem como dispositivos USB, então o carregamento tem um painel próprio. No Windows, ele mostra se você está na tomada ou na bateria, o nível e a tensão da bateria e a taxa em que a energia está entrando na bateria ou saindo dela. Em outros sistemas, só está disponível a informação de se o adaptador de tomada está conectado.

A taxa de carga é o que está entrando na bateria, não o que o carregador consegue fornecer. Uma bateria quase cheia recebe só um fio de corrente, mesmo de um carregador potente.

## O que ele não consegue dizer

- A potência que um carregador USB-C negociou. Isso exige um testador de hardware em linha.
- A corrente suportada por um cabo ou o chip marcador dele.
- Qualquer coisa sobre os arquivos de um drive. O aplicativo lê a descrição do dispositivo, não o conteúdo dele.

## Organizando a lista

Os dispositivos que você conecta enquanto o aplicativo está aberto, e qualquer pendrive ou disco, aparecem na área principal. Os dispositivos internos e os hubs ficam em uma seção recolhida; você pode exibir qualquer um deles, e o aplicativo se lembra disso. Você também pode ocultar um dispositivo e restaurá-lo depois.`,
  },
  {
    id: 'testing-a-cable',
    title: "Como testar um cabo",
    summary: "Uma verificação passo a passo que comprova se um cabo transmite dados.",
    group: "Como funciona",
    body: `Como um computador não consegue enxergar um cabo diretamente, o teste de cabo funciona observando se um dispositivo aparece por meio dele.

## Como fazer o teste

1. Abra **Testar um cabo**. O aplicativo registra todos os dispositivos conectados naquele momento.
2. Conecte o cabo ao seu computador.
3. Conecte um dispositivo que você sabe que funciona, como um pendrive, um teclado ou um celular, na outra ponta do cabo.
4. Aguarde. O aplicativo fica atento a um novo dispositivo por até 30 segundos.

## Como interpretar o resultado

- **Um dispositivo aparece** — o cabo transmite dados além de energia. O aplicativo mostra o que encontrou, e você pode testar outro.
- **Nada aparece** — o cabo pode ser só de carregamento. Também é possível que o dispositivo usado não se apresente como dispositivo de dados, ou precise de fonte de alimentação própria. Tente de novo com outro dispositivo que você sabe que funciona antes de culpar o cabo.

## Dicas

- Use um dispositivo simples no teste. Um pendrive ou um teclado com fio é ideal, porque aparece na hora e não precisa de configuração.
- Alguns celulares só aparecem como dispositivo de dados depois que você os desbloqueia ou escolhe permitir a conexão na tela do celular.
- Conecte direto no computador em vez de usar um hub, para que o hub não acabe sendo o que você está testando.
- Um teste aprovado comprova que o cabo transmite dados. Ele não informa a velocidade máxima do cabo nem a corrente que ele suporta.`,
  },
  {
    id: 'privacy-and-security',
    title: "O que sai do seu computador",
    summary: "Nada sobre os seus dispositivos é enviado, e não há conta.",
    group: "Privacidade e segurança",
    body: `O Universal USB Detector funciona inteiramente no seu computador. Ele lê os seus dispositivos USB e o status de energia localmente e os mostra para você. Nenhuma dessas informações é enviada para lugar nenhum.

## Sem conta

Não há nada em que fazer login, e o aplicativo não oferece login.

## O que o aplicativo envia

A barra de menu compartilhada no topo de todo aplicativo UNI·SIM mostra quantas pessoas usam o aplicativo. Para contar você, o aplicativo envia um pequeno sinal enquanto está aberto, formado por um número aleatório criado para esta instalação e pelo tipo de dispositivo em que ele está rodando. Esse sinal não contém nada sobre os seus dispositivos USB, a sua bateria ou os seus arquivos. O menu também pode carregar a lista de mudanças recentes do aplicativo.

## O que fica guardado no seu computador

O aplicativo se lembra de quais dispositivos você ocultou e de quais dispositivos internos você escolheu exibir, para que a lista fique igual da próxima vez. Isso é armazenado pelo aplicativo neste computador e em nenhum outro lugar.

## O que o aplicativo faz com os seus dispositivos

Ele apenas lê. Para saber o nome de um dispositivo, o aplicativo o abre por um instante e pede o nome, o fabricante e o número de série, e depois o fecha de novo. Ele não altera configurações dos seus dispositivos, não grava nada neles e não olha os arquivos de um drive.

## Como o aplicativo é construído

A parte do aplicativo que se comunica com o hardware USB fica separada da parte que desenha a janela. A janela em si não tem acesso direto ao seu sistema; ela só recebe a lista pronta de dispositivos. O aplicativo é de código aberto, então qualquer pessoa pode verificar exatamente o que ele faz.`,
  },
]

export default articles
