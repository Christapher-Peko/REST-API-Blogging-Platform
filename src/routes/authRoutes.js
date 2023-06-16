

const authRouter = (router) => {

  router.route('/logout').post((req,res)=>{
    res.send("hai")
  });

  return router;
}

export default authRouter;
