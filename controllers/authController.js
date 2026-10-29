exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login into Airbnb",
    currentPage: "Login",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next)=>{
  console.log(req.body)
  req.session.isLoggedIn = true; 
  //res.cookie("isLoggedIn","true")
  res.redirect('/');
};

exports.postLogout = (req, res, next)=>{
  console.log(req.body)
  req.session.destroy(()=>{
  res.redirect('/login');
  });
  //res.cookie("isLoggedIn","false")
  
};