import { useState } from "react";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Convert FormData to JSON
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.error) {
        alert(result.error);
        setIsSubmitting(false);
        return;
      }

      router.replace("/login");
    } catch (err) {
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Your input fields go here */}
      <button
        type="submit"
        id="btn-submit"
        disabled={isSubmitting}
        className={`w-full flex justify-center ${
          isSubmitting ? "bg-gray-300" : "bg-black"
        } text-white p-3 rounded-md tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500`}
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
