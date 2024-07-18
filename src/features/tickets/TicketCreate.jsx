import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderContent from "../../components/HeaderContent";
import Box from "../../components/Box";
import { useAddNewTicketMutation } from "./ticketsApiSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import { useGetUsersQuery } from "../users/usersApiSlice";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

let initialValues = {
  title: "",
  description: "",
  assignedTo: "",
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

const TicketCreate = () => {
  let users;
  let options;

  const { data, isLoading, isSuccess } = useGetUsersQuery();
  const [createTicket] = useAddNewTicketMutation();
  const { username } = useAuth();

  if (isSuccess) {
    users = Object.values(data.entities);
    options = users.map((user) => (
      <option key={user._id} value={user._id}>
        {user.username}
      </option>
    ));
  }

  const onSaveTicketClicked = async (values) => {
    const result = await createTicket({ username, ...values });

    if (result.error) {
      toast.error(result.error.data.message);
    } else {
      toast.success(result.data.message);
    }
  };

  return (
    <>
      {/* header */}
      <HeaderContent
        title="Nuevo ticket"
        description="Descripcion sobre nuevo ticket"
      />
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
                        formik.touched.description && formik.errors.description
                          ? "outline  outline-red-400"
                          : ""
                      }`}
                      required
                      rows="5"
                    />
                    {formik.touched.description && formik.errors.description ? (
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
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 dark:text-primary-50 text-sm font-bold mb-2"
                      htmlFor="status"
                    >
                      Estado
                    </label>
                    <select
                      name="status"
                      id="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-white dark:text-primary-50 dark:bg-primary-970 cursor-pointer leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="abierto">Abierto</option>
                      <option value="en progreso">En Progreso</option>
                      <option value="cerrado">Cerrado</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 dark:text-primary-50 text-sm font-bold mb-2"
                      htmlFor="priority"
                    >
                      Prioridad
                    </label>
                    <select
                      name="priority"
                      id="priority"
                      value={formik.values.priority}
                      onChange={formik.handleChange}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-white dark:text-primary-50 dark:bg-primary-970 cursor-pointer leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="baja">Baja</option>
                      <option value="media">Media</option>
                      <option value="alta">Alta</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 dark:text-primary-50 text-sm font-bold mb-2"
                      htmlFor="assignedTo"
                    >
                      Asignado a
                    </label>
                    <select
                      name="assignedTo"
                      id="assignedTo"
                      value={formik.values.assignedTo}
                      onChange={formik.handleChange}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-white dark:text-primary-50 dark:bg-primary-970 cursor-pointer leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">No asignado</option>
                      {options}
                    </select>
                    {formik.touched.assignedTo && formik.errors.assignedTo ? (
                      <div
                        className={` text-sm ${
                          formik.touched.assignedTo && formik.errors.assignedTo
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        {formik.errors.assignedTo}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-end mt-10">
                    <button
                      type="submit"
                      className="bg-secondary-500 hover:bg-secondary-600 dark:bg-secondary-400 dark:hover:bg-secondary-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </Box>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default TicketCreate;
