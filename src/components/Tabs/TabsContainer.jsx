const TabsContainer = ({ children }) => {
  return (
    <div>
      <div className="flex space-x-4 border-b">{children}</div>
    </div>
  );
};

export default TabsContainer;
