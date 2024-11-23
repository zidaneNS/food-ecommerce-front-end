import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useAuth from '../hooks/useAuth';
import LoginPage from './LoginPage';
import { useState, useEffect } from 'react';
import axios from '../api/axios';

const Home = ({ foods, setUpdated }) => {
  const { auth } = useAuth();
  const [orderedFoods, setOrderedFoods] = useState([]);
  const [isShowOrder, setIsShowOrder] = useState(false);

  useEffect(() => {
    orderedFoods.length === 0 && setIsShowOrder(false);
  }, [orderedFoods])
  
  const handleOrdered = (foodName) => {
    const foundOrder = orderedFoods.filter(order => order.name === foodName);
    if (foundOrder.length > 0) return

    const id = foods.filter(food => food.name === foodName)[0]._id;
    const newOrder = {id, name: foodName, stock: 1};
    const oldOrdered = orderedFoods.filter(order => order.name !== foodName);
    setOrderedFoods([...oldOrdered, newOrder]);
  }

  const handleIncrement = (foodName) => {
    const maxIncrement = foods.filter(food => food.name === foodName)[0].stock;
    const updateOrder = orderedFoods.map(order => (order.name === foodName && order.stock < maxIncrement) ? {...order, stock: order.stock+1} : {...order});

    setOrderedFoods(updateOrder);
  }
  
  const handleDecrement = (foodName) => {
    const updateOrder = orderedFoods.map(order => (order.name === foodName && order.stock > 0) ? {...order, stock: order.stock - 1} : {...order});
    const newOrder = updateOrder.filter(order => order.stock > 0);

    setOrderedFoods(newOrder);
  }
  
  const handleSubmit = async () => {
    console.log('food order', orderedFoods);
    try {
      const response = await axios.put('/food', JSON.stringify({ foods: orderedFoods }), {
        headers: { 'Content-Type': 'application/json' }
      });
      const response2 = await axios.post('/note', JSON.stringify({ notes: orderedFoods }), {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response.data);
      console.log(response2.data);
      setUpdated(true);
      setOrderedFoods([]);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Container>
      {auth.user ? (
      <>
      <h1 style={{marginTop: 120}}>Pilih Pesanan Anda</h1>
      <Row style={{marginTop: 50, marginBottom: 50}}>
        {foods.map((food, id) => (
          <Col key={id}>
            <Card border="secondary" style={{ width: '18rem' }}>
              <Card.Header>Rp{food.price}</Card.Header>
              <Card.Body>
                <Card.Title>{food.name}</Card.Title>
                <Card.Text>{food.description}</Card.Text>
                <Button variant='danger' disabled={orderedFoods.filter(order => order.name === food.name).length > 0} onClick={() => handleOrdered(food.name)}>Masukkan ke keranjang</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        {orderedFoods.length > 0 && (
        <Button variant='warning' onClick={() => setIsShowOrder(prev => !prev)} className='mb-3'>{isShowOrder ? "Sembunyikan Pesanan" : "Tampilkan Pesanan"}</Button>
        )}
        {isShowOrder && (
          <Form className='border border-3 rounded border-warning mb-5 p-4'>
            <h1>Pesanan Anda</h1>
            {orderedFoods.map((order, id) => (
              <Form.Group key={id} className='border border-1 rounded border-warning p-3 mb-3'>
                <Form.Label htmlFor={order.name}>{order.name}</Form.Label>
                <Row>
                  <Col>
                    <Button variant='danger' onClick={() => handleDecrement(order.name)}>-</Button>
                  </Col>
                  <Col sm="9">
                    <Form.Control id={order.name} type='text' readOnly value={order.stock} />
                  </Col>
                  <Col>
                    <Button variant='danger' onClick={() => handleIncrement(order.name)}>+</Button>
                  </Col>
                </Row>
              </Form.Group>
            ))}
            <Button onClick={() => handleSubmit()}>Submit</Button>
          </Form>
        )}
      </Row>
      </>
      ) :
      <LoginPage />
      }
    </Container>
  )
}

export default Home