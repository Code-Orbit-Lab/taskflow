import type { Task, TaskStatus, User } from "@/types"

export function registerUser(details: {
  name: string
  email: string
  password: string
}): Promise<{ token: string; user: User }>

export function loginUser(credentials: {
  email: string
  password: string
}): Promise<{ token: string; user: User }>

export function getCurrentUser(token: string | null): Promise<User>

export function getTasks(token: string | null): Promise<Task[]>

export function createTask(
  token: string | null,
  task: Partial<Task>
): Promise<Task>

export function getTask(token: string | null, id: string): Promise<Task>

export function updateTask(
  token: string | null,
  id: string,
  updates: Partial<Task>
): Promise<Task | undefined>

export function deleteTask(token: string | null, id: string): Promise<null>

export function updateTaskStatus(
  token: string | null,
  id: string,
  status: TaskStatus
): Promise<Task | undefined>
