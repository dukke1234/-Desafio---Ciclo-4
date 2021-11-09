import axios from "axios";
import { useEffect, useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { Container, Alert, FormGroup, Form, Label, Input, Button } from "reactstrap";
import { api } from "../../../config";

export const EditarPedidoDoCliente = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtPedido = async e => {

        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/pedido/" + id,
            { id, data, ClienteId }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Alteração feita com sucesso!'
                });
                console.log(response.data.type);
                console.log(response.data.message);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível acessar a API!'
                });
            });
    };

    useEffect(() => {
        const getPedido = async () => {
            await axios(api + "/pedido/" + id)
                .then((response) => {
                    setId(response.data.pedido.id);
                    setData(response.data.pedido.data);
                    setClienteId(response.data.pedido.ClienteId);
                })
                .catch(() => {
                    console.log("Erro: não foi possível conectar-se a API!")
                })
        }
        getPedido();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1 className="m-auto p-2">Editar Pedido</h1>
                    </div>

                    <div className="m-auto p-2">
                        <Link to="/listar-cliente" className="m-auto btn btn-outline-primary btn-sm">
                            Clientes
                        </Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">
                        {status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">
                        {status.message}</Alert> : " "}
                </div>
                <Form className="p-2" onSubmit={edtPedido}>
                    <FormGroup className="p-2">
                        <Label>
                            ID do Pedido
                        </Label>
                        <Input
                            name="id"
                            placeholder="Id do pedido"
                            type="text"
                            defaultValue={id}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Data do Pedido
                        </Label>
                        <Input
                            name="data"
                            placeholder="Data do pedido"
                            type="text"
                            value={data}
                            onChange={e => setData(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            ID do Cliente
                        </Label>
                        <Input
                            name="ClienteId"
                            placeholder="Id do cliente"
                            type="text"
                            defaultValue={ClienteId}
                        />
                    </FormGroup>
                    <Button type="submit" outline color="success">Salvar</Button>
                    <Button type="reset" outline color="success">Limpar</Button>
                </Form>
            </Container>
        </div>
    );
};