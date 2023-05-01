import express from 'express';
import passport from 'passport';
import * as userRepository from '../database/user.js'

const router = express.Router();

// google login (Google OAuth2)
router.get('/login/google', 
  passport.authenticate('googleLogin', { scope: ['profile'] }));

router.get('/signup/google', (req, res) => {
   const googleID = req.flash('googleID');
 
   if(googleID == undefined) {
     res.redirect('/auth/login/google')
   } else {
     res.status(200).json(googleID)
   }
 });


router.post('/signup/google', async (req, res) => {
   const { username, googleID, avatarUrl } = req.body;

   if (googleID == 'undefined') {
      res.status(404).json({ message: 'no googleID' });
   } else {
      const newUser = await userRepository.create(username, googleID, avatarUrl);
      if (newUser) {
         req.session.passport = { user: googleID, username: username };
         res.status(200).json(req.session);
      } else {
         res.status(404).json({ message: 'signup failed' });
      }
   }
});

// google OAuth2 callback function
router.get('/login/google/callback',
   passport.authenticate('googleLogin', { failureRedirect: '/auth/signup/google' }),
   async (req, res) => {
      if (req.sessionID) {
        res.status(200);

        const userPassport = await req.session.passport.user;

        const user = await userRepository.findUser(userPassport.googleID);

        if (!user.rwthVerified) {
          res.cookie("googleID", userPassport.googleID);
          // TODO: 수정할 것 - paramteter가 주소에 노출되는 보안 문제 - 다른 방법을 찾아야 함!!!
          // return res.redirect(`http://localhost:4200/login/?googleID=${userPassport.googleID}`);
          return res.redirect(`http://localhost:4200/login`);
        } 
        return res.redirect(`http://localhost:4200/?username=${userPassport.username}&googleID=${userPassport.googleID}`);
        
      } else {
         return res.status(404).json({ message: 'login failed'});
      }
   },
);

router.put('google/update/verified', async (req, res) => {
  const rwthVerified = req.body;
  const update = await userRepository.updateVerfied(rwthVerified);
  if (update) {
    res.status(200);
  } else {
    res.status(404).json({ message: 'user not found' });
  }
})

router.put('/google/update', async (req, res) => {
   const { googleID, username, avatarUrl } = req.body;
   const update = await userRepository.update(googleID, username, avatarUrl);
   if (update) {
      res.status(200).json(update);
   } else {
      res.status(404).json({ message: 'user not found' });
   }
   res.status(200);
});

router.get('/logout', (req, res) => {
   req.session.destroy((err) => {
      res.status(200).redirect('/');
   });
});

export default router;
