import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { userRepository } from "../repository";
import bcrypt from "bcryptjs";
import { ValidationError } from "../util/error/errors";

passport.use(
  new LocalStrategy({ usernameField: "authfield" }, async function verify(
    authfield,
    password,
    cb
  ) {
    const user = await userRepository.findBy(authfield);
    if (user) {
      const verifyPassword = bcrypt.compareSync(password, user.password);
      console.log("verifyPassword", verifyPassword);
      if (verifyPassword) {
        return cb(null, user);
      } else {
        return cb(new ValidationError("Wrong Password"));
      }
    }
    return cb(new ValidationError("User dose not found"));
  })
);

passport.serializeUser((user: any, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id: number, cb) => {
  const user = await userRepository.getByID(id);

  if (user) cb(null, user);
});
