import { fail, type JsonObject, type ParseContext } from "./primitives.ts"
import {
  arrayValue,
  ensureUniqueIds,
  objectValue,
  optionalInteger,
  optionalString,
  parseId,
  parseImage,
  parseUrl,
  requiredString,
  strictKeys,
} from "./primitives.ts"
import type { Member, MemberGroup, MemberRole, MemberStatus } from "./types.ts"

const MEMBER_KEYS = [
  "id", "name", "nativeName", "nickname", "status", "role", "group",
  "graduationYear", "affiliation", "image", "website", "scholarUrl",
] as const

const parseStatus = (object: JsonObject, context: ParseContext): MemberStatus => {
  const value = requiredString(object, "status", context)
  if (value === "advisor" || value === "current" || value === "alumni") return value
  return fail(context, "status", "is not a recognized member status")
}

const parseRole = (object: JsonObject, context: ParseContext): MemberRole => {
  const value = requiredString(object, "role", context)
  switch (value) {
    case "advisor":
    case "visiting-researcher":
    case "phd-student":
    case "masters-student":
    case "undergraduate-student":
    case "alumnus":
      return value
    default:
      return fail(context, "role", "is not a recognized member role")
  }
}

const parseGroup = (object: JsonObject, context: ParseContext): MemberGroup => {
  const value = requiredString(object, "group", context)
  switch (value) {
    case "advisor":
    case "visiting-researchers":
    case "phd-students":
    case "masters-students":
    case "undergraduate-students":
    case "phd-graduates":
    case "alumni":
      return value
    default:
      return fail(context, "group", "is not a recognized member group")
  }
}

const validateMembership = (
  member: Pick<Member, "status" | "role" | "graduationYear">,
  context: ParseContext,
): void => {
  if (member.status === "advisor" && member.role !== "advisor") {
    fail(context, "role", "advisor status requires advisor role")
  }
  if (member.status === "alumni" && member.role !== "alumnus") {
    fail(context, "role", "alumni status requires alumnus role")
  }
  if (member.status === "alumni" && member.graduationYear === undefined) {
    fail(context, "graduationYear", "is required for alumni")
  }
  if (member.status !== "alumni" && member.graduationYear !== undefined) {
    fail(context, "graduationYear", "is only valid for alumni")
  }
}

export const parseMembers = (input: unknown, source: string): readonly Member[] => {
  const records = arrayValue(input, { source }).map((value, record) => {
    const context = { source, record }
    const object = objectValue(value, context)
    strictKeys(object, MEMBER_KEYS, context)
    const nativeName = optionalString(object, "nativeName", context)
    const nickname = optionalString(object, "nickname", context)
    const graduationYear = optionalInteger(object, "graduationYear", context)
    const affiliation = optionalString(object, "affiliation", context)
    const image = "image" in object ? parseImage(object.image, context) : undefined
    const website = parseUrl(object, "website", context)
    const scholarUrl = parseUrl(object, "scholarUrl", context)
    const member: Member = {
      id: parseId(object, context),
      name: requiredString(object, "name", context),
      status: parseStatus(object, context),
      role: parseRole(object, context),
      group: parseGroup(object, context),
      ...(nativeName === undefined ? {} : { nativeName }),
      ...(nickname === undefined ? {} : { nickname }),
      ...(graduationYear === undefined ? {} : { graduationYear }),
      ...(affiliation === undefined ? {} : { affiliation }),
      ...(image === undefined ? {} : { image }),
      ...(website === undefined ? {} : { website }),
      ...(scholarUrl === undefined ? {} : { scholarUrl }),
    }
    validateMembership(member, context)
    return member
  })
  const statusOrder: Readonly<Record<MemberStatus, number>> = { advisor: 0, current: 1, alumni: 2 }
  return ensureUniqueIds(records, source).toSorted((left, right) =>
    statusOrder[left.status] - statusOrder[right.status] ||
    (right.graduationYear ?? 0) - (left.graduationYear ?? 0) ||
    left.name.localeCompare(right.name),
  )
}
