import passport from "passport";
// import { userRepository } from "../repository";

passport.serializeUser((user: any, cb) => {
  console.log(user, "user");
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  console.log(id, "user-id");

  // const user = await userRepository.getByID(id);
  // const { avator, username,role } = user;
  // if (user) cb(null, { id, avator, username,role });
});
