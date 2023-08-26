const mysql = require("mysql2");
require('dotenv').config();

const con = mysql.createConnection({
    host: process.env.SERVER_HOST,
    user: process.env.SERVER_USER,
    password: process.env.SERVER_KEY,
    database: process.env.SERVER_DATABASE
}).promise();

async function getPosts() {
    const [rows] = await con.query("SELECT * FROM timeline")
    return rows;
}

async function createPost(title, description, body) {
    const [result] = await con.query(`
        INSERT INTO timeline (title,description,body)
        VALUES (?,?,?)`, [title, description, body]
    )
    return `Post criado`
}

async function editPost(id, title, description, body) {
    const [rows] = await con.query(`
        SELECT *
        FROM timeline
        WHERE id = ?
    `,[id]);

    if (rows.length > 0) {
        const [result] = await con.query(`
            UPDATE timeline
            SET title = ?, description = ?, body = ?, updated_at = NOW()
            WHERE id = ?`, [title,description,body,id])
        return result
        } else {
            return null
        }
    }

async function deletePost(id) {
    const [result] = await con.query(`
        DELETE FROM timeline
        WHERE id = ?
    `,[id])

    return result
}

async function searchPost(date){
    const [result] = await con.query(`
        SELECT *
        FROM timeline
        WHERE created_at LIKE ?
    `,[date+'%'])
    return result
}

async function searchPostId(id) {
    const [result] = await con.query(`
        SELECT *
        FROM timeline
        WHERE id = ?
    `,[id])
    return result
}

module.exports = {
    createPost,
    getPosts,
    editPost,
    deletePost,
    searchPost,
    searchPostId
 }