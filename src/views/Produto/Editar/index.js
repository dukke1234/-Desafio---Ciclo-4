import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarProduto = (props) => {

    const [id] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtProduto = async e => {

        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/produto/" + id,
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
        const getProduto = async () => {
            await axios(api + "/produto/" + id)
                .then((response) => {
                    setNome(response.data.prod.nome);
                    setDescricao(response.data.prod.descricao);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API!(Obtenção)")
                })
        }
        getProduto();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1 className="m-auto p-2">Editar produto</h1>
                    </div>
                    <div className="m -auto p-2">
                        <Link to="/listar-produto"
                            className="m-auto btn btn-outline-success btn-sm">Produtos
                        </Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : " "}
                </div>
                <Form className="p-2" onSubmit={edtProduto}>

                    <FormGroup className="p-2">
                        <Label>
                            Nome
                        </Label>
                        <Input
                            type="text"
                            name="nome"
                            placeholder="Nome do produto"
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
                            placeholder="Descrição do produto"
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