import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'You are not authenticated!' });
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'You are not authenticated!' });
    }

    const decoded = jwt.verify(token, process.env.JWT); // Verify token using your secret key

    req.user = decoded; // Attach decoded user information to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};