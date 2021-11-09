import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const AlterarCliente = (props) => {

    const [dados, setDados] = useState([]);
    const [idCliente, setIdCliente] = useState(props.match.params.idCliente);

    const [id, setid] = useState('');
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    console.log(dados);
    const edtPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type':'application/json'
        };

        await axios.put(api + "/cliente/" + idCliente + "/pedido",{id, data, ClienteId}, {headers})
        .then((response) => {
            console.log(response.dados.error);
            console.log(response.dados.message);
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Não foi possível conectar a API'
            });
        });
    };

    useEffect(() => {
        const getPedido = async () => {
            await axios.get(api + "/cliente/" + idCliente + "/pedido")
            .then((response) => {
                setData(response.dados.pedido.data)
            })
            .catch(() => {
                console.log("Erro: não foi possível se conectar a API!")
            })
        }
        getPedido();
    }, [idCliente]);
    
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <h1>Editar Pedido</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente"
                        className="btn btn-outline-success btn-sm">Clientes
                    </Link>
                </div>
                <hr className="m-1"/>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : " "}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : " "}

                <Form className="p-2" onSubmit={edtPedido}>
                    <FormGroup className="p-2">
                        <Label>Id</Label>
                        <Input type="text" name="id" placeholder="Id do pedido" value={id}/>
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data</Label>
                        <Input type="text" name="data" placeholder="Data do pedido" value={data}
                        onChange={e => setData(e.target.value)}/>
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>ClienteId</Label>
                        <Input type="text" name="Clienteid" placeholder="Id do cliente" value={ClienteId}/>
                    </FormGroup>

                    <Button type="submit" outline color="warning">Salvar</Button>
                    <Button type="reset" outline color="success">Limpar</Button>
                </Form>
            </Container>
        </div>
    );
};