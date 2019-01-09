// Your config file
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const mime = require("mime");

const config = {
  s3BucketName: process.argv[2],
  // Absolute path
  localFolder: "build",
};

const start = async ({s3BucketName, localFolder}) => {
  AWS.config.setPromisesDependency(Promise);
  const s3 = new AWS.S3({
    signatureVersion: 'v4',
  });
  const filesPaths = await walkSync(localFolder);
  for (let i = 0; i < filesPaths.length; i++) {
    const statistics = `(${i + 1}/${filesPaths.length}, ${Math.round((i + 1) / filesPaths.length * 100)}%)`;
    const filePath = filesPaths[i];
    const fileContent = fs.readFileSync(filePath);
    // If the slash is like this "/" s3 will create a new folder, otherwise will not work properly.
    const relativeToBaseFilePath = path.normalize(path.relative(localFolder, filePath));
    const relativeToBaseFilePathForS3 = relativeToBaseFilePath.split(path.sep).join('/');
    const mimeType = mime.getType(filePath);
    console.log(`Uploading`, statistics, relativeToBaseFilePathForS3);
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    await s3.putObject({
      ACL: `public-read`,
      Bucket: s3BucketName,
      Key: relativeToBaseFilePathForS3,
      Body: fileContent,
      ContentType: mimeType,
    }).promise();
    console.log(`Uploaded `, statistics, relativeToBaseFilePathForS3);
  }
};

start(config).then(() => {
  console.log(`Completed!`);
});

async function walkSync(dir) {
  const files = fs.readdirSync(dir);
  const output = [];
  for (const file of files) {
    const pathToFile = path.join(dir, file);
    const isDirectory = fs.statSync(pathToFile).isDirectory();
    if (isDirectory) {
      output.push(...await walkSync(pathToFile));
    } else {
      output.push(await pathToFile);
    }
  }
  return output;
}