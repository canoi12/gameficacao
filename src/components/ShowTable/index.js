import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from '../../services/api';

export default function ShowTable(props) {
  const {
    data,
    onClick,
    fields=[]
  } = props;

  const [items, setItems] = useState(data);

  useEffect(() => {
    setItems(data);
  }, [data])

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {fields.map(field => {
            return <th>{field.title}</th>
          })}
        </tr>
      </thead>
      <tbody>
      { items.map( item => {
        return (
        <tr style={{cursor: (onClick ? 'pointer' : 'normal')}} onClick={() => {onClick && onClick(item)}} key={item.name}>
          {fields.map( field => {
            return <td>{item[field.name]}</td>
          })}
        </tr>)
      })}
      </tbody>
      
    </Table>
  );
}