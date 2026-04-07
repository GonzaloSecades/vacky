import { auth } from '@/auth';
import AuthButton from '@/components/auth-button';
import { Map as MapIcon } from 'lucide-react';

export default async function LandingPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-white to-blue-50 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                Plan your perfect trip, every time
              </h1>
              <p className="mb-8 text-xl text-gray-600 md:text-2xl">
                Create itineraries, organize destinations, and share your travel
                plans all in one place.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <AuthButton
                  isLoggedIn={isLoggedIn}
                  className="flex w-full items-center justify-center rounded-lg bg-black px-6 py-3 text-white transition-colors duration-200 hover:bg-gray-800 sm:w-auto"
                >
                  {isLoggedIn ? (
                    'Check it Out'
                  ) : (
                    <>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.24 1.83 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3.01.41 2.29-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.23 0 1.61-.02 2.91-.02 3.31 0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span className="ml-2">Log in</span>
                    </>
                  )}
                </AuthButton>
              </div>
            </div>
          </div>
          {/* Decorative Clipped Background at the Bottom */}
          <div
            className="absolute right-0 bottom-0 left-0 h-24 bg-white"
            style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}
          />
        </section>

        {/* Features Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Plan with confidence
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <MapIcon className="text-primary h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Interactive Maps</h3>
                <p className="text-gray-600">
                  Visualize your trip with interactive maps. See your entire
                  itinerary at a glance.
                </p>
              </div>
              <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <svg
                    className="text-travel-amber h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Day-by-Day Itineraries
                </h3>
                <p className="text-gray-600">
                  Organize your trip day by day. Never miss a beat with
                  structured planning.
                </p>
              </div>
              <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-6.5L12 7" />
                    <path d="M15 5v4h4" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Drag & Drop Planning
                </h3>
                <p className="text-gray-600">
                  Easily rearrange your itinerary with simple drag and drop
                  functionality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gray-800 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Ready to plan your next adventure?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-50">
              Join thousands of travelers who plan better trips with
              TripPlanner.
            </p>
            <AuthButton
              isLoggedIn={isLoggedIn}
              className="inline-block rounded-lg bg-white px-6 py-3 text-gray-800 transition-colors duration-200 hover:bg-blue-50"
            >
              {isLoggedIn ? 'Check it out' : 'Sign Up Now'}
            </AuthButton>
          </div>
        </section>
      </main>

      {/* Footer */}
    </div>
  );
}
