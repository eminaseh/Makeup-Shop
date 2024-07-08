import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { odjava, uredi } from '../akcije/korisnikAkcije';
import { useDispatch, useSelector } from 'react-redux';

function Profil(props){
    const [ime, postaviIme] = useState('');
    const [lozinka, postaviLozinku] = useState('');
    const [email, postaviEmail] = useState('');
    const dispatch = useDispatch();
  
    const korisnikPrijava = useSelector(state => state.korisnikPrijava);
    const { korisnikInfo } = korisnikPrijava;
    const odjaviSe = () => {
      dispatch(odjava());
      props.history.push("/prijava");
    }
    const potvrdiPromjene = (e) => {
      e.preventDefault();
      dispatch(uredi({ korisnikId: korisnikInfo._id, email, ime, lozinka }))
    }
    const korisnikAzuriranje = useSelector(state => state.korisnikAzuriranje);
    const { ucitavanje, uspjeh, error } = korisnikAzuriranje;
  
    useEffect(() => {
      if (korisnikInfo) {
        console.log(korisnikInfo.ime)
        postaviEmail(korisnikInfo.email);
        postaviIme(korisnikInfo.ime);
        postaviLozinku(korisnikInfo.lozinka);
      }
      return () => {
  
      };
    }, [korisnikInfo])
  
    return <div className="profil">
      <div className="profil-info">
        <div className="forma">
          <form onSubmit={potvrdiPromjene} >
            <ul className="forma-lista">
              <li>
                <h2>KORISNIČKI PROFIL</h2>
              </li>
              <li>
                {ucitavanje && <div className="ucitavaje">Učitavanje...</div>}
                {error && <div>{error}</div>}
                {uspjeh && <div>Profil uspješno sačuvan.</div>}
              </li>
              <li>
                <label htmlFor="ime">
                  Ime
            </label>
                <input value={ime} type="text" name="ime" id="ime" onChange={(e) => postaviIme(e.target.value)}>
                </input>
              </li>
              <li>
                <label htmlFor="email">
                  Email
            </label>
                <input value={email} type="email" name="email" id="email" onChange={(e) => postaviEmail(e.target.value)}>
                </input>
              </li>
              <li>
                <label htmlFor="lozinka">Lozinka</label>
                <input value={lozinka} type="password" id="lozinka" name="lozinka" onChange={(e) => postaviLozinku(e.target.value)}>
                </input>
              </li>
              <li>
                <button type="submit" className="korpa-dugme">SAČUVAJ PROMJENE</button>
              </li>
              <li>
                <button type="button" onClick={odjaviSe} className="korpa-dugme naruci-dugme">ODJAVI SE</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
}



export default Profil;