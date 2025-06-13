import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    console.log(username, password);
    const user = { username, password };
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
