import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const TagsInput = ({ tagData, onTagsChange, isDisabled = false }) => {
  const [tags, setTags] = useState(tagData || []);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    onTagsChange(tags);
  }, [tags, onTagsChange]);

  const handleAddTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <div className="mb-4">
        {!isDisabled && (
          <>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              className="shadow border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-primary-970 dark:text-primary-50 mr-2"
              placeholder="Añade una etiqueta"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleAddTag();
              }}
              className="bg-primary-700 text-white hover:bg-primary-800 p-2 rounded"
            >
              Añadir
            </button>
          </>
        )}
      </div>
      <div className="flex flex-wrap">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center text-sm bg-blue-100 text-blue-700 px-1 py-1 rounded-full m-1"
          >
            <span>{tag.name ? tag.name : tag}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemoveTag(index);
              }}
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
