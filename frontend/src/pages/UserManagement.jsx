import {
  useState,
} from "react";

import toast
  from "react-hot-toast";

import UserForm
  from "../components/users/UserForm";

import UserTable
  from "../components/users/UserTable";

import useUsers
  from "../hooks/useUsers";

export default function UserManagement() {

  const {

    users,

    loading,

    token,

    fetchUsers,

    createUser,

    updateUser,

    deleteUser,

    toggleUserStatus,

  } = useUsers();

  // ======================================================
  // ================= STATES =============================
  // ======================================================

  const [

    editingUserId,

    setEditingUserId,

  ] = useState(null);

  const [form, setForm] =
    useState({

      name: "",

      email: "",

      password: "",

      role: "recruiter",

      designation: "",

      department: "",

      permissions: [
        "home",
      ],
    });

  // ======================================================
  // ================= RESET FORM =========================
  // ======================================================

  const resetForm =
    () => {

      setEditingUserId(
        null
      );

      setForm({

        name: "",

        email: "",

        password: "",

        role: "recruiter",

        designation: "",

        department: "",

        permissions: [
          "home",
        ],
      });
    };

  // ======================================================
  // ================= CREATE USER ========================
  // ======================================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await createUser({

          payload: form,

          token,
        });

        toast.success(
          "User created successfully"
        );

        resetForm();

        fetchUsers();

      } catch (error) {

        toast.error(
          error.message
        );
      }
    };

  // ======================================================
  // ================= EDIT USER ==========================
  // ======================================================

  const handleEdit =
    (user) => {

      setEditingUserId(
        user._id
      );

      setForm({

        name:
          user.name || "",

        email:
          user.email || "",

        password: "",

        role:
          user.role || "recruiter",

        designation:
          user.designation || "",

        department:
          user.department || "",

        permissions:
          user.permissions || [],
      });
    };

  // ======================================================
  // ================= UPDATE USER ========================
  // ======================================================

  const handleUpdate =
    async () => {

      try {

        await updateUser({

          userId:
            editingUserId,

          payload: form,

          token,
        });

        toast.success(
          "User updated successfully"
        );

        resetForm();

        fetchUsers();

      } catch (error) {

        toast.error(
          error.message
        );
      }
    };

  // ======================================================
  // ================= TOGGLE STATUS ======================
  // ======================================================

  const handleToggleStatus =
    async (userId) => {

      try {

        await toggleUserStatus({

          userId,

          token,
        });

        toast.success(
          "User status updated"
        );

        fetchUsers();

      } catch (error) {

        toast.error(
          error.message
        );
      }
    };

  // ======================================================
  // ================= DELETE USER ========================
  // ======================================================

  const handleDelete =
    async (userId) => {

      const confirmed =
        window.confirm(
          "Delete this user?"
        );

      if (!confirmed) {
        return;
      }

      try {

        await deleteUser({

          userId,

          token,
        });

        toast.success(
          "User deleted successfully"
        );

        fetchUsers();

      } catch (error) {

        toast.error(
          error.message
        );
      }
    };

  return (

    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 p-6">

      <div className="w-full">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">

            User Management

          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">

            Configure organization users, permissions and workforce access.

          </p>
        </div>

        {/* CONTENT */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <UserForm

            form={form}

            setForm={setForm}

            editingUserId={
              editingUserId
            }

            handleSubmit={
              handleSubmit
            }

            handleUpdate={
              handleUpdate
            }

            resetForm={
              resetForm
            }
          />

          <UserTable

            users={users}

            loading={loading}

            handleEdit={
              handleEdit
            }

            handleToggleStatus={
              handleToggleStatus
            }

            handleDelete={
              handleDelete
            }
          />
        </div>
      </div>
    </div>
  );
}