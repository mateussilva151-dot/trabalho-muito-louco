import conexao from '../database/conexao.js';

export async function cadastrarPaciente(paciente) {
    const sql = 'INSERT INTO paciente (nome, cpf, data_nascimento) VALUES (?, ?, ?)';
    const [result] = await conexao.execute(sql, [paciente.nome, paciente.cpf, paciente.data_nascimento]);
    return result.insertId;
}

export async function listarPacientes() {
    const sql = 'SELECT * FROM paciente';
    const [rows] = await conexao.execute(sql);
    return rows;
}

export async function buscarPacientePorId(id) {
    const sql = 'SELECT * FROM paciente WHERE id_paciente = ?';
    const [rows] = await conexao.execute(sql, [id]);
    return rows[0] || null;
}

export async function buscarPacientePorCpf(cpf) {
    const sql = 'SELECT * FROM paciente WHERE cpf = ?';
    const [rows] = await conexao.execute(sql, [cpf]);
    return rows[0] || null;
}

export async function atualizarPaciente(id, campos) {
    const chaves = Object.keys(campos);
    if (chaves.length === 0) return false;
    const sets = chaves.map(campo => `${campo} = ?`).join(', ');
    const valores = Object.values(campos);
    const sql = `UPDATE paciente SET ${sets} WHERE id_paciente = ?`;
    const [result] = await conexao.execute(sql, [...valores, id]);
    return result.affectedRows > 0;
}

export async function excluirPaciente(id) {
    const sql = 'DELETE FROM paciente WHERE id_paciente = ?';
    const [result] = await conexao.execute(sql, [id]);
    return result.affectedRows > 0;
}
