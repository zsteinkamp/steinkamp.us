import fsp from "fs/promises";
import path from "path";
import yaml from "js-yaml";

const getDirMeta = async (dirPath) => {
  let fileContents;
  try {
    fileContents = await (fsp.readFile(path.join(dirPath, "meta.yml")));
  } catch {
    // no meta file
    return null;
  }
  const fileObj = yaml.load(fileContents);
  fileObj.date = fileObj.date.toISOString();
  return fileObj;
};

export default getDirMeta;
