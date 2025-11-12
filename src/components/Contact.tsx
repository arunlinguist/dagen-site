type Props = {};
import React, { useEffect } from "react";

const Contact = (props: Props) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [clicked, setIsClicked] = React.useState(false);

  useEffect(() => {
    if (clicked) {
      const timer = setTimeout(() => {
        setIsClicked(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [clicked]);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");
    }
    alert(
      `Form data: \nName: ${formRef.current?.name.value}\nEmail: ${formRef.current?.email.value}\nMessage: ${formRef.current?.message.value}`,
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 shadow p-4  flex flex-col gap-4 mx-auto my-4 max-w-[375px] bg-gray-50"
      ref={formRef}
    >
      <h2 className="text-[1.4rem] text-center uppercase font-semibold my-2 text-slate-700">
        Contact Us
      </h2>
      <div className="sm:flex sm:gap-x-2 gap-y-2">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="p-2 border border-gray-300 w-full md:w-1/2 mb-2 sm:mb-0 focus:ring focus:ring-slate-400 focus:ring-inset focus:outline-none"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full md:w-1/2 p-2 border border-gray-300 focus:ring focus:ring-slate-400 focus:ring-inset focus:outline-none"
          required
        />
      </div>

      <textarea
        name="message"
        placeholder="Your Message"
        rows={5}
        className="p-2 border border-gray-300 focus:ring focus:ring-slate-400 focus:ring-inset focus:outline-none"
        required
      ></textarea>
      <button
        type="submit"
        className={`bg-slate-700 text-white p-2 hover:bg-sky-800 transition-all duration-200 cursor-pointer hover:my-2 hover:scale-y-105 ${clicked ? "scale-x-97" : ""}`}
        onClick={() => {
          setIsClicked(true);
        }}
      >
        Send Message
      </button>
    </form>
  );
};

export default Contact;
