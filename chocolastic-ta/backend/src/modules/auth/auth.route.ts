import { Elysia, t } from "elysia";
import * as auth from "./auth.service";

export const authRoute = new Elysia({ prefix: "/auth" })
    .post(
        "/login",
        async ({ body }) => {
            return await auth.login(body.email, body.password);
        },
        {
            body: t.Object({
                email: t.String(),
                password: t.String(),
            }),
        }
    )

    .post(
        "/register",
        async ({ body }) => {
            return await auth.register(body);
        },
        {
            body: t.Object({
                name: t.String(),
                email: t.String(),
                password: t.String({ minLength: 8 }),
            }),
        }
    );