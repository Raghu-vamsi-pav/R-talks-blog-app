import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import {OAuth2Client} from 'google-auth-library';
import dotenv from "dotenv";
dotenv.config();

const client = new OAuth2Client(process.env.CLIENT_ID);

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    if(!users) {
        return res.status(404).json({ message: 'Users not found' });
    }
    return res.status(200).json({ users });
};

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    if(password === null) {
        return res.status(400).json({ 
            message: "specify password"
        })
    }
    let existingUser;
    try{
        existingUser = await User.findOne({ email });
    }catch(err){
        return console.log(err);
    }
    if(existingUser){
        return res.status(400).json({ message: 'User already exists login insted' });
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({ 
        name, 
        email, 
        password: hashedPassword,
        blogs: [],
    });
    
    try{
        await user.save();
    }catch{
        return console.log(err);
    }
    return res.status(201).json({user})
};


export const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({ email });
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({ message: "Counldn't find the user" });
    }
    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordValid){
        return res.status(400).json({ message: "Invalid password" });
    }
    let user = {email, name: existingUser.name, _id : existingUser._id};
    return res.status(200).json({ message: "Login successful", user});
};

export const googleLogin = async (req,res,next) => {
    const {tokenId} = req.body;

    if(!tokenId) {
        return res.status(400).json({message:"bad request"});
    }

    client
        .verifyIdToken({idToken:tokenId, audience: process.env.CLIENT_ID})
        .then(async (response) => {
            const {name, email, email_verified} = response.payload;
            if(email_verified) {
                try {
                   let existingUser = await User.findOne({email: email});
                   
                   if(existingUser) {
                    let user = {email: existingUser.email, name: existingUser.name, _id : existingUser._id};
                    return res.status(200).json({ message: "Login successful", user});
                   } else {
                    const user = new User({ 
                        name, 
                        email, 
                        blogs: []
                    });

                    try{
                        await user.save();
                    }catch{
                        return console.log(err);
                    }

                    return res.status(201).json({user})
                   }
                } catch(err) {
                    return console.log(err);
                }
            }
        })

}