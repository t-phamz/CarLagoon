"use client"; // This is a client component 👈🏽
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

const CreateUser: React.FC = () => {
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    hasCar: boolean;
    carSeats?: number;
    location: string;
    img: string;
  }>({
    firstName: "",
    lastName: "",
    hasCar: false,
    carSeats: 0,
    location: "",
    img: "CryingIsaac.jpeg",
  });
  const availableImgs: string[] = [
    "Brown.jpg",
    "Green.jpg",
    "Red.jpg",
    "White.jpg",
  ];
  const [selectedImg, setSelectedImg] = useState<string>("CryingIsaac.jpeg");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(name, value);
  };

  const handleImageSelection = (img: string) => {
    let image: string = "img";
    setFormData({ ...formData, img });
    setSelectedImg(img);
    console.log("here is formdata: " + "img" + formData.img);
  };

  useEffect(() => {
    // Here, you can perform any action when formData.img changes
    console.log("formData.img has changed:", formData.img);
  }, [formData.img]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data for submission:", formData);

    try {
      const response = await fetch("/api/userManager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // User created successfully
        console.log("User created successfully");
      } else {
        console.error("Error creating user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="LastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        {/* <div>
          <label htmlFor="hasCar">Do you have a car? </label>
          <label htmlFor="hasCar">Yes </label>
          <input
            type="radio"
            id="hasCarYes"
            name="hasCar"
            value={1}
            onChange={handleChange}
          />
          <label htmlFor="hasCar">No </label>
          <input
            type="radio"
            id="hasCarNo"
            name="hasCar"
            value={0}
            onChange={handleChange}
          />
        </div> */}
        <div>
          <label htmlFor="carSeats">Number of seats in the car?</label>
          <input
            type="number"
            id="carSeats"
            name="carSeats"
            value={formData.carSeats}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Where do you live</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="img">Profile picture</label>
          {selectedImg && (
            <div>
              <img
                src={selectedImg}
                alt="Selected Profile"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            </div>
          )}
          {/* <input
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
          /> */}
        </div>
        <div className="image-gallery">
          <h2>Choose a Profile Picture</h2>
          <div className="image-list">
            {availableImgs.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Profile ${index + 1}`}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                onClick={() => handleImageSelection(image)}
              />
            ))}
          </div>
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
