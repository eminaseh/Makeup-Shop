import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sacuvajProizvod, listaProizvodi, izbrisiProizvod } from '../akcije/proizvodAkcije';


function Proizvodi(props) {

  const [id, postaviId] = useState('');
  const [naziv, postaviNaziv] = useState('');
  const [cijena, postaviCijenu] = useState('');
  const [kategorija, postaviKategoriju] = useState('');
  const [slika, postaviSliku] = useState('');
  const [brend, postaviBrend] = useState('');
  const [brNaStanju, postaviBrNaStanju] = useState('');
  const [opis, postaviOpis] = useState('');
  const [modalVidljiv, postaviModalVidljiv] = useState(false);

  const proizvodLista = useSelector(state => state.proizvodLista);
  const {proizvodi, ucitavanje, error} = proizvodLista;

  const proizvodSacuvaj = useSelector(state=>state.proizvodSacuvaj);
  const {ucitavanje: ucitavanjeSacuvaj, uspjeh: uspjehSacuvaj, error: errorSacuvaj} = proizvodSacuvaj;

  const proizvodIzbrisi = useSelector(state=>state.proizvodIzbrisi);
  const {ucitavanje: ucitavanjeIzbrisi, uspjeh: uspjehIzbrisi, error: errorIzbrisi} = proizvodIzbrisi;
  
  const dispatch = useDispatch();

    useEffect(() => {
        if(uspjehSacuvaj){
          postaviModalVidljiv(false);
        }
    dispatch(listaProizvodi());
    return () => {
      //
    };
  }, [uspjehSacuvaj, uspjehIzbrisi]); /*Ako je uspješno sačuvan ili izbrisan proizvod lista proizvoda se ponovo učita. */

  const otvoriModal = (proizvod) => {
    postaviModalVidljiv(true);
    postaviId(proizvod._id);
    postaviNaziv(proizvod.naziv);
    postaviCijenu(proizvod.cijena);
    postaviSliku(proizvod.slika);
    postaviKategoriju(proizvod.kategorija);
    postaviBrend(proizvod.brend);
    postaviBrNaStanju(proizvod.brNaStanju);
    postaviOpis(proizvod.opis);
  }

  const potvrdiPromjene = (e) => {
    e.preventDefault();
    dispatch(sacuvajProizvod({_id: id, naziv, cijena, kategorija, slika, brend, brNaStanju, opis}));
  }

  const izbrisi = (proizvod) => {
      dispatch(izbrisiProizvod(proizvod._id));
  }
   
  return <div className="proizvodi-sadrzaj-margine">
      <div className="proizvod-header">
        <h2>Proizvodi</h2>
        <button className="dodaj-proizvod-dugme" onClick={()=> otvoriModal({})}>Dodaj novi proizvod</button>
      </div>
      {modalVidljiv && <div className="forma">
       <form onSubmit={potvrdiPromjene} >
      <ul className="forma-lista">
        <li>
          <h3>{id?"UREDI PROIZVOD":"DODAJ NOVI PROIZVOD"}</h3>
        </li>
       <li>
           {ucitavanjeSacuvaj && <div>Učitavanje...</div>}
           {errorSacuvaj && <div>{errorSacuvaj}</div>}
       </li>
       <li>
          <label htmlFor="naziv">Naziv proizvoda</label>
          <input type="text" name="naziv" value={naziv} id="naziv" onChange={(e) => postaviNaziv(e.target.value)}></input>
       </li>
       <li>
          <label htmlFor="cijena">Cijena</label>
          <input type="text" name="cijena" value={cijena} id="cijena" onChange={(e) => postaviCijenu(e.target.value)}></input>
       </li>
       <li>
           <label htmlFor="slika">Slika</label>
           <input type="text" name="slika" value={slika} id="slika" onChange={(e) => postaviSliku(e.target.value)}></input>
           
       </li>
       <li>
           <label htmlFor="brend">Brend</label>
           <input type="text" name="brend" value={brend} id="brend" onChange={(e) => postaviBrend(e.target.value)}></input>
      </li>
      <li>
           <label htmlFor="brNaStanju">Broj na stanju</label>
           <input type="text" name="brNaStanju" value={brNaStanju} id="brNaStanju" onChange={(e) => postaviBrNaStanju(e.target.value)}></input>
      </li>
      <li>
           <label htmlFor="kategorija">Kategorija</label>
           <input type="text" name="kategorija" value={kategorija} id="kategorija" onChange={(e) => postaviKategoriju(e.target.value)}></input>
      </li>
      <li>
           <label htmlFor="opis">Opis</label>
           <textarea name="opis" value={opis} id="opis" onChange={(e) => postaviOpis(e.target.value)}></textarea>
      </li>
      <li>
          <button type="submit" className="korpa-dugme">{id?"SAČUVAJ PROMJENE":"SAČUVAJ NOVI PROIZVOD"}</button>
      </li>
      <li>
          <button type="submit" onClick={() => postaviModalVidljiv(false)} className="registracija-dugme">PONIŠTI</button>
      </li>
        
      </ul>
    </form>
  </div>
      }
     
        <div className="lista-proizvoda">
        <table className="tabela">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAZIV</th>
                    <th>KATEGORIJA</th>
                    <th>CIJENA</th>
                    <th>AKCIJA</th>
                </tr>
            </thead>
            <tbody>
                {proizvodi.map(proizvod => (
                    <tr key={proizvod._id}>
                    <td>{proizvod._id}</td>
                    <td>{proizvod.naziv}</td>
                    <td>{proizvod.kategorija}</td>
                    <td>{proizvod.cijena}</td>
                    <td>
                        <button className="tabela-dugme tabela-dugme-uredi" onClick={() => otvoriModal(proizvod)}>Uredi</button>{' '}
                        <button className="tabela-dugme tabela-dugme-izbrisi" onClick={() => izbrisi(proizvod)}>Izbriši</button>
                    </td>
                </tr> ))}
                
            </tbody>
        </table>
        </div>

  </div>

}
export default Proizvodi;