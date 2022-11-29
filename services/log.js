const fs = require("fs");

const tracer_logger = require("tracer").console({
  format: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
  dateformat: "yyyy-mm-dd HH:MM:ss.L",
  transport: function (data) {
    console.log(data.output);
    fs.appendFile("./app.log", data.output + "\n", function (error) {
      if (error) console.log("Error al guardar tracer log.");
    });
  },
});

module.exports = tracer_logger;
