import { Entity, EntityParams } from "./Entity"

// Right level for shares
enum UserEntityShareLevel {
  READ = "r", // Invited friends can only read
  WRITE = "w", // Invited friends can read and write
}

// Sharing with friends
interface UserEntityShare {
  id: string // Id of the user concerned
  level?: UserEntityShareLevel // Right level
}

interface DateTime {
  date?: string
  time?: string
}

interface ChoiceOfWeekDays {
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
  sunday: boolean
}

/**
 * Reccurrence for the same element
 * => Examples :
 *      - Exact date and time : { end { date, time } }
 *      - Specific period : { start { date, time }, end { date, time } }
 *      - Every monday at an hour : { end: { time }, days: { monday: true } }
 */
interface UserEntityRepetition {
  end: DateTime // End date and time
  start?: DateTime // Starting date and time
  days?: ChoiceOfWeekDays // Involved days, if empty every day will be included
}

enum UserEntityObjectiveType {
  SECONDS = "s",
  MINUTES = "i",
  HOURS = "h",
  DAYS = "d",
  WEEKS = "w",
  MONTHS = "m",
  YEARS = "y",
}

/**
 * Time goal for an element
 * => Examples :
 *      - Every day for 4 hours
 */
interface UserEntityObjective {
  type: UserEntityObjectiveType // Time type for the objective
  duration: number // Duration for the given type
  days?: ChoiceOfWeekDays // Involved days, if empty every day will be included
}

interface UserEntityParams<Data> extends EntityParams<Data> {
  owner: string
  shares?: UserEntityShare[]
  repetition?: UserEntityRepetition
}

class UserEntity<Data> extends Entity<Data> implements UserEntityParams<Data> {
  owner: string

  constructor(params: UserEntityParams<Data>, empty: Data) {
    super(params, empty)
    this.owner = params.owner
  }

}
