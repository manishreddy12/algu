const authoriseRoles =(...allowedRoles)=>{
    return (req,res,next)=>{
        if(!allowedRoles.includes(req.user.role)){
            console.log("expected "+ allowedRoles+" but got "+ req.user.role);
            return res.status(404).send("Access denied");
        }
        next();
    };
};

module.exports = authoriseRoles;