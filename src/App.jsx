import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Info from "./components/Info";

import './App.css'

function App() {
  const [searchIP, setSearchIP] = useState('')
  const [IP, setIP] = useState('')
  const [ISP, setISP] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [timezone, setTimezone] = useState('')
  const [localTime, setLocalTime] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [VPN, setVPN] = useState(false)
  const [TOR, setTOR] = useState(false)
  const [proxy, setProxy] = useState(false)
  const [datacenter, setDatacenter] = useState(false)

  const security_check = (value) => {
    return value ? '✅ Detectado' : '❌ Não detectado'
  }

  const fetch_data = (ip) => {
    fetch(`https://api.ipquery.io${ip}?format=json`)
      .then((res) => res.json())
      .then((data) => {
        setIP(data.ip)
        setISP(data.isp["org"])
        setCountry(data.location["country"])
        setState(data.location["state"])
        setCity(data.location["city"])
        setLatitude(data.location["latitude"])
        setLongitude(data.location["longitude"])
        setTimezone(data.location["timezone"])
        setLocalTime(data.location["localtime"])
        setVPN(data.risk["is_vpn"])
        setTOR(data.risk["is_tor"])
        setProxy(data.risk["is_proxy"])
        setDatacenter(data.risk["is_datacenter"])
      })
  }

  useEffect(() => {
    fetch_data('/')
  }, [])

  const handle_submit = (e) => {
    e.preventDefault()
    fetch_data(searchIP)
  }

  return (
    <>
      <h1>IPTracker</h1>

      <main>
        <section className="main_infos">
          <Info label='IP' value={IP} />
          <Info label='Provedor de Internet (ISP)' value={ISP} />
          <div className="local_infos">
            <h2>Localização <FaLocationDot /></h2>

            <Info label='Cidade' value={city} />
            <Info label='Estado' value={state} />
            <Info label='País' value={country} />
            <Info label='Latitude e Longitude' value={`${latitude} ${longitude}`} />
            <Info label='Fuso Horário' value={timezone} />
            <Info label='Hora Local' value={localTime} />
          </div>
        </section>
        <form className="search_container" onSubmit={handle_submit}>
          <input
            type="text"
            placeholder="Escreva o endereço"
            onChange={(e) => setSearchIP(`/${e.target.value}`)}
            required />
          <button type="submit">Localizar Ip</button>
        </form>
        <section className="security_infos">
          <h2>Status de Segurança do IP</h2>

          <Info label='VPN' value={security_check(VPN)} />
          <Info label='TOR' value={security_check(TOR)} />
          <Info label='Proxy' value={security_check(proxy)} />
          <Info label='Datacenter' value={security_check(datacenter)} />
        </section>
      </main>
    </>
  )
}

export default App
