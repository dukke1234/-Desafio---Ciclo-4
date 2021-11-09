import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarServico = (props) => {

    const [id] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtServico = async e => {

        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/servico/" + id,
            { id, nome, descricao }, { headers })
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
        const getServico = async () => {
            await axios(api + "/servico/" + id)
                .then((response) => {
                    setNome(response.data.serv.nome);
                    setDescricao(response.data.serv.descricao);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API!(Obtenção)")
                })
        }
        getServico();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1 className="m-auto p-2">Editar Serviço</h1>
                    </div>
                    <div className="m -auto p-2">
                        <Link to="/listar-servico"
                            className="m-auto btn btn-outline-success btn-sm">Servicos
                        </Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : " "}
                </div>
                <Form className="p-2" onSubmit={edtServico}>

                    <FormGroup className="p-2">
                        <Label>
                            Nome
                        </Label>
                        <Input
                            type="text"
                            name="nome"
                            placeholder="Nome do serviço"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Descrição
                        </Label>
                        <Input
                            type="text"
                            name="descricao"
                            placeholder="Descrição do serviço"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)} />
                    </FormGroup>

                    <Button type="submit" outline color="success">Cadastrar</Button>
                    <Button type="reset" outline color="success">Limpar</Button>
                </Form>
            </Container>
        </div>
    );
};