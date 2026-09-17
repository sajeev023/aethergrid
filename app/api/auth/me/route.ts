import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { findUserById, getTakerSubscription, getStorageNodesByOwner } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await getCurrentUser(request);
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = findUserById(session.userId);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const subscription = getTakerSubscription(session.userId);
  const nodes = getStorageNodesByOwner(session.userId);

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
      activeRole: session.activeRole,
    },
    subscription,
    nodesCount: nodes.length,
  });
}
