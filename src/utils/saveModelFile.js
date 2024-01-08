const path = require("path");
const fs = require("fs");

const saveModelFile = async (filename, content, transaction) => {
  const configDir = path.resolve(__dirname, "../config");
  if (!fs.existsSync(configDir)) fs.mkdirSync(configDir);
  const filePath = path.resolve(configDir, filename);

  try {
    await fs.promises.writeFile(filePath, content, { transaction });
  } catch (err) {
    throw new Error("Something went wrong saving the model");
  }
};

module.exports = saveModelFile;
