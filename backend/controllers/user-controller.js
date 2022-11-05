import User from '../model/User.js';
import bcrypt from 'bcryptjs';

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