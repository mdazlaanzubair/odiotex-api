import fs from "fs";

export const readFileAsync = async (path) => {
  try {
    const data_stream = await fs.promises.readFile(path);
    return { error: null, data_stream };
  } catch (error) {
    return { error, data_stream: null };
  }
};
