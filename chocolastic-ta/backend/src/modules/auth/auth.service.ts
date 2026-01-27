import { db } from "../../lib/db";
import { RowDataPacket } from "mysql2";
import { hashPassword, comparePassword } from "../../lib/hash";
import { signToken } from "../../lib/jwt";

export async function register(data: any) {
    const hashed = await hashPassword(data.password);

    await db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [data.name, data.email, hashed]
    );
}

export async function login(email: string, password: string) {
    const [rows] = await db.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if (rows.length === 0) {
     throw new Error("User tidak ditemukan!");
}

    const user = rows[0] as any;
    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error("Password Salah!");

    const token = signToken({ id: user.id, role: user.role });

    return { token, role: user.role};
}