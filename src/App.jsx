import React, { useState, useEffect } from "react";

import { Form, Card, Image, Icon } from "semantic-ui-react";
import Header from "./views/components/Header";
import Repos from "./views/components/Repos";
import Footer from "./views/components/Footer";
import "./styles/App.css";

function App() {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const setData = ({ name, login, public_repos, avatar_url }) => {
    setName(name);
    setUsername(login);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
          setError(null);
        }
      });
  };

  return (
    <div>
      <Header />
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Github username"
              name="github user"
              onChange={handleSearch}
            />
            <Form.Button content="Search" />
          </Form.Group>
        </Form>
      </div>
      {error ? (
        <h1 className="error">User {error}</h1>
      ) : (
        <div className="card">
          <Card>
            <Image src={avatar} wrapper ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Header>{userName}</Card.Header>
            </Card.Content>
            <Card.Content entra>
              <a href="https://github.com/">
                <Icon name="code" />
                {repos} Repos
              </a>
            </Card.Content>
          </Card>
        </div>
      )}
      <Repos />
      <Footer />
    </div>
  );
}

export default App;
