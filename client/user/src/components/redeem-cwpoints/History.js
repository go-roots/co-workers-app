import React from 'react';
import { IoIosArrowDown } from 'react-icons/io'

const History = ({ history }) => {
  return (
    <div className="col responsive-margin">
      <ul className="list-group">
        {history.map(h => (
          <li className="list-group-item">
            <span>{h.value} cwp : {h.description}</span>
          </li>
        ))}
        <li className="list-group-item">
          <button className="btn btn-primary btn-block text-white arrow-button" type="button">
            <IoIosArrowDown />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default History
