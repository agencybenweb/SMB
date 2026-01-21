
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
    req: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = params;

    try {
        const document = await prisma.userDocument.findUnique({
            where: { id },
            include: { user: true }
        });

        if (!document) {
            return new NextResponse("Document not found", { status: 404 });
        }

        // Security check: Admin can see all, Clients only their own
        if (session.user.role !== "ADMIN" && document.userId !== session.user.id) {
            // Double check access level
            if (document.accessLevel !== "PUBLIC") {
                return new NextResponse("Forbidden", { status: 403 });
            }
        }

        // Case 1: External URL (legacy or stored elsewhere)
        if (document.fileUrl && !document.fileUrl.startsWith("/")) {
            return NextResponse.redirect(document.fileUrl);
        }

        // Case 2: Stored as Base64 in DB (New method)
        if (document.fileData) {
            const buffer = Buffer.from(document.fileData, 'base64');

            return new NextResponse(buffer, {
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `inline; filename="${document.fileName || 'document.pdf'}"`,
                    'Content-Length': buffer.length.toString(),
                },
            });
        }

        // Case 3: Stored locally in /public/uploads (Old local method)
        // We cannot serve local files easily via API Route in Vercel logic if they are not in static/public, 
        // but here we are just trying to fix the Base64 view.
        return new NextResponse("Document content unavailable", { status: 404 });

    } catch (error) {
        console.error("Error serving document:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
