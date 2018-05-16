import React, { Component } from 'react';
import Section from "./Section";
import Position from "./Position";

//Das ist ein Stateful Class Component

class Main extends Component {

  state = { ranking: 1 }

  handleRanking = (temp) => {
    this.setState({ ranking: temp }, () => {
    });
  }

  render() {
    return (
      <div>
        <Position onSelectRanking={this.handleRanking} />
        <h2>TOP 10 Auf Platz {this.state.ranking}</h2>
        <Section
          propPosition={this.state.ranking}
          diagramName="diagram2"
          eigenschaft="driverId"
          diagramTyp="horizontalBar"
          jsonReferenz="Driver"
          title="Fahrer"
        />
        <Section
          propPosition={this.state.ranking}
          diagramName="diagram1"
          eigenschaft="nationality"
          diagramTyp="pie"
          jsonReferenz="Driver"
          title="Nationen"
        />
        <Section
          propPosition={this.state.ranking}
          diagramName="diagram3"
          eigenschaft="constructorId"
          diagramTyp="bar"
          jsonReferenz="Constructors"
          title="Konstrukteure"
        />
      </div>
    );
  }
}

export default Main;