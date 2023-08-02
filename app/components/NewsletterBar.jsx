import { Button } from "~/components/Button"

export const NewsletterBar = () => {
  return <div className=" bg-primary-red py-[60px] px-5 800:px-[100px] flex justify-center items-center">
    <p className=" font-500 text-white text-sans-32 text-center">
      Get 20% off your first order
    </p> 
    <div className="relative ml-10">
      <input type="email" placeholder="Enter your email" className="bg-white text-black rounded-[5px] border-2 border-solid border-white px-5 py-2 min-w-[30rem]" />
      <div className="absolute right-0 top-0 bottom-0 p-[5px]">
        <Button variant="primary" className="h-full !text-sans-14">
          Sign Up
        </Button>
      </div>
    </div>
  </div>
}