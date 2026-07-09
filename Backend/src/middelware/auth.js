import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();


export default function auth(req, res, next) {
const authHeader = req.headers.authorization;
if (!authHeader) return res.status(401).json({ message: 'No token provided' });


const token = authHeader.split(' ')[1];
if (!token) return res.status(401).json({ message: 'invalid token' });


try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = { id: decoded.id, email: decoded.email };
next();
} catch (err) {
return res.status(401).json({ message: 'Token invalid or expired' });
}
}