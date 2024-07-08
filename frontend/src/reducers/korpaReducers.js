import { KORPA_DODAJ_ARTIKAL,
         KORPA_UKLONI_ARTIKAL,
         KORPA_SACUVAJ_DOSTAVU,
         KORPA_SACUVAJ_PLACANJE} from "../konstante/korpaKonstante";

function korpaReducer(state = { korpaArtikli: [], dostava:{}, placanje:{} }, action) {
    switch (action.type) {
      case KORPA_DODAJ_ARTIKAL:
        const artikal = action.payload;
        const proizvod = state.korpaArtikli.find(x => x.proizvod === artikal.proizvod);
        if (proizvod) {
            return { 
                korpaArtikli: 
                state.korpaArtikli.map(x => x.proizvod === proizvod.proizvod ? artikal : x)
            };  
        }
        return { korpaArtikli: [...state.korpaArtikli, artikal]};
        case KORPA_UKLONI_ARTIKAL:
          return { korpaArtikli: state.korpaArtikli.filter(x=>x.proizvod!==action.payload)};
        case KORPA_SACUVAJ_DOSTAVU:
          return {...state, dostava: action.payload };
        case KORPA_SACUVAJ_PLACANJE:
          return {...state, placanje: action.payload };
        default:
          return state;
    }
  }


  export {korpaReducer}