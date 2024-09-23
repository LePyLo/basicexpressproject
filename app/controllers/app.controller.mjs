
function index(req,res){
    res.render("index");
}
function info(req,res){
    res.end("eeea");
};

const controller = {
    index:index,
    info:info,
}

export default controller;




