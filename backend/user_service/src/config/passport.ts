import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { userRepository } from "../repository";
import bcrypt from "bcryptjs";

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
        console.log("here");
        return cb(null, user);
      }
    }
    // cb(user);
  })
);

passport.serializeUser((user: any, cb) => {
  console.log("serializeUser ", user);
  cb(null, user.id);
});

passport.deserializeUser(async (id: number, cb) => {
  const user = await userRepository.getByID(id);
  console.log("deserializeUser  ", user);
  if (user) cb(null, user);
});
