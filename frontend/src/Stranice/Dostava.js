import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sacuvajDostavu } from '../akcije/korpaAkcije';
import NarudzbaKoraci from '../komponente/NarudzbaKoraci';



function Dostava(props) {

  const [adresa, postaviAdresu] = useState('');
  const [drzava, postaviDrzavu] = useState('');
  const [grad, postaviGrad] = useState('');
  const [postanskiBroj, postaviPostanskiBroj] = useState('');
  const dispatch = useDispatch();

  const potvrdiDostavu = (e) => {
    e.preventDefault();
    dispatch(sacuvajDostavu({adresa, drzava, grad, postanskiBroj}));
    props.history.push('/placanje');
  }
   
  return <div>
  <NarudzbaKoraci korak1 korak2></NarudzbaKoraci>
  <div className="forma">
  <form onSubmit={potvrdiDostavu} >
    <ul className="forma-lista">
      <li>
        <h3>DOSTAVA</h3>
      </li>
      <li>
        <label htmlFor="adresa">
          Adresa
        </label>
        <input type="text" name="adresa" id="adresa" onChange={(e) => postaviAdresu(e.target.value)}>
        </input>
      </li>
      <li>
        <label htmlFor="drzava">
          Država
        </label>
        <input type="drzava" name="drzava" id="drzava" onChange={(e) => postaviDrzavu(e.target.value)}>
        </input>
      </li>
      <li>
        <label htmlFor="grad">
          Grad
        </label>
        <input type="grad" name="grad" id="grad" onChange={(e) => postaviGrad(e.target.value)}>
        </input>
      </li>
      <li>
        <label htmlFor="postanskiBroj">
          Poštanski broj
        </label>
        <input type="text" name="postanskiBroj" id="postanskiBroj" onChange={(e) => postaviPostanskiBroj(e.target.value)}>
        </input>
      </li>
      <li>
        <button type="submit" className="korpa-dugme">NASTAVI DALJE</button>
      </li>
    </ul>
  </form>
</div>
</div>
}
export default Dostava;