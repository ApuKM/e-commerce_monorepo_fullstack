import AppAreaChart from '@/components/AppAreaChart';
import AppChartBar from '@/components/AppBarChart';
import AppPieChart from '@/components/AppPieChart';
import CardList from '@/components/CardList';
import TodoList from '@/components/TodoList';
import React from 'react'

const  HomePage = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
      <div className='bg-primary-foreground p-4 rounded-lg lg:col-span-2'><AppChartBar /></div>
      <div className='bg-primary-foreground p-4 rounded-lg'><AppPieChart /></div>
      <div className='bg-primary-foreground p-4 rounded-lg lg:col-span-2 '><AppAreaChart /></div>
      <div className='bg-primary-foreground p-4 rounded-lg'><TodoList /></div>
      <div className='bg-primary-foreground p-4 rounded-lg lg:col-span-2'><CardList title={"Latest Transactions"} /></div>
      <div className='bg-primary-foreground p-4 rounded-lg'><CardList title={"Popular content"} /></div>
    </div>
  )
}

export default HomePage;