import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Category } from "@prisma/client"

export  function SelectOptions({data}:{data:Category []}) {
 
  return (
    <Select name="category" >
      <SelectTrigger className="w-full h-max ">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          {
            data.map((category)=>{
              return <SelectItem key={category.id}  value={category.id} >{category.name}</SelectItem>

            })
          }
        
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
