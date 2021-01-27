# Installationsanleitung

## Needed Installations

[Download Python >= 3.9](https://www.python.org/downloads/)

[Download Node.js >= 14.15.0](https://nodejs.org/en/download/)


## Tools for Development used

* GitHub Desktop
* Visual Studio Code: for VueJS Application
* PyCharm: for Django
* Eclipse: for eHealth Connector
* TablePlus: for Datenbank Datenmanipulation

## Github Repositories

[VueJS Application](https://github.com/raikm/RecruitmentTool)

[Django Server](https://github.com/raikm/RecruitmentTool_Backend)

[eHealthConnector](https://github.com/raikm/eHealthConnectorMiniAPI)

[IPF XDS Repositorycis](https://github.com/oehf/ipf.git)


## Front-End

Install all dependencies listed in a package.json file (Go to the root dictionary: "GitHub\RecruitmentTool\clivio") [More Information](https://www.jetbrains.com/help/webstorm/installing-and-removing-external-software-using-node-package-manager.html#ws_installing_and_upgrading_packages):

```none
npm install
```

### Programm starten

To start the program, open Project in Visual Studio. In the terminal run

```none
npm run dev
```

and the application starts and is also running at http://localhost:9080/

## Back-End

### Django Server

#### Install Packages and Libraries

```py
pip install -r /path/to/requirements.txt
```

#### Start in PyCharm: 

https://www.jetbrains.com/help/pycharm/creating-and-running-your-first-django-project.html

#### Start in Terminal
Go to \GitHub\RecruitmentTool_Backend\Django_Server\recruitmenttool and run

```
python manage.py runserver 8000
```

### eHealth connector

* Runs on Java 1.7

* Reference Libraries:
** ref-client-0.0.2-SNAPSHOT-jar-with-dependencies.jar (in GitHub Repositry attached)
** py4j0.10.9.1.jar [Official Website](https://www.py4j.org/download.html)
** ehealth_connector-fatjar-gen-1.8.0-202007.jar (in GitHub Repositry attached)

### XDS Repository

#### Installation
* cd tutorial/xds
* mvn clean install assembly:single
* cd target
* unzip ipf-tutorials-xds-4.0-SNAPSHOT-bin.zip

#### Start XDS Repository
* cd ipf-tutorials-xds-4.0-SNAPSHOT-bin\ipf-tutorials-xds-4.0-SNAPSHOT
* startup.bat

Run on http://localhost:9091/
