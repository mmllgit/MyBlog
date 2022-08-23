import path from "path";
import fs from "fs";
import matter from "gray-matter";

export const getResumeData = () => {
  const resumeFile = path.join(process.cwd(), "resume/resume.md");
  const fileContent = fs.readFileSync(resumeFile, "utf-8");
  const { data, content } = matter(fileContent);
  const resumeData = {
    ...data,
    content,
  };
  return resumeData;
};
