import { Link } from "react-router-dom";
import { useState } from "react";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { api } from "../../../config";

export const InserirCompra = () => {

    const [compra, setCompra] = useState({
        data: "",
        ClienteId: ""
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCompra({
        ...compra,[e.target.name]: e.target.value
    });

    const cadCompra = async e => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        }
        await axios.post(api + "/compras/inserir", compra, {headers})
        .then((response) => {
            if(response.data.error){
                setStatus({
                    type: 'error',
                    message: response.data.message
                });
            }else{
                setStatus({
                    type: 'success',
                    message: response.data.message
                })
            };
        })
        .catch(() => {
            console.log("Erro: sem conexão com a API")
        });
    };
    
    return (
        <Container>
            <div className="d-flex ">
                <div className="m-auto p-2">
                    <h1>Cadastrar Compra</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-compra"
                        className="btn btn-outline-success btn-sm"
                    >Compras</Link>
                </div>
            </div>
            <hr className="m-1" />
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert>: ""}
            <Form className="p-2" onSubmit={cadCompra}>
                <FormGroup className="p-2">
                    <Label>Data</Label>
                    <Input type="text" name="data" placeholder="Data da Compra"
                    onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>ClienteId</Label>
                    <Input type="text" name="ClienteId" placeholder="Id do cliente"
                    onChange={valorInput}/>
                </FormGroup>
                <Button type="submit" outline color = "success">Cadastrar</Button>
                <Button type="reset" outline color="success">Limpar</Button>
            </Form>
        </Container>
    );
};