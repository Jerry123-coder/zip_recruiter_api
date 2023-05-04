import e, { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

import Recruiter from "../models/recruiter.models";
import Jobs from "../models/jobs.models";
import Applicant from "../models/applicant.models";




//generate all recruiters
async function generateRecruiters(req: Request, res: Response, next: NextFunction) {
  try {
    

    try {
    
      const result = await Recruiter.findAll();
       

      return res.status(200).json({
        success: true,
        message: result,
        
      });

    } catch (e) {
      console.error(e);
      res.status(404).json({message: "Error: "+ e});
    }
      
   

  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: console.log(e), success: false });
  }
}

//generate all recruiter's jobs
async function generateRecruiterJobs(req: Request, res: Response, next: NextFunction) {
  try {

    const id = Number(req.params.id)
    const result = Jobs.findAll({where: {recruiterRecruiterId: id}})
    res.status(200).json({ 
      success: true,
      job_posts: result ,
      
    });
    console.log(result)

   
    // return res.status(200).json({
    //   success: true,
    //   message: "these are the jobs you've posted" + ,
      
    // });

  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: console.log(e), success: false });
  }
}


//generate all recruiter posted job applicants
async function generateJobApplicants(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.recruiter_id)
    const result = await Applicant.findAll({where: {id: id}});
    res.status(200).json({ 
      success: true,
      users: result 
    });

  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: console.log(e), success: false });
  }
}

//1. recruiter sign up

async function signup(req: Request, res: Response, next: NextFunction) {
    try {

        try {
        var newUser = req.body;
        const result = await Recruiter.create(newUser);
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
      
      const id = Number(req.body.recruiter_id);
      var newRecruiterData = req.body;
      const update = await Recruiter.update(
        {
          name: newRecruiterData.name,
          email: newRecruiterData.email,
          password: newRecruiterData.password,
          organization: newRecruiterData.organization
        },
        {
          where: { recruiter_id: id},
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
  

    //4. delete recruiter account

    async function deleteProfile(req: Request, res: Response, next: NextFunction) {
      try {
  
        const id = Number(req.body.recruiter_id);
        await Recruiter.destroy({
          where: {recruiter_id: id},
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


    // 5. post new job
    async function postJob(req: Request, res: Response, next: NextFunction) {
      try {
                
        try {
        var newJob = req.body;
        const result = await Jobs.create(newJob);
        newJob = result.dataValues

        return res.status(200).json({
          success: true,
          message: newJob,
        });

      } catch (e) {
        console.error(e);
        res.status(404).json({message: "Error: "+ e});
      }
       
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
          
          const id = Number(req.body.recruiterRecruiterId);
          var updatedJobData = req.body;
          const update = await Jobs.update(
            {
              job_id: updatedJobData.job_id,
              job_title: updatedJobData.job_title,
              job_location: updatedJobData.job_location,
              job_description: updatedJobData.job_description,
              pay: updatedJobData.pay
            },
            {
              where: { recruiterRecruiterId: id},
            }
          );
            
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
          
          const id = Number(req.body.job_id);
          await Jobs.destroy({
            where: {job_id: id},
          });
         
          return res.status(200).json({
            success: true,
            message: "job deleted successfully",
            
          });
    
        } catch (e) {
          console.error(e);
          return res.status(400).json({ message: console.log(e), success: false });
        }
      }


  export { generateRecruiters, generateRecruiterJobs, signup, signin, updateProfile, deleteProfile, postJob, updateJob, deleteJob };


  