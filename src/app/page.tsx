"use client"
import { useState } from 'react';
import * as z from 'zod';

// Define the validation schema
const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  location: z.string().min(1, { message: "Location is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" }),
});

// Define the type for form data
type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({}); // Track errors for each field
  const [submitStatus, setSubmitStatus] = useState('');

  const validateForm = () => {
    try {
      schema.parse(formData); // This will throw an error if validation fails
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      console.log(formData);
      setSubmitStatus('Form submitted successfully!');
      // Here you would typically send the data to your server
      // Refresh the page after form submission
      setTimeout(() => {
        window.location.reload();
      }, 200); // You can adjust the delay if needed
    } else {
      setSubmitStatus('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-2 text-center text-black">Have a query? Contact us.</h2>
      <p className="text-gray-600 mb-6 text-center">Please fill the form below & we will get back to you soon.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full bg-gray-100 border-0 rounded-md py-2 px-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
            />
            {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full bg-gray-100 border-0 rounded-md py-2 px-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
            {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="sr-only">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full bg-gray-100 border-0 rounded-md py-2 px-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Phone"
            />
            {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>}
          </div>
          
          <div>
            <label htmlFor="location" className="sr-only">City/Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="block w-full bg-gray-100 border-0 rounded-md py-2 px-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
              placeholder="City/Location"
            />
            {errors.location && <p className="mt-1 text-red-500 text-sm">{errors.location}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="sr-only">Message/Query</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="block w-full bg-gray-100 border-0 rounded-md py-2 px-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            placeholder="Message/Query"
          ></textarea>
          {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
        </div>
        
        <div className="flex justify-center">
      <button type="submit" className="w-32 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
        SUBMIT
      </button>
    </div>
      </form>
      
      {submitStatus && <p className="mt-4 text-green-500 text-center">{submitStatus}</p>}
    </div>
  );
}
