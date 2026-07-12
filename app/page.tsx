import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50 p-5">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">

        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-4xl text-white">
          ❤️
        </div>


        <h1 className="text-4xl font-bold text-blue-700 mb-3">
          CareSync
        </h1>


        <p className="text-gray-600 mb-8">
          Connecting people with the care they need.
        </p>


        <Link
          href="/login"
          className="block w-full rounded-xl bg-blue-600 p-3 text-white mb-4 hover:bg-blue-700"
        >
          🔐 Log In
        </Link>


        <Link
          href="/signup"
          className="block w-full rounded-xl border-2 border-blue-600 p-3 text-blue-600 hover:bg-blue-50"
        >
          📝 Create Account
        </Link>


        <div className="mt-8 space-y-3">

          <Link
            href="/about"
            className="block text-gray-600 hover:text-blue-600"
          >
            ℹ️ About Us
          </Link>


          <Link
            href="/contact"
            className="block text-gray-600 hover:text-blue-600"
          >
            📞 Contact Us
          </Link>

        </div>


      </div>

    </main>
  );
}