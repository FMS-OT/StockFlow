export function PageLoading({ message = "Loading data..." }) {
  return (
    <div className="flex min-h-75 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm ">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800 " />
        <p className="mt-4 font-medium text-gray-600">{message}</p>
      </div>
    </div>
  );
}
export function PageError({ message = "Something went wrong" }) {
  <div className="flex min-h-75 items-center justify-center rounded-xl border border-red-100 bg-red-50 ">
    <div className="text-center">
      <p className="text-base font-semibold text-red-700">
        Failed to load data
      </p>
      <p className="mt-2 text-sm text-red-500">{message}</p>
    </div>
  </div>;
}
