import React from "react";
import HeroSection from "../../Components/HeroSection";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import LoanCard from "../../Components/LoanCard";
import HowItWorks from "./HowItWork/HowItWork";
import CustomerFeedback from "./CustomerFeedback/CustomerFeedback";

import AboutUsSection from "./AboutUsSection";
import Testimonials from "./TestiMonials";

const Home = () => {
  const axiosSecure = UseAxiosSecure();
  const  { data: loans = [] } = useQuery({
     queryKey: ['loans'],
    queryFn: async () => {
      const res = await axiosSecure.get(`loans-sort`);
      return res.data;
    },
  });
 
  return (
    <div className="max-w-11/12 mx-auto">
      <HeroSection></HeroSection>
      <h3 className="text-center font-bold  text-4xl my-5">Available Loans</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-7">
        
        {loans.map(loan=>(<LoanCard key={loan._id} loan={loan}></LoanCard>))}
      </div>
       <HowItWorks></HowItWorks>
       <CustomerFeedback></CustomerFeedback>
       <AboutUsSection></AboutUsSection>
       <Testimonials></Testimonials>
      
    </div>
  );
};

export default Home;
