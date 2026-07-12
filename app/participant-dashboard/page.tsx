export default function ParticipantDashboard() {
  return (
    <main className="min-h-screen bg-blue-50 p-6">

      <h1 className="mb-2 text-4xl font-bold text-black">
        My Care Dashboard
      </h1>

      <p className="mb-8 text-black">
        Welcome to your CareSync portal
      </p>


      <div className="grid gap-5 md:grid-cols-2">


        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-black">
            ❤️ My Care Plan
          </h2>

          <p className="mt-2 text-black">
            View your NDIS supports and care information.
          </p>
        </div>


        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-black">
            💊 Medications
          </h2>

          <p className="mt-2 text-black">
            View your medication list and details.
          </p>
        </div>


        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-black">
            📅 Appointments
          </h2>

          <p className="mt-2 text-black">
            See upcoming appointments.
          </p>
        </div>


        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-black">
            📂 Documents
          </h2>

          <p className="mt-2 text-black">
            Access your important documents.
          </p>
        </div>


        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-black">
            📝 Daily Notes
          </h2>

          <p className="mt-2 text-black">
            View care notes and updates.
          </p>
        </div>


        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-black">
            👤 My Profile
          </h2>

          <p className="mt-2 text-black">
            Manage your personal details.
          </p>
        </div>


      </div>


    </main>
  );
}