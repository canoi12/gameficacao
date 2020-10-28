import React, { useEffect, useState } from "react";
import { Modal, Table, Form, Button } from "react-bootstrap";
import api from "../../services/api";
import ShowTable from "../ShowTable";

export default function Curso(props) {
  let { show, onHide, hover, codigo, create } = props;

  // console.log(data);

  // if (!data) data = {
  //   codigo: 0,
  //   nome: "",
  //   descricao: ""
  // }

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

  const [curso, setCurso] = useState({
    codigo,
    nome: "",
    descricao: "",
  });
  const [curriculos, setCurriculos] = useState([]);
  useEffect(() => {
    api.get("curriculos", { params: { curso: codigo } }).then((res) => {
      // console.log(data)
      setCurriculos(res.data);
    });

    api
      .get("cursos/" + codigo)
      .then((res) => {
        setCurso(res.data);
      })
      .catch((res) => {
        setCurso({
          codigo,
          nome: "",
          descricao: "",
        });
      });
  }, [codigo]);

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setCurso({ ...curso, [name]: value });
  };

  const handleSubmit = (event) => {
    api.post("cursos", curso).then((res) => {
      console.log("Curso cadastrado com sucesso");
    });
    if (onHide) onHide();
  };

  return (
    <>
      {create ? (
        <Modal show={show} onHide={onHide} hover={hover}>
          <Modal.Header closeButton>
            <Modal.Title>Criar Curso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCodigo">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  value={curso.codigo}
                  type="number"
                  placeholder="eg: 3142"
                  name="codigo"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  value={curso.nome}
                  name="nome"
                  onChange={handleChange}
                  type="text"
                  placeholder="eg: Tecnologia da Informação"
                />
              </Form.Group>
              <Form.Group controlId="formDescricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  value={curso.descricao}
                  name="descricao"
                  onChange={handleChange}
                  type="text"
                  placeholder="eg: Curso de Tecnologida da Informação..."
                />
              </Form.Group>
              <Button onClick={handleSubmit}>Enviar</Button>
            </Form>
          </Modal.Body>
        </Modal>
      ) : (
        <Modal show={show} onHide={onHide} hover={hover}>
          <Modal.Header closeButton>
            <Modal.Title>{curso.nome}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong>Código:</strong> <p>{curso.codigo}</p>
            <strong>Descrição:</strong> <p>{curso.descricao}</p>
            <strong>Estruturas Curriculares:</strong>
            <ShowTable data={curriculos} fields={fields} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
