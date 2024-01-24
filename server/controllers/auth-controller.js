import User from "../models/user-model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

dotenv.config()

passport.use(
  new GoogleStrategy(
    {
      clientID:  process.env.CLIENT_ID,
      clientSecret:  process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:8800/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists in your database
        let user = await User.findOne({ googleId: profile.id });

        // If user doesn't exist, create a new user
        if (!user) {
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            username: profile.displayName
            // Add other necessary fields
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Use a unique identifier for serialization (e.g., user.id)
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or email!"));

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res.cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    }).status(200).send("User has been logged out.");
};
export const success = async (req, res) =>  {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
};
export const googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
});


export const googleLoginCallback = (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      // Google login failed
      return res.status(401).json({ error: true, message: "Google login failed" });
    }

    // Google login successful
    req.login(user, async (err) => {
      if (err) {
        return next(err);
      }

      // Store user data in a cookie
      res.cookie('userData', JSON.stringify({
        id: user._id,
        email: user.email || req.user.email,
        name: user.name || req.user.name,
        // Add other necessary fields
      }));

      // Redirect to the GoogleLoginSuccess page
      res.redirect('http://localhost:5173/google-login-success');
    });
  })(req, res, next);
};

