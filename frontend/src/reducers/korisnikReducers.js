import {KORISNIK_PRIJAVA_ZAHTJEV,
        KORISNIK_PRIJAVA_USPJEH, 
        KORISNIK_PRIJAVA_NEUSPJEH,
        KORISNIK_REGISTRACIJA_ZAHTJEV,
        KORISNIK_REGISTRACIJA_USPJEH,
        KORISNIK_REGISTRACIJA_NEUSPJEH, 
        KORISNIK_ODJAVA,
        KORISNIK_UREDI_ZAHTJEV, 
        KORISNIK_UREDI_USPJEH, 
        KORISNIK_UREDI_NEUSPJEH} from "../konstante/korisnikKonstante";


function korisnikPrijavaReducer(state={}, action){
    switch (action.type) {
        case KORISNIK_PRIJAVA_ZAHTJEV:
          return { ucitavanje: true };
        case KORISNIK_PRIJAVA_USPJEH:
          return { ucitavanje: false, korisnikInfo: action.payload };
        case KORISNIK_PRIJAVA_NEUSPJEH:
          return { ucitavanje: false, error: action.payload };
       case KORISNIK_ODJAVA:
          return {};
        default: return state;
      }
}

function korisnikRegistracijaReducer(state={}, action){
  switch (action.type) {
      case KORISNIK_REGISTRACIJA_ZAHTJEV:
        return { ucitavanje: true };
      case KORISNIK_REGISTRACIJA_USPJEH:
        return { ucitavanje: false, korisnikInfo: action.payload };
      case KORISNIK_REGISTRACIJA_NEUSPJEH:
        return { ucitavanje: false, error: action.payload };
      default: return state;
    }
}

function korisnikUrediReducer(state = {}, action) {
  switch (action.type) {
    case KORISNIK_UREDI_ZAHTJEV:
      return { ucitavanje: true };
    case KORISNIK_UREDI_USPJEH:
      return { ucitavanje: false, korisnikInfo: action.payload };
    case KORISNIK_UREDI_NEUSPJEH:
      return { ucitavanje: false, error: action.payload };
    default: return state;
  }
}

export {korisnikPrijavaReducer, korisnikRegistracijaReducer, korisnikUrediReducer}