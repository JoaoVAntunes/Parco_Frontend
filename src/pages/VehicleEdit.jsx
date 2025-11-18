import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VehicleContext from "../context/VehicleContext";

const VehicleEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { vehicles, updateVehicle } = useContext(VehicleContext);

  const [form, setForm] = useState({
    vehicleModel: "",
    vehiclePlate: "",
  });

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Carrega o veículo atual
  useEffect(() => {
    const vehicle = vehicles.find((v) => String(v.id) === String(id));

    if (!vehicle) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setForm({
      vehicleModel: vehicle.vehicleModel,
      vehiclePlate: vehicle.vehiclePlate,
    });

    setLoading(false);
  }, [id, vehicles]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateVehicle(id, form);

    navigate("/home/vehicles");
  };

  if (loading) return <p>Carregando...</p>;
  if (notFound) return <p className="text-red-500">Veículo não encontrado.</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Editar Veículo</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          name="vehicleModel"
          placeholder="Modelo"
          value={form.vehicleModel}
          onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          name="vehiclePlate"
          placeholder="Placa"
          value={form.vehiclePlate}
          onChange={(e) => setForm({ ...form, vehiclePlate: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Atualizar
        </button>
      </form>
    </div>
  );
};

export default VehicleEdit;