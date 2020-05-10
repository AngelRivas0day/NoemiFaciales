const controller = {};

controller.update = (req, res) => {
  let newData = req.body;
  // newData.image = "no setteado...";
  req.getConnection((err, conn) => {
    // let data = (Buffer.from((Object.keys(newData)[0]))).toString('base64');
    conn.query(
      "UPDATE `about-me` SET text = ? where id = 1",
      [Object.keys(newData)[0]],
      (err, rows) => {
        if (err) {
          res.status(500).send({
            success: false,
            message: "There was an error",
            error: err,
          });
        } else {
          res.status(200).send({
            success: true,
            message: "ok",
          });
        }
      }
    );
  });
};

controller.getAll = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM `about-me` WHERE id = 1", (err, resp) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: "There was an error",
          error: err,
        });
      } else {
        res.status(200).json(resp[0]);
      }
    });
  });
};

controller.getImage = (req, res) => {};

controller.updateImage = (req, res) => {};

function mysqlEscape(stringToEscape) {
  if (stringToEscape == "") {
    return stringToEscape;
  }

  return stringToEscape
    .replace(/\\/g, "\\\\")
    .replace(/\'/g, "\\'")
    .replace(/\"/g, '\\"')
    .replace(/\n/g, "\\\n")
    .replace(/\r/g, "\\\r")
    .replace(/\x00/g, "\\\x00")
    .replace(/\x1a/g, "\\\x1a");
}

module.exports = controller;
