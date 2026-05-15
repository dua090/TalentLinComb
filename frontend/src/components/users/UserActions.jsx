import {

  Pencil,

  Trash2,

  Power,

} from "lucide-react";

export default function UserActions({

  user,

  handleEdit,

  handleToggleStatus,

  handleDelete,
}) {

  return (

    <div className="flex items-center gap-3">

      {/* EDIT */}

      <button
        onClick={() =>
          handleEdit(user)
        }
        className="
          p-2 rounded-xl
          bg-blue-50 dark:bg-blue-900/20
          text-blue-600
        "
      >

        <Pencil size={16} />

      </button>

      {/* STATUS */}

      <button
        onClick={() =>
          handleToggleStatus(
            user._id
          )
        }
        className={`
          p-2 rounded-xl

          ${
            user.isActive

              ? "bg-green-50 text-green-600"

              : "bg-yellow-50 text-yellow-600"
          }
        `}
      >

        <Power size={16} />

      </button>

      {/* DELETE */}

      <button
        onClick={() =>
          handleDelete(
            user._id
          )
        }
        className="
          p-2 rounded-xl
          bg-red-50 dark:bg-red-900/20
          text-red-600
        "
      >

        <Trash2 size={16} />

      </button>
    </div>
  );
}