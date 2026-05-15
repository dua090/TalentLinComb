import {

  Save,

  X,

} from "lucide-react";

import UserPermissions
  from "./UserPermissions";

export default function UserForm({

  form,

  setForm,

  editingUserId,

  handleSubmit,

  handleUpdate,

  resetForm,
}) {

  return (

    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">

        {editingUserId
          ? "Edit User"
          : "Create User"}

      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* NAME */}

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({

              ...form,

              name:
                e.target.value,
            })
          }
          className="
            w-full px-4 py-3 rounded-2xl
            border border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white
          "
        />

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          disabled={
            editingUserId
          }
          className={`
            w-full px-4 py-3 rounded-2xl
            border border-gray-200 dark:border-gray-700

            ${
              editingUserId

                ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-70"

                : "bg-white dark:bg-gray-900"
            }

            text-gray-900 dark:text-white
          `}
        />

        {/* PASSWORD */}

        {!editingUserId && (

          <input
            type="password"
            placeholder="Temporary Password"
            value={form.password}
            onChange={(e) =>
              setForm({

                ...form,

                password:
                  e.target.value,
              })
            }
            className="
              w-full px-4 py-3 rounded-2xl
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-900
              text-gray-900 dark:text-white
            "
          />
        )}

        {/* ROLE */}

        <select
          value={form.role}
          disabled={
            editingUserId
          }
          onChange={(e) =>
            setForm({

              ...form,

              role:
                e.target.value,
            })
          }
          className={`
            w-full px-4 py-3 rounded-2xl
            border border-gray-200 dark:border-gray-700

            ${
              editingUserId

                ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-70"

                : "bg-white dark:bg-gray-900"
            }

            text-gray-900 dark:text-white
          `}
        >

          <option value="recruiter">
            Recruiter
          </option>

          <option value="manager">
            Manager
          </option>

          <option value="employee">
            Employee
          </option>

        </select>

        <UserPermissions
          form={form}
          setForm={setForm}
        />

        {/* BUTTONS */}

        <div className="flex gap-3">

          {editingUserId ? (

            <>
              <button
                type="button"
                onClick={handleUpdate}
                className="
                  flex-1 py-3 rounded-2xl
                  bg-green-600 hover:bg-green-700
                  text-white font-semibold
                  flex items-center justify-center gap-2
                "
              >

                <Save size={18} />

                Update User

              </button>

              <button
                type="button"
                onClick={resetForm}
                className="
                  px-4 rounded-2xl
                  border border-gray-300 dark:border-gray-600
                  text-gray-700 dark:text-gray-300
                "
              >

                <X size={18} />

              </button>
            </>

          ) : (

            <button
              className="
                w-full py-3 rounded-2xl
                bg-blue-600 hover:bg-blue-700
                text-white font-semibold
              "
            >

              Create User

            </button>
          )}
        </div>
      </form>
    </div>
  );
}