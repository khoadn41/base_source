import { compareSync, hashSync } from 'bcrypt';

export const saltRound = 12;

export const encryptPassword = (password: string) => {
  return hashSync(password, saltRound);
};

export const comparePassword = (input: string, hashed: string) => {
  return compareSync(input, hashed);
};
