exports.middlewareGlobal = (req,res,next) => {
    console.log('sou o middleware global');
    next();
}

exports.checarErroCsrf = (erro,req,res,next) => {
    if(erro && erro.code === "EBADCSRFTOKEN") return res.send(`<h1>ERRO PAIZAO</h1>`);
}

exports.csrfMiddleware = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}