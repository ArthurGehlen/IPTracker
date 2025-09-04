import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Info from "./components/Info";

import "./App.css";

function App() {
  const [searchIP, setSearchIP] = useState("");
  const [IP, setIP] = useState("");
  const [domain, setDomain] = useState("");
  const [name, setName] = useState("");
  const [route, setRoute] = useState("");
  const [ISP, setISP] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [VPN, setVPN] = useState(false);
  const [TOR, setTOR] = useState(false);
  const [proxy, setProxy] = useState(false);

  const security_check = (value) => {
    return value ? "✅ Detectado" : "❌ Não detectado";
  };

  const fetch_data = (ip) => {
    fetch(
      `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${
        import.meta.env.VITE_API_PASS
      }${ip}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIP(data.ip);
        setISP(data.isp);
        setDomain(data.as["domain"]);
        setName(data.as["name"]);
        setRoute(data.as["route"]);
        setCountry(data.location["country"]);
        setState(data.location["region"]);
        setCity(data.location["city"]);
        setLatitude(data.location["lat"]);
        setLongitude(data.location["lng"]);
        setTimezone(data.location["timezone"]);
        setPostalCode(data.location["postalCode"]);
        setVPN(data.proxy["is_vpn"]);
        setTOR(data.proxy["is_tor"]);
        setProxy(data.proxy["is_proxy"]);
      });
  };

  useEffect(() => {
    fetch_data("&");
  }, []);

  const handle_submit = (e) => {
    e.preventDefault();
    fetch_data(`&ipAddress=${searchIP}`);
    setSearchIP("");
  };

  return (
    <>
      <h1>IPTracker</h1>

      <main>
        <section className="main_infos">
          <Info label="IP" value={IP || "Não Encontrado"} />
          <Info label="Rota" value={route || "Não Encontrado"} />
          <Info label="Nome" value={name || "Não Encontrado"} />
          <Info label="Domínio" value={domain || "Não Encontrado"} />
          <Info label="Provedor de Internet (ISP)" value={ISP || "Não Encontrado"} />
          <div className="local_infos">
            <h2>
              Localização <FaLocationDot />
            </h2>

            <Info label="País" value={country || "Não Encontrado"} />
            <Info label="Estado" value={state || "Não Encontrado"} />
            <Info label="Cidade" value={city || "Não Encontrado"} />
            <Info
              label="Latitude e Longitude"
              value={`${latitude} ${longitude}` || "Não Encontrado"}
            />
            <Info label="Fuso Horário" value={timezone || "Não Encontrado"} />
            <Info label="Código Postal" value={postalCode || "Não Encontrado"} />
          </div>
        </section>
        <form className="search_container" onSubmit={handle_submit}>
          <input
            type="text"
            placeholder="Escreva o endereço"
            value={searchIP}
            onChange={(e) => setSearchIP(e.target.value)}
            required
          />
          <button type="submit">Localizar Ip</button>
        </form>
        <section className="security_infos">
          <h2>Status de Segurança do IP</h2>

          <Info label="VPN" value={security_check(VPN)} />
          <Info label="TOR" value={security_check(TOR)} />
          <Info label="Proxy" value={security_check(proxy)} />
        </section>
      </main>
    </>
  );
}

export default App;
