import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { api } from "../../../config";

export const ListarProduto = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const getProdutos = async () => {
        await axios.get(api + "/listaprodutos")
            .then((response) => {
                console.log(response.data.produtos);
                setData(response.data.produtos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: sem conexão com a API!"
                });
            });
    };

    const excluirProduto = async (idProduto) => {
        console.log(idProduto);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.delete(api + "/excluirproduto/" + idProduto, { headers })
            .then((response) => {
                console.log(response.data.error);
                getProdutos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conectar-se a API!'
                })
            })
    }

    useEffect(() => {
        getProdutos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Visualizar informações do produto</h1>
                    </div>
                    <div className="p-2">
                        <Link to="inserir-produto"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(produto => (
                            <tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.descricao}</td>
                                <td className="text-center/">

                                <Link
                                    to={"/produto/listar/item" + produto.id}
                                    className="btn btn-outline-secondary btn-sm">
                                    Itens
                                </Link>
                                <Link
                                    to={"/editar-produto/" + produto.id}
                                    className="btn btn-outline-warning btn-sm">
                                    Editar
                                </Link>
                                <span
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => excluirProduto(produto.id)}>
                                    Excluir
                                </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};