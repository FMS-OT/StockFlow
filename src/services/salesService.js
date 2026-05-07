export function getSales() {
  try {
    const stored = localStorage.getItem("sales");
    if (!stored) {
      const initialSales = [
        {
          id: "1",
          orderId: "#101",
          customer: "Ahmed Ali",
          amount: "$120",
          status: "Completed",
          date: "2025-01-10T10:00:00Z",
        },
        {
          id: "2",
          orderId: "#102",
          customer: "Sara Mohamed",
          amount: "$80",
          status: "Pending",
          date: "2025-02-15T12:00:00Z",
        },
        {
          id: "3",
          orderId: "#103",
          customer: "Omar Khaled",
          amount: "$200",
          status: "Cancelled",
          date: "2025-03-05T14:00:00Z",
        },
        {
          id: "4",
          orderId: "#104",
          customer: "Mona Hassan",
          amount: "$150",
          status: "Completed",
          date: "2025-04-20T15:00:00Z",
        },
        {
          id: "5",
          orderId: "#105",
          customer: "Ali Mahmoud",
          amount: "$60",
          status: "Pending",
          date: "2025-05-11T16:00:00Z",
        },
        {
          id: "6",
          orderId: "#106",
          customer: "Youssef Adel",
          amount: "$300",
          status: "Completed",
          date: "2025-06-08T11:00:00Z",
        },
        {
          id: "7",
          orderId: "#107",
          customer: "Nour Ahmed",
          amount: "$90",
          status: "Completed",
          date: "2025-07-19T13:00:00Z",
        },
        {
          id: "8",
          orderId: "#108",
          customer: "Hassan Karim",
          amount: "$170",
          status: "Cancelled",
          date: "2025-08-03T09:00:00Z",
        },
        {
          id: "9",
          orderId: "#109",
          customer: "Laila Said",
          amount: "$220",
          status: "Completed",
          date: "2025-09-25T17:00:00Z",
        },
        {
          id: "10",
          orderId: "#110",
          customer: "Mahmoud Tarek",
          amount: "$140",
          status: "Pending",
          date: "2025-10-12T18:00:00Z",
        },
      ];
      localStorage.setItem("sales", JSON.stringify(initialSales));
      return initialSales;
    }
    return JSON.parse(stored);
  } catch {
    return [];
  }
}
export function saveSales(sales) {
  localStorage.setItem("sales", JSON.stringify(sales));
}
