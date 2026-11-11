import AppAreaChart from "@/components/AppAreaChart";
import AppChartBar from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/TodoList";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const HomePage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const orderChartData = fetch(
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders/order-chart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((res) => res.json());
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2">
        <AppChartBar dataPromise={orderChartData} />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 ">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <TodoList />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2">
        <CardList title={"Latest Transactions"} />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title={"Popular Products"} />
      </div>
    </div>
  );
};

export default HomePage;
