import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export const bcryptConstants = {
  saltOrRounds: parseInt(process.env.BCRYPT_SALT_OR_ROUNDS, 10),
};
