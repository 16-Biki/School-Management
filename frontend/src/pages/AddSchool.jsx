import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../index.css";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const previewFile = watch("image");

  const onSubmit = async (data) => {
    setMessage("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address || "");
      formData.append("city", data.city || "");
      formData.append("state", data.state || "");
      formData.append("contact", data.contact || "");
      formData.append("email_id", data.email_id || "");
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await fetch(
        "https://school-management-5cmf.onrender.com/api/schools",
        {
          method: "POST",
          body: formData,
        }
      );

      const json = await res.json();

      if (res.ok) {
        setMessage("✅ School added successfully");
      } else {
        setMessage(json.message || "❌ Failed to add");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-add">
      <h2>Add School</h2>
      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <label>School Name *</label>
        <input {...register("name", { required: "Name is required" })} />
        {errors.name && <p className="err">{errors.name.message}</p>}

        <label>Address</label>
        <textarea {...register("address")} rows="3" />

        <div className="row">
          <div className="col">
            <label>City</label>
            <input {...register("city")} />
          </div>
          <div className="col">
            <label>State</label>
            <input {...register("state")} />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>Contact</label>
            <input
              {...register("contact", {
                pattern: {
                  value: /^[0-9+\- ]{6,20}$/,
                  message: "Invalid contact",
                },
              })}
            />
            {errors.contact && <p className="err">{errors.contact.message}</p>}
          </div>
          <div className="col">
            <label>Email</label>
            <input
              {...register("email_id", {
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
              })}
            />
            {errors.email_id && (
              <p className="err">{errors.email_id.message}</p>
            )}
          </div>
        </div>

        <label>Image *</label>
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: "Image is required" })}
        />
        {errors.image && <p className="err">{errors.image.message}</p>}

        {previewFile && previewFile[0] && (
          <div className="preview">
            <img src={URL.createObjectURL(previewFile[0])} alt="preview" />
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save School"}
          </button>
        </div>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
