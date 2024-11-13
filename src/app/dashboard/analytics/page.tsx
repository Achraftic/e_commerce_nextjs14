
import { InventoryLevels } from '@/components/dashboard/analytics/InventoryLevels'
import Overview from '@/components/dashboard/analytics/Overview'

import { TopProductsCharts } from '@/components/dashboard/analytics/TopProductsCharts'
import { TopUsersChart } from '@/components/dashboard/analytics/TopUsersChart'
import React from 'react'

export default function AnalyticsPage() {
  return (
    <div className='grid lg:grid-cols-3 gap-5  md:grid-cols-2 grid-cols-1 overflow-hidden   '>
   <InventoryLevels className='md:col-span-2'/>
    <Overview />
   <TopProductsCharts/>
   <TopUsersChart className=''/>
    </div>
  )
}
