import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1 className="m-auto p-2">Home</h1>
                    </div>

                    <div className="m-auto p-2">
                        <a href="/listar-cliente"
                            className="btn btn-outline-success btn-sm">
                            Listar clientes
                        </a>
                        <a href="/listar-pedido"
                            className="btn btn-outline-success btn-sm">
                            Listar pedidos
                        </a>
                        <a href="/listar-servico"
                            className="btn btn-outline-success btn-sm">
                            Listar serviços
                        </a>
                        <a href="/listar-compra"
                            className="btn btn-outline-success btn-sm">
                            Listar compras
                        </a>
                        <a href="/listar-produto"
                            className="btn btn-outline-success btn-sm">
                            Listar produtos
                        </a>
                    </div>
                </div>
            </Container>
        </div>
    );
};