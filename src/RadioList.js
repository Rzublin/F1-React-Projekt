import React from "react";

const RadioList = (props) =>
  <div>
    <label>
      <input
        name={"typ" + props.diagramName}
        type="radio"
        value="horizontalBar"
        checked={props.radioTypDiagramm === "horizontalBar"}
        onChange={props.radioAendern}
      />
      <span>Horizontal</span>
    </label>
    <label>
      <input
        name={"typ" + props.diagramName}
        type="radio"
        value="bar"
        checked={props.radioTypDiagramm === "bar"}
        onChange={props.radioAendern}
      />
      <span>Vertikal</span>
    </label>
    <label>
      <input
        name={"typ" + props.diagramName}
        type="radio"
        value="pie"
        checked={props.radioTypDiagramm === "pie"}
        onChange={props.radioAendern}
      />
      <span>Pizza</span>
    </label>
  </div>




export default RadioList;
