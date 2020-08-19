# RecruitmentTool (Master Thesis by Raik Mueller) 
## Semiautomatische Rekrutierung von Studienpatienten unter Nutzung von ELGA-Daten: Konzeptionierung und prototypische Implementierung eines IT-Tools

## Grober Zeitplan

#### 30.09.2020 Fertigstellung Prototypen V.1 (Konzepte/Mockups wurden grundsätzlich umgesetzt)
#### 1.10.2020 - 7.10.2020: Testing mit echten Daten, Evaluierung und Fehlverhalten finden und ausbessern (→ V.2)
#### 01.11.2020 Masterarbeit V.1
#### 01.12.2020 Abgabe der Masterarbeit und Prototyp V.2


---


#### [🎯 Kanban Board Backend Software](https://github.com/raikm/RecruitmentTool/projects/2)

#### [Backend Repository (Private)](https://github.com/raikm/RecruitmentTool_Backend)

#### [🎯 Kanban Board Frontend Software](https://github.com/raikm/RecruitmentTool/projects/3)

# 🏗Timeline Progress

## 01.08.2020 - 31.08.2020: 6. Monat

<details><summary>Ausblick</summary>
<p>
<ul>
  <li>2. Mini Evaluierung abgeschlossen</li>
  <li>Alle xPaths für Studie A und B sind für den ersten Versuch vorbereitet</li>
</ul>
<ul>
  <li>Umsetzung der Auswertung noch Mockups V.2</li>
  <li>eHealth Connector Integration</li>
  <li>Testing XDS Repository</li>
  <li>CDA2PDF Integration</li>
</ul>
</p>
</details>


## 01.07.2020 - 31.07.2020: 5. Monat

- Auswertung von Experterninterviews --> Ergänzung der Mockups
- Experteninterviews abgeschllossen
- Mini Evaluierung vorbereitet (Feedback von Ärzten über neue Mockups einholen)
- Fertigstellung Mockups V.2
- WIP xPaths für Kl. Studien

### Software
- Weiterentwicklung an Auswertungssformular
- Recherche für CDA2PDF Integration

#### NEW
- XDS Repository auf MedUni Server

#### IMPROVE / CHANGE
- Beginn mit eHealth Connector
- JSON Antwort


## 01.06.2020 - 30.06.2020: 4. Monat

- Auswertung von Experterninterviews
- Zusammenfassung der möglichen Studien
- Mockups nach Auswertung angepasst
- neue Aufbau der Baumstruktur von Kl. Studien (technischer Aufbau):
![](external_resources/images_readme/Baumstruktur.png)


### Software
- Testumgebung in MedUni Wien eingerichtet
#### NEW
- Dashboard über aktuelle Studien
- Unterscheidung von Editor und Validierungsmodul für Ersteller und Anwender
- Unterstützung für die Suche nach Informationsbedürfnisse

#### IMPROVE / CHANGE
- xPath Gruppierung (Condition + Value Abfrage)
- Datenbankstruktur
- weitere ELGA-Testdaten getestet

## 01.05.2020 - 31.05.2020: RA-Analyse

- Fertigstellung der RA-Analyse -> im Juni Auswertung

### Software
#### NEW
- nur XML Files werden akzeptiert
- UnitTests
#### IMPROVE / CHANGE
- Verbesserung der Robustheit bei der xPath Auswertung: wenn Wert nicht gefunden wird, dann Prüfung, ob überhaupt Wert enthalten ist



## 01.04.2020 - 30.04.2020: Fertigstellung von v 0.1
- Fertigstellung von v0.1 für die Auswertung von einem Pool von CDA Dokumenten
- Daten (Name, IDs,...) auslesen aus CDA Dateien
- Umstellung auf Vue.js für Front-End
    - erstes Basic Design
- Basic Auswertung der CDA Files im Front-End
- Testing CDA Libraries (SAXCON, ETREE)
- Erstellung Konzept für Datenhaltung
- Verbesserung der Datenhaltung

#### Screenshots Version 0.1
![](external_resources/images_readme/Neue_Studie.png)

![](external_resources/images_readme/Auswertung.png)

## 03.03.2020 - 31.03.2020: Kickoff
- Konzept für Requierments Analyse recherchiert
  - [Erstes Konzept erstellt](https://www.notion.so/Konzept-a88d0a9f79ec4122bc6533d7d3cdb702)
<br/><br/>
- erstes Protyping testing mit Python für Auswertung von CDA Dokumenten mit Hilfe von XPaths
    - noch fehleranfällig mit den gegebenen xPaths
- Basic Electron App (Front-End) mit Basic REST-Interaktionen
- Basic Django Server (Back-End) mit Basic REST-Interaktionen
    - ermöglicht auch Speicherung von xml Dateien auf dem Server zur Ablage und weiteren Verarbeitung

#### Erster Entwurf für Front und Back-End:
![](external_resources/images_readme/Untitled-6.jpg)
