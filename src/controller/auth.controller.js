import passport from "passport";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const securityToken = config.jwt.key;
const nameCookieToken = "token-cookie";

export const singUpController = passport.authenticate("singUpStrategy", {
  failureRedirect: "/api/auth/failure-page",
  session: false,
});

export const loginController = passport.authenticate("loginStrategy", {
  failureRedirect: "/api/auth/failure-page",
  session: false,
});

export class AuthController {
  async singUpRedirectController(req, res) {
    res.redirect("/login");
  }

  async loginRedirectController(req, res) {
    const token = jwt.sign(
      { email: req.user.email, role: req.user.role },
      securityToken
    );
    res
      .cookie(nameCookieToken, token, { httpOnly: true })
      .redirect("/products");
  }

  async curretController(req, res) {
    res.send(`Usuario autenticado, Bienvenido ${req.user.email}`);
  }

  async failurePageController(req, res) {
    req.logger.error(new Error());
    res.send({ status: "error", message: new Error() });
  }

  async loggerTest(req, res) {
    req.logger.fatal("nivel FATAL");
    req.logger.error("nivel ERROR");
    req.logger.warning("nivel WARNING");
    req.logger.info("nivel INFO");
    req.logger.http("nivel HTTP");
    req.logger.debug("nivel DEBUG");
    res.send({ status: "ok", message: "test  Logger" });
  }
}
