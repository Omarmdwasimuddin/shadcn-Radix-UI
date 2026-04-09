## shadcn + Radix UI

##### Project-Setup: Install---

```bash
npx create-next-app@latest shadcn-radix
```

##### Install--- shadcn

```bash
npx shadcn@latest init
```

![](/public/Img/setupshadcn.png)

##### Basic components (task list UI)

```bash
npx shadcn@latest add button input card badge
```

#### app/page.tsx

```bash
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const tasks = [
  { id: 1, title: "Design করো", priority: "high" },
  { id: 2, title: "Code লেখো", priority: "medium" },
]

export default function Page() {
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
    </div>
  )
}
```

##### এখানে শিখবে: variant prop কীভাবে component এর look বদলায়।

---

##### Dialog + Form (task add করা)

```bash
npx shadcn@latest add dialog form label select
```

#### components/add-task-dialog.tsx

```bash
"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddTaskDialog({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState("")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ নতুন task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>নতুন task যোগ করো</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label htmlFor="title">Task এর নাম</Label>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <Button onClick={() => onAdd(title)} className="w-full">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

#### app/page.tsx

```bash
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
```

##### এখানে শিখবে: DialogTrigger asChild কী করে — Radix এর asChild pattern টা অনেক important, এটা trigger element কে replace করে দেয়।

---

##### Dropdown + Checkbox

```bash
npx shadcn@latest add dropdown-menu checkbox
```

##### প্রতিটা task card এ 3-dot menu:

#### components/task-card.tsx

```bash
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
```

#### app/page.tsx

```bash
"use client"

import { useState } from "react"
import { TaskCard } from "@/components/task-card"
import { AddTaskDialog } from "@/components/add-task-dialog"

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
  }

  function handleComplete(id: number) {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    )
  }

  function handleDelete(id: number) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="max-w-lg mx-auto p-6 space-y-3">
      <h1 className="text-xl font-medium mb-4">Task Manager</h1>

      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      ))}

      <AddTaskDialog onAdd={handleAdd} />
    </div>
  )
}
```

---

##### Tabs + Toast

```bash
npx shadcn@latest add tabs sonner
```

#### app/page.tsx

```bash
"use client"

import { useState } from "react"
import { TaskCard } from "@/components/task-card"
import { AddTaskDialog } from "@/components/add-task-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

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
```

##### Menubar (Navbar style menu) — shadcn + Radix

```bash
npx shadcn@latest add menubar
```

#### components/app-menubar.tsx

```bash
"use client"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

export function AppMenubar() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Task</MenubarItem>
          <MenubarItem>Save</MenubarItem>
          <MenubarItem>Logout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>All Tasks</MenubarItem>
          <MenubarItem>Completed</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
```

#### app/page.tsx

```bash
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
```