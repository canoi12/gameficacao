import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Modal, Form, Button } from "react-bootstrap";
import ShowTable from "../ShowTable";

export default function Curriculo(props) {
  const { show, onHide, codigo, create } = props;

  const fields = [
    {
      title: "Nome",
      name: "nome",
    },
    {
      title: "Descrição",
      name: "descricao",
    },
  ];

  const [curriculo, setCurriculo] = useState({
    codigo,
    nome: "",
    descricao: "",
    curso_codigo: -1,
    disciplinas: [],
  });
  const [disciplinas, setDisciplinas] = useState([]);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {

    api.get("cursos").then((res) => {
      // console.log(res.data);
      setCursos(res.data);
      // let curso_codigo = cursos[0] ? cursos[0].codigo : -1;
      // setCurriculo({...curriculo, curso_codigo});
    });
    api.get("disciplinas").then((res) => {
      setDisciplinas(res.data);
    });
    api.get("curriculos/" + codigo).then((res) => {
      // console.log(res.data);
      // let code = res.data.codigo;
      // let nome = res.data.nome;
      // let descricao = res.data.descricao;
      // let curso_codigo = res.data.curso.codigo || -1;

      let data = {
        codigo: res.data.codigo,
        nome: res.data.nome,
        descricao: res.data.descricao,
        curso_codigo: (res.data.curso || {codigo: -1}).codigo,
        disciplinas: Array.from(res.data.disciplinas, (item) => item.codigo)
      };
      // console.log(code, nome, descricao);
      setCurriculo(data);
    }).catch(res => {
      let curso_codigo = cursos[0] ? cursos[0].codigo : -1;
      setCurriculo({
        codigo,
        nome: "",
        descricao: "",
        curso_codigo,
        disciplinas: [],
      })
    });
  }, [props]);

  // useEffect(() => {
  //   if (cursos[0]) curriculo.curso_codigo = [cursos[0].codigo];
  // }, [cursos, create]);

  // useEffect(() => {
  //   console.log(curriculo);
  // }, [curriculo])

  // useEffect(() => {
  //   api
  //     .get("disciplinas", { params: { curriculo: data.codigo } })
  //     .then((res) => {
  //       setDisciplinas(res.data);
  //     });
  // }, [props]);

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "disciplinas")
      value = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );

    setCurriculo({ ...curriculo, [name]: value });
  };

  const handleSubmit = (event) => {
    if (curriculo.curso_codigo <= 0) return;
    api.post("curriculos", curriculo).then((res) => {
      console.log("Estrutura Curricular cadastrada com sucesso");
    });
    if (onHide) onHide();
    // console.log(curriculo);
  };

  return (
    <>
      {create ? (
        <Modal show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Criar Estrutura Curricular</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCodigo">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  value={curriculo.codigo}
                  type="number"
                  placeholder="eg: 3142"
                  name="codigo"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  value={curriculo.nome}
                  name="nome"
                  onChange={handleChange}
                  type="text"
                  placeholder="eg: Estrutura Curricular de TI I"
                />
              </Form.Group>
              <Form.Group controlId="formDescricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  value={curriculo.descricao}
                  name="descricao"
                  onChange={handleChange}
                  type="text"
                  placeholder="eg: Estrutura Curricular de TI..."
                />
              </Form.Group>
              <Form.Group controlId="formCurso">
                <Form.Label>Curso</Form.Label>
                <Form.Control
                  as="select"
                  name="curso_codigo"
                  onChange={handleChange}
                  defaultChecked={true}
                >
                  {cursos.map((curso) => {
                    return (
                      <option value={curso.codigo}>
                        {curso.codigo + " - " + curso.nome}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formDisciplinas">
                <Form.Label>Disciplinas</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  name="disciplinas"
                  onChange={handleChange}
                >
                  {disciplinas.map((disciplina) => {
                    return (
                      <option
                        value={disciplina.codigo}
                        selected={
                          (curriculo.disciplinas || []).indexOf(
                            disciplina.codigo
                          ) >= 0
                        }
                      >
                        {disciplina.codigo + " - " + disciplina.nome}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Button onClick={handleSubmit}>Cadastrar</Button>
            </Form>
          </Modal.Body>
        </Modal>
      ) : (
        <Modal show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>{curriculo.nome}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong>Código:</strong> <p>{curriculo.codigo}</p>
            <strong>Descrição:</strong> <p>{curriculo.descricao}</p>
            <strong>Disciplinas:</strong>
            <ShowTable
              data={disciplinas.filter((item) => {
                return curriculo.disciplinas.indexOf(item.codigo) >= 0;
              })}
              fields={fields}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
