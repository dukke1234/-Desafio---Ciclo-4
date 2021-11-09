import { Link } from "react-router-dom";
import { useState } from "react";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { api } from "../../../config";

export const InserirProduto = () => {

    const [produto, setProduto] = useState({
        nome: "",
        descricao: ""
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setProduto({
        ...produto,[e.target.name]: e.target.value
    });

    const cadProduto = async e => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        }
        await axios.post(api + "/produtos/inserir", produto, {headers})
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
                    <h1>Cadastrar produto</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-produto"
                        className="btn btn-outline-success btn-sm"
                    >Produtos</Link>
                </div>
            </div>
            <hr className="m-1" />
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert>: ""}
            <Form className="p-2" onSubmit={cadProduto}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome do produto"
                    onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Descrição</Label>
                    <Input type="text" name="descricao" placeholder="Descrição do produto"
                    onChange={valorInput}/>
                </FormGroup>
                <Button type="submit" outline color = "success">Cadastrar</Button>
                <Button type="reset" outline color="success">Limpar</Button>
            </Form>
        </Container>
    );
};