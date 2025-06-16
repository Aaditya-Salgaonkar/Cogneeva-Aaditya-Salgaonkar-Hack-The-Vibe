import { useUser } from "@clerk/clerk-react";

function SettingsPage() {
  const { user, setUser } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Make a POST request to update the user's profile
    const formData = new FormData(event.target);
    const updatedUser = {
      // Extract the updated user data from the form data
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      // ...
    };
    setUser(updatedUser);
    // Save the updated user to the server
    const response = await fetch("/api/update-profile", {
      method: "POST",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      // Handle any errors
      console.error("Error updating user profile", response.statusText);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        defaultValue={user.firstName}
        required
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        defaultValue={user.lastName}
        required
      />
      <label htmlFor="email">Email</label>
      <input type="email" name="email" defaultValue={user.email} required />
      {/* Add more fields as needed */}
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default SettingsPage;