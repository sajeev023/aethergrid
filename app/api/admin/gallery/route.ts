import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { getSessionFromCookie, logAudit, requireMinRole } from "@/lib/admin/auth";
import { getGalleryItems, saveGalleryItems, getGalleryAlbums, saveGalleryAlbums } from "@/lib/admin/db";
import type { GalleryItem, GalleryAlbum } from "@/lib/admin/types";
import { hasPermission } from "@/lib/admin/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "gallery")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const items = getGalleryItems();
  const albums = getGalleryAlbums();
  return NextResponse.json({ items, albums });
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "gallery")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  let body: { action?: string } & Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  // Handle album creation
  if (body.action === "create_album") {
    const name = String(body.name ?? "").trim().substring(0, 200);
    const description = String(body.description ?? "").trim().substring(0, 500);
    if (!name) {
      return NextResponse.json({ message: "Album name is required." }, { status: 400 });
    }
    const albums = getGalleryAlbums();
    const newAlbum: GalleryAlbum = {
      id: uuidv4(),
      name,
      description,
      createdAt: new Date().toISOString(),
    };
    albums.push(newAlbum);
    saveGalleryAlbums(albums);
    logAudit(session.userId, session.username, "gallery_album_create", `Created album: ${name}`, ip);
    return NextResponse.json({ message: "Album created.", album: newAlbum }, { status: 201 });
  }

  // Handle image item creation
  const title = String(body.title ?? "").trim().substring(0, 200);
  const caption = String(body.caption ?? "").trim().substring(0, 500);
  const category = String(body.category ?? "campus").trim().substring(0, 100);
  const album = String(body.album ?? "").trim().substring(0, 200);
  const src = String(body.src ?? "").trim().substring(0, 500);

  if (!title) {
    return NextResponse.json({ message: "Image title is required." }, { status: 400 });
  }
  if (!src) {
    return NextResponse.json({ message: "Image source URL is required." }, { status: 400 });
  }

  const items = getGalleryItems();
  const newItem: GalleryItem = {
    id: uuidv4(),
    title,
    caption,
    category,
    album,
    src,
    order: items.length,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  items.push(newItem);
  saveGalleryItems(items);
  logAudit(session.userId, session.username, "gallery_add", `Added image: ${title}`, ip);

  return NextResponse.json({ message: "Gallery item added.", item: newItem }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "gallery")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  let body: Partial<GalleryItem> & { id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ message: "Gallery item ID is required." }, { status: 400 });
  }

  const items = getGalleryItems();
  const idx = items.findIndex((i) => i.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ message: "Gallery item not found." }, { status: 404 });
  }

  items[idx] = {
    ...items[idx],
    title: body.title !== undefined ? String(body.title).trim().substring(0, 200) : items[idx].title,
    caption: body.caption !== undefined ? String(body.caption).trim().substring(0, 500) : items[idx].caption,
    category: body.category !== undefined ? String(body.category).trim().substring(0, 100) : items[idx].category,
    album: body.album !== undefined ? String(body.album).trim().substring(0, 200) : items[idx].album,
    updatedAt: new Date().toISOString(),
  };

  saveGalleryItems(items);

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  logAudit(session.userId, session.username, "gallery_edit", `Edited image: ${items[idx].title}`, ip);

  return NextResponse.json({ message: "Gallery item updated.", item: items[idx] });
}

export async function DELETE(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !requireMinRole(session, "administrator")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "Gallery item ID is required." }, { status: 400 });
  }

  const items = getGalleryItems();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) {
    return NextResponse.json({ message: "Gallery item not found." }, { status: 404 });
  }

  const removed = items.splice(idx, 1)[0];
  saveGalleryItems(items);

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  logAudit(session.userId, session.username, "gallery_delete", `Deleted image: ${removed.title}`, ip);

  return NextResponse.json({ message: "Gallery item removed." });
}
