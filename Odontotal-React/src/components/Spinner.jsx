import "../styles/componentStyles/Spinner.css";

export default function LoadingSpinner() {
    return (
      <div className="spinner-container">
        <div className="loading-spinner">
        </div>
        <p style={{fontWeight:'500', fontSize: '1.2rem'}} className="loading">Cargando...</p>
      </div>
    );
  }