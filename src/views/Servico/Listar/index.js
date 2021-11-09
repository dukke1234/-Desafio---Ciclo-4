import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { api } from "../../../config";

export const ListarServico = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const getServicos = async () => {
        await axios.get(api + "/listaservicos")
            .then((response) => {
                console.log(response.data.servicos);
                setData(response.data.servicos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: sem conexão com a API!"
                });
            });
    };

    const excluirServico = async (idServico) => {

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.delete(api + "/excluirservico/" + idServico, { headers })
            .then((response) => {
                console.log(response.data.error);
                getServicos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conectar-se a API!'
                })
            })
    }

    useEffect(() => {
        getServicos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Visualizar informações do Serviço</h1>
                    </div>
                    <div className="p-2">
                        <Link to="inserir-servico"
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
                        {data.map(servico => (
                            <tr key={servico.id}>
                                <td>{servico.id}</td>
                                <td>{servico.nome}</td>
                                <td>{servico.descricao}</td>
                                <td className="text-center/">

                                <Link
                                    to={"/servico/listar/item" + servico.id}
                                    className="btn btn-outline-secondary btn-sm">
                                    Itens
                                </Link>
                                <Link
                                    to={"/editar-servico/" + servico.id}
                                    className="btn btn-outline-warning btn-sm">
                                    Editar
                                </Link>
                                <span
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => excluirServico(servico.id)}>
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