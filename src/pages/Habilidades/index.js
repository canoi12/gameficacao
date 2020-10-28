import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ShowTable from "../../components/ShowTable";
import Habilidade from "../../components/Habilidade";
import { Button } from "react-bootstrap";

export default function Habilidades() {
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
      name: "codigo",
    },
    {
      title: "Nome",
      name: "nome",
    },
    {
      title: "Descrição",
      name: "descricao",
    },
  ];

  const [create, setCreate] = useState(false);
  const [show, setShow] = useState(false);
  const [habilidade, setHabilidade] = useState({});
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get("habilidades").then((res) => {
      // console.log(res);
      setItems(res.data);
    });
  }, []);

  const handleClose = () => {
    setShow(false);
    setHabilidade({});
    setCreate(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          setShow(true);
          setHabilidade({});
          setCreate(true);
        }}
        block
      >
        Cadastrar Habilidade
      </Button>
      <ShowTable
        data={items}
        fields={fields}
        onClick={(item) => {
          setShow(true);
          setHabilidade(item);
        }}
      />
      <Habilidade
        edit={create}
        show={show}
        onHide={handleClose}
        codigo={habilidade.codigo}
      />
    </>
  );
}
