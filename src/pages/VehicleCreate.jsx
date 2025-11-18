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
    <main className="lg:grid lg:grid-cols-2 w-screen h-screen">
        <section className="hidden bg-center bg-cover bg-no-repeat bg-[url('/assets/images/vehiclespark.jpg')] bg-gray-700 bg-blend-multiply lg:block">
            <div className="px-4 max-w-screen-xl text-center py-24 lg:py-56">
            <h1 className="mb-4 text-3xl font-extrabold tracking-wide text-white md:text-5xl lg:text-6xl">
                Parco
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                Register a new vehicle.
            </p>
            </div>
        </section>

        {/* RIGHT SIDE FORM */}
        <div className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center flex-1 px-6 py-8 mx-auto h-screen lg:py-0">
                {/* <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"> */}
                    <div className="mx-auto w-full max-w-md">

                    <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Register Vehicle
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Modelo */}
                        <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Vehicle model
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
                            Vehicle license plate
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
                        Save Vehicle
                        </button>

                    </form>
                    {/* </div> */}
                </div>
            </div>
        </div>
    </main>
  );
};

export default VehicleCreate;
