const mongoose= require("mongoose")

const blacklistTokenSchema=new mongoose.Schema({
    token:{
        type: String,
        required: [true,"token is required to be added in blacklist"],
        index: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24   // tokens live 1 day, so drop the entry after that
    }
})

const tokenBlacklistModel= mongoose.model("blacklistTokens",blacklistTokenSchema)

module.exports=tokenBlacklistModel