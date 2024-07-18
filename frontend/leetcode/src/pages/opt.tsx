import { useNavigate, useParams } from 'react-router';
import { useState, useRef } from 'react';
import OtpInput from '../components/optinput';
import axios from 'axios';
import { toast } from 'react-toastify';

interface OtpType {
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  input5: string;
  input6: string;
}

export default function Otp() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [otp, setOtp] = useState<OtpType>({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
  });
  const server = import.meta.env.VITE_backend_url;

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    const updatedOtp = { ...otp, [`input${index + 1}`]: value } as OtpType;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const otpInputs = [];
  for (let i = 0; i < 6; i++) {
    otpInputs.push(
      <OtpInput
        key={i}
        index={i}
        value={otp[`input${i + 1}` as keyof OtpType]}
        onChange={handleChange}
        inputRef={(el) => (inputRefs.current[i] = el)}
      />
    );
  }

  const handleVerifyOTP = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    let flag = 1;
    for (let i = 0; i < 6; i++) {
      if (otp[`input${i + 1}` as keyof OtpType] === '') {
        flag = 0;
        break;
      }
    }
    if (flag === 0) {
      toast.error('Please fill all 6 digits');
    } else {
     
        let ans = '';
        for (let i = 0; i < 6; i++) {
          ans += otp[`input${i + 1}` as keyof OtpType];
        }
  
        const resp = await axios.post(server + '/api/v1/user/otp-verification', {
          id: id,
          otp: ans,
        });
        console.log(resp.data); 
        if (resp.data.success) {
          toast.success(resp.data.message);
          navigate('/signin');
        } else {
        toast.error(resp.data.message);
        }
      } 
    
  };
  

  return (
    <>
      <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-6 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Verify your identity</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter the one-time password (OTP) sent to your registered email.</p>
          </div>
          <form className="space-y-4">
            <div className="flex items-center justify-center gap-2">{otpInputs}</div>
            <button
              className="inline-flex h-10 w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              type="submit"
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
