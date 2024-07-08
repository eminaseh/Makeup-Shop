import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { prijava } from '../akcije/korisnikAkcije';
import { Link } from 'react-router-dom';


function Prijava(props) {

  const [email, postaviEmail] = useState('');
  const [lozinka, postaviLozinku] = useState('');
  const korisnikPrijava = useSelector(state=>state.korisnikPrijava);
  const {ucitavanje, korisnikInfo, error} = korisnikPrijava;
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

  const potvrdiPrijavu = (e) => {
    e.preventDefault();
    dispatch(prijava(email,lozinka));

  }
   
  return <div className="forma">
  <form onSubmit={potvrdiPrijavu} >
    <ul className="forma-lista">
      <li>
        <h3>PRIJAVI SE</h3>
      </li>
     <li>
         {ucitavanje && <div>Učitavanje...</div>}
         {error && <div>{error}</div>}
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
        <button type="submit" className="korpa-dugme">PRIJAVI SE</button>
      </li>
      <li>
        Nemate račun?
      </li>    
      <li>
      <Link to={redirect === "/" ? "registracija" : "registracija?redirect=" + redirect} className="registracija-dugme">REGISTRUJ SE</Link>
      </li>
    </ul>
  </form>
</div>

}
export default Prijava;