import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("=== ORDER API REQUEST START ===");
  
  try {
    // Parse and log incoming request body
    const body = await req.json().catch((parseError) => {
      console.error("JSON_PARSE_ERROR:", parseError);
      throw new Error("Invalid JSON in request body");
    });
    
    console.log("Request body received:", {
      customer: body?.customer ? {
        fullName: body.customer.fullName,
        email: body.customer.email,
        phone: body.customer.phone
      } : null,
      itemsCount: body?.items?.length || 0,
      pricing: body?.pricing
    });

    const items = Array.isArray(body.items) ? body.items : [];
    const subtotal = Number(body?.pricing?.subtotal ?? 0);
    const total = Number(body?.pricing?.total ?? subtotal);

    console.log("Processed order data:", {
      itemsCount: items.length,
      subtotal,
      total,
      items: items.map((item: any) => ({
        id: item?.id,
        name: item?.name,
        quantity: item?.quantity,
        price: item?.price
      }))
    });

    // Format order details for WhatsApp
    const orderNumber = `SF-${Date.now()}`;
    
    const whatsappMessage = `🍽️ *NEW ORDER - ${orderNumber}*

👤 *Customer Details:*
Name: ${body?.customer?.fullName || 'N/A'}
Phone: ${body?.customer?.phone || 'N/A'}
Email: ${body?.customer?.email || 'N/A'}

📍 *Delivery Address:*
${body?.customer?.address ? 
  `${body.customer.address.line1}${body.customer.address.line2 ? ', ' + body.customer.address.line2 : ''}
${body.customer.address.landmark ? 'Landmark: ' + body.customer.address.landmark + '\n' : ''}${body.customer.address.city} - ${body.customer.address.pincode}` 
  : 'N/A'}

🛒 *Order Items:*
${items.map((item: any, index: number) => 
  `${index + 1}. ${item?.name || 'Item'} (${item?.veg ? 'Veg' : 'Non-Veg'})
   Qty: ${item?.quantity || 1} × ₹${item?.price || 0} = ₹${(item?.quantity || 1) * (item?.price || 0)}`
).join('\n')}

💰 *Pricing:*
Subtotal: ₹${subtotal}
${body?.pricing?.deliveryCharge ? `Delivery Charge: ₹${body.pricing.deliveryCharge}` : ''}
Total: ₹${total}

💳 *Payment Method:* ${body?.paymentMethod || 'Cash on Delivery'}

${body?.customer?.deliveryNotes ? `📝 *Delivery Notes:* ${body.customer.deliveryNotes}` : ''}

---
Order placed at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

    console.log("Formatted WhatsApp message:", whatsappMessage);

    // For now, we'll just log the message and return success
    // In production, you would integrate with WhatsApp Business API here
    console.log("WhatsApp message ready to send to: 917709811319");
    
    console.log("=== ORDER API REQUEST SUCCESS ===");
    return NextResponse.json({ 
      success: true, 
      orderId: orderNumber,
      whatsappMessage: whatsappMessage,
      whatsappNumber: "917709811319"
    }, { status: 201 });
    
  } catch (error) {
    console.error("=== ORDER API REQUEST ERROR ===");
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      error: error
    });

    return NextResponse.json(
      { 
        error: "Failed to process order", 
        message: error instanceof Error ? error.message : "Unknown error occurred"
      }, 
      { status: 500 }
    );
  }
}