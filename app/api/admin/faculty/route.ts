import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { getSessionFromCookie, logAudit, requireMinRole } from "@/lib/admin/auth";
import { getFaculty, saveFaculty } from "@/lib/admin/db";
import type { FacultyMember } from "@/lib/admin/types";
import { hasPermission } from "@/lib/admin/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "faculty")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const faculty = getFaculty();
  return NextResponse.json({ faculty });
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "faculty")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  let body: Partial<FacultyMember>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().substring(0, 200);
  const designation = String(body.designation ?? "").trim().substring(0, 200);
  const qualification = String(body.qualification ?? "").trim().substring(0, 500);
  const department = String(body.department ?? "").trim().substring(0, 200);
  const experience = String(body.experience ?? "").trim().substring(0, 200);
  const photoUrl = String(body.photoUrl ?? "").trim().substring(0, 500);

  if (!name || name.length < 2) {
    return NextResponse.json({ message: "Faculty name is required (min 2 characters)." }, { status: 400 });
  }
  if (!department) {
    return NextResponse.json({ message: "Department is required." }, { status: 400 });
  }

  const faculty = getFaculty();
  const newMember: FacultyMember = {
    id: uuidv4(),
    name,
    designation,
    qualification,
    department,
    experience,
    photoUrl,
    order: faculty.length,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  faculty.push(newMember);
  saveFaculty(faculty);

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  logAudit(session.userId, session.username, "faculty_add", `Added faculty: ${name} (${department})`, ip);

  return NextResponse.json({ message: "Faculty member added.", faculty: newMember }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "faculty")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  let body: Partial<FacultyMember> & { id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ message: "Faculty ID is required." }, { status: 400 });
  }

  const faculty = getFaculty();
  const idx = faculty.findIndex((f) => f.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ message: "Faculty member not found." }, { status: 404 });
  }

  const updated: FacultyMember = {
    ...faculty[idx],
    name: body.name !== undefined ? String(body.name).trim().substring(0, 200) : faculty[idx].name,
    designation: body.designation !== undefined ? String(body.designation).trim().substring(0, 200) : faculty[idx].designation,
    qualification: body.qualification !== undefined ? String(body.qualification).trim().substring(0, 500) : faculty[idx].qualification,
    department: body.department !== undefined ? String(body.department).trim().substring(0, 200) : faculty[idx].department,
    experience: body.experience !== undefined ? String(body.experience).trim().substring(0, 200) : faculty[idx].experience,
    photoUrl: body.photoUrl !== undefined ? String(body.photoUrl).trim().substring(0, 500) : faculty[idx].photoUrl,
    order: body.order !== undefined ? Number(body.order) : faculty[idx].order,
    updatedAt: new Date().toISOString(),
  };

  faculty[idx] = updated;
  saveFaculty(faculty);

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  logAudit(session.userId, session.username, "faculty_edit", `Edited faculty: ${updated.name}`, ip);

  return NextResponse.json({ message: "Faculty member updated.", faculty: updated });
}

export async function DELETE(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !requireMinRole(session, "administrator")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "Faculty ID is required." }, { status: 400 });
  }

  const faculty = getFaculty();
  const idx = faculty.findIndex((f) => f.id === id);
  if (idx === -1) {
    return NextResponse.json({ message: "Faculty member not found." }, { status: 404 });
  }

  const removed = faculty.splice(idx, 1)[0];
  saveFaculty(faculty);

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  logAudit(session.userId, session.username, "faculty_delete", `Deleted faculty: ${removed.name}`, ip);

  return NextResponse.json({ message: "Faculty member removed." });
}
