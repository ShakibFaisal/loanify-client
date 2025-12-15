import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../../Provider/AuthContext";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id"); 
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId || !user?.email) return;

    const updatePaymentStatus = async () => {
      try {
       
        const res = await axiosSecure.get(`/stripe-session/${sessionId}`);
        const { loanId } = res.data;
         console.log(loanId)

        if (!loanId) {
          throw new Error("Invalid Stripe session data");
        }

        await axiosSecure.patch("/loan-application/fee-paid", {
          loanId,
        });

        toast.success("Payment successful!");
        navigate("/dashboard/my-loans");
      } catch (err) {
        console.error("Payment verification failed:", err);
        toast.error("Payment verification failed");
      } finally {
        setLoading(false);
      }
    };

    updatePaymentStatus();
  }, [sessionId, user?.email, axiosSecure, navigate]);
 

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white p-8 rounded-xl shadow text-center">
        {loading ? (
          <p className="text-lg font-medium">Verifying payment...</p>
        ) : (
          <p className="text-green-600 font-semibold text-lg">
            Payment Completed Successfully 
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
