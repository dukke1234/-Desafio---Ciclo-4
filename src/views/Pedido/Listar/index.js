import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { api } from "../../../config";

export const ListarPedido = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const getPedidos = async () => {
        await axios.get(api + "/listapedidos")
            .then((response) => {
                console.log(response.data.pedidos);
                setData(response.data.pedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: sem conexão com a API!"
                });
            });
    };

    const excluirPedido = async (idPedido) => {
        console.log(idPedido);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.delete(api + "/excluirpedido/" + idPedido, { headers })
            .then((response) => {
                console.log(response.data.error);
                getPedidos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conectar-se a API!'
                })
            })
    }

    useEffect(() => {
        getPedidos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Visualizar informações do Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link to="inserir-pedido"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>Cliente Id</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(pedido => (
                            <tr key={pedido.id}>
                                <td>{pedido.id}</td>
                                <td>{pedido.data}</td>
                                <td>{pedido.ClienteId}</td>
                                <td className="text-center/">

                                <Link
                                    to={"/pedido/listar/item" + pedido.id}
                                    className="btn btn-outline-secondary btn-sm">
                                    Itens
                                </Link>
                                <Link
                                    to={"/editar-pedido/" + pedido.id}
                                    className="btn btn-outline-warning btn-sm">
                                    Editar
                                </Link>
                                <span
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => excluirPedido(pedido.id)}>
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