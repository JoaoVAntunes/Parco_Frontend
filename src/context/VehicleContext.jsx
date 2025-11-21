import { createContext, useState, useEffect } from "react";

const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [errorVehicles, setErrorVehicles] = useState(null);

  const API_URL = "http://localhost:5230";

  // GET - Listar veículos
  const fetchVehicles = async () => {
    try {
      setLoadingVehicles(true);

      const response = await fetch(`${API_URL}/api/vehicle`);

      if (!response.ok) throw new Error("Erro ao obter veículos.");

      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      setErrorVehicles(error.message);
    } finally {
      setLoadingVehicles(false);
    }
  };

  // Carregar automaticamente ao iniciar o app
  useEffect(() => {
    fetchVehicles();
  }, []);

// ADD VEÍCULO
const addVehicle = async (vehicle) => {

  // Mock: adicionar um userId fixo
  const fixedUserId = "e0a63e0b-8a5c-4a0c-b8d4-5c7bb4a2b1d1";

  const response = await fetch(
    `${API_URL}/api/vehicle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...vehicle,
        userId: fixedUserId // MOCK ADICIONADO AQUI
      })
    }
  );

  if (!response.ok) {
    const msg = await response.text();
    console.error("Erro ao adicionar:", msg);
    throw new Error("Erro ao adicionar veículo.");
  }

  const newVehicle = await response.json();
  setVehicles((prev) => [...prev, newVehicle]);
};

  // PUT - Atualizar veículo
  const updateVehicle = async (id, updates) => {
    const response = await fetch(`${API_URL}/api/vehicle/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Erro ao atualizar:", err);
      throw new Error("Erro ao atualizar veículo.");
    }

    const updated = await response.json();

    setVehicles((prev) => prev.map((v) => (v.id === id ? updated : v)));
  };

  // DELETE - Excluir veículo
  const deleteVehicle = async (id) => {
    const response = await fetch(`${API_URL}/api/vehicle/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Erro ao excluir:", err);
      throw new Error("Erro ao excluir veículo.");
    }

    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        loadingVehicles,
        errorVehicles,
        fetchVehicles,
        addVehicle,
        updateVehicle,
        deleteVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export default VehicleContext;
