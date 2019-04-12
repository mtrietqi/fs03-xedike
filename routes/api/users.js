const express= require ('express');
const bcrypt = require('bcryptjs')
const router = express.Router();

const {User}= require('../../models/user');
// router.get('/',(req,res)=>{
//     res.status(200).json({
//         massage: "Hello World"
//     })
// })

// api: /api/users/register
// desc: register a new user
// access: PUBLIC

router.post('/register',( req,res)=>{
    // console.log(User);
    const{email, password,fullName, phone, dateOfBirth} = req.body;
    User.findOne({$or: [{email},{phone}]})
        .then(user=>{
        //user exist
        if(user) return res.status(400).json({
            errors: 'Email or phone exists'
        })

        //user not exist
        const newUser= new User({
            email, password,fullName, phone, dateOfBirth
        })

        bcrypt.genSalt(10, (err,salt)=>{
            if(err) return console.log(err)

            bcrypt.hash(newUser.password,salt, (err,hash)=>{
                if(err) return console.log(err)

                newUser.password=hash;
                newUser.save()
                        .then(user=>{
                            res.status(200).json(user)
                        })
                        .catch(err=> res.status(400).json(err))
            })
        })
    })
    .catch(err=> res.status(400).json(err))
})
module.exports = router;