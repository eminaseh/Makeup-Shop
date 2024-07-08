import axios from 'axios';
import Axios from 'axios';
import Cookie from 'js-cookie';
import { KORISNIK_PRIJAVA_ZAHTJEV, 
        KORISNIK_PRIJAVA_USPJEH, 
        KORISNIK_PRIJAVA_NEUSPJEH, 
        KORISNIK_REGISTRACIJA_ZAHTJEV, 
        KORISNIK_REGISTRACIJA_USPJEH, 
        KORISNIK_REGISTRACIJA_NEUSPJEH, 
        KORISNIK_ODJAVA, 
        KORISNIK_UREDI_ZAHTJEV, 
        KORISNIK_UREDI_USPJEH, 
        KORISNIK_UREDI_NEUSPJEH} from "../konstante/korisnikKonstante";


const prijava = (email, lozinka) => async (dispatch) => {
    dispatch({ type: KORISNIK_PRIJAVA_ZAHTJEV, payload: { email, lozinka } });
    try {
      const { data } = await axios.post("/api/korisnici/prijava", { email, lozinka });
      dispatch({ type: KORISNIK_PRIJAVA_USPJEH, payload: data });
      Cookie.set('korisnikInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: KORISNIK_PRIJAVA_NEUSPJEH, payload: error.message });
    }
  }

  const registracija = (ime, email, lozinka) => async (dispatch) => {
    dispatch({ type: KORISNIK_REGISTRACIJA_ZAHTJEV, payload: {ime, email, lozinka } });
    try {
      const { data } = await axios.post("/api/korisnici/registracija", {ime, email, lozinka });
      dispatch({ type: KORISNIK_REGISTRACIJA_USPJEH, payload: data });
      Cookie.set('korisnikInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: KORISNIK_REGISTRACIJA_NEUSPJEH, payload: error.message });
    }
  }

  const odjava = () => (dispatch) => {
    Cookie.remove("korisnikInfo");
    dispatch({ type: KORISNIK_ODJAVA })
  }

  const uredi = ({ korisnikId, ime, email, lozinka }) => async (dispatch, getState) => {
    const { korisnikPrijava: { korisnikInfo } } = getState();
    dispatch({ type: KORISNIK_UREDI_ZAHTJEV, payload: { korisnikId, ime, email, lozinka } });
    try {
      const { data } = await Axios.put("/api/korisnici/" + korisnikId,
        { ime, email, lozinka }, {
        headers: {
          Authorization: 'Bearer ' + korisnikInfo.token
        }
      });
      dispatch({ type: KORISNIK_UREDI_USPJEH, payload: data });
      Cookie.set('korisnikInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: KORISNIK_UREDI_NEUSPJEH, payload: error.message });
    }
  }

  export {prijava, registracija, odjava, uredi };