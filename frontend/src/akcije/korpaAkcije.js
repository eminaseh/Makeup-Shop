import axios from "axios";
import Cookie from "js-cookie";
import { KORPA_DODAJ_ARTIKAL,
         KORPA_UKLONI_ARTIKAL, 
         KORPA_SACUVAJ_DOSTAVU, 
         KORPA_SACUVAJ_PLACANJE } from "../konstante/korpaKonstante";

/* Funkcija dodajProizvodUKorpu prima parametre id proizvoda i količinu proizvoda i vraća drugu funkciju koja koristi dispatch koja uzima 
   podatke sa servera koje dodajemo u korpu*/
   
const dodajProizvodUKorpu = (proizvodId, kolicina) => async (dispatch, getState) =>{

    try{
        const { data } = await axios.get("/api/proizvodi/" + proizvodId);
        dispatch({
            type: KORPA_DODAJ_ARTIKAL, payload: {
              proizvod: data._id,
              naziv: data.naziv,
              slika: data.slika,
              cijena: data.cijena,
              brNaStanju: data.brNaStanju,
              kolicina
            }
          });
          const {korpa:{korpaArtikli}} = getState();
          Cookie.set("korpaArtikli", JSON.stringify(korpaArtikli));
    }
    catch(error){

    }
}

const ukloniProizvodIzKorpe = (proizvodId) => (dispatch, getState) => {
  dispatch({type: KORPA_UKLONI_ARTIKAL, payload: proizvodId});
  const {korpa:{korpaArtikli}} = getState();
  Cookie.set("korpaArtikli", JSON.stringify(korpaArtikli));
}

const sacuvajDostavu = (data) => (dispatch) => {
  dispatch({type: KORPA_SACUVAJ_DOSTAVU, payload: data});
}

const sacuvajPlacanje = (data) => (dispatch) => {
  dispatch({type: KORPA_SACUVAJ_PLACANJE, payload: data});
}

export { dodajProizvodUKorpu, ukloniProizvodIzKorpe, sacuvajDostavu, sacuvajPlacanje }