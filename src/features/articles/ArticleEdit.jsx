import HeaderContent from "../../components/HeaderContent";
import {
  useGetAnArticleQuery,
  useUpdateArticleMutation,
} from "./articlesApiSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import TagsInput from "../../components/TagsInput";
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
import { useState } from "react";
import { useGetCategoriesQuery } from "./categoriesApiSlice";

let initialValues = {
  title: "",
  content: "",
  category: "",
  tags: [],
};
const checkoutSchema = Yup.object().shape({
  title: Yup.string()
    .min(8, "8 carácteres mínimo")
    .max(40, "40 carácteres máximo")
    .required("Este campo es obligatorio"),
  content: Yup.string()
    .min(20, "20 carácteres mínimo")
    .required("Este campo es obligatorio"),
});

const ArticleEdit = () => {
  const { id } = useParams();
  const {
    data: article,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAnArticleQuery(id);

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isSuccess: isCategoriesSuccess,
    isError: isCategoriesIsError,
    error: isCategoriesError,
  } = useGetCategoriesQuery();

  let categoryOptions;

  if (isCategoriesLoading)
    categoryOptions = <p className="my-4">Cargando...</p>;

  if (isCategoriesIsError)
    categoryOptions = (
      <p className="my-4">{isCategoriesError?.data?.message}</p>
    );

  if (isCategoriesSuccess) {
    categoryOptions = categoriesData.map((category) => (
      <option value={`${category._id}`} key={`${category._id}`}>
        {category.name}
      </option>
    ));
  }

  const [updateArticle] = useUpdateArticleMutation(id);
  const { isAdmin, username } = useAuth();
  const [articleTags, setArticleTags] = useState([]);

  let content;
  let articleAuthor;
  let isDisabled;

  const onSaveArticleClicked = async (values) => {
    values.tags = articleTags;
    const result = await updateArticle({ ...values });

    if (result.error) {
      toast.error(result.error?.data?.message);
    } else {
      toast.success(result.data.message);
    }
  };

  const handleTagsChange = (newTags) => {
    setArticleTags(newTags);
  };

  if (isLoading) content = <p className="py-6">Cargando...</p>;

  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    initialValues = { ...initialValues, ...article };
    articleAuthor = article.author.username;
    isDisabled = !isAdmin && username !== articleAuthor;

    content = (
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
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-primary-970 dark:text-primary-50"
                  required
                  disabled={isDisabled}
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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-white dark:text-primary-50 dark:bg-primary-970 cursor-pointer leading-tight focus:outline-none focus:shadow-outline"
                    disabled={isDisabled}
                  >
                    {categoryOptions}
                  </select>
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
                    isDisabled={
                      !isAdmin && article.author.username !== username
                    }
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
                  initialData: formik.values.content,
                }}
                onChange={(event, editor) => {
                  formik.values.content = editor.getData();
                }}
              />
              <div className="flex justify-end mt-6">
                {!isDisabled && (
                  <button
                    type="submit"
                    className="inline-block px-4 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transform transition-transform duration-300 ease-in-out hover:-translate-y-1"
                  >
                    Guardar cambios
                  </button>
                )}
              </div>
            </form>
          );
        }}
      </Formik>
    );
  }

  return (
    <>
      {/* header */}
      <HeaderContent
        title="Editar Artículo"
        description="Descripcion sobre editar artículo"
      />
      {content}
    </>
  );
};

export default ArticleEdit;
