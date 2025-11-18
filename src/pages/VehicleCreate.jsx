import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import VehicleContext from "../context/VehicleContext";

const VehicleCreate = () => {
  const [form, setForm] = useState({
    vehicleModel: "",
    vehiclePlate: "",
  });

  const { addVehicle } = useContext(VehicleContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addVehicle(form);
    navigate("/home/vehicles");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex">
      {/* LEFT SIDE IMAGE  */}
      <div className="hidden lg:flex items-center justify-center flex-1 bg-primary-600">
        <img
          src="/assets/signup-car.png"
          alt="Cadastro Veículo"
          className="w-3/4 drop-shadow-xl"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex flex-col justify-center flex-1 px-6 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-md">

          <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Cadastrar Veículo
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Modelo */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Modelo do Veículo
              </label>
              <input
                type="text"
                required
                value={form.vehicleModel}
                onChange={(e) =>
                  setForm({ ...form, vehicleModel: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                           focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Ex: Toyota Corolla"
              />
            </div>

            {/* Placa */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Placa do Veículo
              </label>
              <input
                type="text"
                required
                maxLength={10}
                value={form.vehiclePlate}
                onChange={(e) =>
                  setForm({ ...form, vehiclePlate: e.target.value.toUpperCase() })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                           focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Ex: ABC-1234"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 
                         focus:ring-4 focus:outline-none focus:ring-primary-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                         dark:bg-primary-600 dark:hover:bg-primary-700 
                         dark:focus:ring-primary-800"
            >
              Salvar Veículo
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default VehicleCreate;
