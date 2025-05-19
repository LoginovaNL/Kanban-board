import { Layout } from "./components/layout/layout";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Board } from "./components/board/board";
import { Card } from "./components/board/card/card";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter ([
  {
    path: "/",
    element: <Board/>
  },
  {
    path: "/tasks/:cardId",
    element: <Card/>
  }
])

function App() {
  return (
    <Layout>
      <Header/>
      <main>
        <RouterProvider router={router}/>
      </main>
      <Footer/>
    </Layout>
  );
}

export default App;
