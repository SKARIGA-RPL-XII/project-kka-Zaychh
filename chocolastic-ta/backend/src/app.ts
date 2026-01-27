import "dotenv/config";
import { Elysia } from "elysia";
import { authRoute } from "./modules/auth/auth.route";

const app = new Elysia()
  .get("/", () => "API Chocolastic Was Ready")
  .use(authRoute)
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
