import React, { useState, useEffect } from 'react';
import './Areas.css'

function Areas({ areasData, AreaSelected, setAreaSelected, handleSubmitMesas }) {

    useEffect(() => {
        if (AreaSelected !== null && AreaSelected !== undefined) {
            handleSubmitMesas();
        }
    }, [AreaSelected]);

    const handleClick = (areaId) => {
        setAreaSelected(areaId);
    };
  

    return (
      <div className='areas'>
        <ul className='box'>
          {areasData &&
            areasData.map((area) => (
              <li
                key={area.id_area}
                className={AreaSelected === area.id_area ? 'selectedbox' : 'box'}
                onClick={() => handleClick(area.id_area)}>
                {area.nombre}
              </li>
            ))}
        </ul>
      </div>
    );
  }

export default Areas