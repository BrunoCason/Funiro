import { useState } from "react";
import { z } from "zod";

// validação do form
const createUserFormSchema = z.object({
  name: z
    .string()
    .min(3, "Invalid name")
    .regex(/^[A-Za-z]+$/i, "Invalid name!"),
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email!"
    ),
  subject: z.string().optional(),
  message: z.string().min(3, "Invalid message!"),
});

type Icons = {
  src: string;
  alt: string;
  text1: string;
  text2: string;
  text3: string;
};

const listItems: Icons[] = [
  {
    src: "https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-location.png",
    alt: "icon address",
    text1: "Address",
    text2: "236 5th SE Avenue, New York NY10000, United States",
    text3: "",
  },
  {
    src: "https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-phone.png",
    alt: "icon phone",
    text1: "Phone",
    text2: "Mobile: +(84) 546-6789",
    text3: "Hotline: +(84) 456-6789",
  },
  {
    src: "https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-time.png",
    alt: "icon time",
    text1: "Working Time",
    text2: "Monday-Friday: 9:00 - 22:00",
    text3: "Saturday-Sunday: 9:00 - 21:00",
  },
];

const FormContact = () => {
  // armazena os dados do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  // atualiza e limpa os campos do form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // envio do form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // valida os dados
    const validationResult = createUserFormSchema.safeParse(formData);

    if (validationResult.success) {
      setFormData({ // limpa os campos
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSuccessMessage("Message sent!");
    } else {
      // atualiza o estado de erros
      const newErrors: { [key: string]: string } = {};
      validationResult.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <main className="container mx-auto">
      <div className="text-center pt-24">
        <h2 className="font-poppins font-semibold text-4xl">
          Get In Touch With Us
        </h2>
        <p className="font-poppins font-normal text-base text-9F9F9F p-2">
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us <br /> An Email. Our Staff Always Be There To Help You Out. Do
          Not Hesitate!
        </p>
      </div>
      <section className="sm:pl-12 md:pl-0 lg:flex lg:justify-around">
        <div className="flex justify-center lg:block flex-wrap md:grid md:grid-cols-2 md:justify-items-center lg:justify-items-start">
          {listItems.map((item, index) => (
            <div key={index} className="mt-10 flex">
              <div>
                <img src={item.src} alt={item.alt} />
              </div>
              <div className="w-52 ml-8">
                <p className="font-poppins font-medium text-black text-2xl">
                  {item.text1}
                </p>
                <p className="font-poppins font-medium text-black text-base">
                  {item.text2}
                </p>
                <p className="font-poppins font-medium text-black text-base">
                  {item.text3}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <form className="mt-10" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-poppins font-medium text-base text-black mb-5">
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Abc"
                className={`border border-9F9F9F h-75px w-80 sm:w-528px rounded-xl placeholder:text-9F9F9F pl-8 focus:outline-none ${
                  errors.name ? "border-red-500" : "border-9F9F9F"
                }`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="mb-4  mt-9">
              <label className="block font-poppins font-medium text-base text-black mb-5">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Abc@def.com"
                className={`border border-9F9F9F h-75px w-80 sm:w-528px rounded-xl placeholder:text-9F9F9F pl-8 focus:outline-none ${
                  errors.email ? "border-red-500" : "border-9F9F9F"
                }`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4 mt-9">
              <label className="block font-poppins font-medium text-base text-black mb-5">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="This is an optional"
                className="border border-9F9F9F h-75px w-80 sm:w-528px rounded-xl placeholder:text-9F9F9F pl-8 focus:outline-none"
                value={formData.subject}
                onChange={handleChange}
              />
              {errors.subject && (
                <p className="text-red-500">{errors.subject}</p>
              )}
            </div>
            <div className="mb-4 mt-9">
              <label className="block font-poppins font-medium text-base text-black mb-5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Hi! I'd like to ask about"
                className={`border border-9F9F9F h-32 w-80 sm:w-528px rounded-xl placeholder:text-9F9F9F pt-5 pl-8 focus:outline-none ${
                  errors.name ? "border-red-500" : "border-9F9F9F"
                }`}
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && (
                <p className="text-red-500">{errors.message}</p>
              )}
            </div>
            <span className="font-poppins font-medium text-green-600">
              {successMessage}
            </span>
            <div className="flex justify-center lg:justify-start mb-5 mt-10">
              <button className="bg-Primary w-60 h-14 rounded-md font-poppins font-normal text-white hover:bg-Primary2 duration-300">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default FormContact;
