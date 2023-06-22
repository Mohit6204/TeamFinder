import jwt from "jsonwebtoken";

export const verifyToken=async (req,res,next)=>{
  try {
    let token=req.headers.authorization;
    if(!token){
        return res.status(403).send("Access Denied");
    }
    const verified=jwt.verify(token, process.env.JWT_SECRET);
    req.user=verified.id;
    next();
  } catch (error) {
    res.status(500).json({error:error.message});
  }
};