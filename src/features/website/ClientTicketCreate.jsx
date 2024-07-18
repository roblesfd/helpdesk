import Box from "../../components/Box";
import { useAddNewTicketMutation } from "../tickets/ticketsApiSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import ClientNavBar from "./ClientNavBar";
import ClientFooter from "./ClientFooter";

let initialValues = {
  title: "",
  description: "",
};

const checkoutSchema = Yup.object().shape({
  title: Yup.string()
    .min(8, "8 carácteres mínimo")
    .max(40, "40 carácteres máximo")
    .required("Este campo es obligatorio"),
  description: Yup.string()
    .min(20, "20 carácteres mínimo")
    .max(100, "100 carácteres máximo")
    .required("Este campo es obligatorio"),
});

const ClientTicketCreate = () => {
  const [createTicket] = useAddNewTicketMutation();
  const { username } = useAuth();

  const onSaveTicketClicked = async (values) => {
    const isClient = true;
    values.isClient = isClient;
    const result = await createTicket({ username, ...values });

    if (!result.error) {
      toast.success(result.data.message);
      setTimeout(() => {
        location.href = `/usuarios/${username._id}`;
      }, 2000);
    } else {
      toast.error(result.error.data.message);
    }
  };

  return (
    <div className="text-indigo-950">
      {/* NAVBAR */}
      <ClientNavBar />
      {/* CONTENIDO PRINCIPAL */}
      <div className="min-h-screen bg-indigo-50 px-6 md:px-16 py-7 md:py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Levantar un ticket</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            nesciunt?
          </p>
        </div>
        <div className="w-90 md:w-2/4 mx-auto  p-4  0">
          <Formik
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            onSubmit={(values) => {
              onSaveTicketClicked(values);
            }}
          >
            {(formik) => {
              const { handleSubmit } = formik;
              return (
                <Box>
                  <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 dark:text-primary-50 text-sm font-bold mb-2"
                        htmlFor="title"
                      >
                        Título
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={formik.values.title}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className={`shadow-md border rounded-md w-full py-2 px-3 text-gray-700 dark:text-primary-50 dark:bg-primary-970 leading-tight  ${
                          formik.touched.title && formik.errors.title
                            ? "outline  outline-red-400"
                            : ""
                        }`}
                        required
                      />
                      {formik.touched.title && formik.errors.title ? (
                        <div
                          className={` text-sm ${
                            formik.touched.title && formik.errors.title
                              ? "text-red-500"
                              : ""
                          }`}
                        >
                          {formik.errors.title}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 dark:text-primary-50 text-sm font-bold mb-2"
                        htmlFor="description"
                      >
                        Descripción
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        value={formik.values.description}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:text-primary-50 dark:bg-primary-970 leading-tight  ${
                          formik.touched.description &&
                          formik.errors.description
                            ? "outline  outline-red-400"
                            : ""
                        }`}
                        required
                        rows="5"
                      />
                      {formik.touched.description &&
                      formik.errors.description ? (
                        <div
                          className={` text-sm ${
                            formik.touched.description &&
                            formik.errors.description
                              ? "text-red-500"
                              : ""
                          }`}
                        >
                          {formik.errors.description}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex items-center justify-end mt-10">
                      <button
                        type="submit"
                        className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:bg-indigo-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Enviar
                      </button>
                    </div>
                  </form>
                </Box>
              );
            }}
          </Formik>
        </div>
      </div>
      {/* FOOTER */}
      <ClientFooter className="sticky" />
    </div>
  );
};

export default ClientTicketCreate;
