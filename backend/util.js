import jwt from 'jsonwebtoken';
import config from './config';

const getToken = (korisnik) => {
    return jwt.sign(
      {
        _id: korisnik._id,
        ime: korisnik.ime,
        email: korisnik.email,
        daLiJeAdmin: korisnik.daLiJeAdmin,
    }, config.JWT_SECRET, 
    {
        expiresIn: '30d',
    }
    )
}

const daLiJeAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      const onlyToken = token.slice(7, token.length);
      jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
        if (err) {
          return res.status(401).send({ msg: 'Nevažeći token' });
        }
        req.korisnik = decode;
        next();
        return;
      });
    } else {
      return res.status(401).send({ msg: 'Token nije isporučen.' });
    }
  };

const daLiJeAdmin = (req, res, next) => {
    console.log(req.korisnik);
    if (req.korisnik && req.korisnik.daLiJeAdmin) {
      return next();
    }
    return res.status(401).send({ message: 'Admin token nije važeći.' });
  };

export { getToken, daLiJeAuth, daLiJeAdmin };

