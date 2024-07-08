import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux';
import { detaljiProizvod } from '../akcije/proizvodAkcije';

function Detalji(props){
    
    const [kolicina, setKolicina] = useState(1); /*React hook za preuzimanje količine koju unese korisnik. Zadana količina je 1. */
    const proizvodDetalji = useSelector(state => state.proizvodDetalji); /*useSelector nam omogućava da izvučemo podatke o stanju iz Redux store*/
    const {proizvod, ucitavanje, error} = proizvodDetalji;
    const dispatch = useDispatch(); /*useDispatch koristimo da otpremimo akciju */

    useEffect(() => {
        dispatch(detaljiProizvod(props.match.params.id));
        return () => {
          //
        };
      }, [])
    
      /*Funkcija dodajUKorpu preusmjerava korisnika na /korpa/ + id proizvoda + kolicina koju je korisnik izabrao. */
    const dodajUKorpu = () => {
        props.history.push("/korpa/" + props.match.params.id + "?kolicina=" + kolicina)
    }

    /*Ispisat će se „Učitavanje...“ dok se ne učitaju podaci, nakon čega se ispisuju detalji proizvoda. Ukoliko dođe do greške ispisuje se poruka.*/
    return <div>
        <div className="nazad">
            <Link to="/">Povratak u shop</Link>
        </div>
        {ucitavanje? <div className="ucitavanje">Učitavanje..</div> :
        error? <div>{error} </div> :
        (
            <div className="detalji">
            <div className="detalji-slika">
                <img src={proizvod.slika} alt="proizvod"></img>
            </div>
            
                <div className="detalji-info">
                    <ul>
                    <li>
                    <div className="naziv-proizvoda">{proizvod.naziv}</div>
                    </li>
                    <li>
                        <div className="brend-proizvoda">{proizvod.brend}</div>
                        </li>
                    <li> 
                    <div> <FontAwesomeIcon icon="star" className="zvijezda"/> <FontAwesomeIcon icon="star" className="zvijezda"/>
                     <FontAwesomeIcon icon="star" className="zvijezda"/> <FontAwesomeIcon icon="star" className="zvijezda"/> <FontAwesomeIcon icon="star" /> 
                   </div>
                    </li>
                        <li> 
                        <div className="cijena-proizvoda">{proizvod.cijena} KM</div>
                        </li>
                        <li>
                            <div>Status: {proizvod.brNaStanju > 0? "Na stanju." : "Nema na stanju."}</div>
                        </li>
                        <li>
                            <div className="kolicina">
                            Količina: <select value={kolicina} onChange={(e) =>{setKolicina(e.target.value)}}>
                                {[...Array(proizvod.brNaStanju).keys()].map(x=>
                                <option key={x + 1} value={x + 1}>{x + 1}</option>    
                                )}
                            </select>
                            </div>
                        </li>
                        <li>
                            {proizvod.brNaStanju > 0 && (<button onClick={dodajUKorpu} className="korpa-dugme">DODAJ U KORPU</button>)}   
                        </li>
                        <li>
                            <div className="opis-proizvoda">
                                Opis: {proizvod.opis}
                            </div>
                        </li>
                    </ul>               
            </div>
        </div>
        
        )
        }
        
    </div>
}
export default Detalji;