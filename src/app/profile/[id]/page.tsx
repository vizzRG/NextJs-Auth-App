export default function idProfilePage({params}: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-3xl font-bold">Profile Page</h1>
      <p className="p-3 text-3xl rounded-2xl ">Welcome to your profile! <span className="bg-amber-500 p-3 text-4xl rounded-2xl  ">{params.id}</span></p>
    </div>
  );
}
