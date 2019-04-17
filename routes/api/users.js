const express= require ('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const jwt = require('jsonwebtoken');
const {User}= require('../../models/user');
const passport = require('passport');
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
// api: /api/users/login
//desc: log in system
// access: public

router.post('/login',(req,res)=>{
    const {email,password}= req.body;
    User
        .findOne({email})
        .then(user=>{
            // Wrong email
            if(!user) return res.status(404).json({email:'Email does not exist'})
            
            bcrypt.compare(password,user.password)
                .then(isMatch=>{
                    if(!isMatch) return res.status(400).json({password:'Password incorrect'})
                    // return res.status(200).json({msg:'Success'})
                    const payload ={
                        id:user._id,
                        email:user.email,
                        fullName:user.fullName,
                        userType:user.userType
                    }
                    jwt.sign(
                        payload,
                        'doremon',
                        {expiresIn: '1h'},
                        (err,token)=>{
                            if(err) res.status(400).json({err: "err"}) 

                            res.status(200).json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        }
                    )
                })
                .catch(err => res.status(400).json({err: "err2"}))
        })
        .catch(err => res.status(400).json({err: "err3"}))

})
//test
router.get('/test', (req,res,next)=>{
    console.log('m1')
    next()
},(req,res,next)=>{
    console.log('m2')
    next()
},(req,res,next)=>{
    res.json({mgs:' finished'})
})
// test- current
router.get('/test-private',
    passport.authenticate('jwt',{session: false}),
    (req,res)=>{
        res.json({msg:'success'})
    }
)

module.exports = router;