const Contato = require('../models/contatoModel')

exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    });
}

//toda async function retorna uma promisse, entao essa função tb é async para esperar a promisse da async function do model
exports.register = async function(req,res) {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect(`/contato/`))
            return;
        }

        req.flash('success', 'Seu contato foi registrado com sucesso!');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;

    } catch(e) {
        console.log(e);
        return res.render('404');
    }
}

exports.editIndex = async function(req,res) {
    if(!req.params.id) return res.render('404');
    const contato = await Contato.buscaID(req.params.id);

    res.render('contato', {contato: contato});
}

exports.edit = async function(req,res) {
    try {
        if(!req.params.id) return res.render('erro404');

        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => {
            res.redirect(`/contato/index/${req.params.id}`);
            return;
            })
        }

        req.flash('success', 'Contato editado com sucesso.');
    } catch(e) {
        console.log(e);
        return res.render('erro404');
    }

    req.session.save(()=> res.redirect(`/contato/index/${req.params.id}`));
}

exports.delete = async(req,res) => {
    if(!req.params.id) return res.render('erro404');

    const contato = await Contato.delete(req.params.id);
    if(!contato) return res.render("erro404");

    req.flash('success', 'Contato apagado com sucesso!');
    req.session.save(() => res.redirect(`/`));
    return;
}