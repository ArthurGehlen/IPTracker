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
    return value ? "✅ Detected" : "❌ Not detected";
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
          <Info label="IP" value={data.ip || "Não Encontrado"} />
          <Info label="Route" value={data.route || "Não Encontrado"} />
          <Info
            label="Organization Name"
            value={data.orgName || "Não Encontrado"}
          />
          <Info label="Domain" value={data.domain || "Não Encontrado"} />
          <Info
            label="Internet Service Provider (ISP)"
            value={data.isp || "Não Encontrado"}
          />
          <div className="local_infos">
            <h2>
              Location <FaLocationDot />
            </h2>

            <Info label="Country" value={data.country || "Não Encontrado"} />
            <Info label="Region" value={data.region || "Não Encontrado"} />
            <Info label="City" value={data.city || "Não Encontrado"} />
            <Info
              label="Latitude / Longitude"
              value={`${data.latitude} ${data.longitude}` || "Não Encontrado"}
            />
            <Info label="Timezone" value={data.timezone || "Não Encontrado"} />
            <Info
              label="Postal Code"
              value={data.postalCode || "Não Encontrado"}
            />
          </div>
        </section>
        <form className="search_container" onSubmit={handle_submit}>
          <input
            type="text"
            placeholder="Enter IP address"
            value={searchIp}
            onChange={(e) => setSearchIp(e.target.value)}
            required
          />
          <button type="submit">Find IP</button>
        </form>
        <section className="security_infos">
          <h2>IP Security Status</h2>

          <Info label="VPN" value={security_check(data.vpn)} />
          <Info label="TOR" value={security_check(data.tor)} />
          <Info label="Proxy" value={security_check(data.proxy)} />
        </section>
      </main>
    </>
  );
}

export default App;
