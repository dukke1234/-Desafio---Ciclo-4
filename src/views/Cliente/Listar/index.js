import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { api } from "../../../config";

export const ListarCliente = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const getClientes = async () => {
        await axios.get(api + "/listaclientes")
            .then((response) => {
                console.log(response.data.clientes);
                setData(response.data.clientes);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: sem conexão com a API!"
                });
            });
    };

    const excluirCliente = async(idCliente) => {
        console.log(idCliente);

        const headers = {
            'Content-Type':'application/json'
        }

        await axios.delete(api + "/excluircliente/" + idCliente, {headers})
        .then((response) => {
            console.log(response.data.error);
            getClientes();
        })
        .catch(() => {
            setStatus({
                type:'error',
                message:'Não foi possível conectar-se a API!'
            })
        })
    }

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Visualizar informações do cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to="inserir-cliente"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Nascimento</th>
                            <th>Cliente desde</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cliente => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.endereco}</td>
                                <td>{cliente.cidade}</td>
                                <td>{cliente.uf}</td>
                                <td>{cliente.nascimento}</td>
                                <td>{cliente.clienteDesde}</td>
                                <td className="text-center/">
                                    <Link
                                        to={"/listarpedidocliente/" + cliente.id}
                                        className="btn btn-outline-primary btn-sm">
                                        Pedidos
                                    </Link>
                                    <Link
                                        to={"/alterar-cliente/" + cliente.id}
                                        className="btn btn-outline-secondary btn-sm">
                                        Itens
                                    </Link>
                                    <Link
                                        to={"/editar-cliente/" + cliente.id}
                                        className="btn btn-outline-warning btn-sm">
                                        Editar
                                    </Link>
                                    <span
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => excluirCliente(cliente.id)}>
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