import { useState, useEffect } from "react";
import { z } from "zod";
import axios from "axios";

const createUserFormSchema = z.object({
  firstName: z
    .string()
    .min(3, "Invalid first name")
    .regex(/^[A-Za-z]+$/, "Invalid first name (only letters)"),
  lastName: z
    .string()
    .min(3, "Invalid last name")
    .regex(/^[A-Za-z]+$/, "Invalid last name (only letters)"),
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <h2 className="font-poppins font-semibold text-4xl pb-9 pt-20">
        Billing details
      </h2>
      <form onSubmit={handleSubmit}>
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
              className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-211px rounded-xl pl-8 focus:outline-none mt-5 ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
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
              className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-211px rounded-xl pl-8 focus:outline-none mt-5 ${
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
            className="border border-9F9F9F font-poppins font-normal text-base h-75px w-453px rounded-xl pl-8 focus:outline-none mt-5 mb-8"
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
            className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-211px rounded-xl pl-8 focus:outline-none mt-5 ${
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
            className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-453px rounded-xl pl-8 focus:outline-none mt-5 ${
              errors.zipCode ? "border-red-500" : ""
            }`}
          />
          {errors.countryRegion && (
            <p className="text-red-500 text-sm mt-1">{errors.countryRegion}</p>
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
            className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-453px rounded-xl pl-8 focus:outline-none mt-5 ${
              errors.zipCode ? "border-red-500" : ""
            }`}
          />
          {errors.streetAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>
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
            className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-453px rounded-xl pl-8 focus:outline-none mt-5 ${
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
            className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-453px rounded-xl pl-8 focus:outline-none mt-5 ${
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
            className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-453px rounded-xl pl-8 focus:outline-none mt-5 ${
              errors.zipCode ? "border-red-500" : ""
            }`}
          />
          {errors.addOnAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.addOnAddress}</p>
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
            className={`border border-9F9F9F font-poppins font-normal text-base h-75px w-453px rounded-xl pl-8 focus:outline-none mt-5 ${
              errors.zipCode ? "border-red-500" : ""
            }`}
          />
          {errors.emailAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.emailAddress}</p>
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
            className="border border-9F9F9F h-75px w-453px rounded-xl pl-8 focus:outline-none mt-5 font-poppins text-base"
          />
        </div>
        <br />
        <button
          type="submit"
          className="border-black border py-4 px-24 rounded-2xl font-poppins font-normal text-xl"
        >
          Place order
        </button>
      </form>
    </main>
  );
};

export default FormCheckout;