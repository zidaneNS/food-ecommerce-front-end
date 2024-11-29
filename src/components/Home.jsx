import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import useAuth from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import axios from '../api/axios';

const Home = ({ foods, setUpdated }) => {
  const { auth } = useAuth();
  const [orderedFoods, setOrderedFoods] = useState([]);
  const [isShowOrder, setIsShowOrder] = useState(false);
  const [note, setNote] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [noteDisplay, setNoteDisplay] = useState(false);

  useEffect(() => {
    orderedFoods.length === 0 && setIsShowOrder(false);
  }, [orderedFoods])
  
  const handleOrdered = (foodName) => {
    const foundOrder = orderedFoods.filter(order => order.name === foodName);
    if (foundOrder.length > 0) return

    const selectedOrder = foods.filter(food => food.name === foodName)[0];
    const newOrder = {id: selectedOrder._id, name: foodName, price: selectedOrder.price, stock: 1};
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
    setIsLoading(true);
    let total = 0;
    orderedFoods.forEach(order => total += order.stock*order.price)
    const orderInfo = {
      order: orderedFoods,
      total
    }
    try {
      const response = await axios.put('/food', JSON.stringify({ foods: orderedFoods }), {
        headers: { 'Content-Type': 'application/json' }
      });
      const response2 = await axios.post('/note', JSON.stringify({ notes: orderInfo }), {
        headers: { 'Content-Type': 'application/json' }
      });
      setNote(response2.data.result.data);
      setUpdated(true);
      setOrderedFoods([]);
      setNoteDisplay(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCloseNote = () => {
    setNoteDisplay(false);
    setNote({});
  }
  return (
    <div className="grid grid-flow-row place-content-center h-screen">
      {/* {note?.orderInfo?.order && (
      <Modal dialogClassName='modal-70w' show={noteDisplay}>
        <Modal.Header >
          <Modal.Title>Note {note.date}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {note.orderInfo.order.map((order, id) => (
              <li key={id}>
                <p>Name: {order.name}</p>
                <p>Amount: {order.stock}</p>
                <p>Price: {order.price}</p>
              </li>
            ))}
          </ul>
          <p>Total: {note.orderInfo.total}</p>
          <Button variant='danger' onClick={handleCloseNote} className='me-3'>Close</Button>
        </Modal.Body>
      </Modal>
      )} */}
      <h1 className="text-purple-600 dark:text-purple-500 text-6xl row-span-1">Pilih Pesanan Anda</h1>
      <section className="row-span-1 col-span-3 grid grid-flow-col gap-10">
        <div className="bg-slate-200 border border-slate-400 dark:bg-slate-900 dark:border-slate-200 rounded min-h-40 flex flex-col p-2 w-auto h-fit">
            <div className="font-bold text-slate-700 dark:text-slate-200 text-2xl border-b-2">Nama</div>
            <div className="text-slate-500 dark:text-slate-400 text-sm">Rp10000</div>
            <div className="text-slate-700 dark:text-slate-200 text-xl">Lorem, ipsum dolor.</div>
        </div>
        <div className="bg-slate-200 border border-slate-400 dark:bg-slate-900 dark:border-slate-200 rounded min-h-40 flex flex-col p-2 w-auto h-fit">
            <div className="font-bold text-slate-700 dark:text-slate-200 text-2xl border-b-2">Nama</div>
            <div className="text-slate-500 dark:text-slate-400 text-sm">Rp10000</div>
            <div className="text-slate-700 dark:text-slate-200 text-xl">Lorem, ipsum dolor.</div>
        </div>
        <div className="bg-slate-200 border border-slate-400 dark:bg-slate-900 dark:border-slate-200 rounded min-h-40 flex flex-col p-2 w-auto h-fit">
            <div className="font-bold text-slate-700 dark:text-slate-200 text-2xl border-b-2">Nama</div>
            <div className="text-slate-500 dark:text-slate-400 text-sm">Rp10000</div>
            <div className="text-slate-700 dark:text-slate-200 text-xl">Lorem, ipsum dolor.</div>
        </div>
      </section>
      {/* <Row style={{marginTop: 50, marginBottom: 50}}>
        {foods.map((food, id) => (
          <Col key={id}>
            <Card border="secondary" style={{ width: '18rem' }}>
              <Card.Header>Rp{food.price}</Card.Header>
              <Card.Body>
                <Card.Title>{food.name}</Card.Title>
                <Card.Text>{food.description}</Card.Text>
                <Button variant='danger' disabled={orderedFoods.filter(order => order.name === food.name).length > 0 || food.stock === 0} onClick={() => handleOrdered(food.name)}>Masukkan ke keranjang</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row> */}
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
            {isLoading ? (
              <Spinner animation='border' variant='warning' />
            ) : (
              <Button onClick={() => handleSubmit()}>Submit</Button>
            )}
          </Form>
        )}
      </Row>
    </div>
  )
}

export default Home