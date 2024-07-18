import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Base64UploadAdapter,
  Image,
  LinkImage,
  ImageUpload,
  ImageInsert,
  ImageInsertViaUrl,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

import HeaderContent from "../../components/HeaderContent";
import { useAddNewArticleMutation } from "./articlesApiSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import TagsInput from "../../components/TagsInput";
import { useGetCategoriesQuery } from "./categoriesApiSlice";
import { useAddNewTagMutation } from "./tagsApiSlice";

const checkoutSchema = Yup.object().shape({
  title: Yup.string().required("Este campo es obligatorio"),
  content: Yup.string().required("Este campo es obligatorio"),
});

let initialValues = {
  title: "",
  content: "",
  category: "",
  tags: [],
};

const ArticleCreate = () => {
  const [articleCreate] = useAddNewArticleMutation("article");
  const [articleTags, setArticleTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [createTag] = useAddNewTagMutation();

  const { id } = useAuth();

  const {
    data: categoriesData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery();

  let categoryOptions;

  if (isLoading) categoryOptions = <p className="my-4">Cargando...</p>;

  if (isError) categoryOptions = <p className="my-4">{error?.data?.message}</p>;

  if (isSuccess) {
    categoryOptions = categoriesData.map((category) => (
      <option value={`${category._id}`} key={`${category._id}`}>
        {category.name}
      </option>
    ));
  }

  const onSaveArticleClicked = async (values) => {
    let tagResult;
    let tagIds;
    if (articleTags && articleTags.length > 0) {
      try {
        const tagPromises = articleTags.map((tag) => createTag({ name: tag }));
        tagResult = await Promise.all(tagPromises);
        tagIds = tagResult
          .filter((result) => result.data && result.data.tag)
          .map((result) => result.data.tag);
        values.tags = tagIds;
      } catch (error) {
        console.error(`Error al crear tags`, error);
      }
    }

    const result = await articleCreate({ author: id, ...values });
    if (result.error) {
      toast.error(result.error?.data?.message);
    } else {
      toast.success(result.data.message);
    }
  };

  const handleTagsChange = (newTags) => {
    setArticleTags(newTags);
  };

  return (
    <>
      {/* header */}
      <HeaderContent
        title="Artículo"
        description="Descripcion sobre nuevo artículo"
      />

      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={(values) => {
          onSaveArticleClicked(values);
        }}
      >
        {(formik) => {
          const { handleSubmit } = formik;
          return (
            <form className="my-16" onSubmit={handleSubmit}>
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
              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 dark:text-primary-50 text-sm font-bold mb-2"
                    htmlFor="category"
                  >
                    Categoría
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    className={`shadow-md border rounded-md w-full py-2 px-3 text-gray-700 dark:text-primary-50 dark:bg-primary-970 leading-tight  ${
                      formik.touched.title && formik.errors.title
                        ? "outline  outline-red-400"
                        : ""
                    }`}
                  >
                    {categoryOptions}
                  </select>
                  {formik.touched.category && formik.errors.category ? (
                    <div
                      className={` text-sm ${
                        formik.touched.category && formik.errors.category
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {formik.errors.category}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 dark:text-primary-50 text-sm font-bold mb-2"
                    htmlFor="tags"
                  >
                    Etiquetas
                  </label>
                  <TagsInput
                    tagData={formik.values.tags}
                    onTagsChange={handleTagsChange}
                  />
                </div>
              </div>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  toolbar: {
                    items: [
                      "undo",
                      "redo",
                      "|",
                      "bold",
                      "italic",
                      "insertImage",
                    ],
                  },
                  plugins: [
                    Bold,
                    Essentials,
                    Italic,
                    Mention,
                    Paragraph,
                    Undo,
                    Base64UploadAdapter,
                    Image,
                    LinkImage,
                    ImageUpload,
                    ImageInsert,
                    ImageInsertViaUrl,
                  ],
                }}
                onChange={(event, editor) => {
                  formik.values.content = editor.getData();
                }}
              />
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="inline-block px-4 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transform transition-transform duration-300 ease-in-out hover:-translate-y-1"
                >
                  Guardar
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default ArticleCreate;
