exports.checarFormulario = (req,res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;     
    next();
}

exports.checarErroCsrf = (erro,req,res,next) => {
    if(erro && erro.code == 'EBADCSRFTOKEN') return res.render('erro404');
}

exports.csrfMiddleware = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (req,res,next) => {
    if(!req.session.user) {

        req.flash('errors', 'É necessário fazer login');
        return req.session.save(function() {
            res.redirect('/');
        })
    }

    next();
}