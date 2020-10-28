import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import api from "../../services/api";
import ShowTable from "../ShowTable";

export default function Habilidade(props) {
  const { show, onHide, hover, codigo, edit } = props;

  // console.log(data);

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

  const [update, setUpdate] = useState(false);
  const [habilidade, setHabilidade] = useState({
    codigo,
    nome: "",
    descricao: "",
    disciplinas: [],
  });

  const [disciplinas, setDisciplinas] = useState([]);
  useEffect(() => {
    api.get("disciplinas").then((res) => {
      setDisciplinas(res.data);
    });

    api
      .get("habilidades/" + codigo)
      .then((res) => {
        let data = res.data.habilidade;
        data.disciplinas = res.data.disciplinas ? Array.from(res.data.disciplinas, item => item.codigo) : [];

        console.log(data);
        setHabilidade(data);
      }).catch(res => {
        setHabilidade({
          codigo,
          nome: "",
          descricao: "",
          disciplinas: []
        })
      });
  }, [codigo]);

  useEffect(() => {
    api.get("habilidades/" + habilidade.codigo).then((res) => {
      // console.log(data)
      // setDisciplinas(res.data);
      // aluno.disciplinas = res.data.disciplinas.map((disciplina) => {
      //   return disciplina.codigo;
      // });
      habilidade.disciplinas = Array.from(res.data.disciplinas, (item) => item.codigo);
      setHabilidade(habilidade);
    });
  }, [update]);

  const checaCodigo = (codigo) => {
    api
      .get("habilidades/" + codigo)
      .then((res) => {
        setUpdate(true);
      })
      .catch((res) => {
        setUpdate(false);
      });
  };
  checaCodigo(habilidade.codigo);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // if (name === "codigo") checaCodigo(value);
    if (name === "disciplinas")
      value = Array.from(e.target.selectedOptions, (option) => option.value);

    setHabilidade({ ...habilidade, [name]: value });
  };

  const handleSubmit = () => {
    console.log(habilidade);
    api.post("habilidades", habilidade).then((res) => {
      console.log("Habilidade cadastrada com sucesso", res.data);
    });
    if (onHide) onHide();

    // setUpdate(false);
  };

  return (
    <>
      {edit ? (
        <Modal show={show} onHide={onHide} hover={hover}>
          <Modal.Header closeButton>
            <Modal.Title>Habilidade</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCodigo">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  value={habilidade.codigo}
                  type="number"
                  placeholder="eg: 5591"
                  name="codigo"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  value={habilidade.nome}
                  name="nome"
                  onChange={handleChange}
                  type="text"
                  placeholder="eg: Lógica"
                />
              </Form.Group>
              <Form.Group controlId="formDescricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  value={habilidade.descricao}
                  name="descricao"
                  onChange={handleChange}
                  type="text"
                  placeholder="eg: Habilidade referente a..."
                />
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
                      <option value={disciplina.codigo}>
                        {disciplina.codigo + " - " + disciplina.nome}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Button onClick={handleSubmit}>
                Cadastrar
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      ) : (
        <Modal show={show} onHide={onHide} hover={hover}>
          <Modal.Header closeButton>
            <Modal.Title>{habilidade.nome}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong>Código:</strong> <p>{habilidade.codigo}</p>
            <strong>Descrição:</strong> <p>{habilidade.descricao}</p>
            <strong>Disciplinas:</strong>
            <ShowTable data={
              disciplinas.filter(item => {
                return habilidade.disciplinas.indexOf(item.codigo) >= 0;
              })
            } fields={fields} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
