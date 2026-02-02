export default function LoadingSpinner() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-orange-600 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
