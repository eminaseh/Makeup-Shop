import { PROIZVOD_LISTA_ZAHTJEV, 
         PROIZVOD_LISTA_USPJEH,
         PROIZVOD_LISTA_NEUSPJEH, 
         PROIZVOD_DETALJI_ZAHTJEV,
         PROIZVOD_DETALJI_USPJEH,
         PROIZVOD_DETALJI_NEUSPJEH,
         PROIZVOD_SACUVAJ_ZAHTJEV,
         PROIZVOD_SACUVAJ_USPJEH, 
         PROIZVOD_SACUVAJ_NEUSPJEH, 
         PROIZVOD_IZBRISI_ZAHTJEV, 
         PROIZVOD_IZBRISI_USPJEH, 
         PROIZVOD_IZBRISI_NEUSPJEH} from '../konstante/proizvodKonstante';
import axios from 'axios';
import Axios from 'axios';


const listaProizvodi = (kategorija = '') => async (dispatch) => {
    try{
    dispatch({type: PROIZVOD_LISTA_ZAHTJEV});
    const {data} = await axios.get("/api/proizvodi?kategorija=" + kategorija);
    dispatch({ type: PROIZVOD_LISTA_USPJEH, payload: data});
    }
    catch(error){
        dispatch({ type: PROIZVOD_LISTA_NEUSPJEH, payload: error.message});
    }   
}

const detaljiProizvod = (proizvodId) => async (dispatch) => {
    try{
        dispatch({ type: PROIZVOD_DETALJI_ZAHTJEV, payload: proizvodId});
        const { data } = await axios.get("/api/proizvodi/" + proizvodId);
        dispatch({ type: PROIZVOD_DETALJI_USPJEH, payload: data});
    }
    catch(error){
        dispatch({ type: PROIZVOD_DETALJI_NEUSPJEH, payload: error.message});
    }

}

const izbrisiProizvod = (proizvodId) => async (dispatch, getState) => {
    try{
        const {korisnikPrijava:{korisnikInfo}} = getState();
        dispatch({ type: PROIZVOD_IZBRISI_ZAHTJEV, payload: proizvodId});
        const { data } = await axios.delete("/api/proizvodi/" + proizvodId, {
            headers: {
              Authorization: 'Bearer ' + korisnikInfo.token,
            },
        });
        dispatch({ type: PROIZVOD_IZBRISI_USPJEH, payload: data});
    }
    catch(error){
        dispatch({ type: PROIZVOD_IZBRISI_NEUSPJEH, payload: error.message});
    }

}

const sacuvajProizvod = (proizvod) => async (dispatch, getState) => {

    try {
        dispatch({type: PROIZVOD_SACUVAJ_ZAHTJEV, payload: proizvod});
        const { korisnikPrijava:{ korisnikInfo }} = getState();
        if(!proizvod._id){
            const {data} = await Axios.post('/api/proizvodi', proizvod, {
                headers: {
                  Authorization: 'Bearer ' + korisnikInfo.token,
                },
        }); 
        dispatch({type: PROIZVOD_SACUVAJ_USPJEH, payload: data});
        } else {
            const {data} = await Axios.put('/api/proizvodi/' + proizvod._id, proizvod,
                {
                    headers: {
                      Authorization: 'Bearer ' + korisnikInfo.token,
                    },
        });
        dispatch({type: PROIZVOD_SACUVAJ_USPJEH, payload: data, uspjeh: true});
        }
       } catch (error) {
        dispatch({type: PROIZVOD_SACUVAJ_NEUSPJEH, payload: error.message});
    }
};

export { listaProizvodi, detaljiProizvod, sacuvajProizvod, izbrisiProizvod}