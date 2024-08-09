const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const k = "hello_world";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,

    // Adjust the minimum length as needed
  },
  risk:{},
  riskfactors:{},
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  medicalHistory: {
    age: { type: Number },
    sex: { type: Number },
    cp: { type: Number },
    rbp: { type: Number },
    sc: { type: Number },
    fbs: { type: Number },
    rer: { type: Number },
    mhr: { type: Number },
    eia: { type: Number },
    olds: { type: Number },
    st: { type: Number },
    mvs: { type: Number },
    thal: { type: Number },
  },
  
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, "hello world");
  this.tokens = this.tokens.concat({ token: token });
  await this.save();

  return token;
};

const User = mongoose.model("articles", userSchema);
module.exports = User;
