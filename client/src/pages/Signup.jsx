import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BiUser } from "react-icons/bi";
import { GiPadlock } from "react-icons/gi";
import { HiOutlineMail } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { z } from "zod";
import logo from "../assets/todo.jpg";
import Layout from "../layout";
// import { signUp } from "../features/admin/adminReducer";
// import { RootState } from "../features/store";
// import Spinner from "../utils/Spinner";

const Signup = () => {
  //   const dispatch = useDispatch();

  //   const { loading, error, message } = useSelector(
  //     (state: RootState) => state.admin
  //   );

  const formSchema = z
    .object({
      username: z
        .string({
          required_error: "Username is required",
          invalid_type_error: "Username must be a string",
        })
        .min(3, { message: "Username must have at least three characters " })
        .max(30, {
          message: "Username must not be greater than 30 characters",
        }),

      email: z
        .string({
          required_error: "Email is required",
        })
        .min(8, { message: "Email length must be at least 8." })
        .email({ message: "The email is invalid." })
        .trim(),

      password: z
        .string({
          required_error: "Password is required",
          invalid_type_error: "Password must be a string",
        })
        .min(8, { message: "Password must have at least eight characters " })
        .max(15, {
          message: "Password must not be greater than 15 characters",
        })
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()])/, {
          message: "Not strong enough",
        })
        .nonempty(),

      confirmPassword: z.string(),
    })
    .refine((data) => data.confirmPassword === data.password, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(formSchema),
  });

  const errors = formState.errors;
  const isSubmitting = formState.isSubmitting;

  // const {
  //   register,
  //   handleSubmit,
  //   // reset,
  //   formState: { errors, isSubmitting },
  // } = useForm <
  // // eslint-disable-next-line no-undef
  // FormDataType >
  // {
  //   resolver: zodResolver(formSchema),
  // };

  //   useEffect(() => {
  //     if (error) {
  //       toast.error(message);
  //       reset({ username: "", email: "", password: "", confirmPassword: "" });
  //     }
  //   }, []);

  const onSubmit = (data) => {
    console.log(data);
    // dispatch<any>(signUp(data));
  };

  //   if (loading) {
  //     <Spinner />;
  //   }
  return (
    <Layout>
      <div className="pt-10">
        <div className="px-4 py-10 md:py-20 lg:mx-auto bg-gray-50">
          <p className="text-center text-3xl font-semibold pb-10">
            Sign up to your account
          </p>
          <div className="mx-auto md:mx-24 lg:mx-44 md:h-[34rem] lg:h-[40rem] md:flex md:items-center">
            <div className="w-full h-72 md:w-[50%] md:h-full flex items-center justify-center">
              <img
                src={logo}
                alt=""
                className="w-full h-full md:rounded-l-xl"
              />
            </div>
            <form
              className="border border-primary md:border-l-0 px-4 md:px-10 py-4 lg:py-14 md:w-[50%] md:rounded-r-xl h-full"
              action="submit"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="my-6">
                <label
                  htmlFor="email"
                  className="whitespace-nowrap block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm bg-primary border border-r-0 rounded-l-md text-white border-gray-300">
                    <HiOutlineMail />
                  </span>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@email.com"
                    className="border border-primary text-black text-sm rounded-r-lg block w-full p-2.5 placeholder-slate-500 focus:ring-blue-500 focus:border-blue-500"
                    {...register("email", { required: "This is required." })}
                    disabled={isSubmitting}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <p className="my-1 text-[#E4033B] text-xs lg:text-sm">
                      {message}
                    </p>
                  )}
                />
              </div>
              <div className="my-6">
                <label
                  htmlFor="username"
                  className="whitespace-nowrap block mb-2 text-sm font-medium text-gray-900"
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
                    placeholder="username"
                    className="border border-primary text-black text-sm rounded-r-lg block w-full p-2.5 placeholder-slate-500 focus:ring-blue-500 focus:border-blue-500"
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
                  className="whitespace-nowrap block mb-2 text-sm font-medium text-gray-900"
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
              <div className="mb-6 ">
                <label
                  htmlFor="confirm password"
                  className="whitespace-nowrap block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm bg-primary border border-r-0 rounded-l-md text-white border-gray-300">
                    <GiPadlock />
                  </span>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="border border-primary text-black text-sm rounded-r-lg block w-full p-2.5 placeholder-slate-500 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="confirm password"
                    aria-invalid={Boolean(errors.confirmPassword)}
                    {...register("confirmPassword", {
                      required: "This is required.",
                    })}
                    disabled={isSubmitting}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name="confirmPassword"
                  render={({ message }) => (
                    <p className="my-1 text-[#E4033B] text-xs lg:text-sm">
                      {message}
                    </p>
                  )}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white bg-primary hover:bg-white hover:border hover:border-primary hover:text-primary focus:outline-none font-bold rounded-lg w-full sm:w-auto px-7 py-2.5 text-center mt-5 mb-[16px] md:px-14 uppercase"
                >
                  sign up
                </button>
              </div>
              <p className="text-xs lg:text-base font-light text-black text-center">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-semibold hover:underline hover:font-bold text-primary"
                >
                  Login here!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
