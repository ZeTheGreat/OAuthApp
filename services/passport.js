const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

const User = mongoose.model('users')

passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) =>{
        User.findOne({googleID: profile.id})
            .then((existingUser)=>{
                if(existingUser){
                    //We already have the user in DB
                } else{
                    //We don't have the user in DB
                    new User ({ googleID: profile.id }).save();
                }
            }) ;
    }  
    )
);
