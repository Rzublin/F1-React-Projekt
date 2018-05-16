import React from 'react';

//Das ist ein Stateless Component

const Position = (props) => {

  const changeHandler = () => {
    let ranking = document.getElementById("ranking").value;
    document.getElementById("ranking").value = "";
    if (!isNaN(ranking)) {      
      props.onSelectRanking(ranking);
    }
  }

  return (
    <div className="position">
      <input id="ranking" type="text" className="input-field" />
      <a className="waves-effect waves-light btn blue" onClick={changeHandler}>Suchen</a>
    </div>
  );
}

export default Position;