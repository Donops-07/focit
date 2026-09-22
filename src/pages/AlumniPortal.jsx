import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitAlumniRegistration, submitDonation, getRollOfHonour } from "../services/api";
import { ProfileCard } from "../components/ui/ProfileCard";

// --- ZOD SCHEMAS ---

const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  graduationYear: z.string().refine((val) => {
    const year = parseInt(val, 10);
    return year >= 2007 && year <= new Date().getFullYear();
  }, { message: "Graduation year must be between 2007 and current year" }),
  department: z.string().min(1, "Please select a department"),
  linkedIn: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

const donationSchema = z.object({
  donorName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  amount: z.string().refine((val) => parseInt(val, 10) >= 1000, {
    message: "Minimum donation is ₦1,000",
  }),
  purpose: z.string().min(1, "Please select a purpose"),
});

// --- LOADER ---
export async function alumniLoader({ request }) {
  const rollOfHonour = await getRollOfHonour({ level: "faculty" }, { signal: request.signal });
  return { rollOfHonour };
}

// --- SUB-COMPONENTS ---

function FormStatusMessage({ status, message }) {
  if (status === "idle" || status === "loading") return null;

  const isSuccess = status === "success";
  
  return (
    <div className={`p-4 rounded-md mb-6 flex items-start ${isSuccess ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
      {isSuccess ? (
        <CheckCircle2 className="h-5 w-5 mr-3 flex-shrink-0 text-green-500" />
      ) : (
        <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 text-red-500" />
      )}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---

export default function AlumniPortal() {
  const { rollOfHonour } = useLoaderData();

  // Network states for registration
  const [regStatus, setRegStatus] = useState("idle"); // idle | loading | success | error
  const [regMessage, setRegMessage] = useState("");

  // Network states for donation
  const [donStatus, setDonStatus] = useState("idle");
  const [donMessage, setDonMessage] = useState("");

  const {
    register: registerReg,
    handleSubmit: handleRegSubmit,
    reset: resetReg,
    formState: { errors: regErrors, isSubmitting: isRegSubmitting },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const {
    register: registerDon,
    handleSubmit: handleDonSubmit,
    reset: resetDon,
    formState: { errors: donErrors, isSubmitting: isDonSubmitting },
  } = useForm({
    resolver: zodResolver(donationSchema),
  });

  const onRegistrationSubmit = async (data) => {
    setRegStatus("loading");
    setRegMessage("");
    try {
      const result = await submitAlumniRegistration(data);
      setRegStatus("success");
      setRegMessage(result.message);
      resetReg();
    } catch (err) {
      setRegStatus("error");
      setRegMessage(err.message || "An unexpected error occurred.");
    }
  };

  const onDonationSubmit = async (data) => {
    setDonStatus("loading");
    setDonMessage("");
    try {
      const result = await submitDonation(data);
      setDonStatus("success");
      setDonMessage(result.message);
      resetDon();
    } catch (err) {
      setDonStatus("error");
      setDonMessage(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative w-full max-w-4xl h-64 sm:h-80 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop" 
              alt="Graduating Students" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                Alumni Network Portal
              </h1>
              <p className="mt-4 text-lg md:text-xl text-slate-100 max-w-2xl drop-shadow-md">
                Stay connected with the Faculty of Computing & Information Technology. Register to join the network or support future generations.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Join the Alumni Network
            </button>
            <button 
              onClick={() => document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Donate
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* REGISTRATION FORM */}
          <div id="registration-form" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Join the Alumni Network</h2>
            
            <FormStatusMessage status={regStatus} message={regMessage} />

            <form onSubmit={handleRegSubmit(onRegistrationSubmit)} className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  {...registerReg("fullName")}
                  className={`mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 border ${regErrors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {regErrors.fullName && <p className="mt-1 text-sm text-red-600">{regErrors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Email Address</label>
                <input
                  type="email"
                  {...registerReg("email")}
                  className={`mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 border ${regErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {regErrors.email && <p className="mt-1 text-sm text-red-600">{regErrors.email.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Graduation Year</label>
                  <input
                    type="number"
                    {...registerReg("graduationYear")}
                    className={`mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 border ${regErrors.graduationYear ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {regErrors.graduationYear && <p className="mt-1 text-sm text-red-600">{regErrors.graduationYear.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Department</label>
                  <select
                    {...registerReg("department")}
                    className={`mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 border ${regErrors.department ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <option value="">Select Dept...</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="cyber-security">Cyber Security</option>
                    <option value="software-engineering">Software Engineering</option>
                  </select>
                  {regErrors.department && <p className="mt-1 text-sm text-red-600">{regErrors.department.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">LinkedIn Profile (Optional)</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  {...registerReg("linkedIn")}
                  className={`mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 border ${regErrors.linkedIn ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {regErrors.linkedIn && <p className="mt-1 text-sm text-red-600">{regErrors.linkedIn.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isRegSubmitting}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRegSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Submitting...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>

          {/* DONATION FORM */}
          <div id="donation-form" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Support the Faculty</h2>
            
            <FormStatusMessage status={donStatus} message={donMessage} />

            <form onSubmit={handleDonSubmit(onDonationSubmit)} className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-700">Donor Name</label>
                <input
                  type="text"
                  {...registerDon("donorName")}
                  className={`mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm px-4 py-2 border ${donErrors.donorName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {donErrors.donorName && <p className="mt-1 text-sm text-red-600">{donErrors.donorName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Email Address</label>
                <input
                  type="email"
                  {...registerDon("email")}
                  className={`mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm px-4 py-2 border ${donErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {donErrors.email && <p className="mt-1 text-sm text-red-600">{donErrors.email.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Amount (₦)</label>
                  <input
                    type="number"
                    placeholder="1000"
                    {...registerDon("amount")}
                    className={`mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm px-4 py-2 border ${donErrors.amount ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {donErrors.amount && <p className="mt-1 text-sm text-red-600">{donErrors.amount.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Purpose</label>
                  <select
                    {...registerDon("purpose")}
                    className={`mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm px-4 py-2 border ${donErrors.purpose ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <option value="">Select...</option>
                    <option value="scholarship">Student Scholarships</option>
                    <option value="research">Research Grants</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="general">General Fund</option>
                  </select>
                  {donErrors.purpose && <p className="mt-1 text-sm text-red-600">{donErrors.purpose.message}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={isDonSubmitting}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDonSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Processing...
                  </>
                ) : (
                  "Donate Now"
                )}
              </button>
            </form>
          </div>

        </div>

        {/* ROLL OF HONOUR */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl mb-4">Faculty Best Graduating Students</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Celebrating our most outstanding graduates across the entire Faculty of Computing & Information Technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {rollOfHonour.map(alumnus => (
              <ProfileCard 
                key={alumnus.id}
                name={alumnus.name}
                subtitle={`${alumnus.award} (${alumnus.year})`}
                image={alumnus.photo}
                badge={alumnus.department}
              >
                <div className="text-sm text-slate-600 space-y-1">
                  <p><span className="font-semibold text-slate-900">Matric No:</span> {alumnus.matricNo}</p>
                  <p><span className="font-semibold text-slate-900">CGPA:</span> {alumnus.cgpa}</p>
                </div>
              </ProfileCard>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
