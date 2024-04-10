import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignUpForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch('api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      if (response.ok) {
        router.push('/');
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return ( <div className="flex items-center justify-center w-full h-[100vh] overflow-hidden bg-pink-100 antialiased">
  <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
  <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign up to create new account</h2>    <form onSubmit={handleSubmit} className="mb-4" action="/" method="post">
      <div className="mb-4 md:w-full">
        <label htmlFor="username" className="block text-xs mb-1">Username</label>
        <input
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4 md:w-full">
        <label htmlFor="email" className="block text-xs mb-1">Email</label>
        <input
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-6 md:w-full">
        <label htmlFor="password" className="block text-xs mb-1">Password</label>
        <input
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded w-full">Sign Up</button>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-900">
          Already have an account?
          <Link href="/signin">
            <button className="text-blue-600 hover:text-blue-800 pl-1">Sign in</button>
          </Link>
        </p>
      </div>
    </form>
  </div>
</div>
  );
};

export default SignUpForm;
