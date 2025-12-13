import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import FormularioRegistro from './Components/FormularioRegistro.jsx';
import ResumoGeral from './Components/ResumoGeral';
import TotaisPorCategoria from './Components/TotaisPorCategoria.jsx';
import Menu from './Components/Menu.jsx';
import RegistrosSalvos from './Components/RegistrosSalvos.jsx';
import Objetivos from './Components/Objetivos.jsx';
import Graficos from './Components/Graficos.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Menu /> },
      { path: 'gasto', element: <FormularioRegistro /> },
      { path: 'resumo', element: <ResumoGeral /> },
      { path: 'graficos', element: <Graficos /> },
      { path: 'categorias', element: <TotaisPorCategoria /> },
      { path: 'registrosSalvos', element: <RegistrosSalvos /> },
      { path: 'objetivos', element: <Objetivos /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
