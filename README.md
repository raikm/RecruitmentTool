# RecruitmentTool (Master Thesis by Raik Mueller) 
## Semiautomatische Rekrutierung von Studienpatienten unter Nutzung von ELGA-Daten: Konzeptionierung und prototypische Implementierung eines IT-Tools

The thesis deals with the conception and development of a tool for the semi- automatic recruitment of study patients. The focus is on a user-friendly and reusable support-tool, that improves the processes for clinical trial staff to be more efficient in recruiting.
This includes an analysis of possible frameworks and programming lan- guages and elaboration for usability in collaboration with possible end users. The process will be iterative to evaluate various options for the usability re- garding to the application and test of different software solutions.



---
#### [🎯 Kanban Board Backend Software](https://github.com/raikm/RecruitmentTool/projects/2)

#### [Backend Repository (Private)](https://github.com/raikm/RecruitmentTool_Backend)

#### [🎯 Kanban Board Frontend Software](https://github.com/raikm/RecruitmentTool/projects/3)

# 🏗Timeline Progress

# 01.05.2020 - 31.05.2020: 2. Monat

<details><summary>Ausblick</summary>
<p>
<ul>
  <li>Verbesserung der Robustheit bei der xPath Auswertung</li>
  <li>Kategorien festlegen: NEW, CHANGE, IMPROVE</li>
</ul>
</p>
</details>

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
