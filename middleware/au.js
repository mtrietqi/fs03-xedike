const au = (role)=>{
    return (req,res,next)=>{
        if(req.user.userType===role){
            next()
        }else{
            res.status(400).json('you do not have permission')
        }
    }
}
module.exports= {au}