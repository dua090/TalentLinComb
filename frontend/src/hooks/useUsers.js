import {
  useEffect,
  useState,
} from "react";

import {

  getUsers,

  createUser,

  updateUser,

  deleteUser,

  toggleUserStatus,

} from "../services/userService";

export default function useUsers() {

  const storedUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const token =
    storedUser?.token;

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const fetchUsers =
    async () => {

      try {

        setLoading(true);

        const data =
          await getUsers(
            token
          );

        setUsers(
          data.users
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchUsers();

  }, []);

  return {

    users,

    setUsers,

    loading,

    token,

    fetchUsers,

    createUser,

    updateUser,

    deleteUser,

    toggleUserStatus,
  };
}