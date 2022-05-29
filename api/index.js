import bodyParser from 'body-parser';
import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import categoryRoutes from "./routes/categories.js";
import multer from 'multer';
import path from "path";
import session from "express-session";
import passport from 'passport';
import strategy from "passport-google-oauth20";
import User from './models/User.js';

const app = express();
const GoogleStrategy = strategy.Strategy;
const __dirname = path.resolve();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/images', express.static(path.join(__dirname, '/images')))

mongoose.connect(process.env.CONNECTION_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(console.log(`Successfully connected to MONGO server!`))
    .catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    }, 
    filename: (req, file, callback) => {
        callback(null, req.body.name);
    },
});

const upload = multer({storage: storage});

app.post("/api/upload", upload.single("file"), (req, res) => {
    console.log("File has been uploaded");
    res.status(200).json("File has been uploaded");
});

app.use("/api/auth/", authRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/posts/", postRoutes);
app.use("/api/categories", categoryRoutes);

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile);
    User.findOne({googleId: profile.id}, (err, docs) => {
        if(err) return done(err);
        else {
            if(!docs) {
                const newUser = new User({username: profile.displayName, googleId: profile.id});
                newUser.save((err, res) => {
                    return done(err, res);
                });
            } else {
                return done(err, docs);
            }
        }
    });
}));




const PORT = 5000 || process.env.PORT;
app.listen(PORT, ()=>console.log(`Server is up and running on port: ${PORT}`));