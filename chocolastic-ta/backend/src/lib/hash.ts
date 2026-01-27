import bcrypt from "bcryptjs";
import { password } from "bun";

export const hashPassword = (password: string) =>
    bcrypt.hashSync(password, 10);

export const comparePassword = (password: string, hash: string) =>
    bcrypt.compareSync(password, hash);