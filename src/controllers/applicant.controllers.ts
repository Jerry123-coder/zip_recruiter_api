import e, { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import argon from "argon2";
dotenv.config();
import { Op } from "sequelize";

import Recruiter from "../models/recruiter.models";
import Applicant from "../models/applicant.models";
import Jobs from "../models/jobs.models";
import { generate } from "../services/jwt.services";
import Applications from "../models/applications.models";
import { jobApplications } from "../models/associations.models";
import { where } from "sequelize/types/sequelize";

//1. applicant sign up

async function applicantSignup(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    try {
      const { name, email, password, confirmPassword, cv, coverLetter } =
        req.body;

      if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Name, email or password not inputed",
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Passwords don't match, please try again",
        });
      }

      //input validity confirmed, now we hash the password with argon
      const hash = await argon.hash(password);

      const newUser = { name, email, password: hash, cv, coverLetter };

      const result = await Applicant.create(newUser);
      const signedupUser = result;

      return res.status(200).json({
        success: true,
        message: "Applicant account created successfully",
        data: signedupUser,
      });
    } catch (e) {
      console.error(e);
      res.status(404).json({
        success: false,
        message: "Account not created",
        data: "Error:" + e,
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: console.log(e), success: false });
  }
}

//2. applicant signin

async function applicantSignin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    try {
      const { email, password } = req.body;

      if (!password || !email) {
        return res.status(400).json({
          success: false,
          message: " email or password required",
        });
      }

      const user: any = await Applicant.findOne({ where: { email: email } });

      if (!user)
        return res.status(400).json({
          success: false,
          message: "Login unsuccessful, no such user",
        });

      // verify user password and generate access and refresh tokens

      console.log(user);
      const verify = await argon.verify(user.password, password);
      console.log({ verify, passwords: { db: user.password, password } });
      if (!verify)
        return res.status(400).json({
          success: false,
          message: "Invalid password",
          data: e,
        });

      const { accessToken, refreshToken }: any = await generate({
        data: { email: user.email, name: user.name, id: user.applicant_id },
      });

      const tokens = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      res.status(200).json({
        success: true,
        message: "signin successful",
        accessToken,
        refreshToken,
        data: user,
      });
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        success: false,
        message: "Login unsuccessful",
        data: console.log(e),
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: console.log(e), success: false });
  }
}

//3. update applicant profile

async function updateApplicantProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.body.applicant_id);
    var updatedApplicantData = req.body;
    const update = await Applicant.update(
      {
        name: updatedApplicantData.name,
        email: updatedApplicantData.email,
        password: updatedApplicantData.password,
        cv: updatedApplicantData.cv,
        cover_letter: updatedApplicantData.cover_letter,
      },
      {
        where: { applicant_id: id },
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

async function deleteApplicantProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.body.applicant_id);
    await Applicant.destroy({
      where: { applicant_id: id },
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

// 5. search jobs
async function jobs(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await Jobs.findAll();
    res.status(200).json({
      success: true,
      jobs: result,
    });

    console.log(result);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: console.log(e), success: false });
  }
}

// 5. search jobs
async function searchjobs(req: Request, res: Response, next: NextFunction) {
  try {
    const { job, location } = req.query;
    // console.log(searchData)
    // searchData = searchData.toLowerCase()
    if (!job || job === "" || !location || location === "")
      return res.json({ success: true, message: "add a search query" });

    const query: any = {};

    if (job && job !== "" && job !== "null") 
      query["job_title"] = {
        [Op.like]: `%${job}%`,
      };

    if (location && location !== "" && location !== "null")
      query["job_location"] = {
        [Op.like]: `%${location}%`,
      };

    const result = await Jobs.findAll({
      where: {
        ...query,
      },
    });
    res.status(200).json({
      success: true,
      jobs: result,
    });

    console.log(result);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: console.log(e), success: false });
  }
}

// 6. apply for job
async function application(req: Request, res: Response, next: NextFunction) {
  try {
    try {
      var  newJobApplication  = req.body;

      const appliedStatus = await Applications.findOne({ where: { applicant_email: req.body.applicant_email, jobJobId : req.body.jobJobId } })
      if (appliedStatus) {
        return res.status(200).json({
          success: true,
          applied: appliedStatus,
          message: "Already Applied",
        });
      }

      const result = await Applications.create(newJobApplication);
      newJobApplication = result.dataValues;

      return res.status(200).json({
        success: true,
        applied: appliedStatus,
        message: "Applied Successfully",
      });
    } catch (e) {
      console.error(e);
      res.status(404).json({ message: "Error: " + e });
    }

    return res.status(200).json({
      success: true,
      message: "applied successfully"
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: console.log(e), success: false });
  }
}

//generate all applicant's jobs
async function generateJobsApplied(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const result = await Applications.findAll({
      where: { applicantApplicantId: id },
    });
    const applications = [...result];
    // applications.map((job) => {
    //   const jobData = [...job.job_data]
    // })
    res.status(200).json({
      success: true,
      job_applications: applications,
    });
    console.log(jobs);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: console.log(e), success: false });
  }
}

export {
  applicantSignup,
  applicantSignin,
  updateApplicantProfile,
  deleteApplicantProfile,
  jobs,
  searchjobs,
  application,
  generateJobsApplied,
};
