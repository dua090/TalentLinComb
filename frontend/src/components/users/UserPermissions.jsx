import {
  availablePermissions,
} from "../../constants/permissions";

export default function UserPermissions({

  form,

  setForm,
}) {

  return (

    <div>

      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">

        Sidebar Permissions

      </p>

      <div className="space-y-3">

        {availablePermissions.map(
          (permission) => {

            const checked =
              form.permissions.includes(
                permission.value
              );

            return (

              <label
                key={
                  permission.value
                }
                className="flex items-center gap-3"
              >

                <input
                  type="checkbox"
                  checked={
                    checked
                  }
                  onChange={(e) => {

                    if (
                      e.target.checked
                    ) {

                      setForm({

                        ...form,

                        permissions: [

                          ...form.permissions,

                          permission.value,
                        ],
                      });

                    } else {

                      setForm({

                        ...form,

                        permissions:
                          form.permissions.filter(
                            (item) =>

                              item !==
                              permission.value
                          ),
                      });
                    }
                  }}
                />

                <span className="text-sm text-gray-700 dark:text-gray-300">

                  {permission.label}

                </span>
              </label>
            );
          }
        )}
      </div>
    </div>
  );
}