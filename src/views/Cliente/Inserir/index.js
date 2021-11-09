import { Link } from "react-router-dom";
import { useState } from "react";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { api } from "../../../config";

export const InserirCliente = () => {

    const [cliente, setCliente] = useState({
        nome: "",
        endereco: "",
        cidade: "",
        uf: "",
        nascimento: "",
        clienteDesde: ""
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCliente({
        ...cliente,[e.target.name]: e.target.value
    });

    const cadCliente = async e => {
        e.preventDefault();
        console.log(cliente);

        const headers = {
            'Content-Type': 'application/json'
        }
        await axios.post(api + "/clientes/inserir", cliente, {headers})
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
                    <h1>Cadastrar Cliente</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente"
                        className="btn btn-outline-success btn-sm"
                    >Clientes</Link>
                </div>
            </div>
            <hr className="m-1" />
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert>: ""}
            <Form className="p-2" onSubmit={cadCliente}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome do cliente"
                    onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Endereço</Label>
                    <Input type="text" name="endereco" placeholder="Endereço do cliente"
                    onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Cidade</Label>
                    <Input type="text" name="cidade" placeholder="Cidade do cliente"
                    onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>UF</Label>
                    <Input type="text" name="uf" placeholder="UF do cliente"
                    onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Nascimento</Label>
                    <Input type="text" name="nascimento" placeholder="00-00-0000"
                    onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Cliente desde</Label>
                    <Input type="text" name="clienteDesde" placeholder="00-00-0000"
                    onChange={valorInput}/>
                </FormGroup>
                <Button type="submit" outline color = "success">Cadastrar</Button>
                <Button type="reset" outline color="success">Limpar</Button>
            </Form>
        </Container>
    );
};