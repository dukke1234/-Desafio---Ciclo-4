import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { api } from "../../../config";

export const PedidoDoCliente = (props) => {

    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });
 
    const getPedidos = async () => {
        await axios.get(api + "/cliente/" + id + "/pedidos")
        .then((response) => {
            console.log(response.data.ped);
            setData(response.data.ped);
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: "Erro: sem conexão com a API!"
            })
        });
    };

    useEffect( () => {
        getPedidos();
    }, [id]);

    return (
        <div>
            <Container>
                <div>
                    <h1>Pedidos do Cliente</h1>
                </div>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Data</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ped => (
                            <tr key={ped.id}>
                                <td>{ped.id}</td>
                                <td>{ped.data}</td>
                                <td className="text-center/">
                                    <Link
                                    to={"/editar-pedido-cliente/" + ped.id}
                                    className="btn btn-outline-warning btn-sm">
                                        Editar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};