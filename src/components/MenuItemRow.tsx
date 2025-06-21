export function MenuItemRow({
  name,
  price,
  status,
}: {
  name: string;
  price: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div>
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{price}</p>
      </div>
      <div className="flex items-center space-x-3">
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
          {status}
        </span>
        <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
          Edit
        </button>
      </div>
    </div>
  );
}
