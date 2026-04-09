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