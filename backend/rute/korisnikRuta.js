import express from 'express';
import Korisnik from '../modeli/korisnikModel';
import { getToken, daLiJeAuth } from '../util';


const router = express.Router();

router.post('/prijava', async (req, res) => {
  const prijavaKorisnika = await Korisnik.findOne({
    email: req.body.email,
    lozinka: req.body.lozinka
  });
  if(prijavaKorisnika){
    res.send({
      _id: prijavaKorisnika.id,
      ime: prijavaKorisnika.ime,
      email: prijavaKorisnika.email,
      daLiJeAdmin: prijavaKorisnika.daLiJeAdmin,
      token: getToken(prijavaKorisnika)
    })
  } else {
    res.status(401).send({msg: 'Neispravan email ili lozinka.'});
  }
});

router.post('/registracija', async (req, res) => {
  const korisnik = new Korisnik({
    ime: req.body.ime,
    email: req.body.email,
    lozinka: req.body.lozinka
  });
  const noviKorisnik = await korisnik.save();
  if(noviKorisnik){
    res.send({
      _id: noviKorisnik.id,
      ime: noviKorisnik.ime,
      email: noviKorisnik.email,
      daLiJeAdmin: noviKorisnik.daLiJeAdmin,
      token: getToken(noviKorisnik)
    })
  } 
  else {
    res.status(401).send({msg: 'Neispravani podaci.'});
  }
});

router.get("/kreirajadmina", async (req, res) => {

  try {
    const korisnik = new Korisnik({
        ime: 'Emina',
        email: 'em.seh.sa1@gmail.com',
        lozinka: '123456',
        daLiJeAdmin: true
    });

    const noviKorisnik = await korisnik.save();
    res.send(korisnik);
      
  } catch (error) {
      res.send({msg: error.message});
      
  }

});


router.put('/:id', daLiJeAuth, async (req, res) => {
  const korisnikId = req.params.id;
  const korisnik = await Korisnik.findById(korisnikId);
  if (korisnik) {
    korisnik.ime = req.body.ime || korisnik.ime;
    korisnik.email = req.body.email || korisnik.email;
    korisnik.lozinka = req.body.lozinka || korisnik.lozinka;
    const azuriranKorisnik = await korisnik.save();
    res.send({
      _id: azuriranKorisnik.id,
      ime: azuriranKorisnik.ime,
      email: azuriranKorisnik.email,
      daLiJeAdmin: azuriranKorisnik.daLiJeAdmin,
      token: getToken(azuriranKorisnik),
    });
  } else {
    res.status(404).send({ message: 'Korisnik nije pronađen.' });
  }
});

export default router;