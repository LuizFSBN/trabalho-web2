import * as bcrypt from 'bcryptjs';
export const hash = (p: string) => bcrypt.hash(p, 10);
export const compare = (p: string, hashP: string) => bcrypt.compare(p, hashP);
