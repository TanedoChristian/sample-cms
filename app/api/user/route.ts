import { promises } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const dataFilePath = path.join(process.cwd(), "app/data/user.json");

export async function GET(request: NextRequest) {
  try {
    const data = await promises.readFile(dataFilePath, "utf-8");
    const jsonData = JSON.parse(data);

    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Error reading data:", error);
    return NextResponse.error();
  }
}
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const existingData = await promises.readFile(dataFilePath, "utf-8");
    const users = JSON.parse(existingData);

    const newUser = await request.json();

    newUser.id = Date.now().toString();

    users.push(newUser);

    await promises.writeFile(
      dataFilePath,
      JSON.stringify(users, null, 2),
      "utf-8"
    );

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.error();
  }
}

export async function PUT(request: NextRequest, response: NextResponse) {}
export async function DELETE(request: NextRequest, response: NextResponse) {}
