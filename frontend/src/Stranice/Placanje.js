import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sacuvajPlacanje } from '../akcije/korpaAkcije';
import NarudzbaKoraci from '../komponente/NarudzbaKoraci';


function Placanje(props) {

  const [nacinPlacanja, postaviNacinPlacanja] = useState('');
  const [postanskiBroj, postaviPostanskiBroj] = useState('');
  const dispatch = useDispatch();

  const potvrdiPlacanje = (e) => {
    e.preventDefault();
    dispatch(sacuvajPlacanje({nacinPlacanja}));
    props.history.push('/narudzba');
  }
   
  return <div>
  <NarudzbaKoraci korak1 korak2 korak3></NarudzbaKoraci>
  <div className="forma">
  <form onSubmit={potvrdiPlacanje} >
    <ul className="forma-lista">
      <li>
        <h3>NAČIN PLAĆANJA</h3>
      </li>
      <li>
        <div>
          <input type="radio" name="nacinPlacanja" id="nacinPlacanja" value="paypal" 
          onChange={(e) => postaviNacinPlacanja(e.target.value)}></input>
          <label htmlFor="nacinPlacanja">PAYPAL</label>
        </div>
    </li>
      <li>
        <button type="submit" className="korpa-dugme">NASTAVI DALJE</button>
      </li>
    </ul>
  </form>
</div>
</div>
}
export default Placanje;