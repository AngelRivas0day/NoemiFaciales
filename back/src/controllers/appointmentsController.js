const controller = {};

controller.listAll = (req, res) => {
    // res.send("Si jala el customer list");
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM citas WHERE archived = 0', (err, resp) => {
            if(err){
                res.send("Hubo un error");
            }
            console.log(resp);
            res.json(resp);
        });
    });
};

controller.listDataTable = (req, res) => {
  serachPattern = req.body.search.value;
  req.getConnection((err, conn) => {
    const query = conn.query(
    'SELECT * FROM citas WHERE nombre LIKE ? AND archived = 0', 
    [`%${serachPattern}%`],
    (err, resp) => {
        if(err){
            res.send("Hubo un error");
        }
        res.json(resp);
    });
  });
};

controller.create = (req, res) => {
  let data = req.body;
  let jsonData = JSON.stringify(data.servicios);
  data.servicios = jsonData;
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO citas set ?', [data], (err, rows) => {
      if(err){
        res.status(500).send({
          status: "ok",
          message: "La reservación no fue creada con exito",
          error: [err]
       });
      }else{
        res.status(200).send({
          status: "ok",
          message: "La reservación fue creada con exito",
          data: [rows]
        });
      }
    });
  });
};

controller.confirm = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("UPDATE citas set checked = 1 WHERE id = ?", [id], (err, rows) => {
    console.log(rows);
    res.json(rows);
    });
  });
};

controller.archive = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("UPDATE citas set archived = 1 WHERE id = ?", [id], (err, rows) => {
    console.log(rows);
    res.json(rows);
    });
  });
};

controller.delivered = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("UPDATE citas set delivered = 1 WHERE id = ?", [id], (err, rows) => {
    console.log(rows);
    res.json(rows);
    });
  });
};

controller.listOne = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM citas WHERE id = ?", [id], (err, rows) => {
    //   res.render('customers_edit', {
    //     data: rows[0]
    //   })
    console.log(rows);
    res.json(rows);
    });
  });
};

controller.edit = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {
    conn.query('UPDATE citas set ? where id = ?', [newCustomer, id], (err, rows) => {
      res.status(200).send({
          status: "ok",
          message: "La reservación fue actualizada con exito",
          data: rows
      });
    });
  });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
      connection.query('DELETE FROM citas WHERE id = ?', [id], (err, rows) => {
        res.status(200).send({
            status: "ok",
            message: "La reservación fue eliminada con exito",
            data: rows
        });
      });
    });
};

module.exports = controller;
