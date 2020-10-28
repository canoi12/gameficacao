import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import api from '../../services/api';
import ShowTable from '../../components/ShowTable';
import Curriculo from '../../components/Curriculo'

export default function Curriculos() {
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
  ]

  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [curriculo, setCurriculo] = useState({});
  const [create, setCreate] = useState(false);
  useEffect(() => {
    api.get('curriculos').then(res => {
      // console.log(res);
      setItems(res.data);
    })
  }, []);

  const handleClose = () => {
    setShow(false);
    setCurriculo({});
    setCreate(false);
  }

  return (
    <>
    <Button onClick={() => {
        setShow(true);
        setCurriculo({});
        setCreate(true);
      }} block>
        Criar Estrutura Curricular
      </Button>
    <ShowTable data={items} fields={fields} onClick={(item) => {
      setShow(true);
      setCurriculo(item);
    }}/>
    <Curriculo show={show} create={create} onHide={handleClose} codigo={curriculo.codigo} />
    </>
  );
}