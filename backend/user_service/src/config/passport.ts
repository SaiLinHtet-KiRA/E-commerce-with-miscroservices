import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { userRepository } from "../repository";

passport.use(
  new LocalStrategy({ usernameField: "email" }, function verify(
    email,
    password,
    cb
  ) {
    console.log(email, password);
    userRepository.findBy({ email });
    const user = { email, password };
    cb(user);
  })
);

passport.serializeUser((user, cb) => {
  console.log("serializeUser ", user);
  cb(null, user);
});

passport.deserializeUser(async (id: any, cb) => {
  //   const user = await User.findById(id, { cart: 0, order: 0, liked: 0 }).catch(
  //     (err) => {
  //       cb(err, null);
  //     }
  //   );

  //   if (user) cb(null, user);
  console.log("deserializeUser  id-", id);

  cb(null, id);
});
