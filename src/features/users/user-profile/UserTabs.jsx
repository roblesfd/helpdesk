import { Formik } from "formik";
import * as Yup from "yup";
import { useUpdateUserMutation } from "../../users/usersApiSlice";
import toast from "react-hot-toast";

const UserProfileInfo = ({ userInfo }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Información Personal</h2>
    <p>
      <strong>Nombre:</strong> {userInfo.name} {userInfo.lastname}
    </p>
    <p>
      <strong>Correo Electrónico:</strong> {userInfo.email}
    </p>
    <p>
      <strong>Teléfono:</strong> {userInfo.phoneNumber}
    </p>
    <p>
      <strong>Rol:</strong>{" "}
      {userInfo.roles.slice(0, 1).toUpperCase() + userInfo.roles.slice(1)}
    </p>
  </div>
);

const UserProfileSettings = ({ userInfo }) => {
  let initialValues = {
    username: userInfo.username,
    name: userInfo.name,
    lastname: userInfo.lastname,
    email: userInfo.email,
    active: userInfo.active,
    phoneNumber: userInfo.phoneNumber,
    password: userInfo.password,
    roles: userInfo.roles,
  };

  const passwordRegExp = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/;

  const checkoutSchema = Yup.object().shape({
    username: Yup.string().required("Este campo es obligatorio"),
    name: Yup.string(),
    lastname: Yup.string(),
    email: Yup.string()
      .email("Dirección de correo inválida")
      .required("Este campo es obligatorio"),
    phoneNumber: Yup.string(),
    password: Yup.string()
      .required("Este campo es obligatorio")
      .min(8, "8 carácteres mínimo")
      .max(18, "18 carácteres máximo")
      .matches(
        passwordRegExp,
        "Al menos una letra, un número y un carácter especial"
      ),
  });

  const onSaveUserClicked = async (values) => {
    let idUser = userInfo["_id"];

    const result = await udpateUser({ idUser, ...values });

    if (result.error) {
      toast.error(result.error.data.message);
    } else {
      toast.success(result.data.message);
    }
  };

  const [udpateUser] = useUpdateUserMutation();

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Configuración de Cuenta</h2>
      <p>
        Aquí puedes agregar la configuración de la cuenta y las opciones de
        actualización.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={(values) => {
          onSaveUserClicked(values);
        }}
      >
        {(formik) => {
          const { handleSubmit } = formik;
          return (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 mt-8">
                <div className="col-span-1 my-2 space-y-2">
                  <label htmlFor="name">Nombre</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    {...formik.getFieldProps("name")}
                    className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:text-primary-50 dark:bg-primary-970 leading-tight  ${
                      formik.touched.name && formik.errors.name
                        ? "outline  outline-red-400"
                        : ""
                    }`}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div
                      className={` text-sm ${
                        formik.touched.name && formik.errors.name
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-1 my-2 space-y-2">
                  <label htmlFor="lastname">Apellido</label>
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    {...formik.getFieldProps("lastname")}
                    className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:text-primary-50 dark:bg-primary-970 leading-tight  ${
                      formik.touched.lastname && formik.errors.lastname
                        ? "outline  outline-red-400"
                        : ""
                    }`}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <div
                      className={` text-sm ${
                        formik.touched.lastname && formik.errors.lastname
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {formik.errors.lastname}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-1 my-2 space-y-2">
                  <label htmlFor="username">
                    Nombre de usuario <small>(Requerido)</small>
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    {...formik.getFieldProps("username")}
                    className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:text-primary-50 dark:bg-primary-970 leading-tight  ${
                      formik.touched.username && formik.errors.username
                        ? "outline  outline-red-400"
                        : ""
                    }`}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div
                      className={` text-sm ${
                        formik.touched.username && formik.errors.username
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {formik.errors.username}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-1 my-2 space-y-2">
                  <label htmlFor="email">
                    Correo electrónico <small>(Requerido)</small>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    {...formik.getFieldProps("email")}
                    className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:text-primary-50 dark:bg-primary-970 leading-tight  ${
                      formik.touched.email && formik.errors.email
                        ? "outline  outline-red-400"
                        : ""
                    }`}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div
                      className={` text-sm ${
                        formik.touched.email && formik.errors.email
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-1 my-2 space-y-2">
                  <label htmlFor="password">
                    Contraseña <small>(Requerido)</small>
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:text-primary-50 dark:bg-primary-970 leading-tight  ${
                      formik.touched.password && formik.errors.password
                        ? "outline  outline-red-400"
                        : ""
                    }`}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div
                      className={` text-sm ${
                        formik.touched.password && formik.errors.password
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-1 my-2 space-y-2">
                  <label htmlFor="phoneNumber">Teléfono</label>
                  <input
                    id="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:text-primary-50 dark:bg-primary-970 leading-tight  ${
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? "outline  outline-red-400"
                        : ""
                    }`}
                    value={formik.values.phoneNumber}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div
                      className={` text-sm ${
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {formik.errors.phoneNumber}
                    </div>
                  ) : null}
                </div>
              </div>
              <button
                type="submit"
                className="bg-secondary-500 hover:bg-secondary-600 dark:bg-secondary-400 dark:hover:bg-secondary-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Guardar cambios
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

const UserProfileTickets = ({ tickets }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Historial de Tickets Resueltos</h2>
    {tickets.length === 0 ? (
      <p>No hay tickets resueltos.</p>
    ) : (
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id} className="mb-2 p-2 border rounded">
            <p>
              <strong>Título:</strong> {ticket.title}
            </p>
            <p>
              <strong>Descripción:</strong> {ticket.description}
            </p>
            <p>
              <strong>Fecha de Resolución:</strong>{" "}
              {new Date(ticket.resolvedAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export { UserProfileInfo, UserProfileTickets, UserProfileSettings };
