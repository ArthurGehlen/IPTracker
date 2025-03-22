import { FaLocationDot } from "react-icons/fa6";
import Info from "./components/Info";

import './App.css'

function App() {
  return (
    <>
      <h1>IPTracker</h1>

      <main>
        <section className="main_infos">
          <Info label='IP' value='' />
          <Info label='Provedor de Internet (ISP)' value='' />
          <div className="local_infos">
            <h2>Localização <FaLocationDot /></h2>

            <Info label='Cidade' value='' />
            <Info label='Estado' value='' />
            <Info label='País' value='' />
            <Info label='Latitude e Longitude' value='-33.854548400186665 151.20016200912815' />
            <Info label='Fuso Horário' value='' />
            <Info label='Hora Local' value='' />
          </div>
        </section>
        <form className="search_container">
          <input type="text" placeholder="Escreva o endereço" required/>
          <button type="submit">Localizar Ip</button>
        </form>
        <section className="security_infos">
          <h2>Status de Segurança do IP</h2>

          <Info label='VPN' value='' />
          <Info label='TOR' value='' />
          <Info label='Proxy' value='' />
          <Info label='Datacenter' value='' />
        </section>
      </main>
    </>
  )
}

export default App
