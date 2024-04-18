import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const hashCompare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const createToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

const decodeToken = async (token) => {
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};

const validate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error('No Token Found');

    const payload = await decodeToken(token);
    req.headers.userId = payload.id;

    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime < payload.exp) {
      next();
    } else {
      throw new Error('Token Expired');
    }
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};
const adminGuard = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error('No Token Found');
  
      const payload = await decodeToken(token);
      next();
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  };
  
export default{
    hashPassword,
    hashCompare,
    createToken,
    validate,
    adminGuard
}