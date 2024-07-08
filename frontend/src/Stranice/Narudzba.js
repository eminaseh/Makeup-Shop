import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NarudzbaKoraci from '../komponente/NarudzbaKoraci';

function Narudzba(props){

    const korpa = useSelector(state => state.korpa);
    const {korpaArtikli, dostava, placanje} = korpa; 
    const artikliCijena = korpaArtikli.reduce((a, c) => a + c.cijena*c.kolicina, 0);
    const dostavaCijena = artikliCijena > 100 ? 0 : 10;
    const ukupnaCijena = artikliCijena + dostavaCijena;
    const dispatch = useDispatch();
    const naruciProizvode = () => {

    }
    useEffect(() => {
        
      }, []);

 return <div>
    <NarudzbaKoraci korak1 korak2 korak3 korak4 ></NarudzbaKoraci >
        <div className="narudzba">
             <div className="narudzba-info">
                 <div>
                     <h3>Dostava</h3>
                       <div>
                         {korpa.dostava.adresa}, {korpa.dostava.grad},
                         {korpa.dostava.postanskiBroj}, {korpa.dostava.drzava},
                        </div>
                  </div>
                 <div>
                     <h3>Način plaćanja</h3>
                 <div>
                     {korpa.placanje.nacinPlacanja}
                </div>
             </div>
             <div>
              <ul className="korpa-lista-artikli">
                 <li>
                 <h3>Korpa</h3>
                 <div>Cijena</div>
                 </li>
                 {
                 korpaArtikli.length === 0 ?
                <div>Vaša korpa je prazna.</div>
                 :
                 korpaArtikli.map(artikal=>
                <li>
                  <div className="korpa-slika">
                    <img src={artikal.slika} alt="proizvod" />
                  </div>
                  <div className="korpa-naziv">
                    <div>  
                      <Link to={"/proizvod/" + artikal.proizvod}> {artikal.naziv}</Link>                
                    </div>
                    <div className="korpa-kolicina">
                      Količina: {artikal.kolicina}
                    </div>
                  </div>
                  <div className="korpa-cijena">
                    {artikal.cijena}KM
                  </div>
                </li>
              )
         }
       </ul>
     </div>

   
   </div>
   <div className="narudzba-akcija">
     <ul>
       <li>
         <h3>DETALJI NARUDŽBE</h3>
       </li>
       <li>
         <div>Proizvodi</div>
         <div>{artikliCijena}KM</div>
       </li>
       <li>
         <div>Dostava</div>
         <div>{dostavaCijena}KM</div>
       </li>
       <li>
         <div className="total">TOTAL</div>
         <div className="total">{ukupnaCijena}KM</div>
       </li>
       <li>
         <button className="korpa-dugme naruci-dugme" onClick={naruciProizvode} >NARUČI</button>
       </li>
     </ul>
   </div>
 </div>
</div>
 
}

export default Narudzba;

