import React from "react";
import { Table } from "react-bootstrap";

export default function Main() {
  const url = "https://teste-gameficacao.herokuapp.com";
  const cursos = [
    {
      metodo: "GET",
      caminho: "/cursos",
      descricao: "Retorna a lista de todos os cursos",
    },
    {
      metodo: "GET",
      caminho: "/cursos/:codigo",
      descricao: "Retorna o curso de código 'codigo'",
    },
    {
      metodo: "POST",
      caminho: "/cursos",
      descricao: "Cadastra um novo curso",
    },
  ];

  const curriculos = [
    {
      metodo: "GET",
      caminho: "/curriculos",
      descricao: "Retorna a lista de todas as estruturas curriculares",
    },
    {
      metodo: "GET",
      caminho: "/curriculos?curso=codigo",
      descricao:
        'Retorna as estruturas curriculares pertecentes ao curso de código "codigo"',
    },
    {
      metodo: "GET",
      caminho: "/curriculos?disciplina=codigo",
      descricao:
        'Retorna as estruturas curriculares pertecentes à disciplina de código "codigo"',
    },
    {
      metodo: "GET",
      caminho: "/curriculos/:codigo",
      descricao: 'Retorna a estrutura curricular de código "codigo"',
    },
    {
      metodo: "POST",
      caminho: "/curriculos",
      descricao: "Cadastra uma nova estrutura curricular",
    },
  ];

  const disciplinas = [
    {
      metodo: "GET",
      caminho: "/disciplinas",
      descricao: "Retorna a lista de todas as disciplinas",
    },
    {
      metodo: "GET",
      caminho: "/disciplinas?aluno=matricula",
      descricao:
        'Retorna as disciplinas pertecentes ao aluno de matrícula "matricula"',
    },
    {
      metodo: "GET",
      caminho: "/disciplinas?curriculo=codigo",
      descricao:
        'Retorna as disciplinas pertecentes à estrutura curricular de código "codigo"',
    },
    {
      metodo: "GET",
      caminho: "/disciplinas/:codigo",
      descricao: 'Retorna a disciplina de código "codigo"',
    },
    {
      metodo: "POST",
      caminho: "/disciplinas",
      descricao: "Cadastra uma nova disciplina",
    },
  ];

  const alunos = [
    {
      metodo: "GET",
      caminho: "/alunos",
      descricao: "Retorna a lista de todos os alunos",
    },
    {
      metodo: "GET",
      caminho: "/alunos/:matricula",
      descricao: 'Retorna o aluno de matrícula "matricula"',
    },
    { metodo: "POST", caminho: "/alunos", descricao: "Cadastra um novo aluno" },
  ];

  const habilidades = [
    {
      metodo: "GET",
      caminho: "/habilidades",
      descricao: "Retorna a lista de todas as habilidades",
    },
    {
      metodo: "GET",
      caminho: "/disciplinas?aluno=matricula",
      descricao:
        'Retorna as habilidades pertecentes ao aluno de matrícula "matricula"',
    },
    {
      metodo: "GET",
      caminho: "/disciplinas?disciplina=codigo",
      descricao:
        'Retorna as habilidades pertecentes à disciplina de código "codigo"',
    },
    {
      metodo: "GET",
      caminho: "/habilidades/:codigo",
      descricao: 'Retorna a habilidade de código "codigo"',
    },
    {
      metodo: "POST",
      caminho: "/habilidades",
      descricao: "Cadastra uma nova habilidade",
    },
  ];
  return (
    <div>
      <strong>URL da api:</strong> <p>{url}</p>
      <h2>Cursos</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Método</th>
            <th>Caminho</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => {
            return (
              <tr>
                <td>{curso.metodo}</td>
                <td>{url + curso.caminho}</td>
                <td>{curso.descricao}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <h2>Estruturas Curriculares</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Método</th>
            <th>Caminho</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {curriculos.map((curriculo) => {
            return (
              <tr>
                <td>{curriculo.metodo}</td>
                <td>{url + curriculo.caminho}</td>
                <td>{curriculo.descricao}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <h2>Disciplinas</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Método</th>
            <th>Caminho</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map((disciplina) => {
            return (
              <tr>
                <td>{disciplina.metodo}</td>
                <td>{url + disciplina.caminho}</td>
                <td>{disciplina.descricao}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <h2>Alunos</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Método</th>
            <th>Caminho</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => {
            return (
              <tr>
                <td>{aluno.metodo}</td>
                <td>{url + aluno.caminho}</td>
                <td>{aluno.descricao}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      
      <h2>Habilidade</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Método</th>
            <th>Caminho</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {habilidades.map((habilidade) => {
            return (
              <tr>
                <td>{habilidade.metodo}</td>
                <td>{url + habilidade.caminho}</td>
                <td>{habilidade.descricao}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
