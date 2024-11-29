import { Row, Table, Button, Col, Card, Accordion, ListGroup, Modal } from "react-bootstrap";
import FoodForm from "./FoodForm";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = ({ foods, setUpdated, notes }) => {
    const { auth } = useAuth();
    const [initialName, setInitialName] = useState('');
    const [initialPrice, setInitialPrice] = useState(0);
    const [initialStock, setInitialStock] = useState(0);
    const [initialDescription, setInitialDescription] = useState('');
    const [id, setId] = useState('');

    const handleDeleteNote = async (id) => {
        try {
            const response = await axios.delete(`/note/${id}`, {
                headers: {'Content-Type': 'application/json' }
            });
            setUpdated(true);
        } catch (err) {
            console.error(err);
        }
    }

    const handleDeleteFood = async (id) => {
        try {
            const response = await axios.delete(`food/${id}`, {
                headers: {'Content-Type': 'application/json' }
            })
            setUpdated(true);
        } catch (err) {
            console.error(err);
        }
    }
    
    const handleAddFood = () => {
        setInitialName('');
        setInitialPrice(0);
        setInitialStock(0);
        setInitialDescription('');
        setId('');
        setDisplayFoodForm(true);
    }

    const handleUpdateFood = (name, price, stock, description, id) => {
        setInitialName(name);
        setInitialPrice(price);
        setInitialStock(stock);
        setInitialDescription(description);
        setId(id)
        setDisplayFoodForm(true);
    }

    const [displayFoodForm, setDisplayFoodForm] = useState(false);

  return (
    <div style={{ marginTop: 70}}>
    {auth?.roles?.admin ? (
    <>
    <Modal show={displayFoodForm}>
        <Modal.Header>
          <Modal.Title>Edit Menu</Modal.Title>
        </Modal.Header>
        <FoodForm 
            setDisplayFoodForm={setDisplayFoodForm}
            setUpdated={setUpdated}
            initialName={initialName}
            initialPrice={initialPrice}
            initialStock={initialStock}
            initialDescription={initialDescription}
            id={id}
        />
    </Modal>
    <Row className="p-4" >
        <h1>Informasi Menu</h1>
        <Button onClick={() => handleAddFood()} variant="primary" style={{ maxWidth: 200, marginLeft: 12, marginBottom: 20 }}>Tambah Menu</Button>
        <Table striped bordered responsive >
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Makanan</th>
                    <th>Harga</th>
                    <th>Deskripsi</th>
                    <th>Stok</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {foods.map((food, id) => (
                    <tr key={id}>
                        <td>{id+1}</td>
                        <td>{food.name}</td>
                        <td>Rp{food.price}</td>
                        <td>{food.description}</td>
                        <td>{food.stock}</td>
                        <td>
                            <Button 
                                variant="primary" 
                                style={{ marginRight: 20 }}
                                onClick={() => handleUpdateFood(food.name, food.price, food.stock, food.description, food._id)}
                            >
                                Update
                            </Button>
                            <Button variant="danger" onClick={() => handleDeleteFood(food._id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </Row>
    <Row className="p-4">
        <h1>Notes</h1>
        {notes.map((note, id) => (
            <Col key={id}>
                <Card>
                    <Card.Header>{note.data.date}</Card.Header>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Info Pesanan</Accordion.Header>
                            <Accordion.Body>
                                {note.data.orderInfo.order.map((order, idx) => (
                                    <ul key={idx}>
                                        <li>{order.name}</li>
                                        <li>{order.stock}</li>
                                    </ul>
                                ))}
                                <ListGroup vertical className="mb-4">
                                    <ListGroup.Item>
                                        Hasil enkripsi:
                                        <br />
                                        {note.des_text}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        total:
                                        <br />
                                        Rp{note.data.orderInfo.total}
                                    </ListGroup.Item>
                                </ListGroup>
                                <Button variant="danger" onClick={() => handleDeleteNote(note._id)}>Delete</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card>
            </Col>
        ))}
    </Row>
    </>
    ) : (
        <>
        <h1>You r not allowed</h1>
        <Link to="/">Go back</Link>
        </>
    )}
    </div>
  )
}

export default Dashboard