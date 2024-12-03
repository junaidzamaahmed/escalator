import * as jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;
const refreshSecretKey = process.env.REFRESH_SECRET_KEY;

export function generateAccessToken(payload: jwt.JwtPayload) {
  const token = jwt.sign(payload, secretKey!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
}

export function generateRefreshToken(payload: jwt.JwtPayload) {
  const token = jwt.sign(payload, refreshSecretKey!, {
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
  });
  return token;
}
