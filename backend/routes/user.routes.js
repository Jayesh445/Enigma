import exprss from "express";
import { Login, Register } from "../controllers/usercontroller.js";

const routes = exprss.Router();

routes.post("/api/register", Register);
routes.post("/api/login", Login);

export default routes;
