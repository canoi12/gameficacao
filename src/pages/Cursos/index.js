import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import api from '../../services/api';

import Curso from '../../components/Curso';
import ShowTable from '../../components/ShowTable';

export default function Cursos() {
  // const items = [
  //   {
  //     codigo:  215,
  //     nome: "Filosofia",
  //     descricao: "Filosofia"
  //   }
  // ]

  const fields = [
    {
      title: "Código",
      name: "codigo"
    },
    {
      title: "Nome",
      name: "nome"
    },
    {
      title: "Descrição",
      name: "descricao"
    }
  ];
  const [curso, setCurso] = useState({})
  const [show, setShow] = useState(false)
  const [items, setItems] = useState([])
  const [createCurso, setCreateCurso] = useState({});

  const [create, setCreate] = useState(false);

  const updateList = () => {
    api
      .get('cursos')
      .then(res => {
        setItems(res.data);
      });
      // console.log("update");
  }

  useEffect(() => {
    updateList();
    setCreateCurso({
      codigo: 0,
      nome: "",
      descricao: ""
    });
  }, []);

  const handleClose = () => {
    setShow(false);
    setCurso({});
    setCreate(false);
    updateList();
  }

  return (
    <>
      <Button onClick={() => {
        setShow(true);
        setCurso({});
        setCreate(true);
      }} block>
        Criar Curso
      </Button>
      
      <ShowTable data={items} fields={fields} onClick={(item) => {setShow(true); setCurso(item)}}/>
      <Curso create={create} show={show} onHide={handleClose} codigo={curso.codigo} />
    </>
  );
}

/* <Modal show={create} onHide={() => {setCreate(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCodigo">
              <Form.Label>Código</Form.Label>
              <Form.Control type="number" placeholder="eg: 3142"/>
            </Form.Group>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="eg: Tecnologia da Informação"/>
            </Form.Group>
            <Form.Group controlId="formDescricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="text" placeholder="eg: Curso de Tecnologida da Informação..."/>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal> */

// <>
/* <Table striped bordered hover>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody onHov>
      { items.map( item => {
        return (
        <tr style={{cursor: 'pointer'}} onClick={(e) => {
          setShow(true);
          setCurso(item);
          }} key={item.name}>
          <td>{item.codigo}</td>
          <td>{item.nome}</td>
          <td>{item.descricao}</td>
        </tr>)
      })}
      </tbody>
      
    </Table> */