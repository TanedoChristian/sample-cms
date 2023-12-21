import IUser from "@/app/interfaces/IUser";
import { promises } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const dataFilePath = path.join(process.cwd(), "app/data/user.json");

export async function GET(request: NextRequest, { params }: any) {
  console.log(params);
  const id = params.id;

  try {
    const data = await promises.readFile(dataFilePath, "utf-8");
    const jsonData: IUser[] = JSON.parse(data);

    const user = jsonData.filter((user) => user.id == id);

    if (user.length == 0) {
      return NextResponse.json({ Error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error reading data:", error);
    return NextResponse.error();
  }
}

export async function PUT(request: NextRequest, { params }: any) {
  try {
    const existingData = await promises.readFile(dataFilePath, "utf-8");
    const users = JSON.parse(existingData);

    const updatedUser = await request.json();
    const userId = params.id;

    const userIndex = users.findIndex((u: IUser) => u.id == userId);

    console.log(`User index ${userIndex}`);

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUser };

      await promises.writeFile(
        dataFilePath,
        JSON.stringify(users, null, 2),
        "utf-8"
      );

      return NextResponse.json(users);
    } else {
      return NextResponse.json({}, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const existingData = await promises.readFile(dataFilePath, "utf-8");
    const users = JSON.parse(existingData);

    const userId = params.id;

    const userIndex = users.findIndex((u: IUser) => u.id == userId);

    if (userIndex !== -1) {
      const deletedUser = users.splice(userIndex, 1)[0];

      await promises.writeFile(
        dataFilePath,
        JSON.stringify(users, null, 2),
        "utf-8"
      );

      return NextResponse.json(deletedUser);
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.error();
  }
}
