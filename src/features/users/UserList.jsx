import Table from "../../components/Table";
import { useDeleteUserMutation } from "./usersApiSlice";
import toast from "react-hot-toast";

const UserList = ({ userData, colData }) => {
  const [userDelete, { data: user, isLoading, isSuccess, isError, error }] =
    useDeleteUserMutation("user");

  const onDeleteUserClicked = async (id) => {
    const result = await userDelete(id);

    if (result.error) {
      toast.error(result.error.data.message);
    } else {
      toast.success(result.data);
    }
  };

  return (
    <div>
      {userData.length === 0 ? (
        <p>No hay usuarios disponibles.</p>
      ) : (
        <Table cols={colData} rows={userData} actions={onDeleteUserClicked} />
      )}
    </div>
  );
};

export default UserList;
