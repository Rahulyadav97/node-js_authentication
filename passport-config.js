const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

function initialize(passport,getUserByEmail,getUserById) {

    const authenticateUser = async (email,password,done) => {
        const user = getUserByEmail(Email);
        if(user==null){
            //done(error,isUserAuthenticated:boolean,Message:"")
            return done(null,false,{message:"no user with that email found"})
        }
        try{
               if(await bcrypt.compare(password,user.password))
               {
                done(null,user);
               }
               else{
                   return done(null,false,{message:"Password is incorrect"})
               }
        }
        catch(e){
               return done(e)
        }
    };
    passport.use(new LocalStrategy({usernameField: "email"}),authenticateUser);

    //TODO :Implement these


}
module.exports = initialize