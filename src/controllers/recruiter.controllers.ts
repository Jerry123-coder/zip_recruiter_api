import e, { NextFunction, Request, Response } from "express";
import * as argon from "argon2";
import * as dotenv from "dotenv";
dotenv.config();

import Recruiter from "../models/recruiter.models";
import Jobs from "../models/jobs.models";
import Applicant from "../models/applicant.models";
import { isArgumentsObject } from "util/types";
import { generate } from "../services/jwt.services";
import { verify } from "../services/jwt.services";

var jobs= []

//generate all recruiters
async function generateRecruiters(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    try {
      const result = await Recruiter.findAll();
      return res.status(200).json({
        success: true,
        message: result,
      });
    } catch (e) {
      console.error(e);
      res.status(404).json({ message: "Error: " + e });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: console.log(e), success: false });
  }
}

//generate all recruiter's jobs
async function generateRecruiterJobs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const result = await Jobs.findAll({ where: { recruiterRecruiterId: id } });
    jobs = [...result]
    res.status(200).json({
      success: true,
      job_posts: jobs,
    });
    console.log(jobs);

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
async function generateJobApplicants(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.recruiter_id);
    const result = await Applicant.findAll({ where: { id: id } });
    res.status(200).json({
      success: true,
      users: result,
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
      const { name, email, password, confirmPassword, organization } = req.body;

      if (!name || !email || !password || !confirmPassword || !organization) {
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

      const newUser = { name, email, password: hash, organization };

      const result = await Recruiter.create(newUser);
      const signedupUser = result;

      return res.status(200).json({
        success: true,
        message: "Recruiter account created successfully",
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

//2. recruiter signin

async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(400).json({
        success: false,
        message: " email or password required",
      });
    }

    const user: any = await Recruiter.findOne({ where: { email: email } });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Login unsuccessful, no such user",
      });

    // verify user password and generate access and refresh tokens
    console.log(user);
    const verify = await argon.verify(user.password, password);
    console.log({ verify, passwords: {db: user.password, password} });
    if (!verify)
      return res.status(400).json({
        success: false,
        message: "Invalid password",
        data: e,
      });

    const { accessToken, refreshToken }: any = await generate({
      data: { email: user.email, name: user.name, id: user.recruiter_id },
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
        organization: newRecruiterData.organization,
      },
      {
        where: { recruiter_id: id },
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
      where: { recruiter_id: id },
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
      newJob = result.dataValues;

      return res.status(200).json({
        success: true,
        message: newJob,
      });
    } catch (e) {
      console.error(e);
      res.status(404).json({ message: "Error: " + e });
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
    const recruiter_id = Number(req.body.recruiterRecruiterId);
    const job_id = Number(req.body.job_id);
    var updatedJobData = req.body;
    const update = await Jobs.update(
      {
        job_id: updatedJobData.job_id,
        job_title: updatedJobData.job_title,
        organization: updatedJobData.organization,
        job_location: updatedJobData.job_location,
        job_type: updatedJobData.job_type,
        job_description: updatedJobData.job_description,
        pay: updatedJobData.pay,
      },
      {
        where: { recruiterRecruiterId: recruiter_id, job_id: job_id },
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

    const id = Number(req.params.id);
    // const id = Number(req.body.job_id);
    console.log(id)
    await Jobs.destroy({
      where: { job_id: id },
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

async function refreshtoken(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshtoken } = req.body;
    if (!refreshtoken) {
      return res.status(404).json({ message: "unauthorized" });
    }

    const verifytoken: any = await verify({
      data: refreshtoken,
      isRefresh: true,
    });

    // const {accessToken} = await generate({data:{name: verifytoken.data.name, email: verifytoken.data.email, id: verifytoken.data.id}})

    return res.status(200);
    // .json({ success: true, message: "User query successful", data:{ tokens: {accessToken, refreshToken: refreshtoken }}});
  } catch (error) {
    console.error({ 2: e });
    return res.status(404).json({ message: "unauthorized" });
  }
}

export {
  generateRecruiters,
  generateRecruiterJobs,
  signup,
  signin,
  updateProfile,
  deleteProfile,
  postJob,
  updateJob,
  deleteJob,
  refreshtoken,
};
