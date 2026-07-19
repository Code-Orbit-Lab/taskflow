import { motion } from "motion/react"
import { Calendar, MoreVertical, Trash2 } from "lucide-react"
import type { Task, TaskStatus } from "@/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
}

const PRIORITY_DOT: Record<Task["priority"], string> = {
  low: "bg-paper-dim",
  medium: "bg-progress",
  high: "bg-danger",
}

interface TaskCardProps {
  task: Task
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const overdue =
    task.dueDate && task.status !== "done" && new Date(task.dueDate) < new Date()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-xl border border-ink-line bg-ink-raised p-4 hover:border-flow/40 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${PRIORITY_DOT[task.priority]}`} />
          <h3 className="truncate text-sm font-medium text-paper">{task.title}</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="Task actions"
              className="shrink-0 rounded-md p-1 text-paper-dim opacity-0 transition-opacity hover:bg-ink hover:text-paper group-hover:opacity-100 focus-visible:opacity-100"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {(["todo", "in-progress", "done"] as TaskStatus[])
              .filter((s) => s !== task.status)
              .map((s) => (
                <DropdownMenuItem key={s} onClick={() => onStatusChange(task.id, s)}>
                  Move to {STATUS_LABEL[s]}
                </DropdownMenuItem>
              ))}
            <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-danger">
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {task.description && (
        <p className="mt-2 line-clamp-2 text-xs text-paper-dim">{task.description}</p>
      )}

      {task.dueDate && (
        <div
          className={`mt-3 flex items-center gap-1.5 text-xs ${
            overdue ? "text-danger" : "text-paper-dim"
          }`}
        >
          <Calendar className="h-3 w-3" />
          {new Date(task.dueDate).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
          {overdue && <span className="font-medium">· overdue</span>}
        </div>
      )}
    </motion.div>
  )
}
