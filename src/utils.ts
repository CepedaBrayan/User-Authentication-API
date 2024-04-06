import * as bcrypt from 'bcrypt';
import { bcryptConstants } from './constants';

export function hashPassword(password: string): Promise<string> {
  const saltOrRounds = bcryptConstants.saltOrRounds;
  return bcrypt.hash(password, saltOrRounds);
}

export function comparePasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
