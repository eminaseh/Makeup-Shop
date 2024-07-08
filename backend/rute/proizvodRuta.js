import express from 'express';
import Proizvod from '../modeli/proizvodModel';
import { daLiJeAuth, daLiJeAdmin } from '../util';


const router = express.Router();



router.get("/:id", async (req, res) => {
    const proizvod = await Proizvod.findOne({_id: req.params.id});
    if(proizvod){
        res.send(proizvod);
    } else {
        return status(404).send({message: 'Proizvod nije pronađen.'});
    }  
});

router.post("/", daLiJeAuth, daLiJeAdmin, async (req, res) => {
    const proizvod = new Proizvod({
        naziv: req.body.naziv,
        kategorija: req.body.kategorija,
        slika: req.body.slika,
        cijena: req.body.cijena,
        brend: req.body.brend,
        ocjena: req.body.ocjena,
        brKomentara: req.body.brKomentara,
        brNaStanju: req.body.brNaStanju,
        opis: req.body.opis
    });
    const noviProizvod = await proizvod.save();
    if(noviProizvod){
      return res.status(201).send({message: 'Kreiran novi proizvod.', data: noviProizvod});/*Zahtjev je ispunjen i kreiran je novi proizvod */
    }
    return res.status(500).send({message: 'Greška prilikom kreiranja proizvoda'});/*Došlo je do greške */
})

router.put("/:id", daLiJeAuth, daLiJeAdmin, async (req, res) => {
    const proizvodId = req.params.id;
    const proizvod = await Proizvod.findById(proizvodId);
    if(proizvod){
            proizvod.naziv = req.body.naziv;
            proizvod.kategorija = req.body.kategorija;
            proizvod.slika = req.body.slika;
            proizvod.cijena = req.body.cijena;
            proizvod.brend = req.body.brend;
            proizvod.brNaStanju = req.body.brNaStanju;
            proizvod.opis = req.body.opis;
            const uredjeniProizvod = await proizvod.save();
            if(uredjeniProizvod){
              return res.status(201).send({message: 'Proizvod uređen.', data: uredjeniProizvod});
            }
        }   
        return res.status(500).send({message: 'Greška prilikom uređivanja proizvoda'});
});

router.delete("/:id", daLiJeAuth, daLiJeAdmin, async (req, res) =>{
    const izbrisaniProizvod = await Proizvod.findById(req.params.id);
    if(izbrisaniProizvod){
        await izbrisaniProizvod.remove();
        res.send({message: "Proizvod izbrisan."});
    } else{
        res.send({message: "Došlo je do greške prilikom brisanja proizvoda."});
    }
});

router.get('/', async (req, res) => {
    const kategorija = req.query.kategorija ? { kategorija: req.query.kategorija } : {};
    const proizvodi = await Proizvod.find({ ...kategorija});
    res.send(proizvodi);
  });


export default router;