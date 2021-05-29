import React, { useState, useEffect } from "react";
import { Card, Grid } from "semantic-ui-react";

function Repos() {
  const [name, setRepoName] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/example/repos")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const setData = ({ name, description, language }) => {
    setRepoName(name);
    setDescription(description);
    setLanguage(language);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}/repos`)
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
      <div class="grid">
        <Grid
          columns={3}
          divided
          onSubmit={handleSubmit}
          onChange={handleSearch}
        >
          <Grid.Row>
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Card.Header>{name}</Card.Header>
                  <Card.Header>{description}</Card.Header>
                  <Card.Header>{language}</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

export default Repos;
