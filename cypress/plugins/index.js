const fs = require("fs");

const filePath = "cypress/fixtures/account.json";

const addAccountTofile = async (user, isSuccessful) => {
  let jsonData, fileContent;
  let newUser = user;
  newUser.isSuccessful = isSuccessful ? true : false;

  try {
    fileContent = await fs.promises.readFile(filePath, "utf-8");
    jsonData = await JSON.parse(fileContent);

    console.log(Object.keys(jsonData));
    let userId = Object.keys(jsonData).length + 1;
    jsonData[`user_${userId}`] = newUser;
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

    fileContent = await fs.promises.readFile(filePath, "utf-8");
    jsonData = await JSON.parse(fileContent);

    return jsonData;
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
  return jsonData;
};

module.exports = (on, config) => {
  on("task", {
    addAccountToLogs(user, isSuccessful) {
      return addAccountTofile(user, isSuccessful);
    },
  });

  return config;
};
