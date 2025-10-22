import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LucideLock,  LucideUser } from "lucide-react"
import type React from "react"
import { useState } from "react"




export default function CardDemo() {

  const [email, setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState(true);
 

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const endpoint = isLogin? "login" : "signup";

    try {
      const res = await fetch(`http://localhost:5000/${endpoint}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      })

      const data = await res.json();
      setMessage(data.message);

      if(data.token){
        localStorage.setItem("token", data.token);
        window.location.href = "/loginsuccess";
      }
      
    } catch (error) {
      console.error(`${isSignup ? "Login":"SignUp"} error:`,error);
      setMessage("Server error. Try Again Later");
    }
  }
  
  return (
    <section className="flex justify-center items-center w-full h-screen " style={{backgroundImage: "url('/public/pexels-pixabay-276147.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(80%)'}}>
    <Card className="w-140 overflow-hidden flex-row gap-0 p-4 bg-white/10 rounded-2xl border-white/30 shadow-xl border-2 h-100  backdrop-blur-sm  backdrop-opacity-90 text-black brightness-115">
       <div
          className={`flex flex-row gap-8 w-[200%] transition-transform duration-500 ${
            isSignup ? "-translate-x-1/2" : "translate-x-0"
          }`}>

      <div className=" flex flex-col w-150 gap-6">
      <CardHeader>
        <CardTitle className="flex justify-center text-3xl ">Log In</CardTitle>
        
       
      </CardHeader>
      <CardContent>
        <form onSubmit={handlesubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2  ">
              <Label htmlFor="email" >Email</Label>
              <LucideUser className="absolute ml-110 mt-7" size={20}/>
              <Input
                id="email"
                type="email"
                className="border-b-2 border-red-500 border-t-0 border-r-0 border-l-0 rounded-none "
                placeholder="Email@gmail.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <LucideLock className="absolute ml-110 mt-9" size={20}/>
              <Input id="password" className="border-b-2 border-red-500 border-t-0 border-l-0 border-r-0 rounded-none" type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <Button type="submit" className="hover:text-white text-black w-full mt-7 border-2 border-black/30 cursor-pointer bg-transparent hover:border-white/60 transition-colors ease-in-out">
          Login
        </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <CardAction >
         <p className=" -mt-3 text-sm ml-30 w-full">Don’t have an account?<Button variant="link" onClick={()=>setIsSignup(true)} className="cursor-pointer hover:text-red-500 ">Sign Up</Button></p>
        </CardAction>

        {message && (
          <p className="text-sm text-center text-red-500 mt-2">{message}</p>
        )}

      </CardFooter>
      </div>

      {/*signup*/}

      

      <div className=" flex flex-col w-150 gap-6">
      <CardHeader>
        <CardTitle className="flex justify-center text-3xl ">Sign Up</CardTitle>
       
       
      </CardHeader>
      <CardContent>
        <form onSubmit={handlesubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2  ">
              <Label htmlFor="email" >Email</Label>
              <LucideUser className="absolute ml-110 mt-7" size={20}/>
              <Input
                id="email"
                type="email"
                className="border-b-2 border-red-500 border-t-0 border-r-0 border-l-0 rounded-none "
                placeholder="Email@gmail.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <LucideLock className="absolute ml-110 mt-9" size={20}/>
              <Input id="password" className="border-b-2 border-red-500 border-t-0 border-l-0 border-r-0 rounded-none" type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <Button type="submit" className=" hover:text-white text-black w-full mt-7 border-2 border-black/30 cursor-pointer bg-transparent  hover:border-white/50 transition-colors ease-in-out">
          Sign Up
        </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <CardAction >
         <p className="-mt-3 text-sm ml-30 w-full">Already have an account?<Button variant="link" onClick={()=>setIsSignup(false)} className=" cursor-pointer hover:text-red-500">Login</Button></p>
        </CardAction>

        {message && (
          <p className="text-sm text-center text-red-500 mt-2">{message}</p>
        )}

      </CardFooter>
      </div>
      </div>
    </Card>
    </section>
  )
}
