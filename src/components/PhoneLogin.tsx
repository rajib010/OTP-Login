import { useState } from 'react'
import OtpInput from './OtpInput'

function PhoneLogin() {

    const [phoneNumber, setPhoneNumber] = useState<number | null>(null)
    const [validNum, setValidNum] = useState<boolean>(false)
    const [showOtpBox, setShowOtpBox] = useState<boolean>(false)

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const inputValue = e.target.value
        const regex = /^\d{1,10}$/;

        if (regex.test(inputValue)) {
            setPhoneNumber(Number(inputValue));
            setValidNum(inputValue.length === 10)
        } else {
            setPhoneNumber(null)
            setValidNum(false)
        }

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowOtpBox(true)
    }

    const onOtpSubmit = (otp: number) => {
        console.log('successfull login with otp',otp);
    }


    return (

        <>
            {!showOtpBox ?
                <form className='flex flex-col gap-5 mt-5' onSubmit={handleSubmit}>
                    <input type="text"
                        value={phoneNumber !== null ? phoneNumber.toString() : ""}
                        onChange={handlePhoneChange}
                        placeholder='Enter Phone Number'
                        className={`max-w-md p-4 rounded-lg border ${validNum ? 'border-green-500' : 'border-black'}`}
                    />
                    <button type="submit" className={`max-w-md border border-black p-4 rounded-full  text-white ${validNum ? "bg-green-400" : "bg-blue-500"}`} disabled={!validNum}>
                        Submit</button>

                </form> :
                <div>
                    <h1 className='my-4'>Enter OTP sent to : {phoneNumber}</h1>
                    <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
                </div>
            }


        </>
    )
}

export default PhoneLogin