import { useState, useRef, useEffect } from "react";

type OtpInputProps = {
    length: number;
    onOtpSubmit: (otp: number) => void;
};

function OtpInput({ length, onOtpSubmit }: OtpInputProps) {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const [validOtp, setValidOtp] = useState<boolean>(false)
    const [combinedOtp, setCombinedOtp] = useState<string>("")
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Automatically focus the first input on mount
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);  // Empty dependency array ensures this runs only once

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {  // Allow only a single digit or empty string
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next input field if a digit is entered
            if (value && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
            }

            // Trigger OTP submission if all inputs are filled
            const newCombinedOtp = newOtp.join('')
            setCombinedOtp(newCombinedOtp)
            setValidOtp(newCombinedOtp.length===length)
        }
    };

    const handleClick = (index: number) => {
        inputRefs.current[index]?.select();  // Select the text in the input when clicked
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();  // Move focus to the previous input
        }
    };

    const handleOtpSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        onOtpSubmit(Number(combinedOtp));
    }

    return (

        <>
            <div className="flex flex-row max-w-md gap-4">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        ref={(input) => (inputRefs.current[index] = input)}
                        value={value}
                        maxLength={1}  // Ensure only one character per input
                        onChange={(e) => handleChange(index, e)}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="border border-black w-10 h-10 text-center"
                    />
                ))}
            </div>
            {validOtp && <button className="w-[10vw] m-auto mt-5 text-white cursor-pointer bg-blue-500 p-5 rounded-lg" onClick={handleOtpSubmit}>Submit</button>}
        </>

    );
}

export default OtpInput;
