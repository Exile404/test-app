// jwt.js
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (token) {
    // Handle JWT authentication
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.userId = payload.id;
      next();
    });
  } else {
    // Handle Google authentication
    passport.authenticate('google', { session: false })(req, res, next);
  }
};
