export default function StatsBadge({ status }) {
  const style =
    status === "Completed"
      ? "bg-green-100 text-green-700"
      : status === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 bg-red-700";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-full capitalize ${style} `}
    >
      {status}
    </span>
  );
}
