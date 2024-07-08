import React from 'react';

function NarudzbaKoraci(props){
    return <div className="narudzba-koraci">
    <div className={props.korak1 ? 'active' : ''} >PRIJAVA</div>
    <div className={props.korak2 ? 'active' : ''} >ADRESA DOSTAVE</div>
    <div className={props.korak3 ? 'active' : ''} >NAČIN PLAĆANJA</div>
    <div className={props.korak4 ? 'active' : ''} >POTVRDA NARUDŽBE</div>
  </div>

}

export default NarudzbaKoraci;