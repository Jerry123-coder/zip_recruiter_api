import jwt from "jsonwebtoken";
import { Interface } from "readline";
import { jwt_refresh_secret, jwt_secret } from "../config/config";

const generate = async (data: any) => {
  try {
    //generate access token using the jwt_secret we created
    const accessToken = await jwt.sign({ ...data }, jwt_secret,{
      expiresIn: "6h",
    });

    //generate refresh token using the jwt_refresh_secret we created
    const refreshToken = await jwt.sign(
      { ...data },
      jwt_refresh_secret,
      {
        expiresIn: "1d",
      }
    );

    return { accessToken, refreshToken };
  } catch (e) {
    console.error(e);
    return null;
  }
};

const verify = async ({
  data,
  isRefresh = false,
}: {
  data: string;
  isRefresh?: boolean;
}) => {
  try {
    //verify the token received from the user using access token or refresh token
    const token = await jwt.verify(
      data,
      isRefresh ? jwt_refresh_secret : jwt_secret
    );

    return token;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export { generate, verify };
