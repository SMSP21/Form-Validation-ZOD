"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  const [submitStatus, setSubmitStatus] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setSubmitStatus('Form submitted successfully!');
    // Here you would typically send the data to your server
    // Refresh the page after form submission
    setTimeout(() => {
      window.location.reload();
    }, 200); // You can adjust the delay if needed
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-2 text-center text-black">Have a query? Contact us.</h2>
      <p className="text-gray-600 mb-6 text-center">Please fill the form below & we will get back to you soon.</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <div className="flex items-center bg-gray-100 rounded-md">
              <span className="p-2 text-gray-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </span>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="block w-full bg-gray-100 border-0 rounded-md py-2 px-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
              />
            </div>
            {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="flex items-center bg-gray-100 rounded-md">
              <span className="p-2 text-gray-500">@</span>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="block w-full bg-gray-100 border-0 rounded-md py-2 px-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
            </div>
            {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email?.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="sr-only">Phone</label>
            <div className="flex items-center bg-gray-100 rounded-md">
              <span className="p-2 text-gray-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </span>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                className="block w-full bg-gray-100 border-0 rounded-md py-2 px-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Phone"
              />
            </div>
            {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone?.message}</p>}
          </div>
          
          <div>
            <label htmlFor="location" className="sr-only">City/Location</label>
            <div className="flex items-center bg-gray-100 rounded-md">
              <span className="p-2 text-gray-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </span>
              <input
                type="text"
                id="location"
                {...register('location')}
                className="block w-full bg-gray-100 border-0 rounded-md py-2 px-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                placeholder="City/Location"
              />
            </div>
            {errors.location && <p className="mt-1 text-red-500 text-sm">{errors.location?.message}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="sr-only">Message/Query</label>
          <textarea
            id="message"
            rows={4}
            {...register('message')}
            className="block w-full bg-gray-100 border-0 rounded-md py-2 px-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            placeholder="Message/Query"
          ></textarea>
          {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message?.message}</p>}
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
