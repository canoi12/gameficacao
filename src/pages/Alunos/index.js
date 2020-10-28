import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import api from "../../services/api";
import ShowTable from "../../components/ShowTable";
import Aluno from "../../components/Aluno";

export default function Alunos() {
  // const items = [
  //   {
  //     codigo:  215,
  //     nome: "Filosofia",
  //     descricao: "Filosofia"
  //   }
  // ]
  const fields = [
    {
      title: "Matrícula",
      name: "matricula",
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

  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [aluno, setAluno] = useState({});
  useEffect(() => {
    api.get("alunos").then((res) => {
      // console.log(res);
      setItems(res.data);
    });
  }, []);

  const handleClose = () => {
    setShow(false);
    setAluno({});
    setEdit(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          setShow(true);
          setAluno({});
          setEdit(true);
        }}
        block
      >
        Cadastrar Aluno
      </Button>
      <ShowTable
        data={items}
        fields={fields}
        onClick={(item) => {
          setShow(true);
          setAluno(item);
        }}
      />
      <Aluno edit={edit} show={show} onHide={handleClose} matricula={aluno.matricula} />
    </>
  );
}
