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
          <form className="mt-10">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block font-poppins font-medium text-base text-black mb-5"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Abc"
                className="border border-9F9F9F h-75px w-80 sm:w-528px rounded-xl placeholder:text-9F9F9F pl-8 mb-9 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block font-poppins font-medium text-base text-black mb-5"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Abc@def.com"
                className="border border-9F9F9F h-75px w-80 sm:w-528px rounded-xl placeholder:text-9F9F9F pl-8 mb-9 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block font-poppins font-medium text-base text-black mb-5"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="This is an optional"
                className="border border-9F9F9F h-75px w-80 sm:w-528px rounded-xl placeholder:text-9F9F9F pl-8 mb-9 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block font-poppins font-medium text-base text-black mb-5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Hi! I'd like to ask about"
                className="border border-9F9F9F h-75px w-80 sm:w-528px rounded-xl placeholder:text-9F9F9F pt-5 pl-8 mb-9 focus:outline-none"
              ></textarea>
            </div>
            <div className="flex justify-center lg:justify-start mb-5">
              <button className="bg-Primary w-60 h-14 rounded-md font-poppins font-normal text-white">
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
