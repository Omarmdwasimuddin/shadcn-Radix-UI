"use client"

import { useState } from "react"
import { TaskCard } from "@/components/task-card"
import { AddTaskDialog } from "@/components/add-task-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { AppMenubar } from "@/components/app-menubar"

interface Task {
  id: number
  title: string
  done: boolean
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Design করো", done: false },
    { id: 2, title: "Code লেখো", done: false },
  ])

  function handleAdd(title: string) {
    if (!title.trim()) return
    setTasks(prev => [...prev, { id: Date.now(), title, done: false }])
    toast.success("Task saved!", {
      description: "নতুন task যোগ হয়েছে।",
    })
  }

  function handleComplete(id: number) {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    )
  }

  function handleDelete(id: number) {
    setTasks(prev => prev.filter(t => t.id !== id))
    toast.error("Task deleted!")
  }

  const activeTasks = tasks.filter(t => !t.done)
  const doneTasks = tasks.filter(t => t.done)

  return (
    <div className="max-w-lg mx-auto p-6">
      <AppMenubar />
      <h1 className="text-xl font-medium mb-6">Task Manager</h1>

      <Tabs defaultValue="all">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="all" className="flex-1">
            সব ({tasks.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="flex-1">
            Active ({activeTasks.length})
          </TabsTrigger>
          <TabsTrigger value="done" className="flex-1">
            Done ({doneTasks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-3">
          {activeTasks.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              কোনো active task নেই
            </p>
          )}
          {activeTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))}
        </TabsContent>

        <TabsContent value="done" className="space-y-3">
          {doneTasks.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              এখনো কোনো task complete হয়নি
            </p>
          )}
          {doneTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))}
        </TabsContent>
      </Tabs>

      <div className="mt-4">
        <AddTaskDialog onAdd={handleAdd} />
      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  )
}