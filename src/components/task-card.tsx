"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Task {
  id: number
  title: string
  done: boolean
}

interface TaskCardProps {
  task: Task
  onComplete: (id: number) => void
  onDelete: (id: number) => void
}

export function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  return (
    <Card className="p-4 flex items-center gap-3">
      <Checkbox
        checked={task.done}
        onCheckedChange={() => onComplete(task.id)}
      />
      <span className={task.done ? "line-through text-muted-foreground flex-1" : "flex-1"}>
        {task.title}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">⋯</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-red-500" onClick={() => onDelete(task.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  )
}