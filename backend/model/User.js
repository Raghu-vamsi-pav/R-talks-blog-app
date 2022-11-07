import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
        // required: true,
        minlength: 8,
        // select : false
    },
    googleTokenId: {
        type: String
    },
    blogs: [{type: mongoose.Types.ObjectId, ref: "Blog", required: true}],
});

// userSchema.pre("save", () => {
//     if(this.password === null && this.googleTokenId === null) {

//     }
// })
export default mongoose.model("User", userSchema);