
import { InventoryLevels } from '@/components/dashboard/analytics/InventoryLevels'
import { TopProductsCharts } from '@/components/dashboard/analytics/TopProductsCharts'
import { TopUsersChart } from '@/components/dashboard/analytics/TopUsersChart'
import React from 'react'

export default function AnalyticsPage() {
  return (
    <div className='grid lg:grid-cols-3 gap-5  md:grid-cols-2 grid-cols-1   '>

   <InventoryLevels/>
   <TopProductsCharts/>
   <TopUsersChart/>
    </div>
  )
}
