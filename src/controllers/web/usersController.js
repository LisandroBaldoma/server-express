export function loginView(req, res, next){
    res.render('login', { pageTitle:'Login' })
}

export function profileView(req,res,next){
    res.render('profile', { pageTitle:'Profile', user:req.session['user'] })
}

export function registerView(req,res,next){
    res.render('registerForm', { pageTitle:'Register' })
}