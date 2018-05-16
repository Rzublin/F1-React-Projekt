import React, { Component } from 'react';

//Das ist ein Class Component
//Es bezeichnet ein Fortschrittsanzeige Element,
//dass vor der Rücksendung des AJAXS aufruf gezeigt wird.  

class Loader extends Component {
  componentDidUpdate() {
    let loader = document.getElementById("loader" + this.props.diagramName);
    loader.style.display = "block";
  }

  render() {
    return (
      <div id={"loader" + this.props.diagramName} className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loader;