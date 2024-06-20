import { useState, useEffect } from "react";
import { z } from "zod";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../Hooks/useCart";

const createUserFormSchema = z.object({
  firstName: z
    .string()
    .min(3, "Invalid first name")
    .regex(/^[A-Za-z]+$/, "Invalid first name"),
  lastName: z
    .string()
    .min(3, "Invalid last name")
    .regex(/^[A-Za-z]+$/, "Invalid last name"),
  zipCode: z.string().min(8, "Invalid Zip Code"),
  countryRegion: z.string().min(3, "Invalid Country / Region"),
  streetAddress: z.string().min(3, "Invalid Street Address"),
  townCity: z.string().min(3, "Invalid Town / City"),
  province: z.string().min(1, "Invalid Province"),
  addOnAddress: z.string().min(1, "Invalid Add-on address"),
  emailAddress: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"),
});

const FormCheckout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    zipCode: "",
    streetAddress: "",
    additionalInformation: "",
    bairro: "",
    townCity: "",
    province: "",
    countryRegion: "",
    addOnAddress: "",
    emailAddress: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { cartItems, calculateTotal, calculateSubtotal } = useCart();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const fetchAddress = async (zipCode: string) => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`
      );
      const { logradouro, additionalInformation, bairro, localidade, uf } =
        response.data;
      setFormData((prevData) => ({
        ...prevData,
        streetAddress: `${logradouro}, ${bairro}`,
        additionalInformation,
        bairro,
        townCity: localidade,
        province: uf,
      }));
      setErrors((prevErrors) => ({ ...prevErrors, zipCode: "" }));
    } catch (error) {
      console.error("Error fetching zip code:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        zipCode: "ZIP code not found or invalid",
      }));
    }
  };

  useEffect(() => {
    if (/^\d{5}-?\d{3}$/.test(formData.zipCode)) {
      fetchAddress(formData.zipCode);
    }
  }, [formData.zipCode]);

  const handleValidate = () => {
    const validationResult = createUserFormSchema.safeParse(formData);

    if (validationResult.success) {
      setFormData({
        firstName: "",
        lastName: "",
        zipCode: "",
        streetAddress: "",
        additionalInformation: "",
        bairro: "",
        townCity: "",
        province: "",
        countryRegion: "",
        addOnAddress: "",
        emailAddress: "",
      });
    } else {
      const newErrors: { [key: string]: string } = {};
      validationResult.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <main className="container mx-auto">
      <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-between lg:mx-10 2xl:mx-36">
        <div className="sm:w-608px flex flex-col">
          <h2 className="font-poppins font-semibold text-4xl text-center pb-9 mt-20 lg:text-start lg:ml-2 xl:ml-16 xl:pl-2 2xl:pl-3">
            Billing details
          </h2>
          <form className="flex flex-col items-center">
            <fieldset className="flex mb-9">
              <div className="mr-8">
                <label
                  htmlFor="firstName"
                  className="font-poppins font-medium text-base"
                >
                  First Name
                </label>
                <br />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-36 sm:w-211px rounded-xl pl-5 sm:pl-8 focus:outline-none mt-5 ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="font-poppins font-medium text-base"
                >
                  Last Name
                </label>
                <br />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-36 sm:w-211px rounded-xl pl-5 sm:pl-8 focus:outline-none mt-5 ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </fieldset>
            <div>
              <label className="font-poppins font-medium text-base">
                Company Name (Optional)
              </label>
              <br />
              <input
                type="text"
                className="border border-9F9F9F font-poppins font-normal text-base h-75px w-80 sm:w-453px rounded-xl pl-5 sm:pl-8 focus:outline-none mt-5 mb-8"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="zipCode"
                className="font-poppins font-medium text-base"
              >
                ZIP code
              </label>
              <br />
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-80 sm:w-453px rounded-xl pl-5 sm:pl-8 focus:outline-none mt-5 ${
                  errors.zipCode ? "border-red-500" : ""
                }`}
              />
              {errors.zipCode && (
                <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
              )}
            </div>
            <div className="mb-8">
              <label
                htmlFor="countryRegion"
                className="font-poppins font-medium text-base"
              >
                Country / Region
              </label>
              <br />
              <input
                type="text"
                id="countryRegion"
                name="countryRegion"
                value={formData.countryRegion}
                onChange={handleChange}
                className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-80 sm:w-453px rounded-xl pl-5 sm:pl-8 focus:outline-none mt-5 ${
                  errors.zipCode ? "border-red-500" : ""
                }`}
              />
              {errors.countryRegion && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.countryRegion}
                </p>
              )}
            </div>
            <div className="mb-8">
              <label
                htmlFor="streetAddress"
                className="font-poppins font-medium text-base"
              >
                Street Address
              </label>
              <br />
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-80 sm:w-453px rounded-xl pl-5 sm:pl-8 focus:outline-none mt-5 ${
                  errors.zipCode ? "border-red-500" : ""
                }`}
              />
              {errors.streetAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.streetAddress}
                </p>
              )}
            </div>
            <div className="mb-8">
              <label
                htmlFor="townCity"
                className="font-poppins font-medium text-base"
              >
                Town / City
              </label>
              <br />
              <input
                type="text"
                id="townCity"
                name="townCity"
                value={formData.townCity}
                onChange={handleChange}
                className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-80 sm:w-453px rounded-xl pl-5 sm:pl-8 focus:outline-none mt-5 ${
                  errors.zipCode ? "border-red-500" : ""
                }`}
              />
              {errors.townCity && (
                <p className="text-red-500 text-sm mt-1">{errors.townCity}</p>
              )}
            </div>
            <div className="mb-8">
              <label
                htmlFor="province"
                className="font-poppins font-medium text-base"
              >
                Province
              </label>
              <br />
              <input
                type="text"
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-80 sm:w-453px rounded-xl pl-5 sm:pl-8 focus:outline-none mt-5 ${
                  errors.zipCode ? "border-red-500" : ""
                }`}
              />
              {errors.province && (
                <p className="text-red-500 text-sm mt-1">{errors.province}</p>
              )}
            </div>
            <div className="mb-8">
              <label
                htmlFor="addOnAddress"
                className="font-poppins font-medium text-base"
              >
                Add-on address
              </label>
              <br />
              <input
                type="text"
                id="addOnAddress"
                name="addOnAddress"
                value={formData.addOnAddress}
                onChange={handleChange}
                className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-80 sm:w-453px rounded-xl pl-5 sm:pl-8 focus:outline-none mt-5 ${
                  errors.zipCode ? "border-red-500" : ""
                }`}
              />
              {errors.addOnAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.addOnAddress}
                </p>
              )}
            </div>
            <div className="mb-8">
              <label
                htmlFor="emailAddress"
                className="font-poppins font-medium text-base"
              >
                Email address
              </label>
              <br />
              <input
                type="text"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-80 sm:w-453px rounded-xl pl-5 sm:pl-8 focus:outline-none mt-5 ${
                  errors.zipCode ? "border-red-500" : ""
                }`}
              />
              {errors.emailAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailAddress}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                id="additionalInformation"
                name="additionalInformation"
                placeholder="Additional information"
                value={formData.additionalInformation}
                onChange={handleChange}
                className="border border-9F9F9F h-75px w-80 sm:w-453px rounded-xl pl-5 sm:pl-8 focus:outline-none mt-5 font-poppins text-base"
              />
            </div>
          </form>
        </div>
        <div className="mt-20 w-96 xl:w-608px">
          <div className="border-b border-D9D9D9 pb-8 pt-14 mx-9 flex justify-between">
            <div>
              <div className="flex justify-between w-80 xl:w-528px mb-3">
                <p className="font-poppins font-medium text-2xl">Product</p>
                <p className="font-poppins font-medium text-2xl">Subtotal</p>
              </div>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between mb-2"
                  >
                    <div className="flex">
                      <span className="font-poppins font-normal text-base text-9F9F9F w-36">
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </span>
                      <div>
                        <span className="font-poppins font-medium text-xs w-10">
                          X {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-poppins font-light text-base justify-end">
                      Rs. {calculateSubtotal(item)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="font-poppins font-semibold">The cart is empty</p>
              )}
              <div className="flex items-center justify-between my-4">
                <p className="font-poppins font-normal text-base">Subtotal</p>
                <p className="font-poppins font-light text-base">
                  Rs. {calculateTotal()}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-poppins font-normal text-base">Total</p>
                <p className="font-poppins font-bold text-2xl text-Primary">
                  Rs. {calculateTotal()}
                </p>
              </div>
            </div>
          </div>
          <div className="mx-9">
            <input
              type="radio"
              name="payment"
              id="bankTransfer"
              onClick={() => setSelectedOption("bankTransfer")}
              className="mt-6"
            />
            <span
              className={`font-poppins font-medium text-base ml-3 ${
                selectedOption === "bankTransfer"
                  ? "font-normal text-black"
                  : "text-9F9F9F"
              } `}
            >
              Direct Bank Transfer
            </span>
            {selectedOption === "bankTransfer" && (
              <p className="font-poppins font-light text-base text-9F9F9F">
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </p>
            )}
            <br />
            <input
              type="radio"
              name="payment"
              id="bankTransfer2"
              onClick={() => setSelectedOption("bankTransfer2")}
              className="my-3"
            />
            <span
              className={`font-poppins font-medium text-base ml-3 ${
                selectedOption === "bankTransfer2"
                  ? "font-normal text-black"
                  : "text-9F9F9F"
              } `}
            >
              Direct Bank Transfer
            </span>
            {selectedOption === "bankTransfer2" && (
              <p className="font-poppins font-light text-base text-9F9F9F">
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </p>
            )}
            <br />
            <input
              type="radio"
              name="payment"
              id="cashOnDelivery"
              onClick={() => setSelectedOption("cashOnDelivery")}
            />
            <span
              className={`font-poppins font-medium text-base ml-3 ${
                selectedOption === "cashOnDelivery"
                  ? "font-normal text-black"
                  : "text-9F9F9F"
              } `}
            >
              Cash On Delivery
            </span>
            {selectedOption === "cashOnDelivery" && (
              <p className="font-poppins font-light text-base text-9F9F9F">
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account
              </p>
            )}
          </div>
          <p className="font-poppins font-light text-base mx-9 text-justify mt-6 mb-10">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our{" "}
            <span className="font-semibold text-base">privacy policy.</span>
          </p>
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={handleValidate}
              className="border-black border py-4 px-24 rounded-2xl font-poppins font-normal text-xl"
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FormCheckout;
