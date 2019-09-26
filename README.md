
# IT2810 - Gruppe 2 - Prosjekt 2 


[Link til prosjektet på ntnu sin server](http://it2810-02.idi.ntnu.no/prosjekt2/ "Prosjekt 2 Gruppe 2 Galleri")


## Dokumentasjon

### React

Sytemet er bygget på React, og bruker ES6 med både classer og funksjonelle komponenter. 
Komponentstruktur:








Løsningen skal baseres på React (og JSX). 
Bruk ES6 (Javascript) og vis bruk av både komponentene med class og funksjonelle komponenter. Implementere en hesiktsmessig komponentstruktur.
Bruk kun de ordinære mekanismene i React for å lagre og endre state/data (du skal mao ikke bruke løsninger som redux, mobx eller andre bibliotek for å håndtere tilstand da dette er tema i neste prosjekt).
UI-komponentene skal implementeres fra bunnen av (uten bruk av andre tredjeparts komponenter).


### Innhold og funksjonalitet
- Hvorfor er det default verdier på kategorier ved førstegangsbesøk?
- Hvorfor ikke submitbutton ved valg av kategorier?
- Hvordan fungerer angreknappene/favoritt?
- Hvordan fetches data? Lagres lokalt? Hentes på nytt hver gang?...


### Komponentstruktur


                                            App
                            /                |              \
                    Tabdisplay           Maindisplay        Sidebar
                        /                    |              /      \
                    TabChoice          WelcomeMessage     Button   ChoiceSelector
                                             |
                                         AudioPlayer


Galleriets design er basert på malen som ble oppgitt i oppgaveteksten. Klassekomponenten `App` ligger øverset i komponenthierarkiet og styrer logikken for fetching og loading av data, og bestemmer hva som skal vises. `Tabdisplay`, `Maindisplay` og `Sidebar` er  barnekomponenter av `App` og mottar propvalues fra denne. `Tabdisplay` er en funksjonell komponent som har i oppgave å opprette `TabChoice` og returnere disse. `TabChoice` er også en funksjonel lkomponent som returnerer en knapp som lar brukeren velge hvilken kombinasjon som skal vises. `Maindisplay` er en funksjonell komponent, og dens oppgave er å holde kunsten, som gjøres ved å rendere `WelcomeMessage`. `WelcomeMessage` er også en funksjonell komponent som gir en velkomstmelding til brukeren hvis ingen kategorier er valgt. `WelcomeMessage`renderer også `AudioPlayer`, som er en funksjonell komponent som holder styr på lyden som skal spilles. 
`Sidebar` er en funksjonel lkomponent som holder forms for valg av kategorier. Den renderer/oppretter `ChoiceSelector` og `Button`. `ChoiceSelector` er en klasse, og returnerer en form som lar bruker velge kategori.`Button` returnerer en knapp, som i `sidebar` lar brukeren angre og gjenta. 

Galleriet består av 3 hovedkomponenter, mens logikken for fetching og loading av data ligger i komponenten App.  


- App
    - Klasse
    - States
        - `soundCategory` 
        - `soundFilePath` 
        - `textCategory`
        - `textFilePath` 
        - `pictureCategory` 
        - `pictureFilePath` 
        - `selectedTab` 
        - `combinations` 
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
        - `handleFavorite`
        - `getFavorites`
        - `deleteFavorite`
        - `isWelcomeScreenDisplayed`
- Sidebar
    - Funksjonell
    - Props
        - `onChange`
        - `onChange`
        - `handleUndo`
        - `handleRedo`
        - `isUndoEmpty`
        - `isRedoEmpty`
        - `updateTextCategory`
        - `updatePictureCategory`
        - `updateSoundCategory`
        - `getCheckboxCategories`
- TabChoice
    - Funksjonell
    - Props
        - `id`
        - `onClick`
        - `value`
        - `selectedTab` 
- WelcomeMessage
    - Funksjonell
    - Props
        - `selectedTab`
        - `soundCategory`
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
        - `onClick`
        - `handleDisabled`
        - `icon`
        - `text`


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
Bruker Jest snapshot og Enzyme for simulere endringer som clicks og formupdates. Tester består blant annet av å simulere et click på `tabChoice` og teste at den tilhørende `tabChoice` verdien blir sendt opp til `App`-komponenten og dermed ned til `AudioPlayer` som vil endre lydfil. Dette gjøres ved å teste stateverdien `selectedTab` i `App`, og at `src` for HTML-elementet `audio`har blitt oppdatert til den tilhørende filen. 



### AJAX


Bildene (i svg) og teksten (i json) skal lastes dynamisk med AJAX (Asynchronous JavaScript And XML). Bruk fetch() eller velg tredjeparts javascript-bibliotek for dette. 
Filene skal lastes kun hvis de benyttes. Dvs. at filer brukt i en kombinasjon først lastes når denne kombinasjonen vises (eksempelvis når en bruker velger denne tabben). Når filen først er lest, så skal innholdet lagres på klienten slik at de ikke blir å lastes flere ganger hvis en bruker blar frem og tilbake i en utstilling. Dette kan dere implementere selv eller dere kan basere dere på caching i webleseren, men da må dere undersøke og dokumentere at det fungerer etter intensjonen.
Lyd håndterer du med audio-taggen fra HTML5 og da trenger du ikke implementere noe spesifikt for å laste data

### HTML Web Storage

Local Web Storage brukes til "angre" og "gjenta"....
Sessions Web Stroage brukes til lagre og hente faavorittkombinasjoner...   


I applikasjonen skal dere prøve ut og vise bruk av HTML Web Storage - både localstorage og sessionstorage. Eksempelvis kan dere:
Ha knapper som lar brukeren lagre og hente frem favoritt-kombinasjonen, også selv om webleser er avsluttet og startet på nytt (bruk localstorage).
Lagre sekvensen av kombinasjoner som er valg i en sesjon og la brukeren gå frem og tilbake i historien (sessionstorage)


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