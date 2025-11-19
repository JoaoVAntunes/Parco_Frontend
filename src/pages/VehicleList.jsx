import { useContext } from "react";
import { Link } from "react-router-dom";
import VehicleContext from "../context/VehicleContext";

const VehicleList = () => {
  const { vehicles, deleteVehicle } = useContext(VehicleContext);

  return (
    <main className="lg:grid lg:grid-cols-2 w-screen h-screen">

      {/* LEFT IMAGE SIDE */}
      <section className="hidden bg-center bg-cover bg-no-repeat bg-[url('/assets/images/vehiclespark.jpg')] bg-gray-700 bg-blend-multiply lg:block">
        <div className="px-4 max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-3xl font-extrabold tracking-wide text-white md:text-5xl lg:text-6xl">
            Parco
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Your registered vehicles.
          </p>
        </div>
      </section>

      {/* RIGHT SIDE CONTENT */}
      <div className="bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-start py-14 px-8 h-full overflow-y-auto">

        <div className="mx-auto w-full max-w-2xl">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              My Vehicles
            </h2>

            <Link
              to="/home/vehicles/add"
              className="text-white bg-primary-600 hover:bg-primary-700 
              focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium 
              rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 
              dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              + Add Vehicle
            </Link>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-6 py-3">Model</th>
                  <th className="px-6 py-3">Plate</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {vehicles.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-4 font-medium">{v.vehicleModel}</td>
                    <td className="px-6 py-4">{v.vehiclePlate}</td>

                    <td className="px-6 py-4 flex gap-3">

                      <Link
                        to={`/home/vehicles/edit/${v.id}`}
                        className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteVehicle(v.id)}
                        className="text-red-500 hover:underline font-medium"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>

    </main>
  );
};

export default VehicleList;
