module.exports = {

	isLoggedIn(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		// res.redirect("/login");
	},

    errorHandler: (fn) => 
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next);
        
    }
}