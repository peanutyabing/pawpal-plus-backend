const fs = require("fs");

async function generateEventsSeedData() {
  const dataFiles = [];
  const dataPath = require("path")
    .join(__dirname)
    .replace("utils", "data/events");
  fs.readdirSync(dataPath).forEach(function (file) {
    dataFiles.push(dataPath + "/" + file);
  });

  const data = [];

  for (const fileName of dataFiles) {
    const file = fs.readFileSync(fileName, { encoding: "utf8" });
    for (const row of file.split("\r\n")) {
      const rowData = row.split(",");
      data.push({
        pet_id: parseInt(rowData[0]),
        category_id: parseInt(rowData[1]),
        subcategory_id: parseInt(rowData[2]),
        start_time: new Date(rowData[3]),
        end_time: new Date(rowData[4]),
        cause_for_concern: rowData[5].toLowerCase() === "true",
        description: rowData[6],
        data: Number(rowData[7]),
        unit: rowData[8],
        image_url: rowData[9],
        remind_me: rowData[10].toLowerCase() === "true",
        latest: rowData[11].toLowerCase() === "true",
        created_at: new Date(),
        updated_at: new Date(),
      });
      // console.log({
      //   pet_id: parseInt(rowData[0]),
      //   category_id: parseInt(rowData[1]),
      //   subcategory_id: parseInt(rowData[2]),
      //   start_time: new Date(rowData[3]),
      //   end_time: new Date(rowData[4]),
      //   cause_for_concern: rowData[5].toLowerCase() === "true",
      //   description: rowData[6],
      //   data: Number(rowData[7]),
      //   unit: rowData[8],
      //   image_url: rowData[9],
      //   remind_me: rowData[10].toLowerCase() === "true",
      //   latest: rowData[11].toLowerCase() === "true",
      //   created_at: new Date(),
      //   updated_at: new Date(),
      // });
    }
  }

  return data;
}

// generateEventsSeedData();

module.exports = generateEventsSeedData;
