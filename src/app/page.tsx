'use client'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AddTaskDialog } from "@/components/add-task-dialog"

const tasks = [
  { id: 1, title: "Design করো", priority: "high" },
  { id: 2, title: "Code লেখো", priority: "medium" },
]

export default function Page() {
  const handleAdd = (taskTitle: string) => {
    // Handle adding a new task
    console.log("New task:", taskTitle)
  }

  return (
    <div className="max-w-lg mx-auto p-6 space-y-3">
      {tasks.map(task => (
        <Card key={task.id} className="p-4 flex items-center justify-between">
          <span>{task.title}</span>
          <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>
            {task.priority}
          </Badge>
        </Card>
      ))}
      <Button className="w-full">+ নতুন task</Button>
      <AddTaskDialog onAdd={handleAdd} />
    </div>
  )
}