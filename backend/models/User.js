const mongoose=reuire("mongoose")
const bcrypt = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim: true,
    },
    email:{
        type : String,
        required : true,
        unique:true,
        trim: true,
        mtch:[/.+\@.+\..+/, "Please enter a valid email address"]
    },
    password:{
        type : String,
        required : true,
        minLength: 6,
    },
    role:{
        type : String,
        enum: ["customer", "admin"]
        default : "customer",
    },
    {timestamps: true}
})

// Password Hash middleware

userSchema.pre("save", async function(next){
    it{!this.isModified("Password") return next()
        const salt = await bcrypt.Salt(10)
        this.password=  await bcrypt.hash(this.password, salt)
        next();
    }
})


//  compare User entered password to Hashed Password

userSchema.methods.matchPassword = async function (enteredPassword){
    retuen await bcrypt.compare(enteredPassword ,this.password)
};

module.exports = mongoose.model("User", userSchema);