import React from "react";
import { Nav, Navbar, Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Main from "./pages/Main";
import Cursos from "./pages/Cursos";
import Curriculos from "./pages/Curriculos";
import Alunos from "./pages/Alunos";
import Disciplinas from "./pages/Disciplinas";
import Habilidades from "./pages/Habilidades";

export default function Routes() {
  //   {
  //     name: "Home",
  //     path: "/",
  //     page: Main,
  //     exact: true
  //   },
  const menu = [
    {
      name: "Cursos",
      path: "/cursos",
      page: Cursos,
    },
    {
      name: "Estruturas Curriculares",
      path: "/curriculos",
      page: Curriculos,
    },
    {
      name: "Disciplinas",
      path: "/disciplinas",
      page: Disciplinas,
    },
    {
      name: "Alunos",
      path: "/alunos",
      page: Alunos,
    },
    {
      name: "Habilidades",
      path: "/habilidades",
      page: Habilidades,
    },
  ];
  return (
    <Router basename="/gameficacao">
      <Navbar variant="pills" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to={"/"}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav defaultActiveKey="/">
            {/* <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item> */}
            {menu.map((item) => {
              return (
                <Nav.Item key={item.name}>
                  {/* <LinkContainer to={item.path}> */}
                  <Nav.Link as={Link} to={item.path}>
                    {item.name}
                  </Nav.Link>
                  {/* </LinkContainer> */}
                </Nav.Item>
              );
            })}
          </Nav>
          {/* <Form inline>
            <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path={"/"} component={Main} />
        {menu.map((item) => {
          return (
            <Route
              key={item.name}
              exact={item.exact}
              path={item.path}
              component={item.page}
            />
          );
          // return <h1>{item.name}</h1>
        })}
        {/* <Route exact path="/">
          <Main/>
        </Route> */}
      </Switch>
    </Router>
  );
}
