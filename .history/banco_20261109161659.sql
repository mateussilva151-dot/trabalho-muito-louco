CREATE DATABASE IF NOT EXISTS clinica_medica_db;
USE clinica_medica_db;

CREATE TABLE IF NOT EXISTS medico (
    id_medico INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    crm VARCHAR(50) NOT NULL UNIQUE,
    especialidade VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS paciente (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS consulta (
    id_consulta INT AUTO_INCREMENT PRIMARY KEY,
    data_hora DATETIME NOT NULL,
    motivo TEXT NOT NULL,
    status ENUM('rascunho', 'agendada', 'concluida', 'cancelada') NOT NULL,
    fk_id_medico INT NULL,
    fk_id_paciente INT NULL,
    CONSTRAINT fk_consulta_medico FOREIGN KEY (fk_id_medico) 
        REFERENCES medico(id_medico) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_consulta_paciente FOREIGN KEY (fk_id_paciente) 
        REFERENCES paciente(id_paciente) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Massa de dados inicial (Mínimo de 3 médicos, 3 pacientes e 5 consultas)
INSERT INTO medico (nome, crm, especialidade) VALUES
('Dr. Arnaldo Silva', 'CRM12345SP', 'Cardiologia'),
('Dra. Beatriz Santos', 'CRM67890RJ', 'Pediatria'),
('Dr. Carlos Oliveira', 'CRM11223MG', 'Ortopedia');

INSERT INTO paciente (nome, cpf, data_nascimento) VALUES
('Alice Ribeiro', '11122233344', '1990-05-15'),
('Bruno Lima', '55566677788', '1985-08-22'),
('Carla Mendes', '99988877766', '1998-12-01');

INSERT INTO consulta (data_hora, motivo, status, fk_id_medico, fk_id_paciente) VALUES
('2026-11-20 09:00:00', 'Check-up de rotina cardiológico', 'agendada', 1, 1),
('2026-11-21 14:30:00', 'Dores no joelho pós-corrida', 'rascunho', 3, 2),
('2026-11-22 10:00:00', 'Consulta pediátrica mensal', 'agendada', 2, 3),
('2026-11-23 16:00:00', 'Retorno exames de sangue', 'concluida', 1, 2),
('2026-11-24 11:00:00', 'Primeira avaliação clínica', 'rascunho', NULL, NULL);
