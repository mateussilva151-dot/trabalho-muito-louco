import pool from '../database/conexao.js';

export async function criarPaciente(paciente) {
    const query = 'INSERT INTO paciente (nome, cpf, data_nascimento) VALUES (?, ?, ?)';
    const [result] = await pool.execute(query, [paciente.nome, paciente.cpf, paciente.data_nascimento]);
    return result.insertId;
}

export async function listarPacientes() {
    const query = 'SELECT * FROM paciente';
    const [rows] = await pool.execute(query);
    return rows;
}

export async function buscarPacientePorId(id) {
    const query = 'SELECT * FROM paciente WHERE id_paciente = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
}

export async function buscarPacientePorCpf(cpf) {
    const query = 'SELECT * FROM paciente WHERE cpf = ?';
    const [rows] = await pool.execute(query, [cpf]);
    return rows[0] || null;
}

export async function atualizarPaciente(id, campos) {
    const chaves = Object.keys(campos);
    if (chaves.length === 0) return false;
    const sets = chaves.map(campo => `${campo} = ?`).join(', ');
    const valores = Object.values(campos);
    const query = `UPDATE paciente SET ${sets} WHERE id_paciente = ?`;
    const [result] = await pool.execute(query, [...valores, id]);
    return result.affectedRows > 0;
}

export async function excluirPaciente(id) {
    const query = 'DELETE FROM paciente WHERE id_paciente = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
}
