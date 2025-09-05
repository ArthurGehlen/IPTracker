import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Info from "./components/Info";

import "./App.css";

function App() {
  const [searchIp, setSearchIp] = useState("");
  const [data, setData] = useState({
    ip: "",
    domain: "",
    orgName: "",
    route: "",
    isp: "",
    city: "",
    region: "",
    country: "",
    timezone: "",
    postalCode: "",
    latitude: "",
    longitude: "",
    vpn: false,
    tor: false,
    proxy: false,
  });

  const security_check = (value) => {
    return value ? "✅ Detectado" : "❌ Não detectado";
  };

  const fetch_data = (ip_param) => {
    fetch(
      `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${
        import.meta.env.VITE_API_KEY
      }${ip_param}`
    )
      .then((res) => res.json())
      .then((json_data) => {
        setData({
          ip: json_data.ip,
          isp: json_data.isp,
          domain: json_data.as["domain"],
          orgName: json_data.as["name"],
          route: json_data.as["route"],
          country: json_data.location["country"],
          region: json_data.location["region"],
          city: json_data.location["city"],
          latitude: json_data.location["lat"],
          longitude: json_data.location["lng"],
          timezone: json_data.location["timezone"],
          postalCode: json_data.location["postalCode"],
          vpn: json_data.proxy["is_vpn"],
          tor: json_data.proxy["is_tor"],
          proxy: json_data.proxy["is_proxy"],
        });
      });
  };

  useEffect(() => {
    fetch_data("&");
  }, []);

  const handle_submit = (e) => {
    e.preventDefault();
    fetch_data(`&ipAddress=${searchIp}`);
    setSearchIp("");
  };

  return (
    <>
      <h1>IP Tracker</h1>

      <main>
        <section className="main_infos">
          <Info label="IP" value={data.ip || "Não encontrado"} />
          <Info label="Rota" value={data.route || "Não encontrado"} />
          <Info
            label="Nome da Organização"
            value={data.orgName || "Não encontrado"}
          />
          <Info label="Domínio" value={data.domain || "Não encontrado"} />
          <Info
            label="Provedor de Internet (ISP)"
            value={data.isp || "Não encontrado"}
          />

          <div className="local_infos">
            <h2>
              Localização <FaLocationDot />
            </h2>
            <Info label="País" value={data.country || "Não encontrado"} />
            <Info label="Região" value={data.region || "Não encontrado"} />
            <Info label="Cidade" value={data.city || "Não encontrado"} />
            <Info
              label="Latitude / Longitude"
              value={`${data.latitude} ${data.longitude}` || "Não encontrado"}
            />
            <Info
              label="Fuso Horário"
              value={data.timezone || "Não encontrado"}
            />
            <Info
              label="Código Postal"
              value={data.postalCode || "Não encontrado"}
            />
          </div>
        </section>

        <div className="secondary_infos">
          <form className="search_container" onSubmit={handle_submit}>
            <input
              type="text"
              placeholder="Digite um endereço IP"
              value={searchIp}
              onChange={(e) => setSearchIp(e.target.value)}
              required
            />
            <button type="submit">Buscar IP</button>
          </form>
          <section className="security_infos">
            <h2>Status de Segurança do IP</h2>

            <Info label="VPN" value={security_check(data.vpn)} />
            <Info label="TOR" value={security_check(data.tor)} />
            <Info label="Proxy" value={security_check(data.proxy)} />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
