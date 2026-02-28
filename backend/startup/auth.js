import passport from "passport";

const configureAuth = (userModel) => {
  passport.use(userModel.createStrategy());
  passport.serializeUser(userModel.serializeUser());
  passport.deserializeUser(userModel.deserializeUser());

  return passport.initialize();
};

export { configureAuth };
