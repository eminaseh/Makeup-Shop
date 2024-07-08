import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registracija } from '../akcije/korisnikAkcije';
import { Link } from 'react-router-dom';


function Registracija(props) {

  const [ime, postaviIme] = useState('');
  const [email, postaviEmail] = useState('');
  const [lozinka, postaviLozinku] = useState('');
  const [ponovljenaLozinka, postaviPonovljenuLozinku] = useState('');
  const korisnikRegistracija = useSelector(state=>state.korisnikRegistracija);
  const {ucitavanje, korisnikInfo, error} = korisnikRegistracija;
  const dispatch = useDispatch();
  const redirect = props.location.search? props.location.search.split("=")[1] : '/';
  

    useEffect(() => {
    if(korisnikInfo){
        props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [korisnikInfo]); 

  const potvrdiRegistraciju = (e) => {
    e.preventDefault();
    dispatch(registracija(ime,email,lozinka));

  }
   
  return <div className="forma">
  <form onSubmit={potvrdiRegistraciju} >
    <ul className="forma-lista">
      <li>
        <h3>NAPRAVI RAČUN</h3>
      </li>
     <li>
         {ucitavanje && <div className="ucitavaje">Učitavanje...</div>}
         {error && <div>{error}</div>}
     </li>
      <li>
        <label htmlFor="ime">
          Ime
        </label>
        <input type="text" name="ime" id="ime" onChange={(e) => postaviIme(e.target.value)}>
        </input>
      </li>
      <li>
        <label htmlFor="email">
          Email
        </label>
        <input type="email" name="email" id="email" onChange={(e) => postaviEmail(e.target.value)}>
        </input>
      </li>
      <li>
        <label htmlFor="lozinka">Lozinka</label>
        <input type="password" id="lozinka" name="lozinka" onChange={(e) => postaviLozinku(e.target.value)}>
        </input>
      </li>
      <li>
        <label htmlFor="ponovljenaLozinka">Ponovi lozinku</label>
        <input type="password" id="ponovljenaLozinka" name="ponovljenaLozinka" onChange={(e) => postaviPonovljenuLozinku(e.target.value)}>
        </input>
      </li>
      <li>
        <button type="submit" className="korpa-dugme">REGISTRUJ SE</button>
      </li>
      <li>
        Da li već imate korisnički račun? 
      </li> 
      <li>
      <Link to={redirect === "/" ? "prijava" : "prijava?redirect=" + redirect} className="registracija-dugme">PRIJAVI SE</Link>
      </li>   
    </ul>
  </form>
</div>

}
export default Registracija;