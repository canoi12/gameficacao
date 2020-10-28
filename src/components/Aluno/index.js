import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import api from "../../services/api";
import ShowTable from "../ShowTable";

export default function Aluno(props) {
  const { show, onHide, hover, matricula, edit } = props;

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
  const [habilidades, setHabilidades] = useState([]);
  const [aluno, setAluno] = useState({
    matricula,
    nome: "",
    descricao: "",
    disciplinas: [],
    habilidades: [],
  });

  const [disciplinas, setDisciplinas] = useState([]);
  useEffect(() => {
    api.get("disciplinas").then((res) => {
      setDisciplinas(res.data);
    });

    api.get("habilidades").then((res) => {
      setHabilidades(res.data);
    });

    api
      .get("alunos/" + matricula)
      .then((res) => {
        let data = res.data.aluno;
        data.disciplinas = Array.from(
          res.data.disciplinas || [],
          (item) => item.codigo
        );
        data.habilidades = Array.from(
          res.data.habilidades || [],
          (item) => item.codigo
        );

        setAluno(data);
      })
      .catch((res) => {
        setAluno({
          matricula,
          nome: "",
          descricao: "",
          disciplinas: [],
          habilidades: [],
        });
      });
  }, [matricula]);

  // useEffect(() => {
  //   api.get("alunos/" + aluno.matricula).then((res) => {
  //     // console.log(data)
  //     // setDisciplinas(res.data);
  //     aluno.disciplinas = res.data.disciplinas.map((disciplina) => {
  //       return disciplina.codigo;
  //     });
  //     setAluno(aluno);
  //   });
  // }, [update]);

  // const checaMatricula = (matricula) => {
  //   api
  //     .get("alunos/" + matricula)
  //     .then((res) => {
  //       setUpdate(true);
  //     })
  //     .catch((res) => {
  //       setUpdate(false);
  //     });
  // };
  // checaMatricula(aluno.matricula);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // if (name === "matricula") checaMatricula(value);
    if (name === "disciplinas") value = Array.from(e.target.selectedOptions, (option) => option.value);
    if (name === "habilidades") value = Array.from(e.target.selectedOptions, (option) => option.value);

    setAluno({ ...aluno, [name]: value });
  };

  const handleSubmit = () => {
    // console.log(aluno);
    api.post("alunos", aluno).then((res) => {
      console.log("Aluno matriculado com sucesso", res.data);
    });
    if (onHide) onHide();
    // setUpdate(false);
  };

  return (
    <>
      {edit ? (
        <Modal show={show} onHide={onHide} hover={hover}>
          <Modal.Header closeButton>
            <Modal.Title>Aluno</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formMatricula">
                <Form.Label>Matrícula</Form.Label>
                <Form.Control
                  value={aluno.matricula}
                  type="number"
                  placeholder="eg: 2020991"
                  name="matricula"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  value={aluno.nome}
                  name="nome"
                  onChange={handleChange}
                  type="text"
                  placeholder="eg: Afonso"
                />
              </Form.Group>
              <Form.Group controlId="formDescricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  value={aluno.descricao}
                  name="descricao"
                  onChange={handleChange}
                  type="text"
                  placeholder="eg: Aluno de ..."
                />
              </Form.Group>
              <Form.Group controlId="formDisciplinas">
                <Form.Label>Disciplinas</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  name="disciplinas"
                  onChange={handleChange}
                  selectedOptions={aluno.disciplinas}
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
              <Form.Group controlId="formHabilidades">
                <Form.Label>Habilidades</Form.Label>
                <Form.Control as="select" multiple name="habilidades" onChange={handleChange}>
                  {
                    habilidades.map(habilidade => {
                      return <option value={habilidade.codigo}>{habilidade.codigo + " - " + habilidade.nome}</option>;
                    })
                  }
                </Form.Control>
              </Form.Group>
              <Button onClick={handleSubmit}>Cadastrar</Button>
            </Form>
          </Modal.Body>
        </Modal>
      ) : (
        <Modal show={show} onHide={onHide} hover={hover}>
          <Modal.Header closeButton>
            <Modal.Title>{aluno.nome}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong>Matrícula:</strong> <p>{aluno.matricula}</p>
            <strong>Descrição:</strong> <p>{aluno.descricao}</p>
            <strong>Disciplinas:</strong>
            <ShowTable
              data={disciplinas.filter((item) => {
                return aluno.disciplinas.indexOf(item.codigo) >= 0;
              })}
              fields={fields}
            />
            <strong>Habilidades:</strong>
            <ShowTable
              data={habilidades.filter((item) => {
                return aluno.habilidades.indexOf(item.codigo) >= 0;
              })}
              fields={fields}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
