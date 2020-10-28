import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ShowTable from '../../components/ShowTable';
import Disciplina from '../../components/Disciplina';
import api from '../../services/api';

export default function Disciplinas() {
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
    },
  ];
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [disciplina, setDisciplina] = useState({});
  const [create, setCreate] = useState(false);
  useEffect(() => {
    api.get('disciplinas').then(res => {
      // console.log(res);
      setItems(res.data);
    })
  }, []);

  const handleClose = () => {
    setShow(false);
    setDisciplina({});
    setCreate(false);
  }

  return (
    <>
    <Button onClick={() => {
        setShow(true);
        setDisciplina({});
        setCreate(true);
      }} block>
      Criar Disciplina
    </Button>
    <ShowTable data={items} fields={fields} onClick={(item) => {
      setShow(true);
      setDisciplina(item);
    }} />
    <Disciplina create={create} show={show} onHide={handleClose} codigo={disciplina.codigo} />
    </>
  );
}