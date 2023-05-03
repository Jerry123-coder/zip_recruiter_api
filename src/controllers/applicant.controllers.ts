import e, { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

import Recruiter from "../models/recruiter.models";


//1. applicant sign up

async function applicantSignup(req: Request, res: Response, next: NextFunction) {
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
  


  //2. applicant signin

  async function applicantSignin(req: Request, res: Response, next: NextFunction) {
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


  //3. update applicant profile

  async function updateApplicantProfile(req: Request, res: Response, next: NextFunction) {
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

    async function deleteApplicantProfile(req: Request, res: Response, next: NextFunction) {
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


    // 5. search jobs
    async function jobs(req: Request, res: Response, next: NextFunction) {
      try {
                
       
        return res.status(200).json({
          success: true,
          message: "these are the available jobs",
          
        });
  
      } catch (e) {
        console.error(e);
        return res.status(400).json({ message: console.log(e), success: false });
      }
    }


     // 6. apply for job
     async function application(req: Request, res: Response, next: NextFunction) {
        try {
                  
         
          return res.status(200).json({
            success: true,
            message: "applied successfully",
            
          });
    
        } catch (e) {
          console.error(e);
          return res.status(400).json({ message: console.log(e), success: false });
        }
      }

      


  export { applicantSignup, applicantSignin, updateApplicantProfile, deleteApplicantProfile, jobs, application };


  