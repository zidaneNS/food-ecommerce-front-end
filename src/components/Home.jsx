import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useAuth from '../hooks/useAuth';
import LoginPage from './LoginPage';
import { useState, useEffect } from 'react';

const Home = ({ foods }) => {
  const { auth, setAuth } = useAuth();
  const [orderedFoods, setOrderedFoods] = useState([]);
  return (
    <Container>
      {auth.user ? (
      <Row style={{marginTop: 200}}>
        {foods.map((food, id) => (
          <Col key={id}>
            <Card border="secondary" style={{ width: '18rem' }}>
              <Card.Header>Rp{food.price}</Card.Header>
              <Card.Body>
                <Card.Title>{food.name}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      ) :
      <LoginPage />
      }
    </Container>
  )
}

export default Home