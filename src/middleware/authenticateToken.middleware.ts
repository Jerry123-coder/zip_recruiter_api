// import { IToken, verify } from "../services/jwt.services";
import { Request, Response, NextFunction } from "express";


const authenticateToken = async (req: Request, res:Response, next:NextFunction) => {
  try {
   
    //split and takeout access token from authorization header
    // const token: any = req.headers.authorization.split(" ")[1];  
 
    // console.log(token);

    //token verification
    // const decode: any = await verify({ data: token });

    //pected original object assigned to the user key in the request body object
    // req.body["user"] = decode.data;

    next();
  } catch (e) {
    res.status(404).json({ message: e });
  }
};
export default authenticateToken;
