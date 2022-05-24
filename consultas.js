const { Pool } = require("pg");

const pool = new Pool({
    user: 'mjluarjigibebd',
    password: '5a5dfdc8e0a1b40be62a2097d5b49adec512544bcc1ac8ecb053d9d88081cc63',
    host: 'ec2-54-165-90-230.compute-1.amazonaws.com',
    database: 'dd4bn2uuoo900v',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});


const listarSkaters = () => {

    const sql = 'SELECT * FROM skaters ORDER BY id';

    const resp = pool.query(sql);

    return resp;

};


const nuevoSkater = async (skater, nombreFoto) => {

    try {
        const { email, nombre, password, experiencia, especialidad } = skater;

        const config = {
            text: "INSERT INTO skaters(email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            values: [email, nombre, password, experiencia, especialidad, nombreFoto, false]
        };
        const resp = await pool.query(config);
        
        return resp;
    } catch (error) {
        console.log(error);
        return {
            code: 500,
            error
        };
    }

};


const actualizarSkater = async (id, nuevaInformacion) => {

    try {
        
        const { nombre, password, añosExperiencia, especialidad } = nuevaInformacion;

        const config = {
            text: "UPDATE skaters SET nombre = $1 , password = $2, anos_experiencia = $3, especialidad = $4 WHERE id = $5 RETURNING *",
            values: [ nombre, password, añosExperiencia, especialidad, id ]
        };

        const resp = await pool.query(config);

        return resp;

    } catch (error) {
        console.log(error);
        return {
            code: 500,
            error
        };
    }
};


const eliminarSkater = async (id) => {

    try {
        
        console.log("consulta", id);

        const config = {
            text: "DELETE FROM skaters WHERE id = $1 RETURNING *",
            values: [ id ]
        };

        const resp = await pool.query(config);

        return resp;

    } catch (error) {
        console.log(error);
        return error;
    }

};


const estadoSkater = async (id, estado) => {

    const config = {
        text: "UPDATE skaters SET estado = $1 WHERE id = $2 RETURNING *",
        values: [estado, id]
    };

    const respuesta = await pool.query(config);

    return respuesta;
};


const login = async (email, password) => {

    try {
        const config = {
            text: "SELECT * FROM skaters WHERE email = $1 AND password = $2",
            values: [email, password]
        };

        const resp = await pool.query(config);

        return resp;
    } catch (error) {
        console.log(error);
        return {
            code: 500,
            error
        };
    }


    
};




module.exports = { listarSkaters, nuevoSkater, actualizarSkater, eliminarSkater, estadoSkater, login };