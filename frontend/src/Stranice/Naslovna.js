import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listaProizvodi } from '../akcije/proizvodAkcije';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Naslovna(props){

    const kategorija = props.match.params.id ? props.match.params.id : '';  
    const proizvodLista = useSelector(state => state.proizvodLista); /*useSelector nam omogućava da izvučemo podatke o stanju iz Redux store */
    const {proizvodi, ucitavanje, error} = proizvodLista;
    const dispatch = useDispatch(); /*useDispatch koristimo da otpremimo akciju */
    useEffect(() => {
        dispatch(listaProizvodi(kategorija));
        return () => {
          //
        };
      }, [kategorija]) /*Ako izaberemo kategoriju ponovo će se učitati lista proizvoda */

      
    /*Ispisat će se „Učitavanje...“ dok se ne učitaju podaci, nakon čega se ispisuje lista proizvoda. Ukoliko dođe do greške ispisuje se poruka.
     Ukoliko korisnik izabere kategoriju prikazuju se proizvodi iz tražene kategorije */
    return  ( <div> 
        {ucitavanje? (
          <div className="ucitavanje">Učitavanje...</div>
        ) : error ? (
          <div>{error}</div>
        ) : ( <div>
          {kategorija ? <h2 className="proizvodi-naslov">{kategorija}</h2> : 
          <div>
            <img className="pocetna-slika" src="slike/slika.jpg" alt="slika"/> 
            <h2 className="proizvodi-naslov">PROIZVODI</h2>
            </div>}
          <ul className="proizvodi">
            {proizvodi.map((proizvod) => (
               <li key={proizvod._id}>
               <div className="proizvod">
               <Link to={'/proizvod/' + proizvod._id}><img className="slika-proizvoda" src={proizvod.slika} alt="proizvod"/></Link>
               <div className="naziv-proizvoda"><Link to={'/proizvod/' + proizvod._id}>{proizvod.naziv}</Link></div>
               <div className="brend-proizvoda">{proizvod.brend}</div>
               <div className="cijena-proizvoda">{proizvod.cijena} KM</div>
               <div> <FontAwesomeIcon icon="star" className="zvijezda"/> <FontAwesomeIcon icon="star" className="zvijezda"/> 
               <FontAwesomeIcon icon="star" className="zvijezda"/> <FontAwesomeIcon icon="star" className="zvijezda"/>
               <FontAwesomeIcon icon="star" /> 
               </div>
               </div>
           </li>
            ))}
          </ul>
          </div>
        )}
      </div>
    );
    }

   
export default Naslovna;



