import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [errorVehicles, setErrorVehicles] = useState(null);

  const token = Cookies.get("token");

  const fetchVehicles = async () => {
    try {
      setLoadingVehicles(true);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/vehicle`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Erro ao obter veículos.");

      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      setErrorVehicles(error.message);
    } finally {
      setLoadingVehicles(false);
    }
  };

  useEffect(() => {
    if (token) fetchVehicles();
  }, [token]);

  // ADD VEÍCULO
  const addVehicle = async (vehicle) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/vehicle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(vehicle),
      }
    );

    if (!response.ok) throw new Error("Erro ao adicionar veículo.");

    const newVehicle = await response.json();
    setVehicles((prev) => [...prev, newVehicle]);
  };

  // UPDATE VEÍCULO
  const updateVehicle = async (id, updates) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/vehicle/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      }
    );

    if (!response.ok) throw new Error("Erro ao atualizar veículo.");

    const updated = await response.json();

    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? updated : v))
    );
  };

  // DELETE VEÍCULO
  const deleteVehicle = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/vehicle/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Erro ao excluir veículo.");

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