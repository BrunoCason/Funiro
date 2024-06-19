import { useState } from "react";
import { z } from "zod";

const createUserFormSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email!"
    ),
});

const Footer = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const validationResult = createUserFormSchema.safeParse(formData);

    if (validationResult.success) {
      setFormData({
        email: "",
      });
      setSuccessMessage("Subscribed e-mail!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } else {
      const newErrors: { [key: string]: string } = {};
      validationResult.error.issues.forEach((issue) => {
        newErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <footer className="lg:grid lg:grid-cols-4 container mx-auto gap-10 border-t border-D9D9D9 mt-11 pt-6">
      <div className="text-center lg:text-left mt-5 lg:ml-10">
        <p className="font-poppins font-bold text-2xl pb-4 lg:pb-14">Funiro.</p>
        <p className="font-poppins font-normal text-base text-9F9F9F pb-5 lg:pb-11">
          400 University Drive Suite 200 Coral Gables, <br /> FL 33134 USA
        </p>
        <div className="flex justify-center lg:-ml-5">
          <a href="">
            <img
              src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-facebook.png"
              alt="icone facebook"
              className="hover:scale-110 duration-300"
            />
          </a>
          <a href="">
            <img
              src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-instagram.png"
              alt="icone instagram"
              className="hover:scale-110 duration-300"
            />
          </a>
          <a href="">
            <img
              src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-twitter.png"
              alt="icone twitter"
              className="hover:scale-110 duration-300"
            />
          </a>
          <a href="">
            <img
              src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-linkedin.png"
              alt="icone linkedin"
              className="hover:scale-110 duration-300"
            />
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 text-center pt-5 lg:text-left">
        <div className="lg:ml-36 lg:col-start-1 ">
          <p className="font-poppins font-medium text-base text-9F9F9F pb-5 lg:pb-14">
            Links
          </p>
          <nav>
            <ul className="font-poppins font-medium text-base">
              <li className="pb-1 lg:pb-11">
                <a href="/">Home</a>
              </li>
              <li className="pb-1 lg:pb-11">
                <a href="">Shop</a>
              </li>
              <li className="pb-1 lg:pb-11">
                <a href="">About</a>
              </li>
              <li>
                <a href="">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="lg:col-start-3 lg:ml-72 xl:ml-96 2xl:-mr-64">
          <p className="font-poppins font-medium text-base text-9F9F9F pb-5 lg:pb-14">
            Help
          </p>
          <nav>
            <ul className="font-poppins font-medium text-base">
              <li className="pb-1 lg:pb-11">
                <a href="">Payment Options</a>
              </li>
              <li className="pb-1 lg:pb-11">
                <a href="">Returns</a>
              </li>
              <li>
                <a href="">Privacy Policies</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="lg:col-start-4 lg:mr-16">
        <p className="font-poppins font-medium text-base text-9F9F9F text-center pt-5 pb-5 lg:-ml-52 lg:pb-14 lg:col-span-4">
          Newsletter
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter Your Email Address"
            name="email"
            className={`text-sm font-poppins font-normal text-9F9F9F border-b border-black outline-none ${
              errors.email ? "border-red-500" : "border-9F9F9F"
            }`}
            value={formData.email}
            onChange={handleChange}
          />
          <button
            className="font-poppins font-medium text-sm border-b border-black ml-3 lg:mr-10"
            onClick={handleSubmit}
          >
            SUBSCRIBE
          </button>
        </div>
        {errors.email && <p className="text-red-500">{errors.email}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </div>
      <hr className="border-t border-D9D9D9 mr-10 ml-10 col-span-4 lg:mr-10 lg:ml-10" />
      <p className="font-poppins font-normal text-base text-center mb-8 lg:text-nowrap lg:ml-10 2xl:-ml-8">
        2023 furino. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
