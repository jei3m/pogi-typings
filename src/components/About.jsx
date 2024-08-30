import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function About() {
  return (
<div style={{ textAlign: 'left', maxWidth:'800px', width:'80%' }}>
  <Card>
    <Card.Header>What is Pogi Typings?</Card.Header>
    <Card.Body>
      <Card.Title>Pogi Typings</Card.Title>
      <Card.Text>
       is a term commonly used by Filipinos on social media to describe someone—typically a man—who exudes an aura of impressive attractiveness and an intimidating personality. This person writes or types in a very formal and polished manner, with meticulous attention to grammar, capitalization, and punctuation, reflecting a serious and authoritative tone in their communication.  
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