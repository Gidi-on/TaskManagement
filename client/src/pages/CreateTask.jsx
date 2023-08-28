import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTodo } from "../features/todo/todoSlice";
import Footer from "../layout/Footer";

const CreateTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const { success, error, message } = useSelector((state) => state.todo);

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    precedence: "",
    finished: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReturn = () => {
    navigate("/user/dashboard");
  };

  useEffect(() => {
    if (error) {
      toast.error(message);
    } else if (!user) {
      navigate("/");
      toast.error("Unauthorized, Please signin!");
    } else if (success) {
      navigate("/user/dashboard");
      toast.success("Goodluck");
    }
  }, [message, user, navigate, success, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTodo(form));
  };

  return (
    <div>
      <div className="py-10 px-4 md:px-10 lg:px-20 ">
        <div
          className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer"
          onClick={handleReturn}
        >
          <IoChevronBackOutline className="text-2xl" />
        </div>
        <div className="my-5">
          <p className="font-semibold text-xl leading-5 capitalize text-center">
            create new task
          </p>
          <div className="h-0.5 w-32 mx-auto bg-primary my-5"></div>
        </div>
        <div className="mt-10 md:flex md:flex-col md:justify-center md:items-center">
          <form className="md:w-[50%] md:border md:border-primary p-6 rounded-xl">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="title"
                className="block pt-5 px-0 w-full text-lg text-black font-bold bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                value={form.title}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="title"
                className="peer-focus:font-semibold absolute font-semibold text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lg peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Title
              </label>
            </div>

            <div>
              <label
                htmlFor="priority"
                className="block mb-3 text-sm font-semibold text-gray-900"
              >
                Priority
              </label>
              <select
                name="precedence"
                className="rounded-lg border block flex-1 min-w-0 w-full text-sm p-1.5 bg-transparent border-gray-600 placeholder-gray-400 text-black focus:outline-none focus:border-primary"
                required
                value={form.precedence}
                onChange={handleChange}
              >
                <option>choose an option</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="relative z-0 w-full my-6 group">
              <input
                type="date"
                name="dueDate"
                className="block pt-5 px-0 w-full text-lg text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                value={form.dueDate}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="dueDate"
                className="peer-focus:font-semibold absolute font-semibold text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lg peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Due Date
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="description"
                className="block pt-5 px-0 w-full text-sm font-semibold text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                value={form.description}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="description"
                className="peer-focus:font-semibold absolute font-semibold text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lg peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>

            <div className="md:flex md:justify-center">
              <button
                type="submit"
                className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center md:mt-4 md:py-3 md:px-6"
                onClick={handleSubmit}
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateTask;
