import React, { Component } from 'react';
import Diagramm from "./Diagramm";
import Loader from './Loader';
import RadioList from "./RadioList";

//Das ist ein Stateful Class Component

class Section extends Component {

  state = {
    radioTypDiagramm: this.props.diagramTyp
  }

  radioAendern = (e) => {
    this.setState({ radioTypDiagramm: e.target.value });
  }

  render() {
    return (
      <div>
        <h5>{this.props.title}</h5>
        <RadioList
          diagramName={this.props.diagramName}
          radioTypDiagramm={this.state.radioTypDiagramm}
          radioAendern={this.radioAendern}
        />
        <div className="diagramStyling z-depth-1 hoverable">
          <Loader diagramName={this.props.diagramName} />
          <Diagramm
            propPosition={this.props.propPosition}
            diagramName={this.props.diagramName}
            eigenschaft={this.props.eigenschaft}
            diagramTyp={this.state.radioTypDiagramm}
            jsonReferenz={this.props.jsonReferenz}
          />
        </div>
      </div>
    );
  }

}
export default Section;