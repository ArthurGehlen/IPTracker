import './Info.css'

function Info({ label, value }) {
    return (
        <p>
            <span>{label}:</span> {value}
        </p>
    )
}

export default Info