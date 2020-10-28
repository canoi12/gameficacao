import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import api from '../../services/api';
import ShowTable from '../ShowTable';

export default function Disciplina(props) {
  const {
    show,
    onHide,
    hover,
    codigo,
    create
  } = props;

  // console.log(data);

  const fields = [
    {
      title: "Nome",
      name: "nome"
    },
    {
      title: "Descrição",
      name: "descricao"
    }
  ]

  const [curriculos, setCurriculos] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
  const [disciplina, setDisciplina] = useState({
    codigo,
    nome: "",
    descricao: "",
    curriculo_codigo: [],
    habilidades: []
  });
  useEffect(() => {
    api.get('curriculos')
      .then(res => {
        // console.log(data)
        setCurriculos(res.data);
      })

      api.get('habilidades')
      .then(res => {
        // console.log(data)
        setHabilidades(res.data);
      })

    api.get('disciplinas/' + codigo).then(res => {
      let data = res.data.disciplina;
      data.curriculo_codigo = Array.from(res.data.curriculos, item => item.codigo);
      data.habilidades = Array.from(res.data.habilidades, item => item.codigo) || [];
      // console.log(data);
      setDisciplina(data);
    })
  }, [codigo]);

  // useEffect(() => {
  //   console.log(disciplina);
  // }, [disciplina]);

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === 'curriculo_codigo') value = Array.from(event.target.selectedOptions, option => option.value);
    if (name === 'habilidades') value = Array.from(event.target.selectedOptions, option => option.value);

    setDisciplina({...disciplina, [name]: value});
  }

  const handleSubmit = () => {
    api.post('disciplinas', disciplina).then(res => {
      console.log("Disciplina cadastrada com sucesso");
    });
    if (onHide) onHide()
  }


  return (
    <>
    {
      create ? (
        <Modal
          show={show}
          onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Criar Disciplina</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCodigo">
                <Form.Label>Código</Form.Label>
                <Form.Control value={disciplina.codigo} type="number" placeholder="eg: 3142" name="codigo" onChange={handleChange}/>
              </Form.Group>
              <Form.Group controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control value={disciplina.nome} name="nome" onChange={handleChange} type="text" placeholder="eg: Motores de Jogos I"/>
              </Form.Group>
              <Form.Group controlId="formDescricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control value={disciplina.descricao} name="descricao" onChange={handleChange} type="text" placeholder="eg: Essa disciplina ..."/>
              </Form.Group>
              <Form.Group controlId="formCurriculos">
                <Form.Label>Estruturas Curriculares</Form.Label>
                <Form.Control as="select" multiple name="curriculo_codigo" onChange={handleChange}>
                  {
                    curriculos.map(curriculo => {
                      return <option value={curriculo.codigo}>{curriculo.codigo + " - " + curriculo.nome}</option>;
                    })
                  }
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
              <Button onClick={handleSubmit}>
                Enviar
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      ) :
      (
        <Modal
          show={show}
          onHide={onHide}
          hover={hover}>
          <Modal.Header closeButton>
            <Modal.Title>{disciplina.nome}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong>Código:</strong> <p>{disciplina.codigo}</p>
            <strong>Descrição:</strong> <p>{disciplina.descricao}</p>
            <strong>Presente nas Estruturas Curriculares:</strong>
            <ShowTable data={
              curriculos.filter((item) => {
                return disciplina.curriculo_codigo.indexOf(item.codigo) >= 0;
              })
            } fields={fields} />
            <strong>Habilidades:</strong>
            <ShowTable data={
              habilidades.filter((item) => {
                return disciplina.habilidades.indexOf(item.codigo) >= 0;
              })
            } fields={fields} />
          </Modal.Body>
        </Modal>
      )
    }
    </>
  )
}