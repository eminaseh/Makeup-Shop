import mongoose from 'mongoose';

const korisnikSchema = new mongoose.Schema({
  ime: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  lozinka: { type: String, required: true },
  daLiJeAdmin: { type: Boolean, required: true, default: false },
})

const korisnikModel = mongoose.model("Korisnik", korisnikSchema);

export default korisnikModel;