import React from 'react';
import {IoIosArrowDown} from 'react-icons/io'

const History = () => {
  return (
    <div className="col responsive-margin">
      <ul className="list-group">
        <li className="list-group-item"><span>200 cwp : Helped in organizing the halloween party</span></li>
        <li className="list-group-item"><span>100 cwp : Helped Franck on #Front-end-developper</span></li>
        <li className="list-group-item"><span>100&nbsp;cwp : helped Jorgo on #MachineLearning</span></li>
        <li className="list-group-item"><span>25 cwp : Recommended Daiqiao on #Bizagi</span></li>
        <li className="list-group-item"><span>200 cwp : 3 months green behaviour streak&nbsp; !</span></li>
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
