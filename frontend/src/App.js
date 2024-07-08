import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import Naslovna from './Stranice/Naslovna';
import Detalji from './Stranice/Detalji';
import Korpa from './Stranice/Korpa';
import Prijava from './Stranice/Prijava';
import Registracija from './Stranice/Registracija';
import Proizvodi from './Stranice/Proizvodi';
import Dostava from './Stranice/Dostava';
import Placanje from './Stranice/Placanje';
import Narudzba from './Stranice/Narudzba';
import Profil from './Stranice/Profil';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'



function App() {

    const korisnikPrijava = useSelector((state)=>state.korisnikPrijava); /*useSelector nam omogućava da izvučemo stanje iz Redux store-a. */
    const {korisnikInfo} = korisnikPrijava;

    /*Ikona zvijezda za ocjenu proizvoda */
    library.add(faStar)

    /*otvoriMeni otvara sidebar gdje se nalaze kategorije proizvoda */
  const otvoriMeni = () =>{
    document.querySelector(".sidebar").classList.add("open");
  }
   /*zatvoriMeni zatvara sidebar gdje se nalaze kategorije proizvoda */
  const zatvoriMeni = () =>{
    document.querySelector(".sidebar").classList.remove("open")
  }

  return (
      <BrowserRouter>
    <div className="grid-kontejner">
    {/* Header //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
    {/* Prijavljenom korisniku se prikazuje link koji vodi na korisnički profil. Ukoliko korisnik nije prijavljen prikazuje se link za prijavu.
        Ukoliko je prijavljeni korisnik administrator prikazuje se link na proizvode gdje može da izvršava CRUD operacije.*/}
    <header className="header" id="top">
        <div className="logo">
            <button onClick={otvoriMeni}>&#9776;</button>
            <Link to="/">MAKEUP SHOP</Link>
        </div>
        <div className="meni">
            <Link to="/korpa">KORPA</Link>
            {
                korisnikInfo ? <Link to="/profil">{korisnikInfo.ime}</Link>:
                <Link to="/prijava">PRIJAVA</Link>
            }  
            {korisnikInfo && korisnikInfo.daLiJeAdmin && (
                    <Link to="/proizvodi">PROIZVODI</Link>
            )}  
        </div>
    </header>
   {/* Sidebar //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
    <aside className="sidebar">
        <div className="zatvori1">
            <span  onClick={zatvoriMeni} className="zatvori" title="Zatvori">&times;</span>
        </div>
        <h3 className="kategorije">KATEGORIJE</h3>
        <ul className="kategorije-lista">
        <li>
            <Link to="/">Svi proizvodi</Link>
            </li> 
            <li>
            <Link to="/kategorija/Lice">Lice</Link>
            </li>
            <li>
            <Link to="/kategorija/Oči">Oči</Link>
            </li>
            <li>
            <Link to="/kategorija/Usne">Usne</Link>
            </li>        
        </ul>
    </aside>
   {/* main ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
    <main className="main" >
        <div className="main-sadrzaj">
        
        <Route path="/profil" component={Profil} />
        <Route path="/narudzba" component={Narudzba} />
        <Route path="/placanje" component={Placanje} />
        <Route path="/dostava" component={Dostava} />
        <Route path="/proizvodi" component={Proizvodi} />
        <Route path="/registracija" component={Registracija} />
        <Route path="/prijava" component={Prijava} />
        <Route path="/proizvod/:id" component={Detalji} />
        <Route path="/korpa/:id?" component={Korpa} />
        <Route path="/kategorija/:id" component={Naslovna} />
        <Route path="/" exact={true} component={Naslovna} />
        </div>
       
    </main>
    {/* Footer ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
    <footer className="footer">
        <div>
            <ul className="horizontalna_lista_footer">
                <li><a  href="https://bs-ba.facebook.com/" ><img className="ikonice"  src="/slike/fb.png" alt="facebook"/></a></li>
                <li><a  href="https://twitter.com/"><img className="ikonice"  src="/slike/tw.png" alt="twitter"/></a></li>
                <li><a  href="https://www.instagram.com/?hl=hr"><img className="ikonice"  src="/slike/inst.png" alt="instagram"/></a></li>
            </ul>
        </div>
        <div>
            Copyright &copy; 2020 | Makeup Shop
        </div>
        <div>
            <a href="#top" ><img src="/slike/up.png" className="povratak" alt="povratak"/></a>
        </div>  
    </footer>
</div>
</BrowserRouter>
  );
}

export default App;
