import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoanCard from "../../Components/LoanCard";

const AvailableLoan = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: loans = [] } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = await axiosSecure.get(`loans`);
      return res.data;
    },
  });
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {loans.map((loan) => (
          <LoanCard key={loan._id} loan={loan}></LoanCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableLoan;
