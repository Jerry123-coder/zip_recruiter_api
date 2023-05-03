import e, { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

import Recruiter from "../models/recruiter.models";


//1. recruiter sign up

async function signup(req: Request, res: Response, next: NextFunction) {
    try {

        return res.status(200).json({
          success: true,
          message: "signup successful",
        });

    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: console.log(e), success: false });
    }
  }
  


  //2. recruiter signin

  async function signin(req: Request, res: Response, next: NextFunction) {
    try {
      

      res.status(200).json({
        success: true,
        message: "signin successful",
       
      });

    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: console.log(e), success: false });
    }
  }


  //3. update recruiter profile

  async function updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      


      return res.status(200).json({
        success: true,
        message: "update successful",
       
      });

    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: console.log(e), success: false });
    }
  }
  

    //4. delete recruiter account

    async function deleteProfile(req: Request, res: Response, next: NextFunction) {
      try {
  
        return res.status(200).json({
          success: true,
          message: "profile deleted successfully",
         
        });
  
      } catch (e) {
        console.error(e);
        return res.status(400).json({ message: console.log(e), success: false });
      }
    }
    
    //jobs


    // 5. post new job
    async function postJob(req: Request, res: Response, next: NextFunction) {
      try {
                
       
        return res.status(200).json({
          success: true,
          message: "job posted successfully",
          
        });
  
      } catch (e) {
        console.error(e);
        return res.status(400).json({ message: console.log(e), success: false });
      }
    }


     // 6. update job
     async function updateJob(req: Request, res: Response, next: NextFunction) {
        try {
                  
         
          return res.status(200).json({
            success: true,
            message: "job updated successfully",
            
          });
    
        } catch (e) {
          console.error(e);
          return res.status(400).json({ message: console.log(e), success: false });
        }
      }

       // 6. delete job
     async function deleteJob(req: Request, res: Response, next: NextFunction) {
        try {
                  
         
          return res.status(200).json({
            success: true,
            message: "job deleted successfully",
            
          });
    
        } catch (e) {
          console.error(e);
          return res.status(400).json({ message: console.log(e), success: false });
        }
      }


  export { signup, signin, updateProfile, deleteProfile, postJob, updateJob, deleteJob };


  