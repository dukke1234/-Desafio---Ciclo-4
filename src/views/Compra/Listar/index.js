import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { api } from "../../../config";

export const ListarCompra = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const getCompras = async () => {
        await axios.get(api + "/listacompras")
            .then((response) => {
                console.log(response.data.compras);
                setData(response.data.compras);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: sem conexão com a API!"
                });
            });
    };

    const excluirCompra = async (idCompra) => {
        console.log(idCompra);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.delete(api + "/excluircompra/" + idCompra, { headers })
            .then((response) => {
                console.log(response.data.error);
                getCompras();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conectar-se a API!'
                })
            })
    }

    useEffect(() => {
        getCompras();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Visualizar informações da Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="inserir-compra"
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
                        {data.map(compra => (
                            <tr key={compra.id}>
                                <td>{compra.id}</td>
                                <td>{compra.data}</td>
                                <td>{compra.ClienteId}</td>
                                <td className="text-center/">

                                <Link
                                    to={"/compra/listar/item" + compra.id}
                                    className="btn btn-outline-secondary btn-sm">
                                    Itens
                                </Link>
                                <Link
                                    to={"/editar-compra/" + compra.id}
                                    className="btn btn-outline-warning btn-sm">
                                    Editar
                                </Link>
                                <span
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => excluirCompra(compra.id)}>
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