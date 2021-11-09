import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarCliente = (props) => {

    const [id] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [clienteDesde, setClienteDesde] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtCliente = async e => {

        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/cliente/" + id,
            { id, nome, endereco, cidade, uf, nascimento, clienteDesde }, { headers })
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
        const getCliente = async () => {
            await axios(api + "/cliente/" + id)
                .then((response) => {
                    setNome(response.data.cli.nome);
                    setEndereco(response.data.cli.endereco);
                    setCidade(response.data.cli.cidade);
                    setUf(response.data.cli.uf);
                    setNascimento(response.data.cli.nascimento);
                    setClienteDesde(response.data.cli.clienteDesde);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API!(Obtenção)")
                })
        }
        getCliente();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1 className="m-auto p-2">Editar cliente</h1>
                    </div>
                    <div className="m -auto p-2">
                        <Link to="/listar-cliente"
                            className="m-auto btn btn-outline-success btn-sm">Clientes
                        </Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : " "}
                </div>
                <Form className="p-2" onSubmit={edtCliente}>

                    <FormGroup className="p-2">
                        <Label>
                            Nome
                        </Label>
                        <Input
                            type="text"
                            name="nome"
                            placeholder="Nome do cliente"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Endereço
                        </Label>
                        <Input
                            type="text"
                            name="endereco"
                            placeholder="Endereço do cliente"
                            value={endereco}
                            onChange={e => setEndereco(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Cidade
                        </Label>
                        <Input
                            type="text"
                            name="cidade"
                            placeholder="Cidade do cliente"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            UF
                        </Label>
                        <Input
                            type="text"
                            name="uf"
                            placeholder="UF do cliente"
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Nascimento
                        </Label>
                        <Input
                            type="text"
                            name="nascimento"
                            placeholder="00-00-0000"
                            value={nascimento}
                            onChange={e => setNascimento(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Cliente desde
                        </Label>
                        <Input
                            type="text"
                            name="clienteDesde"
                            placeholder="00-00-0000"
                            value={clienteDesde}
                            onChange={e => setClienteDesde(e.target.value)} />
                    </FormGroup>
                    <Button type="submit" outline color="success">Cadastrar</Button>
                    <Button type="reset" outline color="success">Limpar</Button>
                </Form>
            </Container>
        </div>
    );
};