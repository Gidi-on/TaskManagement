import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiUser } from "react-icons/bi";
import { GiPadlock } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import logo from "../assets/todo.jpg";
import { signin } from "../features/user/userSlice";
import Layout from "../layout/index.jsx";
// import Spinner from "./../utils/Spinner";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, error, success, message } = useSelector((state) => state.user);

  const formSchema = z.object({
    username: z
      .string({
        required_error: "username is required",
        invalid_type_error: "username must be a string",
      })
      .min(3, { message: "username must have at least three characters " })
      .max(30, {
        message: "username must not be greater than 30 characters",
      }),
    password: z
      .string({
        required_error: "password is required",
        invalid_type_error: "password must be a string",
      })
      .min(3, { message: "please enter a valid password" })
      .nonempty(),
  });

  const formData = useForm({
    resolver: zodResolver(formSchema),
  });

  const register = formData.register;
  const handleSubmit = formData.handleSubmit;
  const reset = formData.reset;
  const errors = formData.formState.errors;
  const isSubmitting = formData.formState.isSubmitting;

  const onSubmit = (data) => {
    dispatch(signin(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(message);
    } else if (success && user) {
      navigate("/user/dashboard");
      toast.success(`Welcome ${user.username}`);
      return () => {
        reset({ username: "", password: "" });
      };
    }
  }, [message, navigate, reset, success, user, error]);

  //   if (loading) {
  //     return <Spinner />;
  //   }

  return (
    <Layout>
      <div className="pt-20">
        <div className="px-4 py-10 md:py-20 lg:mx-auto bg-gray-50">
          <p className="text-center text-3xl font-semibold pb-10">
            Login to your account
          </p>
          <div className="mx-auto md:mx-24 lg:mx-44 md:h-[26rem] lg:h-[30rem] md:flex md:items-center">
            <div className="w-full h-72 md:w-[50%] md:h-full flex items-center justify-center">
              <img
                src={logo}
                alt=""
                className="w-full h-full md:rounded-l-xl"
              />
            </div>
            <form
              action="submit"
              className="border border-primary md:border-l-0 px-4 md:px-10 py-4 lg:py-14 md:w-[50%] md:rounded-r-xl h-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="my-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm bg-primary border border-r-0 rounded-l-md text-white border-gray-300">
                    <BiUser />
                  </span>
                  <input
                    type="text"
                    id="username"
                    aria-label="username"
                    className="border border-primary text-black text-sm rounded-r-lg block w-full p-2.5 placeholder-slate-500 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="username"
                    aria-invalid={Boolean(errors.username)}
                    {...register("username", { required: "This is required." })}
                    disabled={isSubmitting}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name="username"
                  render={({ message }) => (
                    <p className="my-1 text-[#E4033B] text-xs lg:text-sm">
                      {message}
                    </p>
                  )}
                />
              </div>
              <div className="mb-6 ">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm bg-primary border border-r-0 rounded-l-md text-white border-gray-300">
                    <GiPadlock />
                  </span>
                  <input
                    type="password"
                    id="password"
                    className="border border-primary text-black text-sm rounded-r-lg block w-full p-2.5 placeholder-slate-500 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="password"
                    aria-invalid={Boolean(errors.password)}
                    {...register("password", { required: "This is required." })}
                    disabled={isSubmitting}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <p className="my-1 text-[#E4033B] text-xs lg:text-sm">
                      {message}
                    </p>
                  )}
                />
              </div>
              <div className="flex items-center mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-3 h-3 border border-primary rounded bg-gray-700 focus:ring-3 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white bg-primary hover:bg-white hover:border hover:border-primary hover:text-primary focus:outline-none font-bold rounded-lg w-full sm:w-auto px-7 py-2.5 text-center mt-5 mb-[16px] md:px-14 uppercase"
                >
                  sign in
                </button>
              </div>
              <p className="text-xs lg:text-base font-light text-black text-center">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold hover:underline hover:font-bold text-primary"
                >
                  register here!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
