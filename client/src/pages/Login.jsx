import horse from "../assets/horse.jpg";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import backend from "../configs/backend";
import { AuthContext } from "../commons/AuthContext";
import { useContext } from "react";
function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const formSchema = yup.object().shape({
    // email: yup.string().email("Invalid email").required("Must enter email"),
    password: yup.string().required("Must enter a password"),
    // .min(6, "Password must be at least 6 characters long"),
  });
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      JSON.stringify(values);
      var body = { email: values.email, password: values.password };
      try {
        backend
          .post("/api/auth/token/", body)
          .then((res) => {
            console.log(res);
            console.log(res.data);
            localStorage.setItem("access_token", res.data.access);
            localStorage.setItem("refresh_token", res.data.refresh);
            login(res.data.access);
            navigate("/");
          })
          .catch(() => {
            // console.log(res);
            // console.log(res.data);
            // console.error("Error:", err.data);
            setLoginError(true);
          });
      } catch (error) {
        console.error("Error:", error);
        setLoginError(true);
      }
    },
  });

  return (
    <div className="flex items-center  justify-center my-14 mt-[0px] bg-white ">
      <div className="hidden lg:block bg-[#E6F7F5] ">
        <img src={horse} alt="horse" className="w-[550px] h-[400px] " />
      </div>
      <div className="sm:mx-[50px] ">
        <h1 className="text-2xl sm:text-4xl my-5 font-bold">
          {" "}
          Welcome to Jockey
        </h1>
        {loginError ? (
          <div className="text-red-800 mt-5">Invalid username or password</div>
        ) : null}

        <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your email
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@gmail.com"
              required
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-900">{formik.errors.email}</div>
          ) : null}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-900">{formik.errors.password}</div>
          ) : null}
          {/* <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-300 "
            >
              Remember me
            </label>
          </div>
          <div className="my-5 flex justify-end hover:text-[#00A6AB] text-sm">
            Forgot password?
          </div> */}
          <button
            type="submit"
            className="text-white bg-[#00A6AB] hover:bg-[#00DDE5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center "
          >
            Submit
          </button>
        </form>
        {/* <div className="mt-6 text-sm text-center">
          <p>
            {" "}
            Don't Have an account?
            <span className="text-[#00A6AB]"> Register</span>
          </p>
        </div> */}
        {/* <div className="text-center mt-36 ms-2 text-sm font-medium text-gray-300">
          @2023 All rights reserverd
        </div> */}
      </div>
    </div>
  );
}

export default Login;
