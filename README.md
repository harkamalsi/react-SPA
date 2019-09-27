# IT2810 - Gruppe 2 - Prosjekt 2 


[Link til prosjektet på ntnu sin server](http://it2810-02.idi.ntnu.no/prosjekt2/ "Prosjekt 2 Gruppe 2 Galleri")


## Dokumentasjon


### Komponentstruktur


                                            App
                            /                |              \                               \
                    Tabdisplay           Maindisplay        Sidebar                         Favorite
                        /                    |              /      \                        /
                    TabChoice          WelcomeMessage     Button   ChoiceSelector           Button
                                             |
                                         AudioPlayer


Galleriets design er basert på malen som ble oppgitt i oppgaveteksten. Klassekomponenten `App` ligger øverset i komponenthierarkiet og styrer logikken for fetching og loading av data, og bestemmer hva som skal vises. `Tabdisplay`, `Maindisplay` og `Sidebar` er barnekomponenter av `App` og mottar propvalues fra denne. `Tabdisplay` er en funksjonell komponent som har i oppgave å opprette `TabChoice` og returnere disse. `TabChoice` er også en funksjonell komponent som returnerer en knapp som lar brukeren velge hvilken kombinasjon som skal vises.

`Maindisplay` er en funksjonell komponent, og dens oppgave er å bruke propsvalues fra `App` og rendere enten `WelcomeMessage`, loading screen eller data. `WelcomeMessage` er også en funksjonell komponent som gir en velkomstmelding til brukeren hvis ingen kategorier er valgt. Når `WelcomeMessage` ikke vises, vil data og `AudioPlayer` renderes. AudioPlayer, som også er en funksjonell komponent, holder styr på lyden som skal spilles. 

`Sidebar` er en funksjonell komponent som holder forms for valg av kategorier. Den renderer `ChoiceSelector` og `Button`. `ChoiceSelector` er en klasse, og returnerer en form som lar bruker velge kategori. `Button` returnerer en knapp, som i `Sidebar` lar brukeren angre og gjenta sine handlinger.

Galleriet består av 4 hovedkomponenter, og logikken for fetching og lagring av data ligger i komponenten `App`.  


- App
    - Klasse
    - States
        - `soundCategory` 
        - `textCategory`
        - `pictureCategory` 
        - `selectedTab` 
        - `combinations` 
        - `saved_resources`
        - `isFavoriteSaved`
- Tabdisplay    
    - Funksjonell
    - Props:
        - `onClick` 
        - `selectedTab`
- Maindisplay
    - Funksjonell
    - Props
        - `selectedTab`
        - `soundCategory`
        - `data`
        - `isWelcomeScreenDisplayed`
- Sidebar
    - Funksjonell
    - Props
        - `handleUndo`
        - `handleRedo`
        - `isUndoEmpty`
        - `isRedoEmpty`
        - `updateTextCategory`
        - `updatePictureCategory`
        - `updateSoundCategory`
        - `getCheckboxCategories`
- Favorite
    - Funksjonell
    - Props
        - `handleFavorite`
        - `getFavorite`
        - `isFavoriteSaved`
        - `showHandleFavorite`
        - 
- TabChoice
    - Funksjonell
    - Props
        - `id`
        - `onClick`
        - `value`
        - `selectedTab` 
- WelcomeMessage
    - Funksjonell
    
- AudioPlayer
    - Funksjonell
    - Props
        - `soundTrack`
        - `soundCategory`

- ChoiceSelector
    - Funksjonell
    - Props
        - `sendCategory`
        - `categoryName`
        - `alternative1`
        - `alternative2`
        - `alternative3`
        - `select`

- Button 
    - Funksjonell
    - Props 
        - `id`
        - `className`
        - `onClick`
        - `handleDisabled`
        - `icon`
        - `text`

### React

Sytemet er bygget på React, og bruker ES6 med både classer og funksjonelle komponenter. Vi brukte npx create-react-app for å komme i gang med prosjektet. Muligheten for å kunne velge kombinasjoner ble løst i `TabDisplay` komponenten, og sammen med logikk i `App` ble data vist i `Maindisplay`. Dersom det er ingen data å vise så vises det bare en velkomstekst.
Ny utstilling har vi valgt å generere dynamisk hver gang en kategori endres, vi mente at denne løsningen vil ikke bryte interaksjons-flyt. Når det gjelder ui-komponenter så valgte vi lage `ChoiceSelector`, `Button` og `Tabchoice`. Med disse ui-komponentene kunne vi gjenbruke kode siden de brukes relativ ofte. 









Løsningen skal baseres på React (og JSX). 
Bruk ES6 (Javascript) og vis bruk av både komponentene med class og funksjonelle komponenter. Implementere en hesiktsmessig komponentstruktur.
Bruk kun de ordinære mekanismene i React for å lagre og endre state/data (du skal mao ikke bruke løsninger som redux, mobx eller andre bibliotek for å håndtere tilstand da dette er tema i neste prosjekt).
UI-komponentene skal implementeres fra bunnen av (uten bruk av andre tredjeparts komponenter).


### Innhold og funksjonalitet
- Hvorfor er det default verdier på kategorier ved førstegangsbesøk?
- Hvorfor ikke submitbutton ved valg av kategorier?
- Hvordan fungerer angreknappene/favoritt?
- Hvordan fetches data? Lagres lokalt? Hentes på nytt hver gang?...



### Responsive Web Design

Vi har lagt mye vekt på responsivt design. Utstilligen skaleres og tilpasses etter bredden på skjermen og dens orientasjon. Hvis bredden på skjermen er under 825px, så flyttes sidebaren med kategorivalgene til under utstillingsvinduet (maindisplay). Her blir retningen til valgmulighetene omgjort fra vertikal retning til horisontal, men kun vis skjermbredden er mellom 377px og 825px. Hvis skjermbredden er under 377px, vil valgmulighetene gå tilbake til å vises i vertikal retning. I tillegg endres labelene på tabdisplayet utifra skjermbredde og orientasjon. Når skjermen blir under 825px bred, vil ordet "Kombinasjon" i lablene bli skjult, og kun tabnummeret vises. 


Utstillingen skal ha responsiv web design hvor layout, skalering og interaksjonsmuligheter tilpasses type enhet og størrelse på skjerm. Det skal se bra ut og interaksjonen skal fungere både på mobil, pad og pc med skjerm av forskjellig størrelse.

Løsningen skal implementeres med responsiv design som tilpasser seg skjermens størrelse og orientering, og plattform.
Skal skifte layout mellom breddeformat (f.eks. bilde og tekst ved siden av hverandre) og høydeformat (bilde med teksten under f.eks.). Bredde vs. høyde kan også demonstreres med andre elementer enn tekst og bilde.
Følgende elementer skal være med i løsningen (eventuelt begrunnet i dokumentasjonen hvis det ikke er tatt med)
Viewport
Media-queries
Bilder som skalerer
Flytende/fleksibel layout
Dette skal implementeres fra bunnen av uten bruk av eksterne CSS-rammeverk ea.


### Testing 
Bruker Jest snapshot og Enzyme for simulere endringer som clicks og form updates. Tester består blant annet med å simulere et click på `tabChoice` og teste at den tilhørende `tabChoice` verdien blir sendt opp til `App`-komponenten og dermed ned til `AudioPlayer` som vil endre lydfil. Dette gjøres ved å teste stateverdien `selectedTab` i `App`, og at `src` for HTML-elementet `audio`har blitt oppdatert til den tilhørende filen. 

Testing av brukergrensesnittet og responsive web design er gjort manuelt. Gruppen brukte hver sine enheter for å teste designet. Det ble testet på pc og mobil med både vertikal og horisontal orientering av skjermen. På denne måten avdekket vi ulike bugs og fikset dem fort løpende. Prosjektet ble testet på følgende nettlesere på pc: Google Chrome, Mozilla FireFox, Safari og Microsoft Edge. Løsningen fungere på alle de fire. 



### AJAX


Bildene (i svg) og teksten (i json) skal lastes dynamisk med AJAX (Asynchronous JavaScript And XML). Bruk fetch() eller velg tredjeparts javascript-bibliotek for dette. 
Filene skal lastes kun hvis de benyttes. Dvs. at filer brukt i en kombinasjon først lastes når denne kombinasjonen vises (eksempelvis når en bruker velger denne tabben). Når filen først er lest, så skal innholdet lagres på klienten slik at de ikke blir å lastes flere ganger hvis en bruker blar frem og tilbake i en utstilling. Dette kan dere implementere selv eller dere kan basere dere på caching i webleseren, men da må dere undersøke og dokumentere at det fungerer etter intensjonen.
Lyd håndterer du med audio-taggen fra HTML5 og da trenger du ikke implementere noe spesifikt for å laste data

### HTML Web Storage

I prosjektet benyttes localstorage for å kunne lagre og hente en favoritt kombinasjon. Localstorage lar oss hente og vise data selv etter nettleser er avsluttet og startet på nytt.  Sessionstorage er brukt for å kunne implementere angre-gjenta funksjonaliteten for en bestemt «session». 

Det er ingen slett-favoritt knapp, dersom en velger å lagre en ny favoritt kombinasjon vil den forrige overskrives. Gruppen valgte å implementere disable-knapp funksjonalitet. Det er ikke mulig å hente en favoritt kombinasjon dersom det finnes ingen favoritt kombinasjon, og det er heller ikke mulig å sette en dersom en bruker ikke har en kombinasjon som vises på skjermen. En tilsvarende disable-knapp logikk for angre-gjenta funksjonalitet er også implementert.   



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

### Inspirasjon og kilder
Tabdisplay er inspirert fra itdagene.no. SVG er hentet fra https://publicdomainvectors.org/, og musikk er hentet fra https://freesound.org/. 