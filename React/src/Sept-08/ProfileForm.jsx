// ProfileForm.jsx
import React from "react";
import { useForm } from "react-hook-form";

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    trigger,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { name: "", email: "", age: "" },
  });

  const onSubmit = async (data) => {
    // simulate async work
    await new Promise((r) => setTimeout(r, 800));
    alert("Submitted: " + JSON.stringify(data, null, 2));
    reset();
  };

  // watch single field
  const watchedName = watch("name");

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 420 }}>
      <div>
        <label>Name</label>
        <input {...register("name", { required: "Name is required" })} />
        {errors.name && (
          <small style={{ color: "red" }}>{errors.name.message}</small>
        )}
      </div>

      <div>
        <label>Email</label>
        <input
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && (
          <small style={{ color: "red" }}>{errors.email.message}</small>
        )}
      </div>

      <div>
        <label>Age</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
      </div>

      <div style={{ marginTop: 8 }}>
        <button type="button" onClick={() => setValue("name", "Alice")}>
          Set name = Alice
        </button>
        <button
          type="button"
          onClick={async () => {
            await trigger("email"); // manually validate email
            alert("After trigger, email valid? " + isValid);
          }}
          style={{ marginLeft: 8 }}
        >
          Trigger email validation
        </button>
        <button
          type="button"
          onClick={() => {
            const vals = getValues();
            alert("Current values: " + JSON.stringify(vals));
          }}
          style={{ marginLeft: 8 }}
        >
          Get Values
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <button type="submit" disabled={isSubmitting || !isValid}>
          {isSubmitting ? "Saving..." : "Submit"}
        </button>
        <button type="button" onClick={() => reset()} style={{ marginLeft: 8 }}>
          Reset
        </button>
      </div>

      <hr />

      <div>
        <strong>Live preview</strong>
        <div>Name: {watchedName}</div>
        <div>Dirty: {isDirty ? "yes" : "no"}</div>
      </div>
    </form>
  );
}
