import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { proizvodListaReducer, proizvodDetaljiReducer, proizvodSacuvajReducer, proizvodIzbrisiReducer } from './reducers/proizvodReducers';
import { korpaReducer } from './reducers/korpaReducers';
import { korisnikPrijavaReducer, korisnikRegistracijaReducer, korisnikUrediReducer } from './reducers/korisnikReducers';

/*Ukoliko ne postoji kolačić vraća przan niz. */
const korpaArtikli = Cookie.getJSON('korpaArtikli') || [];
/*Ukoliko ne postoji kolačić vraća null. */
const korisnikInfo = Cookie.getJSON('korisnikInfo') || null;

const initialState={korpa: {korpaArtikli, dostava: {}, placanje: {}}, korisnikPrijava: {korisnikInfo}};

/*Reducer je funkcija koja prima trenutno stanje i objekat akciju,
 odlučuje kako ažurirati stanje ukoliko je to potrebno te vraća novo stanje: (state, action) => newState.
 combineReducers je helper funkcija koja pretvara objekat čije vrijednosti su različite reducer funkcije u jednu reducer funkciju koja 
 se može proslijediti funkciji createStore. */
const reducer = combineReducers({ 
    proizvodLista: proizvodListaReducer,
    proizvodDetalji: proizvodDetaljiReducer,
    korpa: korpaReducer,
    korisnikPrijava: korisnikPrijavaReducer,
    korisnikRegistracija: korisnikRegistracijaReducer,
    proizvodSacuvaj: proizvodSacuvajReducer,
    proizvodIzbrisi: proizvodIzbrisiReducer,
    korisnikAzuriranje: korisnikUrediReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; /*Omogućava Redux DevTools proširenje u web pretraživaču. */
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk))); /*createStore kreira store ili "skladište za stanja.*/

export default store;