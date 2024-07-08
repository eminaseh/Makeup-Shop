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
         PROIZVOD_IZBRISI_NEUSPJEH} from "../konstante/proizvodKonstante";

function proizvodListaReducer(state = { proizvodi: [] }, action) {
    switch (action.type) {
      case PROIZVOD_LISTA_ZAHTJEV:
        return { ucitavanje: true, proizvodi: [] };
      case PROIZVOD_LISTA_USPJEH:
        return { ucitavanje: false, proizvodi: action.payload };
      case PROIZVOD_LISTA_NEUSPJEH:
        return { ucitavanje: false, error: action.payload };
      default:
        return state;
    }
  }

  function proizvodDetaljiReducer(state = { proizvod: {} }, action) {
    switch (action.type) {
      case PROIZVOD_DETALJI_ZAHTJEV:
        return { ucitavanje: true};
      case PROIZVOD_DETALJI_USPJEH:
        return { ucitavanje: false, proizvod: action.payload };
      case PROIZVOD_DETALJI_NEUSPJEH:
        return { ucitavanje: false, error: action.payload };
      default:
        return state;
    }
  }

  function proizvodIzbrisiReducer(state = { proizvod: {} }, action) {
    switch (action.type) {
      case PROIZVOD_IZBRISI_ZAHTJEV:
        return { ucitavanje: true};
      case PROIZVOD_IZBRISI_USPJEH:
        return { ucitavanje: false, proizvod: action.payload, uspjeh: true };
      case PROIZVOD_IZBRISI_NEUSPJEH:
        return { ucitavanje: false, error: action.payload };
      default:
        return state;
    }
  }

  function proizvodSacuvajReducer(state = { proizvod: {} }, action) {
    switch (action.type) {
      case PROIZVOD_SACUVAJ_ZAHTJEV:
        return { ucitavanje: true};
      case PROIZVOD_SACUVAJ_USPJEH:
        return { ucitavanje: false, uspjeh: true, proizvod: action.payload };
      case PROIZVOD_SACUVAJ_NEUSPJEH:
        return { ucitavanje: false, error: action.payload };
      default:
        return state;
    }
  }

  export{ proizvodListaReducer, proizvodDetaljiReducer, proizvodSacuvajReducer, proizvodIzbrisiReducer };