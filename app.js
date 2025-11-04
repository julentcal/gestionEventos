//CONFIGURACIÓN INICIAL
const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

//MIDDLEWARES

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); 


//RUTA GET

app.get("/evento", (req, res) => {
    res.render("evento", {
        nombre: " ",
        fecha: " ",
        ciudad: " ",
        tipo: " ",
        intereses: [ ],
    });
    })


//RUTA POST

app.post("/evento", (req, res) => {
    const { nombre, fecha, ciudad, tipo } = req.body;
    
    let intereses = req.body.intereses || []; 
    if (!Array.isArray(intereses)) { 
        intereses = [intereses];
    }

    let errores = [];

    if (!nombre || !fecha || !ciudad || !tipo) {
        errores.push("Por favor, complete todos los campos obligatorios." );
    }

    if (nombre.length < 3) {
        errores.push("El nombre del evento debe tener al menos 3 caracteres." );
    }

    if (errores.length) {
        return res
        .status(400)
        .render("evento", {nombre, fecha, ciudad, tipo, intereses, errores });}

    res.render("evento-ok", {
        nombre,
        fecha,
        ciudad,
        tipo,
        intereses,
    });
});

//INICIO SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
