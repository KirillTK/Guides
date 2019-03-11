const guardAdminApi = (req, res, next) => {
  req.isAuthenticated() && req.user.isAdmin
    ? next()
    : res.send({message: 'Access denied'});
};

const guardInstructionApi = (req, res, next) => {
  req.isAuthenticated()
    ? next()
    : res.send({message: 'Access denied'});
};


module.exports = {guardAdminApi, guardInstructionApi};
