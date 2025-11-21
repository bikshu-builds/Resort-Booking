import Connection from "@/app/utils/config/db";
import { NextResponse } from "next/server";
import {writeFile} from "fs/promises";
import path from "path";
import Products from "@/app/utils/models/Products";

export async function GET(){
    await Connection();
    const record = await Products.find({});
    return NextResponse.json(record);
}
export async function POST(request) {
  await Connection();

  const data = await request.formData();
  const title = data.get("title");
  const description = data.get("description");
  const price = data.get("price");
  const offer = data.get("offer");
  const amen = data.get("amen");
  const image = data.get("image");

  // ❗ FIX 1 — Ensure file exists and is actually a File object
  if (!image || typeof image === "string" || !(image instanceof File)) {
    return NextResponse.json(
      { message: "Invalid or missing image file", success: false },
      { status: 400 }
    );
  }

  // ❗ FIX 2 — Safely convert image to buffer
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Create upload folder if missing
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  // ❗ FIX 3 — Ensure folder exists
  await writeFile(path.join(uploadDir, ".keep"), "");

  const imagePath = path.join(uploadDir, image.name);

  try {
    // Save image to disk
    await writeFile(imagePath, buffer);

    // Save product
    const newproduct = new Products({
      title,
      description,
      price,
      offer,
      amen,
      image: `/uploads/${image.name}`,
    });

    await newproduct.save();

    return NextResponse.json({
      message: "Product added successfully",
      status: 200,
      success: true,
    });
  } catch (err) {
    console.log("Error adding product:", err);
    return NextResponse.json(
      {
        message: "Error adding product",
        status: 500,
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}
