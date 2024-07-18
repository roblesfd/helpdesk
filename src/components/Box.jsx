const Box = ({ children, size = "medium" }) => {
  return (
    <div
      className={`${
        size === "medium"
          ? "p-2 md:p-6"
          : size === "small"
          ? "p-1 md:p-2"
          : size === "large"
          ? "p-3 md:p-7"
          : ""
      }   p-2 md:p-6 mt-2 md:mt-4 w-full rounded bg-white dark:bg-primary-950 shadow-lg`}
    >
      {children}
    </div>
  );
};

export default Box;
