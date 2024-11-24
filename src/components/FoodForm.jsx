import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "../api/axios";

const FoodForm = ({ initialName, initialPrice, initialStock, initialDescription, setDisplayFoodForm, setUpdated, id }) => {
    const [name, setName] = useState(initialName);
    const [price, setPrice] = useState(initialPrice);
    const [stock, setStock] = useState(initialStock);
    const [description, setDescription] = useState(initialDescription);

    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const url = id ? `/food/${id}` : '/food';

    useEffect(() => {
        setErrMsg('');
    }, [name, price, stock, description])

    const handleClose = () => {
        setName('');
        setPrice(0);
        setStock(0);
        setDescription('');
        setDisplayFoodForm(false);
    }

    const handleSave = async () => {
        setIsLoading(true);
        if (price < 0 || stock < 0) {
            setErrMsg('price or stock cannot below 0');
            setIsLoading(false);
            return
        }
        
        if (!name || !stock || !description || !price || !stock) {
            setErrMsg('input field cannot empty');
            setIsLoading(false);
            return;
        }
        try {
            const response = id ? await axios.put(url, JSON.stringify({ name, price, description, stock }), {
                headers: { 'Content-Type': 'application/json' }
            }) : await axios.post(url, JSON.stringify({ name, price, description, stock }), {
                headers: { 'Content-Type': 'application/json' }
            })
            setUpdated(true);
            setName('');
            setPrice(0);
            setStock(0);
            setDescription('');
            setDisplayFoodForm(false);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <>
    <Modal.Body className="food-form">
        <Form>
            <Form.Label htmlFor="nama">Nama: </Form.Label>
            <Form.Control
                type="text"
                id="nama"
                placeholder="Masukkan nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
            />

            <Form.Label htmlFor="harga">Harga: </Form.Label>
            <Form.Control
                type="number"
                id="harga"
                placeholder="Masukkan harga"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <Form.Label htmlFor="stok">Stok: </Form.Label>
            <Form.Control
                type="number"
                min="0"
                max="100"
                id="stok"
                placeholder="Masukkan stok"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
            />
            <Form.Label htmlFor="deskripsi">Deskripsi: </Form.Label>
            <Form.Control
                type="text"
                id="deskripsi"
                placeholder="Masukkan deskripsi"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </Form>
        <p className='text-danger error'>{errMsg}</p>
    </Modal.Body>
    <Modal.Footer>
    {isLoading ? (
        <Spinner animation="border" variant="primary" />
    ) : (
        <>
        <Button variant="secondary" onClick={() => handleClose()}>
        Close
        </Button>
        <Button variant="primary" onClick={() => handleSave()}>
        Save Changes
        </Button>
        </>
    )}
    </Modal.Footer>
    </>
  )
}

export default FoodForm