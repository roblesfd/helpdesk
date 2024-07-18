import React from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import HeaderContent from "../../components/HeaderContent";
import Box from "../../components/Box";
import { useGetAUserQuery, useUpdateUserMutation } from "./usersApiSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

let initialValues = {
  username: "",
  name: "",
  lastname: "",
  email: "",
  active: false,
  phoneNumber: "",
  password: "",
  roles: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
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

const UserEdit = () => {
  const { id } = useParams();

  const onSaveUserClicked = async (values) => {
    const result = await udpateUser({ ...values });

    if (result.error) {
      toast.error(result.error.data.message);
    } else {
      toast.success(result.data.message);
    }
  };

  const [udpateUser] = useUpdateUserMutation();

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAUserQuery(id);

  let content;

  if (isLoading) content = <p>Cargando...</p>;

  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    initialValues = { ...initialValues, ...user };
    content = (
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
            <Box>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
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
                      type="text"
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
                    <label
                      className="block text-gray-700 dark:text-primary-50 text-sm font-bold mb-2"
                      htmlFor="status"
                    >
                      Rol
                    </label>
                    <select
                      name="roles"
                      id="roles"
                      value={formik.values.roles}
                      onChange={formik.handleChange}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-white dark:text-primary-50 dark:bg-primary-970 cursor-pointer leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="usuario">Usuario</option>
                      <option value="agente">Agente</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>
                  <div className="col-span-2 my-2 space-y-2">
                    <label className="mr-3">Activo</label>
                    <Field
                      type="checkbox"
                      name="active"
                      id="active"
                      value={formik.values.active}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.active}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-secondary-500 hover:bg-secondary-600 dark:bg-secondary-400 dark:hover:bg-secondary-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Guardar cambios
                </button>
              </form>
            </Box>
          );
        }}
      </Formik>
    );
  }

  return (
    <>
      {/* header */}
      <HeaderContent
        title="Editar usuario"
        description="Descripcion sobre usuarios"
      />
      <div className="w-1/2 mx-auto">{content}</div>
    </>
  );
};

export default UserEdit;
