import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import NextCors from "nextjs-cors";
import path from "path";
// import mysql from "mysql2";
// require("dotenv").config();

const postsDirectory = path.join(process.cwd(), "/static/posts");

function runMiddleware(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse,
  fn: (...args: any[]) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return res.status(400).json({
          code: 400,
          data: null,
          msg: result,
        });
      }
      if (req.body.password !== "mmll528718") {
        return res.status(400).json({
          code: 400,
          data: null,
          msg: "密码错误",
        });
      }
      return resolve(result);
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  if (req.method === "POST") {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, postsDirectory);
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });
    const multerUpload = multer({
      storage,
      fileFilter(req, file, cb) {
        const reg = /\.md$/g;
        if (reg.test(file.originalname)) {
          cb(null, true);
        } else {
          return res.status(400).json({
            code: 400,
            data: null,
            msg: "文件类型错误",
          });
        }
      },
    });
    await runMiddleware(req, res, multerUpload.single("file"));
    // const connection = mysql.createConnection(
    //   `mysql://hztzo6dt2tpp:pscale_pw_maV4a1hl0AyXxRoQZk_61HTYVLX2swVaE4j9ogzjmj4@ogzvytsuaai4.us-east-3.psdb.cloud/dxlblog?ssl={"rejectUnauthorized":true}`
    // );
    // console.log("Connected to PlanetScale!");
    res.status(200).json({
      code: 200,
      data: null,
      msg: "上传成功",
    });
    // connection.end();
  } else {
    res.status(400).json({
      code: 400,
      data: null,
      msg: "请求方法错误",
    });
  }
}
