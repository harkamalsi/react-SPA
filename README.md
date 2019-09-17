
# Documentasjon for prosjekt 2

## Gruppe 2

## Krav

### React


Løsningen skal baseres på React (og JSX). 
Bruk ES6 (Javascript) og vis bruk av både komponentene med class og funksjonelle komponenter. Implementere en hesiktsmessig komponentstruktur.
Bruk kun de ordinære mekanismene i React for å lagre og endre state/data (du skal mao ikke bruke løsninger som redux, mobx eller andre bibliotek for å håndtere tilstand da dette er tema i neste prosjekt).
UI-komponentene skal implementeres fra bunnen av (uten bruk av andre tredjeparts komponenter).

### AJAX
Bildene (i svg) og teksten (i json) skal lastes dynamisk med AJAX (Asynchronous JavaScript And XML). Bruk fetch() eller velg tredjeparts javascript-bibliotek for dette. 
Filene skal lastes kun hvis de benyttes. Dvs. at filer brukt i en kombinasjon først lastes når denne kombinasjonen vises (eksempelvis når en bruker velger denne tabben). Når filen først er lest, så skal innholdet lagres på klienten slik at de ikke blir å lastes flere ganger hvis en bruker blar frem og tilbake i en utstilling. Dette kan dere implementere selv eller dere kan basere dere på caching i webleseren, men da må dere undersøke og dokumentere at det fungerer etter intensjonen.
Lyd håndterer du med audio-taggen fra HTML5 og da trenger du ikke implementere noe spesifikt for å laste data

### HTML Web Storage

I applikasjonen skal dere prøve ut og vise bruk av HTML Web Storage - både localstorage og sessionstorage. Eksempelvis kan dere:

Ha knapper som lar brukeren lagre og hente frem favoritt-kombinasjonen, også selv om webleser er avsluttet og startet på nytt (bruk localstorage).
Lagre sekvensen av kombinasjoner som er valg i en sesjon og la brukeren gå frem og tilbake i historien (sessionstorage)

### Responsive Web Design
Utstillingen skal ha responsiv web design hvor layout, skalering og interaksjonsmuligheter tilpasses type enhet og størrelse på skjerm. Det skal se bra ut og interaksjonen skal fungere både på mobil, pad og pc med skjerm av forskjellig størrelse.

Løsningen skal implementeres med responsiv design som tilpasser seg skjermens størrelse og orientering, og plattform.
Skal skifte layout mellom breddeformat (f.eks. bilde og tekst ved siden av hverandre) og høydeformat (bilde med teksten under f.eks.). Bredde vs. høyde kan også demonstreres med andre elementer enn tekst og bilde.
Følgende elementer skal være med i løsningen (eventuelt begrunnet i dokumentasjonen hvis det ikke er tatt med)
Viewport
Media-queries
Bilder som skalerer
Flytende/fleksibel layout
Dette skal implementeres fra bunnen av uten bruk av eksterne CSS-rammeverk ea.

### Node.js og NPM
PRosjektet baseres på Node og bruk av Node Package Manager (NPM)
Installer Node.js (inkluderer npm node package manager) på egen maskin
Bruk pakken create-react-app for å komme i gang (bruk kommandoen "npx create-react-app mittprosjektnav

### Testing
Prosjektet skal vise oppsett av og eksempel på testing med Jest - minimum er å ha en snapshottest. Målet med dette kravet er at dere kommer i gang med testing, får erfaring i oppsett og en forståelse av hva vi typisk tester i React-applikasjoner. Vi legger lite vekt på omfanget av testingen.
Testing av brukergrensesnitt og responsiv design: Gruppa skal beskrive/dokumentere testing på minimum 3 forskjellige enheter hvor det må inngå en mobil (liten skjerm/horisontal + vertikal orientering og en ordinær pc (stor skjerm). 

### Installere

Websiden skal installeres og gjøres tilgjengelig en virtuelle maskin som gruppa får tildelt tildelt. Prosjektet gjøres tilgjenglig som xxxx.idi.ntnu.no/prosjekt2
Installer Apache web server hvis det ikke finnes på maskinen fra før. Lag en production build som legges under Apache serveren som lytter på port 80. 


### BRUK AV GIT, KODING

Koden i prosjektet skal være ryddig strukturert, ha fornuftig kommentering og ha navngiving av komponenter, variabler og funksjoner i tråd med anbefalinger (best practise).
Gruppa skal bruke git i utviklingen. Utviklingen skal dekomponeres i task som hver beskrives kort med en issue. Commits markeres med hvilken issue de bidrar til/løser. Vi bruker gitlab og fagstaben setter opp repositories for gruppene. 



### Dokumentasjon
Prosjektet dokumenteres med en README.md i git repositoriet.
Dokumentasjonen skal diskutere, forklare og vise til alle de viktigste valgene og løsningene på krav til funksjonaltet og krav til teknologi. 800-1000 ord er en fornuftig lengde. 
Gruppa skal oppsummere den enkeltes bidrag i prosjektet i en egen fil. Noter totalt antall timer og hva den enkelte har hatt som hovedbidrag. Denne leveres i BB (dette er personopplysninger som ingen vil at skal ligge på git ;-)