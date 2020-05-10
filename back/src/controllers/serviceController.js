const controller = {};
const fs = require('fs');
const path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/services')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});
var upload = multer({ storage: storage }).single('image');

controller.list = (req, res) => {
    // res.send("Si jala el customer list");
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM servicios', (err, resp) => {
            if(err){
                res.send("Hubo un error");
            }
            res.json(resp);
        });
    });
};

controller.add = (req, res) => {
  // the same req, res params are passed to the upload function, in order to make it look like the og
  upload(req, res, function (err) {
    console.log(req.body);
    let data = req.body;
    if (err) {
        res.status(500).send({
            message: 'La info no fue actulizada con exito'
          });
    }else{
      if(req.file){
        const fileName = req.file.filename;
        data.image = fileName;
      }else{
        data.image = "No seteado...";
      }
      req.getConnection((err, conn) => {
          const query = conn.query('INSERT INTO servicios SET ?', [data], (err, rows) => {
            if(err){
              console.log(err);
            }else{
              res.status(200).send({
                message: 'La into fue creada con exito'
              });
            }
          });
      });
    }
});

};

controller.listDataTable = (req, res) => {
  serachPattern = req.body.search.value;
  req.getConnection((err, conn) => {
    const query = conn.query(
    'SELECT * FROM servicios WHERE name LIKE ?', 
    [`%${serachPattern}%`], 
    (err, resp) => {
        if(err){
            res.send("Hubo un error");
        }
        res.json(resp);
    });
  });
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM servicios WHERE id = ?", [id], (err, rows) => {
    //   res.render('customers_edit', {
    //     data: rows[0]
    //   })
    if(err){
      console.log(err);
    }else{
      console.log(rows);
      res.json(rows);
    }
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  req.getConnection((err, conn) => {
    conn.query('UPDATE servicios set ? where id = ?', [newData, id], (err, rows) => {
      if(err){
        res.status(500).send({
          success: false,
          message: "Error actualizando el servicio",
          error: err
        })
      }else{
        res.status(200).send({
          success: true,
          message: "ok"
        });
      }
    });
  });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    const path = 'src/uploads/services';
    req.getConnection((err, connection) => {
      connection.query('SELECT * FROM servicios WHERE id = ?', [id], (error, response)=>{
        const imageToDelete = response[0].image;
        fs.unlink(`${path}/${imageToDelete}`, (err)=>{
          if(err){
            console.log(err);
          }else{
            console.log("Se borro la foto");
          }
        });
      });
      const query = connection.query('DELETE FROM servicios WHERE id = ?', [id], (err, rows) => {
        if(err){
          res.status(500).send({
            success: false,
            message: "Error eliminando el servicio",
            error: err
          })
        }else{
          res.status(200).send({
            success: true,
            message: "ok",
            data: rows
          });
        }
      });
    });
};

controller.uploadImage = (req, res) => {
  const path = 'src/uploads/services';
  upload(req, res, function (err) {
    const id = req.params.id;
    console.log(req.file);
    if (err) {
      res.status(500).send({
        message: 'La foto no fue actulizada con exito',
        error: err
      });
    }else{
      // Everything went fine
      var fileName = req.file.filename;
      req.getConnection((err, conn) => {
        conn.query('SELECT * FROM servicios WHERE id = ?', [id], (error, response)=>{
          const imageToDelete = response[0].image;
          fs.unlink(`${path}/${imageToDelete}`, (err)=>{
            if(err){
              console.log(err);
            }else{
              console.log("Se borro la foto");
            }
          });
        });
        const query = conn.query('UPDATE servicios SET image = ? WHERE id = ?', [fileName, id], (err, rows) => {
          res.status(200).send({
            message: 'La foto fue actulizada con exito'
          });
        });
      }); 
    }
  });
};

controller.getImage = (req, res) => {
  const fileName = req.params.fileName;
  var filePath = 'src/uploads/services/' + fileName;
  console.log(filePath);
  fs.exists(filePath, (exists)=>{
    if(exists){
      res.sendFile(path.resolve(filePath));
    }else{
      res.send({
        message: 'no existe'
      })
    }
  });
};

module.exports = controller;
