# Installationsanleitung

### Verwendete Tools

Python 3.9

Node.js

GitHub Desktop

Visual Studio Code

PyCharm

Eclipse

TablePlus

#### Github Repositories

https://github.com/raikm/RecruitmentTool

https://github.com/raikm/RecruitmentTool_Backend

https://github.com/raikm/eHealthConnectorMiniAPI

Projekte mit git pullen

#### Front-End

Electron Installieren: https://www.electronjs.org/docs/tutorial/installation

##### Installing and updating packages﻿ from package.json	

https://www.jetbrains.com/help/webstorm/installing-and-removing-external-software-using-node-package-manager.html#ws_installing_and_upgrading_packages

##### Programm starten

Um Programm zu starten Project in Visual Studio öffnen und in den Pfad "GitHub\RecruitmentTool\clivio" wechseln. Im Terminal

```none
npm run dev
```

ausführen und das electron programm wird gestartet

#### Back-End

##### Django Server

###### Install Packages and Libraries

```py
pip install -r /path/to/requirements.txt
```

###### In PyCharm: 

https://www.jetbrains.com/help/pycharm/creating-and-running-your-first-django-project.html

###### In Terminal

```
python manage.py runserver 8080
```

###### Datenbank Änderungen übernehmen

`python manage.py makemigrations` 

`python manage.py migrate --run-syncdb`

##### eHealth connector

Java 1.7

Reference Libraries: 

ref-client-0.0.2-SNAPSHOT-jar-with-dependencies.jar

- in GitHub Repositry hinterlegt

py4j0.10.9.1.jar

https://www.py4j.org/

ehealth_connector-fatjar-gen-1.8.0-202007.jar

- in GitHub Repositry hinterlegt

