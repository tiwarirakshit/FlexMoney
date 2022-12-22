const user = require("../models/user");

// home get method
const home = (req, res) => {
  try {
    res.render("index", { title: "flexmoney" });
  }
  catch (err) {
    res.status(500).send(err);
  }

}

// // Profile get method
// const profile =(req, res) =>{
//   try{
//     res.render("profile", { title: "Dashboard"} );
//   }
//   catch(err){
//     res.status(500).send(err);
//   }
// } 

// my Account get method
const profile = async(req, res) => {
  try {
    const {email} = req.params;
    let data = await user.findOne({email:email})
    console.log(data)
      if(!!data){
        res.render("profile", {user:data})
      }
      else{
        res.redirect("back")
      } 
  } catch {
    res.render('back');
  }

}

// payment get method
const getPayment = (req, res) => {
  try {
    res.render("payment", { title: "Checkout", email:req.params.email });
  }
  catch (err) {
    res.status(500).send(err);
  }

}

// signup  post method
const signUp = (req, res) => {
  try {
    // get all the values
    const { name, email, age , gender , batch } = req.body;
    console.log(req.body)
    // check if the are empty
    if (!email || !age || !gender || !batch) {
      res.render("signup", {
        err: "All Fields Required !",
      });
    } 
    else {
      // validate email and username and password
      // skipping validation
      // check if a user exists
      user.findOne(
        { $or: [{ email: email }, { name: name }] },
        function (err, data) {
          if (err) throw err;
          if (data) {
            res.render("index", {
              err: "User Exists, Try Logging In !",
            });
          } else {
            user({
              name: name,
              email: email,
              age: age,
              gender: gender,
              batch: batch,
            }).save((err, data) => {
              if (err) throw err;
              // login the user
              // use req.login
              // redirect , if you don't want to login
              res.redirect(`/payment/${email}`);
            });
          }
        }
      );
    }
  } catch (err) {
    console.log("In Catch Block");
    console.log(err);
  }
};

// login post method
const Login = async(req,res) =>{
  try{
    const{email} = req.body;
    if(!email){
      res.render("index")
    }
    else{
      let data = await user.find({email:email})
      if(!!data){
        res.redirect(`/profile/${email}`)
      }
      else{
        res.redirect("back")
      }
    }
    res.render("profile");
  }
  catch (err){
    console.log(err);
  }
}
// payment post method
const CompletePayment = async(req, res, next) => {
  try {
    // get all the values
    const { cardholdername, cardnum, exp , cvv, email } = req.body;
    console.log(req.body);
    // check if the are empty
    if (!cardholdername || !cardnum || !exp || !cvv || !email) {
      console.log("check")
      res.render("payment", {
        err: "All Fields Required !",
      });
    } 
    else {
      // validate email 
      // skipping validation
      // check if a user exists
      const filter = { email: email };
      const update = { cardholdername:cardholdername, cardnum : cardnum, exp:exp, cvv:cvv, paymentStatus: true };

      // `doc` is the document _before_ `update` was applied
      let doc = await user.findOneAndUpdate(filter, update);
      if (!!doc){
        console.log('index')
        res.redirect("/");
      }
      else{
        console.log('back')
        res.redirect("back");
      }
    }
  } catch (err) {
    console.log("In Catch Block");
    console.log(err);
  }
};

//  logout get method
const Logout = (req, res) => {
  req.logout();
  req.session.destroy(function (err) {
    res.redirect("/getLogin");
  });
};


module.exports = {
  home,
  signUp,
  Login,
  Logout,
  getPayment,
  CompletePayment,
  profile,
};
