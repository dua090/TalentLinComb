import UserActions
  from "./UserActions";

export default function UserTable({

  users,

  loading,

  handleEdit,

  handleToggleStatus,

  handleDelete,
}) {

  if (loading) {

    return (

      <p className="text-gray-500 dark:text-gray-400">

        Loading users...

      </p>
    );
  }

  return (

    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm overflow-x-auto">

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">

        Organization Users

      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b border-gray-100 dark:border-gray-700 text-left">

            <th className="pb-4 text-gray-500 dark:text-gray-400">

              Name

            </th>

            <th className="pb-4 text-gray-500 dark:text-gray-400">

              Email

            </th>

            <th className="pb-4 text-gray-500 dark:text-gray-400">

              Role

            </th>

            <th className="pb-4 text-gray-500 dark:text-gray-400">

              Permissions

            </th>

            <th className="pb-4 text-gray-500 dark:text-gray-400">

              Actions

            </th>
          </tr>
        </thead>

        <tbody>

          {users.map(
            (user) => (

              <tr
                key={user._id}
                className="border-b border-gray-100 dark:border-gray-700"
              >

                {/* NAME */}

                <td className="py-4 text-gray-900 dark:text-white font-medium">

                  {user.name}

                </td>

                {/* EMAIL */}

                <td className="py-4 text-gray-600 dark:text-gray-300">

                  {user.email}

                </td>

                {/* ROLE */}

                <td className="py-4">

                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">

                    {user.role}

                  </span>

                </td>

                {/* PERMISSIONS */}

                <td className="py-4">

                  <div className="flex flex-wrap gap-2">

                    {user.permissions?.map(
                      (permission) => (

                        <span
                          key={permission}
                          className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300"
                        >

                          {permission}

                        </span>
                      )
                    )}
                  </div>

                </td>

                {/* ACTIONS */}

                <td className="py-4">

                  <UserActions

                    user={user}

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

                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}