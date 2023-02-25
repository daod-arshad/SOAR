import passport from 'passport';
import passportJWT from 'passport-jwt';
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtSecret = ",7q'21681B-F>-#";
import User from "../schema/user.js";
import findUser from "../schema/user.js"
// Configure the JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};



const jwtStrategy = new JwtStrategy(jwtOptions, async(payload, done) => {
  // Check if the user exists in the database
  
  // const user =   User.find({
  //   username: User.username,
  //   password: User.password
  // })
  try {
  const user = await findUser(payload)
    if (user) {
    console.log('User found')
    console.log(payload)
    return done(null, user);
  } else {
    return done(null, false);
  }
} catch (error) {
  return done(error, false);
}
});

// Initialize Passport
passport.use(jwtStrategy);

// Create a middleware function to protect routes
const requireJwtAuth = passport.authenticate('jwt', { session: false });

export default requireJwtAuth;