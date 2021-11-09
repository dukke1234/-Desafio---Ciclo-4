import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarPedido = (props) => {

    const [id] = useState(props.match.params.id);
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
                    message: 'Não foi possível conectar a API!(Edição)'
                });
            });
    };

    useEffect(() => {
        const getPedido = async () => {
            await axios(api + "/pedido/" + id)
                .then((response) => {
                    setData(response.data.ped.data);
                    setClienteId(response.data.ped.ClienteId);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API!(Obtenção)")
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
                    <div className="m -auto p-2">
                        <Link to="/listar-pedido"
                            className="m-auto btn btn-outline-success btn-sm">Pedidos
                        </Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : " "}
                </div>
                <Form className="p-2" onSubmit={edtPedido}>

                    <FormGroup className="p-2">
                        <Label>
                            Data
                        </Label>
                        <Input
                            type="text"
                            name="data"
                            placeholder="Data do pedido"
                            value={data}
                            onChange={e => setData(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            ClienteId
                        </Label>
                        <Input
                            type="text"
                            name="ClienteId"
                            placeholder="ID do cliente"
                            value={ClienteId}
                            onChange={e => setClienteId(e.target.value)} />
                    </FormGroup>

                    <Button type="submit" outline color="success">Cadastrar</Button>
                    <Button type="reset" outline color="success">Limpar</Button>
                </Form>
            </Container>
        </div>
    );
};