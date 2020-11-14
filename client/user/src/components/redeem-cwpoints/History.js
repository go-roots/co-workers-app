import React from 'react';


const History = ({ history }) => {
  return (
    <div className="col responsive-margin">
      <h5>Your CW Points history</h5>
      <ul className="list-group">
        {history.map((h, index) => (
          index < 5
            ? (<li key={index} className="list-group-item">
              <span>{h.value} cwp : {h.description}</span>
            </li>)
            : ("")
        ))}
      </ul>
    </div>
  )
}


export default History;
