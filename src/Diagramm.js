import React, { Component } from 'react';

//Das ist ein Class Component

class Diagramm extends Component {

  //Callback Funktion um belibige Werte zu vergleichen
  compareEigenschaft = (a, b) => {
    let nameA = a[this.props.eigenschaft].toUpperCase();
    let nameB = b[this.props.eigenschaft].toUpperCase();
    if (nameA < nameB)
      return -1;
    if (nameA > nameB)
      return 1;
    return 0;
  }

  //Callback Funktion um die Count Eigenschaft zu vergleichen
  compareCount = (a, b) => {
    if (a.count > b.count)
      return -1;
    if (a.count < b.count)
      return 1;
    return 0;
  }

  optionenEinstellen = (diagramTyp) => {
    let meinOptionen = {};
    if (diagramTyp == "horizontalBar") {
      meinOptionen = { //Einstellung eines horizontalen Diagramms
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        }
      }
    }
    else if (diagramTyp == "bar") {
      meinOptionen = { //Einstellung eines vertikalen Diagramms
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        }
      }
    }
    return meinOptionen;
  }

  //Funktion um das Layout der Fahrer darzustellen
  driversLayoutDarstellen = (jsonResult, eigenschaft) => {
    let tempDrivers = { driverslabel: [], meinOptionen: {}, diagramLabel: "" };
    if (eigenschaft == "driverId") {
      for (let driver of jsonResult) {
        tempDrivers.driverslabel.push(driver.givenName + " " + driver.familyName); //Voller Name des Drivers
      }
    } else {
      for (let driver of jsonResult) {
        tempDrivers.driverslabel.push(driver[eigenschaft]);
      }
    }
    tempDrivers.meinOptionen = this.optionenEinstellen(this.props.diagramTyp);
    tempDrivers.diagramLabel = '# Weltmeister'; //Einstellung des Diagramms Label, Weltmeister für 1. Platz...
    if (this.props.propPosition != 1) {
      tempDrivers.diagramLabel = '# auf ' + this.props.propPosition + ". Platz"; //...sonst Nummer Position
    }
    return tempDrivers;
  }

  //Funktion um das Layout der Konstrukteuren darzustellen
  constructorsLayoutDarstellen = (jsonResult) => {
    let tempConstructors = { driverslabel: [], meinOptionen: {}, diagramLabel: "" };
    for (let driver of jsonResult) {
      tempConstructors.driverslabel.push(driver.name); //Konstrukteurs Name
    }
    tempConstructors.meinOptionen = this.optionenEinstellen(this.props.diagramTyp);
    tempConstructors.diagramLabel = '# Weltmeister'; //Einstellung des Diagramms Label, Weltmeister für 1. Platz...
    if (this.props.propPosition != 1) {
      tempConstructors.diagramLabel = '# auf ' + this.props.propPosition + ". Platz"; //...sonst Nummer Position
    }
    return tempConstructors;
  }

  //Funktion um das Layout der Länder darzustellen
  laenderLayoutDarstellen = (jsonResult) => {
    let tempLaender = { driverslabel: [] };
    for (let driver of jsonResult) {
      tempLaender.driverslabel.push(driver.nationality); //Länder Name
    }
    return tempLaender;
  }

  //Funktion um ein Diagramm mit Chart.js herzustellen
  diagramHerstellen = (tempObjekt, jsonResult) => {
    let ctx = document.getElementById(this.props.diagramName).getContext('2d'); //Canvas Objekt zugreifen
    //Ein Objekt an dem Window anlegen und das Diagramm an dem Canvas erzeugen
    window["myChart" + this.props.diagramName] = new Chart(ctx, {
      type: this.props.diagramTyp, //Typ des Diagramms bzw. HorizontalBar, Bar oder Pie
      data: {
        labels: tempObjekt.driverslabel, //Zu wem/was gehört die Daten
        datasets: [{
          label: tempObjekt.diagramLabel, //Label bzw. Titel des Diagramms
          data: jsonResult.map(element => element.count), //Daten
          backgroundColor: ["rgb(77, 166, 255)", "rgb(0, 102, 255)", "rgb(0, 51, 204)", "rgb(0, 51, 0)", "rgb(0, 102, 102)", "rgb(0, 128, 0)", "rgb(0, 51, 0)", "rgb(153, 102, 51)", "rgb(102, 51, 0)", "rgb(57, 38, 19)"],
          hoverBackgroundColor: "rgb(230, 138, 0)",
          borderWidth: 1
        }]
      },
      options: tempObjekt.meinOptionen //Extra Optionen um die Diagramme nach belibige Wahl herzustellen
    });
  }

  //Funktion
  jsonAusDerApiVorbereiten = (jsonResult) => {
    jsonResult = jsonResult.MRData.StandingsTable.StandingsLists;
    jsonResult = jsonResult.map(element => {
      if (this.props.jsonReferenz == "Driver") {
        return element.DriverStandings[0][this.props.jsonReferenz];
      } else if (this.props.jsonReferenz == "Constructors") {
        let temp = element.DriverStandings[0][this.props.jsonReferenz];
        return temp[0]
      } else {
        return element.DriverStandings[0][this.props.jsonReferenz];
      }
    });
    return jsonResult;
  }

  //Funktion
  jsonSortieren = (jsonResult) => {
    jsonResult.sort(this.compareEigenschaft);
    console.log(jsonResult);

    for (let i = 0; i < jsonResult.length; i++) {
      if (!jsonResult[i].count) {
        jsonResult[i].count = 1;
      }
      for (let y = (i + 1); y < jsonResult.length; y++) {
        if (jsonResult[i][this.props.eigenschaft] == jsonResult[y][this.props.eigenschaft]) {
          jsonResult[i].count += 1;
          jsonResult.splice((y--), 1);
        } else {
          break;
        }
      }
    }
    jsonResult.sort(this.compareCount);
    jsonResult = jsonResult.slice(0, 10);
    return jsonResult;
  }

  //Funktion um die Diagramme zu aktualisieren
  componentDidUpdate() {
    if (window["myChart" + this.props.diagramName] != undefined) {
      window["myChart" + this.props.diagramName].destroy(); //Alte Diagramme werden gelöscht...
    }
    this.diagrammErzeugen(); //...und neue Diagramme erzeugt
  }

  //Funktion um Diagramme zu Erzeugen
  diagrammErzeugen() {

    //JSON durch AJAX anfordern
    var xhr = new XMLHttpRequest();

    //Für diese Projekt wurde das Egast Developer API verwendet. Es handelt sich um Formel 1.
    //API Homepage Adresse: https://ergast.com/mrd/
    xhr.open("GET", "https://ergast.com/api/f1/driverStandings/" + this.props.propPosition + ".json?limit=70");
    xhr.send(null);


    xhr.onreadystatechange = () => {
      let DONE = 4;
      let OK = 200;
      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {

          let jsonResult = JSON.parse(xhr.responseText); //Ruckgabewerte aus dem API zu JSON verwandelt.

          let loader = document.getElementById("loader" + this.props.diagramName); //Fortschrittsanzeige Element zugreifen...
          loader.style.display = "none"; //...und es unsichtbar machen

          //JSON vorbereiten
          jsonResult = this.jsonAusDerApiVorbereiten(jsonResult);

          //Daten Sortieren 
          jsonResult = this.jsonSortieren(jsonResult);


          //Drivers Diagramm Layout
          let tempObjekt = {};
          if (this.props.eigenschaft == "constructorId") {
            tempObjekt = this.constructorsLayoutDarstellen(jsonResult);
          }
          else {
            tempObjekt = this.driversLayoutDarstellen(jsonResult, this.props.eigenschaft);
          }
          //Diagramme Herstellen
          this.diagramHerstellen(tempObjekt, jsonResult);

        } else {
          console.log('Error: ' + xhr.status); //Log mit Fehler bei AJAX anforderung schreiben
        }
      }
    }; // AJAX Anruf
  }

  //Funktion
  componentDidMount() {
    this.diagrammErzeugen();
  }

  render() {
    return (
      <canvas id={this.props.diagramName} ></canvas>
    );
  }
}

export default Diagramm;