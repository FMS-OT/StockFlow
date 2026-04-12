import { Package, Layers, ShoppingCart, DollarSign } from "lucide-react";
export const kpiData = [
  {
    title: "Total Products",
    value: 123,
    icon: Package,
    color:
      "bg-blue-100 text-blue-600 group-hover:bg-blue-200 group-hover:text-blue-700",
  },
  {
    title: "Total Categories",
    value: 8,
    icon: Layers,
    color:
      "bg-purple-100 text-purple-600 group-hover:bg-purple-200 group-hover:text-purple-700 ",
  },
  {
    title: "Total Sales",
    value: "1,235",
    icon: ShoppingCart,
    color:
      "bg-green-100 text-green-600 group-hover:bg-green-200 group-hover:text-green-700",
  },
  {
    title: "Revenue",
    value: `$12,354`,
    icon: DollarSign,
    color:
      "bg-orange-100 text-orange-600 group-hover:bg-orange-200 group-hover:text-orange-700",
  },
];
