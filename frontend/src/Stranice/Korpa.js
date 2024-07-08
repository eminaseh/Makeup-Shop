import React, { useEffect } from 'react';
import { dodajProizvodUKorpu, ukloniProizvodIzKorpe } from '../akcije/korpaAkcije';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Korpa(props){

    const korpa = useSelector(state => state.korpa); 
    const {korpaArtikli} = korpa;
    const proizvodId = props.match.params.id;
    const kolicina = props.location.search? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch(); 
    const ukloniIzKorpe = (proizvodId) => {
      dispatch(ukloniProizvodIzKorpe(proizvodId));
    }
    useEffect(() => {
        if (proizvodId) {
          dispatch(dodajProizvodUKorpu(proizvodId, kolicina));
        }
      }, []);

    const zapocniNarudzbu = () =>{
      props.history.push("/prijava?redirect=dostava");
    }


 return <div className="korpa">
    <div className="korpa-lista">
      <ul className="korpa-lista-artikli">
        <li>
          <h3>
            KORPA
          </h3>
          <h3>
            CIJENA
          </h3>
        </li>
        {
          korpaArtikli.length === 0 ?
          <div>
            <div className="korpa-prazna">Vaša korpa je trenutno prazna.</div>
            <div className="nazad"><Link to="/">Povratak u shop</Link></div> 
        </div>
        :
            korpaArtikli.map(artikal=>
              <li>
                 <div>
                   <button type="button" className="dugme-ukloni" onClick={() => ukloniIzKorpe(artikal.proizvod)} >
                      X
                    </button>
                   </div>
                <div className="korpa-slika">
                  <img src={artikal.slika} alt="proizvod" />
                </div>
                <div className="korpa-naziv">
                  <div>  
                    <Link to={"/proizvod/" + artikal.proizvod}> {artikal.naziv}</Link>                
                  </div>
                  <div className="korpa-kolicina">
                    Količina: 
                   <select value={artikal.kolicina} onChange={(e) => dispatch(dodajProizvodUKorpu(artikal.proizvod, e.target.value))}>
                      {[...Array(artikal.brNaStanju).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="korpa-cijena">
                  {artikal.cijena}KM
                </div>
              </li>
            )}
      </ul>

    </div>
    <div className="korpa-akcija">
        <div className="korpa-akcija-naslov">PREGLED NARUDŽBE</div>
        <div className="korpa-akcija-br-proizvoda">
        Ukupno proizvoda: {korpaArtikli.reduce((a, c) => a + c.kolicina*1, 0)}
        </div>
        <div className="korpa-akcija-total">
        TOTAL: {korpaArtikli.reduce((a, c) => a + c.cijena * c.kolicina, 0)} KM
        </div>
      <button onClick={zapocniNarudzbu} className="korpa-dugme" disabled={korpaArtikli.length === 0}>
        ZAPOČNI NARUDŽBU
      </button>
    </div>
  </div>
}

export default Korpa;

