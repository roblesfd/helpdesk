import React from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import HeaderContent from "../../components/HeaderContent";
import Box from "../../components/Box";
import { useAddNewUserMutation } from "./usersApiSlice";
import toast from "react-hot-toast";

const initialValues = {
  username: "",
  password: "",
  email: "",
  name: "",
  lastname: "",
  active: "",
  phoneNumber: "",
  profileImage: null,
};

const passwordRegExp = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/;
const alphaNumericRegExp = /^(?=.*[A-Za-z])[A-Za-z\d]*$/;
const supportedImageFormats = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
];

const checkoutSchema = Yup.object().shape({
  name: Yup.string().required("Este campo es obligatorio"),
  username: Yup.string()
    .required("Este campo es obligatorio")
    .min(6, "6 carácteres mínimo")
    .max(16, "16 carácteres máximo")
    .matches(alphaNumericRegExp, "Solo letras y números estan permitidos"),
  lastName: Yup.string().required("Este campo es obligatorio"),
  email: Yup.string()
    .email("Dirección de correo inválida")
    .required("Este campo es obligatorio"),
  password: Yup.string()
    .required("Este campo es obligatorio")
    .min(8, "8 carácteres mínimo")
    .max(18, "18 carácteres máximo")
    .matches(
      passwordRegExp,
      "Al menos una letra, un número y un carácter especial"
    ),
  phoneNumber: Yup.number(),
  profileImage: Yup.mixed().test(
    "fileFormat",
    "Formato de archivo no soportado",
    (value) => value && supportedImageFormats.includes(value.type)
  ),
});

const UserCreate = () => {
  const [addNewUser] = useAddNewUserMutation();

  const onSaveUserClicked = async (e, formik) => {
    e.preventDefault();
    const values = formik.values;
    const canSave = [values.username, values.email, values.password].every(
      Boolean
    );

    if (canSave) {
      const result = await addNewUser({ ...values });
      if (result.error) {
        toast.error(result.error.data.message);
      } else {
        toast.success("Usuario creado exitosamente");
        formik.resetForm();
      }
    } else {
      toast.error("Llena los campos requeridos");
    }
  };

  return (
    <>
      {/* header */}
      <HeaderContent
        title="Nuevo usuario"
        description="Descripcion sobre nuevo usuario"
      />
      <div className="w-1/2 mx-auto">
        <Formik initialValues={initialValues} validationSchema={checkoutSchema}>
          {(formik) => (
            <Box>
              <form onSubmit={(e) => onSaveUserClicked(e, formik)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div className="col-span-1 my-2 space-y-2">
                    <label htmlFor="name">Nombre</label>
                    <input
                      id="name"
                      type="text"
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
                      className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:text-primary-50 dark:bg-primary-970 leading-tight  ${
                        formik.touched.lastname && formik.errors.lastname
                          ? "outline  outline-red-400"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.lastname}
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
                    <label htmlFor="lastname">
                      Nombre de usuario <small>(Requerido)</small>
                    </label>
                    <input
                      id="username"
                      type="text"
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
                      className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:text-primary-50 dark:bg-primary-970 leading-tight  ${
                        formik.touched.email && formik.errors.email
                          ? "outline  outline-red-400"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
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
                    <label htmlFor="phoneNumber">Teléfono</label>
                    <input
                      id="phoneNumber"
                      type="text"
                      className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:text-primary-50 dark:bg-primary-970 leading-tight  ${
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                          ? "outline  outline-red-400"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.phoneNumber}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                      <div
                        className={` text-sm ${
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        {formik.errors.phoneNumber}
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
                      className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:text-primary-50 dark:bg-primary-970 leading-tight  ${
                        formik.touched.password && formik.errors.password
                          ? "outline  outline-red-400"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
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
                    <label className="mr-3">Activo</label>
                    <Field type="checkbox" name="active" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-secondary-500 hover:bg-secondary-600 dark:bg-secondary-400 dark:hover:bg-secondary-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Enviar
                </button>
              </form>
            </Box>
          )}
        </Formik>
      </div>
    </>
  );
};

export default UserCreate;
