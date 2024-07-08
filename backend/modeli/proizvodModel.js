import mongoose from 'mongoose';

const proizvodSchema = new mongoose.Schema({
  naziv: { type: String, required: true },
  kategorija: { type: String, required: true },
  slika: { type: String, required: true },
  cijena: { type: Number, default: 0, required: true },
  brend: { type: String, required: true },
  ocjena: { type: Number, default: 0, required: true },
  brKomentarta: { type: Number, default: 0, required: true },
  brNaStanju: { type: Number, default: 0, required: true },
  opis: { type: String, required: true }
})

const proizvodModel = mongoose.model("Proizvod", proizvodSchema);

export default proizvodModel;