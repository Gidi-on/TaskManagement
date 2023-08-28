import { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteTodo, getAllTodo } from "../features/todo/todoSlice.js";
import Layout from "./../layout/UserLayout.jsx";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { todo } = useSelector((state) => state.todo);

  const { user } = useSelector((state) => state.user);

  const today = new Date();

  // Specify the options for the date formatting
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the date as desired
  const formattedDate = today.toLocaleDateString(undefined, options);

  useEffect(() => {
    if (!user) {
      toast.error("Unauthorized, Please signin!");
      navigate("/");
    } else {
      dispatch(getAllTodo());
    }
  }, [user, navigate, dispatch]);

  return (
    <Layout>
      <div className="pt-20">
        <div className="px-4 md:flex md:justify-between md:items-center md:mt-6">
          <p className="font-semibold text-2xl leading-5 text-uppercase">
            Hello {user ? user.username : ""},
          </p>
          <p className="mt-3">{formattedDate}</p>
        </div>
        <div className="my-5 px-4 md:my-10">
          <p className="font-semibold text-xl leading-5">My Tasks</p>
        </div>
        <div className="bg-primary p-3 md:px-14 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-10">
          {todo.length > 0 ? (
            todo.map((task) => (
              <div
                key={task._id}
                className="relative p-5 bg-white rounded-xl flex gap-x-5 mb-10 md:mb-0"
              >
                <div className="self-center">
                  <span className="h-14 w-14 bg-primary flex items-center justify-center"></span>
                  <p className="text-primary text-xs mt-2">{task.precedence}</p>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold capitalize text-black">
                      {task.title}
                    </p>
                    <div className="flex gap-x-5 justify-center items-center">
                      <button
                        className="text-primary border border-primary px-4 py-1 rounded-lg hover:font-bold hover:bg-blue-600 hover:text-white"
                        onClick={() =>
                          navigate(
                            `/user/update/${task._id}/${task.title}/${task.precedence}/${task.dueDate}/${task.description}`
                          )
                        }
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        className="text-primary border border-primary px-4 py-1 rounded-lg hover:font-bold hover:bg-red-500 hover:text-white"
                        onClick={() => {
                          dispatch(deleteTodo(task._id));
                          dispatch(getAllTodo());
                        }}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-primary">
                    {task.description}
                  </p>
                </div>
                <div className="absolute bg-black right-3 bottom-[-0.8rem] text-white">
                  {task.dueDate}
                </div>
              </div>
            ))
          ) : (
            <div className="flex">
              <p className="w-full text-center font-bold text-4xl my-24 flex justify-center self-center border border-black">
                Yikes, you have not created a task to manage yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
