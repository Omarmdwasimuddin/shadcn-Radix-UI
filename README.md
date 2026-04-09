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

```bash
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

function TaskCard({ task, onComplete, onDelete }) {
  return (
    <Card className="p-4 flex items-center gap-3">
      <Checkbox
        checked={task.done}
        onCheckedChange={() => onComplete(task.id)}
      />
      <span className={task.done ? "line-through text-muted-foreground" : ""}>
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

---

##### Tabs + Toast

```bash
npx shadcn@latest add tabs sonner
```

```bash

```