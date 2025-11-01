import { useRouter } from "next/router";
import { useState } from "react";

const ProductUpdateForm = ({ initialData }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/update-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.error) {
        setError(result.error.message || "Something went wrong");
        return;
      }

      router.push(`/admin/products/${result.data.slug}`);
    } catch (err) {
      setError("Failed to update product.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields go here, using value={formData.name} and onChange={handleChange} */}
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-black text-white p-2 rounded">
        Save Changes
      </button>
    </form>
  );
};

export default ProductUpdateForm;
