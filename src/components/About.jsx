import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function About() {
  return (
<div style={{ textAlign: 'left', maxWidth:'800px', width:'90%' }}>
  <Card>
    <Card.Header>What is Pogi Typings?</Card.Header>
    <Card.Body>
      <Card.Title>Pogi Typings</Card.Title>
      <Card.Text>
       refer to a style of texting where correct grammar and punctuation are used to convey a sense of sophistication and attractiveness. By adhering to proper grammar, individuals not only appear more intelligent but also earn "pogi points," as the term suggests. When you read a message written in Pogi Typings, it often gives the impression of conversing with a charismatic and refined individual, much like a character from a romantic novel. +9000 rizz and aura points 'yon  kay crushie.
      </Card.Text>
      <Link to="/chat">
      <Button variant="primary">Go Back.</Button>
      </Link>
    </Card.Body>
  </Card>
</div>

  );
}

export default About;