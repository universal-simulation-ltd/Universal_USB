import type { Article } from './types'

const articles: Article[] = [
  {
    id: 'usb-versions-and-speeds',
    title: "Les versions et vitesses USB, expliquées",
    summary: "Pourquoi deux clés USB identiques en apparence peuvent fonctionner à des vitesses très différentes.",
    group: "Les bases",
    body: `L'USB existe depuis les années 1990, et chaque nouvelle version a relevé la vitesse maximale tout en conservant la compatibilité avec les anciens appareils. Cette rétrocompatibilité est pratique, mais elle signifie aussi que la forme d'une prise en dit très peu sur la rapidité d'une connexion.

## Les niveaux de vitesse

Chaque version de l'USB a ajouté un nouveau niveau de vitesse :

- **Low Speed** — 1,5 Mbit/s, pour les appareils simples comme les claviers et les souris.
- **Full Speed** — 12 Mbit/s, depuis l'USB 1.1.
- **High Speed** — 480 Mbit/s, depuis l'USB 2.0.
- **SuperSpeed** — 5 Gbit/s, depuis l'USB 3.0.
- **SuperSpeed+** — 10 Gbit/s, et 20 Gbit/s sur certaines connexions USB 3.2.

Les normes plus récentes comme l'USB4 vont encore plus vite.

## La version n'est pas la vitesse

Un appareil indique la version de l'USB pour laquelle il a été conçu. La vitesse à laquelle il fonctionne réellement est négociée au moment du branchement, et elle ne peut pas dépasser celle du maillon le plus lent de la chaîne : l'appareil, le câble, un éventuel concentrateur et le port de votre ordinateur. Une clé USB 3 branchée sur un port USB 2, ou via un câble USB 2, fonctionne à la vitesse de l'USB 2.

C'est pourquoi Universal USB Detector affiche les deux : la version déclarée par l'appareil et la vitesse qu'il a négociée avec votre ordinateur.

## La forme de la prise n'est pas la vitesse

USB-A, USB-B, micro-USB et USB-C sont des formes de connecteur. Un câble USB-C peut aller du simple cordon de charge lent au câble de données très rapide, et de nombreux appareils USB-C ne communiquent qu'aux vitesses de l'USB 2. La seule façon de savoir ce que vous obtenez est de regarder ce que la connexion indique réellement.

## Des mégabits, pas des mégaoctets

Les vitesses sont exprimées en bits par seconde. Un octet compte huit bits, et une partie de la liaison est utilisée par le protocole lui-même, si bien que les copies de fichiers réelles sont toujours plus lentes que le chiffre annoncé ne le laisse croire.`,
  },
  {
    id: 'usb-power-explained',
    title: "Comment fonctionne l'alimentation USB",
    summary: "Ce qu'un appareil demande, ce qu'un port fournit, et la place de l'USB-C Power Delivery.",
    group: "Les bases",
    body: `Chaque port USB fournit de l'alimentation en plus des données. L'alimentation de base est de 5 volts, et chaque appareil indique à l'ordinateur le courant dont il a besoin.

## Ce qu'un appareil demande

Lorsqu'un appareil est branché, il se décrit à l'ordinateur, notamment en indiquant le courant maximal qu'il prévoit de consommer. Un port USB 2 standard est conçu pour fournir jusqu'à 500 mA et un port USB 3 jusqu'à 900 mA ; un appareil qui demande plus que ce que son port propose peut donc mal fonctionner, ou avoir besoin de sa propre alimentation ou d'un concentrateur alimenté.

La valeur donnée par un appareil est une demande et un plafond, pas une mesure en temps réel. Une souris qui demande 100 mA peut consommer bien moins la plupart du temps.

## Watts, volts et ampères

La puissance en watts est égale aux volts multipliés par les ampères. À 5 volts, 500 mA correspondent à 2,5 W et 900 mA à 4,5 W. Universal USB Detector convertit la demande de chaque appareil en watts à 5 volts pour que les chiffres soient plus faciles à comparer.

## USB-C Power Delivery

La charge rapide en USB-C fonctionne différemment. Avec l'USB Power Delivery, le chargeur et l'appareil négocient entre eux une tension et un courant plus élevés, jusqu'à 240 W avec la dernière version de la norme. Cette négociation a lieu dans des puces dédiées à chaque extrémité du câble, et non dans l'échange USB habituel que les logiciels de l'ordinateur peuvent voir.

C'est pourquoi aucune application ordinaire ne peut vous dire quelle puissance un chargeur USB-C a convenue avec votre ordinateur portable. Pour la mesurer, il vous faut un petit testeur matériel qui se place entre le chargeur et l'appareil.

## Les chargeurs ne sont pas des appareils USB

Un chargeur fournit de l'alimentation mais ne s'identifie pas comme un appareil sur la connexion USB ; il n'apparaît donc jamais dans la liste des appareils. Universal USB Detector affiche plutôt la charge dans un panneau distinct, à partir de ce que votre système d'exploitation indique sur l'alimentation et la batterie.`,
  },
  {
    id: 'charge-only-cables',
    title: "Pourquoi certains câbles ne font que charger",
    summary: "Comment un câble peut sembler parfait et ne transmettre aucune donnée.",
    group: "Les bases",
    body: `Un câble USB contient des fils distincts pour l'alimentation et pour les données. Certains câbles moins chers, souvent ceux fournis avec de petits gadgets, ne comportent que les fils d'alimentation. Ils chargent parfaitement un téléphone, mais un ordinateur ne verra jamais rien de ce qui est branché par leur intermédiaire.

Les deux types se ressemblent généralement trait pour trait, et ils sont rarement étiquetés. C'est ce qui fait d'un câble de charge seule l'une des causes les plus courantes d'un appareil « non reconnu ».

## Pourquoi un logiciel ne peut pas simplement vérifier un câble

Un ordinateur ne voit jamais que des appareils, jamais des câbles. Un câble seul n'a rien à signaler, si bien qu'aucune application ne peut examiner un câble et lire ses capacités. Certains câbles USB-C contiennent une petite puce de marquage qui décrit leur intensité nominale et leur vitesse, mais sa lecture nécessite un testeur matériel.

## Le test pratique

La méthode fiable consiste à essayer : branchez par ce câble un appareil dont vous savez qu'il fonctionne et voyez si l'ordinateur le détecte. Si l'appareil apparaît, le câble transmet les données en plus de l'alimentation. Universal USB Detector propose une version guidée de ce test ; consultez l'article sur le test d'un câble.

## Les signes d'un câble de charge seule

- L'appareil se charge, mais l'ordinateur ne réagit pas quand vous le branchez.
- Le même appareil est reconnu immédiatement avec un autre câble.
- Le câble était fourni avec un produit qui n'avait besoin que d'être chargé, comme une lampe, un ventilateur ou des écouteurs sans fil.

Lorsque vous en trouvez un, il vaut la peine de l'étiqueter pour qu'il ne vous piège plus.`,
  },
  {
    id: 'what-the-app-reads',
    title: "Ce que l'application lit, et comment",
    summary: "D'où vient chaque valeur, et les limites de ce qu'un logiciel peut voir.",
    group: "Fonctionnement",
    body: `Universal USB Detector est une application de bureau pour Windows et macOS. Lorsqu'un appareil USB est branché, il se décrit à votre ordinateur dans un format standard. L'application lit cette description, la traduit en langage clair et met à jour la liste dès qu'un élément est branché ou retiré.

## Ce que signifie chaque valeur

- **Version USB** — la version pour laquelle l'appareil déclare avoir été conçu.
- **Vitesse** — la vitesse que votre ordinateur a négociée avec l'appareil. Sur certains systèmes, en particulier Windows, la vitesse réelle n'est pas disponible ; l'application affiche alors le maximum permis par la version USB de l'appareil, précédé de « jusqu'à », plutôt que de prétendre l'avoir mesurée.
- **Rôle** — le type d'appareil, par exemple stockage, clavier ou souris, caméra, audio ou concentrateur, d'après les codes de classe standard que l'appareil déclare. Un appareil peut en avoir plusieurs.
- **Puissance demandée** — le courant maximal que l'appareil demande, affiché en milliampères et en watts à 5 volts.
- **Fabricant, produit et numéro de série** — le nom que l'appareil se donne lui-même. Ces informations sont fournies au mieux : sous Windows, elles sont souvent vides pour les appareils que le système a déjà pris en charge avec son propre pilote.
- **Données** — tout ce qui apparaît dans la liste dispose de lignes de données fonctionnelles, car un appareil ne peut apparaître que s'il a communiqué avec votre ordinateur.

## Le panneau de charge

Les chargeurs n'apparaissent jamais comme des appareils USB ; la charge a donc son propre panneau. Sous Windows, il indique si vous êtes sur secteur ou sur batterie, le niveau et la tension de la batterie, ainsi que le débit auquel l'énergie entre dans la batterie ou en sort. Sur les autres systèmes, seule l'information indiquant si l'adaptateur secteur est branché est disponible.

Le débit de charge correspond à ce qui entre dans la batterie, et non à ce que le chargeur peut fournir. Une batterie presque pleine n'accepte qu'un filet de courant, même avec un chargeur puissant.

## Ce qu'elle ne peut pas vous dire

- La puissance qu'un chargeur USB-C a négociée. Il faut pour cela un testeur matériel placé en ligne.
- L'intensité nominale d'un câble ou sa puce de marquage.
- Quoi que ce soit sur les fichiers d'un disque. L'application lit la description de l'appareil, pas son contenu.

## Organiser la liste

Les appareils que vous branchez pendant que l'application est ouverte, ainsi que toute clé USB ou tout disque, apparaissent dans la zone principale. Les appareils intégrés et les concentrateurs se trouvent dans une section repliée ; vous pouvez afficher n'importe lequel d'entre eux, et l'application s'en souvient. Vous pouvez aussi masquer un appareil et le rétablir plus tard.`,
  },
  {
    id: 'testing-a-cable',
    title: "Tester un câble",
    summary: "Une vérification pas à pas qui prouve si un câble transmet des données.",
    group: "Fonctionnement",
    body: `Comme un ordinateur ne peut pas voir un câble directement, le test de câble consiste à guetter l'apparition d'un appareil branché par son intermédiaire.

## Comment le lancer

1. Ouvrez **Tester un câble**. L'application relève tous les appareils connectés à ce moment-là.
2. Branchez le câble sur votre ordinateur.
3. Branchez à l'autre extrémité du câble un appareil dont vous savez qu'il fonctionne, comme une clé USB, un clavier ou un téléphone.
4. Patientez. L'application guette un nouvel appareil pendant 30 secondes au maximum.

## Lire le résultat

- **Un appareil apparaît** — le câble transmet les données en plus de l'alimentation. L'application affiche ce qu'elle a trouvé, et vous pouvez en tester un autre.
- **Rien n'apparaît** — le câble ne fait peut-être que charger. Il est aussi possible que l'appareil utilisé ne se présente pas comme un appareil de données, ou qu'il ait besoin de sa propre alimentation. Réessayez avec un autre appareil dont vous savez qu'il fonctionne avant d'incriminer le câble.

## Conseils

- Utilisez un appareil simple pour le test. Une clé USB ou un clavier filaire est idéal, car il apparaît immédiatement et ne demande aucune configuration.
- Certains téléphones n'apparaissent comme appareil de données qu'une fois déverrouillés, ou après avoir autorisé la connexion sur leur écran.
- Branchez directement sur l'ordinateur plutôt que via un concentrateur, afin de ne pas finir par tester le concentrateur.
- Un test réussi prouve que le câble transmet des données. Il ne vous indique ni la vitesse maximale du câble ni l'intensité pour laquelle il est prévu.`,
  },
  {
    id: 'privacy-and-security',
    title: "Ce qui quitte votre ordinateur",
    summary: "Rien sur vos appareils n'est envoyé, et il n'y a pas de compte.",
    group: "Confidentialité et sécurité",
    body: `Universal USB Detector fonctionne entièrement sur votre ordinateur. Il lit vos appareils USB et l'état de votre alimentation en local et vous les affiche. Aucune de ces informations n'est envoyée où que ce soit.

## Pas de compte

Il n'y a rien à quoi se connecter, et l'application ne propose pas de connexion.

## Ce que l'application envoie

La barre de menu commune en haut de chaque application UNI·SIM indique combien de personnes utilisent l'application. Pour vous compter, l'application envoie un petit signal pendant qu'elle est ouverte, composé d'un nombre aléatoire créé pour cette installation et du type d'appareil sur lequel elle fonctionne. Il ne contient rien sur vos appareils USB, votre batterie ou vos fichiers. Le menu peut aussi charger la liste des modifications récentes de l'application.

## Ce qui est conservé sur votre ordinateur

L'application mémorise les appareils que vous avez masqués et les appareils intégrés que vous avez choisi d'afficher, pour que la liste soit identique la fois suivante. Ces informations sont enregistrées par l'application sur cet ordinateur et nulle part ailleurs.

## Ce que l'application fait à vos appareils

Elle se contente de lire. Pour connaître le nom d'un appareil, l'application l'ouvre brièvement, lui demande son nom, son fabricant et son numéro de série, puis le referme. Elle ne modifie pas les réglages de vos appareils, n'y écrit rien et ne regarde pas les fichiers d'un disque.

## Comment l'application est conçue

La partie de l'application qui communique avec le matériel USB est séparée de celle qui dessine la fenêtre. La fenêtre elle-même n'a aucun accès direct à votre système ; elle reçoit seulement la liste finale des appareils. L'application est open source, si bien que chacun peut vérifier exactement ce qu'elle fait.`,
  },
]

export default articles
