import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";

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
  if (req.method === "POST") {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "posts");
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
    res.status(200).json({
      code: 200,
      data: null,
      msg: "上传成功",
    });
  } else {
    res.status(400).json({
      code: 400,
      data: null,
      msg: "请求方法错误",
    });
  }
}
