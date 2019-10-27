# IT2810 - Gruppe 2 - Prosjekt 2 


[Link til prosjektet på ntnu sin server](https://harkamalsi.github.io/react-SPA/)

## Forhåndskrav
For å kjøre prosjektet lokalt, trengs Node.js og NPM. NPM følger med når en laster ned Node.js: https://nodejs.org/en/download/

## Installering
1.  Først må prosjektet klones. Tast følgende i terminalen for å klone prosjektet: `git clone https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-2/project-2.git` 
2.  Gå deretter inn i den klonede mappen ved å skrive følgende i terminalen: `cd project-2`
3.  Skriv `npm start` i terminalen for å starte prosjektet



## Dokumentasjon


### Komponentstruktur


                                            App
                            /                |              \                          \
                    Tabdisplay           Maindisplay        Sidebar                    Favorite
                        /                    |              /      \                      \
                    TabChoice          WelcomeMessage     Button   ChoiceSelector         Button
                                             |
                                         AudioPlayer


Gallerietsdesign er basert på malen som ble oppgitt i oppgaveteksten. Klassekomponenten `App` ligger øverset i komponenthierarkiet, og styrer logikken for fetching og loading av data, og bestemmer hva som skal vises. `Tabdisplay`, `Maindisplay`, `Sidebar` og `Favorite` er barnekomponenter av `App`, og mottar propvalues fra denne. `Tabdisplay` er en funksjonell komponent som har i oppgave å opprette `TabChoice` og returnere disse. `TabChoice` er også en funksjonell komponent som returnerer en knapp som lar brukeren velge hvilken kombinasjon som skal vises.

`Maindisplay` er en funksjonell komponent, og dens oppgave er å bruke propvalues fra `App` og rendre enten `WelcomeMessage`, loading screen eller data. `WelcomeMessage` er også en funksjonell komponent som gir en velkomst melding til brukeren hvis ingen kombinasjon er valgt. Når `WelcomeMessage` ikke vises, vil data og `AudioPlayer` renderes. AudioPlayer, som også er en funksjonell komponent, holder styr på lyden som skal spilles. 

`Sidebar` er en funksjonell komponent som holder forms for valg av kategorier. Den renderer `ChoiceSelector` og `Button`. `ChoiceSelector` er en klasse, og returnerer en form som lar bruker velge kategori. `Button` returnerer en knapp, som i `Sidebar` lar brukeren angre og gjenta sine handlinger. I `Favorite` rendres to `Button` som sørger for hente og lagring av favoritt kombinasjoner.

Galleriet består altså av 4 hovedkomponenter, og logikken for fetching og lagring av data ligger i komponenten `App`.  


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

Sytemet er bygget på React, og bruker ES6 med både klasser og funksjonelle komponenter. Vi brukte npx create-react-app for å komme i gang med prosjektet. 


### Innhold og funksjonalitet

Muligheten for å kunne velge kombinasjoner ble løst i `TabDisplay` komponenten, og sammen med logikk i `App` blir data vist i `Maindisplay`.
Ny utstilling har vi valgt å generere dynamisk hver gang en kategori endres. Når det gjelder ui-komponenter så valgte vi lage `ChoiceSelector`, `Button` og `Tabchoice`. Med disse ui-komponentene kunne vi gjenbruke kode siden de brukes relativt ofte. 
Lagring og henting av favoritt kombinasjoner, og angre-gjenta-funksjonalitet ble implementert ved hjelp av HTML Web Storage. For mer informasjon se [HTML Web Storage](#HTML-Web-Storage) lenger nede.





### Responsive Web Design

Vi har utviklet utstillingen med tanke på «responsive web design». Utstillingen skaleres og tilpasses etter bredden på skjermen og dens orientasjon. For å oppnå dette har vi brukt viewport, media-queries, CSS Grid, Flexbox, relative størrelsesenheter, og vi har ikke brukt eksterne rammeverk. Hvis bredden på skjermen er under 825px, så flyttes sidebaren med kategorivalgene til under utstillingsvinduet (maindisplay). Her blir retningen til valgmulighetene omgjort fra vertikal retning til horisontal. I tillegg vil teksten i tabdisplay bli omgjort fra «Kombinasjon 1» «Kombinasjon 2» etc. til å kun vise tabnummer, altså «1», «2» etc. for å spare plass. Når skjermbildet blir under 696px og enheten er i portrettmodus, blir kategorivalgene omgjort til vertikale igjen, fremdeles plassert under utstillingsvinduet. Men hvis den er i landskapsmodus, forblir kategorivalgene horisontale, helt til skjermens bredde blir mindre enn dens høyde. I tillegg skaleres bildene og teksten ut ifra bredden og høyden på skjermen. 


### Testing 

Det har blitt utført testing under hele utviklingsprosessen. Vi har benyttet oss av Jest sin snapshottesting, og Enzyme for å simulere brukerinteraksjoner med appen. Med Enzyme har vi for eksempel testet at komponenter oppfører seg riktig ved et klikk på `tabChoice`. Da skal den tilhørende `tabChoice`-verdien blir sendt opp til `App`-komponenten og dermed ned til `AudioPlayer`, som vil endre lydfil. Testen sjekker stateverdien `selectedTab` i App, og at `src` for HTML-elementet audio har blitt oppdatert til den tilhørende filen, ved klikk. Snapshottestingen har gått ut på å ta en snapshot av alle komponentene, og deretter sørge for at snapshotene matcher underveis i utviklingen.

Testing av brukergrensesnittet og dens responsivitet er gjort manuelt. Vi har testet på ulike enheter, som iPad, iPhone 6S, Huawei Mate 10 Pro og laptop. På denne måten avdekket vi ulike bugs og fikset dem fort løpende, og sørget for at designet ser bra ut og at interaksjonen fungerer slik den skal, i både landskap- og portrettmodus. Prosjektet ble testet på følgende nettlesere på pc: Google Chrome, Mozilla FireFox, Safari og Microsoft Edge. Løsningen fungerer på alle de fire. 



### AJAX

For fetching av data ble det integrerte fetch() API-et i Javascript benyttet. Dette skjer asynkronisk i parallell med utføring av resten av koden i React, som er veldig nyttig, fordi den ikke stopper utførelsen av appen. Men dette gjorde det vanskeligere å bestemme når appen skulle rendres. Løsningen ble å implementere 2 funksjoner, fetchText() og fetchPicture(), som vil kalle en felles funksjon, updateFetchedData(). Den siste skal sjekke at begge fetch-funksjonene er ferdige før app-state oppdateres. Dette begrenset unødvendig re-rendering, og hindret ugyldig tilstander, som for eksempel at ` Maindisplay ` har ny tekst, men ikke nytt bilde. For å unngå unødvendig fetch, blir forrige fetched data sammenlignet med nåværende app state, og i tillegg sjekket om det finnes data i saved_resources. Ved å gjøre det slik unngår vi blant annet å ikke laste inn filer på nytt dersom de samme kombinasjonene velges på nytt. 


### HTML Web Storage

I prosjektet benyttes localstorage for å kunne lagre og hente en favorittkombinasjon. Localstorage lar oss hente og vise data, selv etter nettleser er avsluttet og startet på nytt. Sessionstorage er brukt for å kunne implementere angre-gjenta-funksjonaliteten for en bestemt «session». 

Det er ingen slett-favoritt knapp. Dersom en velger å lagre en ny favorittkombinasjon, vil den forrige overskrives. Gruppen valgte å implementere disable-knapp-funksjonalitet. Det er ikke mulig å hente en favorittkombinasjon dersom det ikke finnes en favorittkombinasjon, og det er heller ikke mulig å sette en favorittkombinasjon dersom en bruker ikke har en kombinasjon som vises på skjermen. En tilsvarende disable-knapp logikk for angre-gjenta-funksjonaliteten er også implementert.

### Server

Websiden kjøres på en Apache Web server. Vi lagde en production build med `npm run build`, og lastet den opp til serveren sammen med SVG- og tekstfiler. 

### Inspirasjon og kilder
Tabdisplay design er inspirert fra itdagene.no. SVG-filene er hentet fra https://publicdomainvectors.org/, og lydfilene er hentet fra https://freesound.org/. 




## Git-konvensjoner 

### Branches

*  master: oppdateres kun ved deployment 

*  dev: utviklings-branch. Denne oppdateres jevnlig, hver gang en feature er ferdig

*  feat/feature-name: en branch som brukes for å lage forbedret funksjonalitet av en feature

*  design/area-name: en branch som brukes for kode som omhandler design for en feature

  

