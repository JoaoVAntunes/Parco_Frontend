import { useContext } from "react";
import VehicleContext from "../context/VehicleContext";
import { Link } from "react-router-dom";

const VehicleList = () => {
  const { vehicles, loadingVehicles, deleteVehicle } = useContext(VehicleContext);

//   if (loadingVehicles) return <p>Carregando...</p>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Meus Veículos</h1>
        <Link
          to="/home/vehicles/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Adicionar Veículo
        </Link>
      </div>

      <table className="w-full text-left mt-4">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Placa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id} className="border-b">
              <td>{v.vehicleModel}</td>
              <td>{v.vehiclePlate}</td>
              <td className="flex gap-2">
                <Link
                  to={`/home/vehicles/edit/${v.id}`}
                  className="text-blue-500"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deleteVehicle(v.id)}
                  className="text-red-500"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;