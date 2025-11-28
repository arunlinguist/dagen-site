type Props = {};
import React, { useEffect } from "react";

const Contact = (props: Props) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [clicked, setIsClicked] = React.useState(false);
  const [submitDisabled, setSubmitDisabled] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  useEffect(() => {
    if (clicked) {
      const timer = setTimeout(() => {
        setIsClicked(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [clicked]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitDisabled(true);
    setErrorMessage(false);
    setSuccessMessage(false);

    if (!formRef.current) {
      setErrorMessage(true);
      setIsSubmitting(false);
      setSubmitDisabled(false);
      return;
    }

    const formData = new FormData(formRef.current);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    //TODO put this in the netlify environment variables
    const accessKey = "6b7f4a74-816a-4c04-82e6-6507f443dcad";
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          message: message,
          from_name: "Contact Form",
          subject: "New Contact Form Submission",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage(true);
        if (formRef.current) {
          formRef.current.reset();
        }
        setTimeout(() => {
          setSuccessMessage(false);
        }, 4000);
      } else {
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, 4000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 4000);
    } finally {
      setIsSubmitting(false);
      setSubmitDisabled(false);
    }
  }

  return (
    <>
    <div className={`transition-all duration-500 ease-in-out p-2 rounded bg-green-100 text-center mt-4 text-green-700 text-xs ${successMessage ? "opacity-100 translate-y-0" : "h-0 opacity-0 -translate-y-2 pointer-events-none"}`}>
      Your message was sent successfully! I'll be in touch shortly.
    </div>
    <div className={`transition-all duration-500 ease-in-out p-2 rounded bg-red-100 text-center mt-4 text-red-700 text-xs ${errorMessage ? "opacity-100 translate-y-0" : "h-0 opacity-0 -translate-y-2 pointer-events-none"}`}>
      Something went wrong. Please try again later.
    </div>
    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 shadow p-4  flex flex-col gap-4 mx-auto mb-12 max-w-[375px] bg-gray-50"
      ref={formRef}
    >
      <h2 className="text-[1.4rem] text-center uppercase font-semibold my-2 text-slate-700">
        Contact Me
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
        className={`bg-slate-700 text-white p-2 hover:bg-sky-800 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${clicked ? "scale-x-97" : ""}`}
        onClick={() => {
          setIsClicked(true);
          }}
        disabled={submitDisabled || isSubmitting}  
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form></>
  );
};

export default Contact;
