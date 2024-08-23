import PhoneLogin from "./components/PhoneLogin"


function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1 className="text-2xl font-bold">Login With Phone</h1>
        <PhoneLogin />
      </div>
    </>
  )
}

export default App