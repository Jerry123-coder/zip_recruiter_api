import e, { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

import Recruiter from "../models/recruiter.models";
import Applicant from "../models/applicant.models";
import Jobs from "../models/jobs.models";


//1. applicant sign up

async function applicantSignup(req: Request, res: Response, next: NextFunction) {
    try {

      try {
        var newUser = req.body;
        const result = await Applicant.create(newUser);
        newUser = result.dataValues

        return res.status(200).json({
          success: true,
          message: newUser,
        });

      } catch (e) {
        console.error(e);
        res.status(404).json({message: "Error: "+ e});
      }

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
      
      const id = Number(req.body.applicant_id);
      var updatedApplicantData = req.body;
      const update = await Applicant.update(
        {
          name: updatedApplicantData.name,
          email: updatedApplicantData.email,
          password: updatedApplicantData.password,
          cv: updatedApplicantData.cv,
          cover_letter: updatedApplicantData.cover_letter
        },
        {
          where: { applicant_id: id},
        }
      );


      return res.status(200).json({
        success: true,
        message: "update successful",
       
      });

    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: console.log(e), success: false });
    }
  }
  

    //4. delete applicant account

    async function deleteApplicantProfile(req: Request, res: Response, next: NextFunction) {
      try {

        const id = Number(req.body.applicant_id);
        await Applicant.destroy({
          where: {applicant_id: id},
        });
  
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
        
        const result = await Jobs.findAll();
        res.status(200).json({ 
          success: true,
          jobs: result 
        });

       
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
          
          try {
            var newJobApplication = req.body;
            const result = await Jobs.create(newJobApplication);
            newJobApplication = result.dataValues
    
            return res.status(200).json({
              success: true,
              message: newJobApplication,
            });
    
          } catch (e) {
            console.error(e);
            res.status(404).json({message: "Error: "+ e});
          }
         
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


  