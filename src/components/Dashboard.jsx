import { Row, Table, Button, Col, Card, Accordion, ListGroup } from "react-bootstrap";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom";

const Dashboard = ({ foods, setUpdated, notes }) => {
    const { auth } = useAuth();
    const handleDeleteNote = async (id) => {
        try {
            const response = await axios.delete(`/note/${id}`, {
                headers: {'Content-Type': 'application/json'}
            });

            console.log(response.data);
            setUpdated(true);
        } catch (err) {
            console.error(err);
        }
    }
  return (
    <div style={{ marginTop: 70}}>
    {auth?.roles?.admin ? (
        <>
            <Row className="p-4" >
                <h1>Informasi Menu</h1>
                <Button onClick={() => console.log('notes', notes)} variant="primary" style={{ maxWidth: 200, marginLeft: 12, marginBottom: 20 }}>Tambah Menu</Button>
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
                                    <Button variant="primary" style={{ marginRight: 20 }}>Update</Button>
                                    <Button variant="danger">Delete</Button>
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
                                        {note.data.orderInfo.map((order, idx) => (
                                            <ul key={idx}>
                                                <li>{order.name}</li>
                                                <li>{order.stock}</li>
                                            </ul>
                                        ))}
                                        <ListGroup vertical className="mb-4">
                                            <ListGroup.Item>
                                                shift key: 
                                                <br />
                                                {note.shift_key}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                viginere key:
                                                <br />
                                                {note.viginere_key}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                des key:
                                                <br />
                                                {note.des_key} 
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                shift text:
                                                <br />
                                                {note.shift_text}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                viginere text:
                                                <br />
                                                {note.viginere_text}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                des text:
                                                <br />
                                                {note.des_text}
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