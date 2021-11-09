import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home } from './views/Home';
import { InserirCliente } from './views/Cliente/Inserir';
import { InserirPedido } from './views/Pedido/Inserir';
import { InserirServico } from './views/Servico/Inserir';
import { InserirCompra } from './views/Compra/Inserir';
import { InserirProduto } from './views/Produto/Inserir';
import { ListarCliente } from './views/Cliente/Listar';
import { ListarPedido } from './views/Pedido/Listar';
import { ListarServico } from './views/Servico/Listar';
import { ListarCompra } from './views/Compra/Listar';
import { ListarProduto } from './views/Produto/Listar';
import { EditarCliente } from './views/Cliente/Editar';
import { AlterarCliente } from './views/Cliente/Alterar';
import { EditarPedido } from './views/Pedido/Editar';
import { EditarServico } from './views/Servico/Editar';
import { EditarCompra } from './views/Compra/Editar';
import { EditarProduto } from './views/Produto/Editar';
import { Menu } from './components/Menu';
import { Item } from './views/Servico/Item';
import { Cadastrar } from './views/Servico/Cadastrar';
import { PedidoDoCliente } from './views/Cliente/Pedido';
import { EditarPedidoDoCliente } from './views/Cliente/EditarPedido';

function App() {
  return (
    <div>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path="/" component={Home}/>
          {/* CRIAR */}
          <Route path="/inserir-cliente" component={InserirCliente}/>
          <Route path="/inserir-pedido" component={InserirPedido}/>
          <Route path="/Inserir-servico" component={InserirServico}/>
          <Route path="/inserir-compra" component={InserirCompra}/>
          <Route path="/inserir-produto" component={InserirProduto}/>

          <Route path="/cadastrarservico" component={Cadastrar}/>
          {/* LISTAR */}
          <Route path="/listar-cliente" component={ListarCliente}/>
          <Route path="/listar-pedido" component={ListarPedido}/>
          <Route path="/listar-servico" component={ListarServico}/>

          <Route path="/listar-compra" component={ListarCompra}/>
          <Route path="/listar-produto" component={ListarProduto}/>

          <Route path="/listarpedido/:id" component={Item}/>
          <Route path="/listarpedidocliente/:id" component={PedidoDoCliente}/>
          {/* EDITAR */}
          <Route path="/editar-cliente/:id" component={EditarCliente}/>
          <Route path="/alterar-cliente/" component={AlterarCliente}/>
          <Route path="/editar-pedido/:id" component={EditarPedido}/>
          <Route path="/editar-servico/:id" component={EditarServico}/>
          <Route path="/editar-pedido-cliente/:id" component={EditarPedidoDoCliente}/>
          <Route path="/editar-compra/:id" component={EditarCompra}/>
          <Route path="/editar-produto/:id" component={EditarProduto}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
