/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { NavbarComponent,Footer } from "../../components";
export default function Register() {
  const [field, setField] = useState({});

  function setValue(e){
    const target = e.target;
    const name = target.name;
    const value = target.value;

    console.log({name,value});

    setField({
      ... field,
      [name]: value
    });
  }

  async function doRegister(e) {
    e.preventDefault();

    const req = await fetch('https://beckend-takeoff-production.up.railway.app/api/v1/register', {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(field)
    });

    const res = await req.json();
    console.log(res)

    e.target.reset();

  }

  return (
    <div>
      <NavbarComponent />
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
  
          </div>
      
            
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 white:bg-gray-800 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
           
              
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Create and account
              </h1>

              <form onSubmit={doRegister} className="space-y-4 md:space-y-6" action="#">
                
                  <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Your username</label>
                      <input type="username" name="username" id="username" className="bg-gray-50 border sm:text-sm rounded-lg  block w-full p-2.5  " placeholder="nandaJulian"  onChange={setValue}/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border sm:text-sm rounded-lg  block w-full p-2.5  " placeholder="name@company.com"  onChange={setValue} />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••"  className="bg-gray-50 border sm:text-sm rounded-lg  block w-full p-2.5  "  onChange={setValue}/>
                  </div>
                  {/* <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Confirm password</label>
                      <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border sm:text-sm rounded-lg  block w-full p-2.5  " required=""/>
                  </div> */}
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <center><button type="submit" name="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-20  py-3.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ">Create an account</button></center>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <a
                      href=" /"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
