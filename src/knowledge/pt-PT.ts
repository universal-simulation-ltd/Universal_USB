import type { Article } from './types'

const articles: Article[] = [
  {
    id: 'usb-versions-and-speeds',
    title: "Versões e velocidades USB, explicadas",
    summary: "Porque é que duas pens USB com o mesmo aspeto podem funcionar a velocidades muito diferentes.",
    group: "Noções básicas",
    body: `O USB existe desde a década de 1990, e cada nova versão aumentou a velocidade máxima sem deixar de funcionar com os dispositivos mais antigos. Essa retrocompatibilidade é prática, mas também significa que o formato de uma ficha diz muito pouco sobre a velocidade de uma ligação.

## Os níveis de velocidade

Cada versão do USB acrescentou um novo nível de velocidade:

- **Low Speed** — 1,5 Mbps, para dispositivos simples como teclados e ratos.
- **Full Speed** — 12 Mbps, a partir do USB 1.1.
- **High Speed** — 480 Mbps, a partir do USB 2.0.
- **SuperSpeed** — 5 Gbps, a partir do USB 3.0.
- **SuperSpeed+** — 10 Gbps, e 20 Gbps em algumas ligações USB 3.2.

Normas mais recentes, como o USB4, são ainda mais rápidas.

## Versão não é o mesmo que velocidade

Um dispositivo indica para que versão do USB foi concebido. A velocidade a que realmente funciona é acordada quando é ligado, e só pode ser tão alta quanto a da parte mais lenta da cadeia: o dispositivo, o cabo, qualquer hub e a porta do seu computador. Uma pen USB 3 numa porta USB 2, ou ligada através de um cabo USB 2, funciona à velocidade do USB 2.

É por isso que o Universal USB Detector mostra ambas: a versão que o dispositivo declara e a velocidade que negociou com o seu computador.

## Formato da ficha não é o mesmo que velocidade

USB-A, USB-B, micro-USB e USB-C são formatos de conector. Um cabo USB-C pode ser qualquer coisa, desde um cabo de carregamento lento até um cabo de dados muito rápido, e muitos dispositivos USB-C só comunicam a velocidades USB 2. A única forma de saber o que está a obter é ver o que a ligação realmente indica.

## Megabits, não megabytes

As velocidades são indicadas em bits por segundo. Um byte tem oito bits, e parte da ligação é usada pelo próprio protocolo, pelo que as cópias reais de ficheiros são sempre mais lentas do que o valor anunciado sugere.`,
  },
  {
    id: 'usb-power-explained',
    title: "Como funciona a alimentação USB",
    summary: "O que um dispositivo pede, o que uma porta fornece e onde entra o USB-C Power Delivery.",
    group: "Noções básicas",
    body: `Todas as portas USB fornecem energia além de dados. A alimentação básica é de 5 volts, e cada dispositivo indica ao computador de quanta corrente precisa.

## O que um dispositivo pede

Quando um dispositivo é ligado, descreve-se ao computador, incluindo a corrente máxima que espera consumir. Uma porta USB 2 normal foi concebida para fornecer até 500 mA e uma porta USB 3 até 900 mA, pelo que um dispositivo que pede mais do que a sua porta oferece pode não funcionar corretamente, ou pode precisar de alimentação própria ou de um hub alimentado.

O valor indicado pelo dispositivo é um pedido e um limite máximo, não uma medição em tempo real. Um rato que pede 100 mA pode usar muito menos na maior parte do tempo.

## Watts, volts e amperes

A potência em watts é a tensão em volts multiplicada pela corrente em amperes. A 5 volts, 500 mA correspondem a 2,5 W e 900 mA a 4,5 W. O Universal USB Detector converte o pedido de cada dispositivo em watts a 5 volts para que os números sejam mais fáceis de comparar.

## USB-C Power Delivery

O carregamento rápido por USB-C funciona de outra forma. Com o USB Power Delivery, o carregador e o dispositivo negoceiam entre si uma tensão e uma corrente mais elevadas, chegando a 240 W na versão mais recente da norma. Essa negociação acontece em chips dedicados em cada extremidade do cabo, e não na comunicação USB normal que o software do computador consegue ver.

É por isso que nenhuma aplicação comum consegue dizer que potência um carregador USB-C acordou com o seu portátil. Para a medir, precisa de um pequeno testador de hardware ligado em linha entre o carregador e o dispositivo.

## Os carregadores não são dispositivos USB

Um carregador fornece energia, mas não se identifica como dispositivo na ligação USB, pelo que nunca aparece na lista de dispositivos. Em vez disso, o Universal USB Detector mostra o carregamento num painel à parte, com base no que o seu sistema operativo indica sobre a fonte de alimentação e a bateria.`,
  },
  {
    id: 'charge-only-cables',
    title: "Porque é que alguns cabos só carregam",
    summary: "Como um cabo pode parecer perfeito e mesmo assim não transportar dados.",
    group: "Noções básicas",
    body: `Um cabo USB tem fios separados para a energia e para os dados. Alguns cabos mais baratos, muitas vezes os que vêm com pequenos aparelhos, têm apenas os fios de energia. Carregam um telemóvel perfeitamente, mas o computador nunca verá nada ligado através deles.

Os dois tipos costumam ter um aspeto idêntico e raramente estão identificados. Isso faz de um cabo só de carregamento uma das razões mais comuns para um dispositivo "não ser reconhecido".

## Porque é que o software não consegue simplesmente verificar um cabo

Um computador só vê dispositivos, nunca cabos. Um cabo, por si só, não tem nada para indicar, pelo que nenhuma aplicação consegue olhar para um cabo e ler aquilo de que é capaz. Alguns cabos USB-C contêm um pequeno chip marcador que descreve a corrente nominal e a velocidade, mas lê-lo exige um testador de hardware.

## O teste prático

A forma fiável de descobrir é experimentar: ligue através do cabo um dispositivo que sabe que funciona e veja se o computador o deteta. Se o dispositivo aparecer, o cabo transporta dados além de energia. O Universal USB Detector tem uma versão guiada deste teste; consulte o artigo sobre como testar um cabo.

## Sinais de um cabo só de carregamento

- O dispositivo carrega, mas o computador não reage quando o liga.
- O mesmo dispositivo é reconhecido de imediato com outro cabo.
- O cabo veio com um produto que só precisava de ser carregado, como uma luz, uma ventoinha ou auriculares sem fios.

Quando encontrar um, vale a pena identificá-lo com uma etiqueta para que não volte a ser apanhado desprevenido.`,
  },
  {
    id: 'what-the-app-reads',
    title: "O que a aplicação lê, e como",
    summary: "De onde vem cada valor e os limites do que o software consegue ver.",
    group: "Como funciona",
    body: `O Universal USB Detector é uma aplicação de secretária para Windows e macOS. Quando um dispositivo USB é ligado, descreve-se ao seu computador num formato normalizado. A aplicação lê essa descrição, converte-a em linguagem simples e atualiza a lista assim que algo é ligado ou removido.

## O que significa cada valor

- **Versão USB** — a versão para a qual o dispositivo diz ter sido concebido.
- **Velocidade** — a velocidade que o seu computador negociou com o dispositivo. Em alguns sistemas, sobretudo no Windows, a velocidade real não está disponível; a aplicação mostra então o máximo que a versão USB do dispositivo permite, assinalado com "até", em vez de fingir que a mediu.
- **Função** — o tipo de dispositivo, como armazenamento, teclado ou rato, câmara, áudio ou hub, a partir dos códigos de classe normalizados que o dispositivo declara. Um dispositivo pode ter mais do que uma.
- **Energia pedida** — a corrente máxima que o dispositivo pede, apresentada em miliamperes e em watts a 5 volts.
- **Fabricante, produto e número de série** — o nome que o próprio dispositivo dá a si mesmo. São obtidos na medida do possível: no Windows ficam muitas vezes em branco para dispositivos que o sistema já assumiu com o seu próprio controlador.
- **Dados** — tudo o que aparece na lista tem as linhas de dados a funcionar, porque um dispositivo só pode aparecer se tiver comunicado com o seu computador.

## O painel de carregamento

Os carregadores nunca aparecem como dispositivos USB, pelo que o carregamento tem o seu próprio painel. No Windows, mostra se está ligado à corrente ou a usar a bateria, o nível e a tensão da bateria e o ritmo a que a energia está a entrar na bateria ou a sair dela. Noutros sistemas, só está disponível a indicação de se o transformador está ligado.

O ritmo de carga é o que está a entrar na bateria, não o que o carregador consegue fornecer. Uma bateria quase cheia recebe apenas um fio de corrente, mesmo de um carregador potente.

## O que não lhe consegue dizer

- A potência que um carregador USB-C negociou. Isso exige um testador de hardware em linha.
- A corrente nominal de um cabo ou o seu chip marcador.
- Nada sobre os ficheiros de uma unidade. A aplicação lê a descrição do dispositivo, não o seu conteúdo.

## Organizar a lista

Os dispositivos que ligar enquanto a aplicação está aberta, e qualquer pen ou disco, aparecem na área principal. Os dispositivos internos e os hubs ficam numa secção recolhida; pode mostrar qualquer um deles, e a aplicação lembra-se disso. Também pode ocultar um dispositivo e restaurá-lo mais tarde.`,
  },
  {
    id: 'testing-a-cable',
    title: "Testar um cabo",
    summary: "Uma verificação passo a passo que prova se um cabo transporta dados.",
    group: "Como funciona",
    body: `Como um computador não consegue ver um cabo diretamente, o teste de cabo funciona observando se um dispositivo aparece através dele.

## Como o executar

1. Abra **Testar um cabo**. A aplicação regista todos os dispositivos ligados nesse momento.
2. Ligue o cabo ao seu computador.
3. Ligue um dispositivo que sabe que funciona, como uma pen, um teclado ou um telemóvel, à outra extremidade do cabo.
4. Aguarde. A aplicação fica atenta a um novo dispositivo durante até 30 segundos.

## Interpretar o resultado

- **Aparece um dispositivo** — o cabo transporta dados além de energia. A aplicação mostra o que encontrou, e pode testar outro.
- **Não aparece nada** — o cabo pode ser só de carregamento. Também é possível que o dispositivo que usou não se apresente como dispositivo de dados, ou precise de alimentação própria. Experimente novamente com outro dispositivo que sabe que funciona antes de culpar o cabo.

## Sugestões

- Use um dispositivo simples no teste. Uma pen ou um teclado com fios é ideal, porque aparece de imediato e não precisa de configuração.
- Alguns telemóveis só aparecem como dispositivo de dados depois de os desbloquear ou de escolher permitir a ligação no ecrã do telemóvel.
- Ligue diretamente ao computador em vez de usar um hub, para que o hub não acabe por ser aquilo que está a testar.
- Um teste bem-sucedido prova que o cabo transporta dados. Não indica a velocidade máxima do cabo nem a corrente nominal que suporta.`,
  },
  {
    id: 'privacy-and-security',
    title: "O que sai do seu computador",
    summary: "Nada sobre os seus dispositivos é enviado, e não existe conta.",
    group: "Privacidade e segurança",
    body: `O Universal USB Detector funciona inteiramente no seu computador. Lê os seus dispositivos USB e o estado da alimentação localmente e mostra-lhos. Nenhuma dessa informação é enviada para lado nenhum.

## Sem conta

Não há nada em que iniciar sessão, e a aplicação não oferece início de sessão.

## O que a aplicação envia

A barra de menu partilhada no topo de todas as aplicações UNI·SIM mostra quantas pessoas usam a aplicação. Para o contar, a aplicação envia um pequeno sinal enquanto está aberta, composto por um número aleatório criado para esta instalação e pelo tipo de dispositivo em que está a ser executada. Não contém nada sobre os seus dispositivos USB, a sua bateria ou os seus ficheiros. O menu também pode carregar a lista de alterações recentes à aplicação.

## O que fica guardado no seu computador

A aplicação lembra-se dos dispositivos que ocultou e dos dispositivos internos que escolheu mostrar, para que a lista fique igual da próxima vez. Isso é guardado pela aplicação neste computador e em mais lado nenhum.

## O que a aplicação faz aos seus dispositivos

Apenas lê. Para saber o nome de um dispositivo, a aplicação abre-o brevemente e pede-lhe o nome, o fabricante e o número de série, e depois fecha-o novamente. Não altera definições dos seus dispositivos, não escreve neles nem olha para os ficheiros de uma unidade.

## Como a aplicação é construída

A parte da aplicação que comunica com o hardware USB está separada da parte que desenha a janela. A janela em si não tem acesso direto ao seu sistema; recebe apenas a lista final de dispositivos. A aplicação é de código aberto, pelo que qualquer pessoa pode verificar exatamente o que faz.`,
  },
]

export default articles
