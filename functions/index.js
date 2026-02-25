const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { logger } = require("firebase-functions");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const { Resend } = require("resend");

// Initialize Firebase Admin
admin.initializeApp();

// Define secrets
const resendApiKey = defineSecret("RESEND_API_KEY");
const adminEmail = defineSecret("ADMIN_EMAIL");
const fromEmail = defineSecret("FROM_EMAIL");

/**
 * Send email notification when new inquiry is created
 */
exports.sendInquiryNotification = onDocumentCreated(
  {
    document: "inquiries/{inquiryId}",
    secrets: [resendApiKey, adminEmail, fromEmail],
  },
  async (event) => {
    const snapshot = event.data;

    if (!snapshot) {
      logger.log("No data associated with the event");
      return;
    }

    const inquiry = snapshot.data();
    const inquiryId = event.params.inquiryId;

    // Initialize Resend
    const resend = new Resend(resendApiKey.value());

    try {
      // Send email to admin
      await sendAdminNotification(resend, inquiry, inquiryId);

      // Send confirmation to prospect
      await sendProspectConfirmation(resend, inquiry);

      logger.log(`Emails sent successfully for inquiry ${inquiryId}`);
    } catch (error) {
      logger.error("Error processing inquiry:", error);
      throw error;
    }
  }
);


/**
 * Send notification email to admin
 */
async function sendAdminNotification(resend, inquiry, inquiryId) {
  try {
    const data = await resend.emails.send({
      from: fromEmail.value(),
      to: adminEmail.value(),
      subject: `New Opportunity: ${inquiry.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
              body { margin: 0; padding: 0; font-family: 'Outfit', sans-serif; background-color: #0d0d0d; color: #ffffff; }
              .container { max-width: 600px; margin: 20px auto; background: #262626; border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); }
              .header { padding: 40px; background: #1a1a1a; text-align: left; }
              .content { padding: 40px; }
              .label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #fb923c; margin-bottom: 8px; display: block; }
              .value { font-size: 16px; color: #ffffff; margin-bottom: 24px; line-height: 1.6; }
              .message-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; margin: 24px 0; }
              .button { display: inline-block; padding: 16px 32px; background: #ffffff; color: #000000; text-decoration: none; border-radius: 100px; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; transition: all 0.3s ease; }
              .footer { padding: 40px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); font-size: 12px; color: #a3a3a3; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <img src="https://ai.intellirev.space/brand_full.webp" alt="IntelliRev Logo" style="height: 48px; border-radius: 8px;">
              </div>
              <div class="content">
                <span class="label">Incoming Lead</span>
                <h2 style="margin: 0 0 10px 0; font-size: 32px; font-weight: 900; letter-spacing: -1px; color: #ffffff;">New Opportunity</h2>
                <div style="font-size: 12px; color: #a3a3a3; margin-bottom: 40px; text-transform: uppercase; letter-spacing: 1px;">
                  Captured on ${new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Asia/Manila' }).format(new Date())}
                </div>
                
                <span class="label">Full Name</span>
                <div class="value">${inquiry.name}</div>
                
                <span class="label">Email Address</span>
                <div class="value">${inquiry.email}</div>
                
                <div class="message-box">
                  <span class="label">Inquiry Message</span>
                  <div class="value" style="margin-bottom: 0; font-style: italic;">"${inquiry.message}"</div>
                </div>
                
                <div style="text-align: center; margin-top: 40px;">
                  <a href="https://ai.intellirev.space/admin" class="button">Access Command Center</a>
                </div>
              </div>
              <div class="footer">
                INTELLIREV AI SOLUTIONS — AUTOMATED LEAD MANAGEMENT
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (data.error) {
      throw new Error(data.error.message);
    }

    logger.log(`Admin notification sent successfully`);
  } catch (error) {
    logger.error("Error sending admin notification:", error);
    throw error;
  }
}

/**
 * Send confirmation email to prospect
 */
async function sendProspectConfirmation(resend, inquiry) {
  try {
    const data = await resend.emails.send({
      from: fromEmail.value(),
      to: inquiry.email,
      subject: "Inquiry Received — IntelliRev AI Solutions",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
              body { margin: 0; padding: 0; font-family: 'Outfit', sans-serif; background-color: #0d0d0d; color: #ffffff; }
              .container { max-width: 600px; margin: 20px auto; background: #262626; border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); }
              .header { padding: 40px; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: left; }
              .content { padding: 40px; }
              .label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #fb923c; margin-bottom: 8px; display: block; }
              .headline { font-size: 32px; font-weight: 900; letter-spacing: -1px; margin-bottom: 24px; color: #ffffff; }
              .text { font-size: 16px; color: #d4d4d4; line-height: 1.6; margin-bottom: 32px; }
              .action-card { background: rgba(249, 115, 22, 0.05); border-left: 4px solid #f97316; border-radius: 4px 16px 16px 4px; padding: 24px; margin-bottom: 32px; }
              .button { display: inline-block; padding: 16px 32px; background: #f97316; color: #ffffff; text-decoration: none; border-radius: 100px; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; transition: all 0.3s ease; }
              .footer { padding: 40px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); font-size: 12px; color: #525252; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                 <img src="https://ai.intellirev.space/brand_full.webp" alt="IntelliRev Logo" style="height: 48px; border-radius: 8px;">
              </div>
              <div class="content">
                <span class="label">Confirmed</span>
                <div class="headline">We're on it, ${inquiry.name}.</div>
                <div class="text">
                  Your inquiry regarding AI solutions has been successfully captured. Our specialists are currently reviewing your request and will reach out with a technical strategy within 24-48 hours.
                </div>
                
                <div class="action-card">
                  <span class="label" style="color: #ffffff;">Quick Action</span>
                  <div class="text" style="color: #ffffff; margin-bottom: 16px; font-size: 14px;">Want to move faster? Use the link below to sync directly with our lead automation engineer.</div>
                  <a href="https://calendly.com/intellirev-space" class="button">Sync Calendars</a>
                </div>

                <div class="text" style="font-size: 14px;">
                  Stay ahead,<br>
                  <strong style="color: #ffffff;">IntelliRev AI Team</strong>
                </div>
              </div>
              <div class="footer">
                © 2026 INTELLIREV AI SOLUTIONS — THE FUTURE OF AUTOMATION
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (data.error) {
      throw new Error(data.error.message);
    }

    logger.log(`Prospect confirmation sent successfully`);
  } catch (error) {
    logger.error("Error sending prospect confirmation:", error);
    throw error;
  }
}


/**
 * Send reply email from admin dashboard
 */
exports.sendReplyEmail = onDocumentCreated(
  {
    document: "inquiries/{inquiryId}/replies/{replyId}",
    secrets: [resendApiKey, fromEmail],
  },
  async (event) => {
    const snapshot = event.data;

    if (!snapshot) {
      logger.log("No data associated with the event");
      return;
    }

    const reply = snapshot.data();
    const inquiryId = event.params.inquiryId;

    // Get inquiry details
    const inquiryDoc = await admin.firestore().collection("inquiries").doc(inquiryId).get();
    const inquiry = inquiryDoc.data();

    if (!inquiry) {
      logger.error("Inquiry not found:", inquiryId);
      return;
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey.value());

    try {
      const data = await resend.emails.send({
        from: fromEmail.value(),
        to: inquiry.email,
        subject: "Re: Your inquiry to IntelliRev AI Solutions",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: white; padding: 30px; border-radius: 8px;">
              <p>Hi ${inquiry.name},</p>
              
              <div style="margin: 20px 0; padding: 20px; background: #f9f9f9; border-left: 4px solid #f97316;">
                ${reply.message}
              </div>
              
              <p>Best regards,<br>
              <strong>IntelliRev AI Solutions Team</strong></p>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
              
              <p style="font-size: 12px; color: #999;">
                This is an automated response. Please do not reply to this email.
                <br>
                If you have further questions, please submit a new inquiry on our website.
              </p>
            </div>
          </div>
        `,
      });

      if (data.error) {
        throw new Error(data.error.message);
      }

      // Update reply to mark as sent
      await admin.firestore()
        .collection("inquiries")
        .doc(inquiryId)
        .collection("replies")
        .doc(event.params.replyId)
        .update({
          emailSent: true,
          sentAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      logger.log(`Reply email sent for inquiry ${inquiryId}`);
    } catch (error) {
      logger.error("Error sending reply email:", error);
      throw error;
    }
  }
);

/**
 * Export inquiries to CSV (HTTP function)
 */
exports.exportInquiriesToCSV = require("firebase-functions/v2/https").onRequest(
  {
    secrets: [resendApiKey],
    cors: true,
  },
  async (req, res) => {
    // Check for authentication token (you'll need to implement this)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).send("Unauthorized");
      return;
    }

    try {
      // Get inquiries from Firestore
      const inquiriesSnapshot = await admin.firestore()
        .collection("inquiries")
        .orderBy("createdAt", "desc")
        .get();

      // Convert to CSV
      let csv = "Name,Email,Message,Status,Created At\n";

      inquiriesSnapshot.forEach((doc) => {
        const inquiry = doc.data();
        const createdAt = inquiry.createdAt ?
          new Date(inquiry.createdAt.toDate()).toISOString() : "";

        csv += `"${escapeCsv(inquiry.name || "")}",`;
        csv += `"${escapeCsv(inquiry.email || "")}",`;
        csv += `"${escapeCsv(inquiry.message || "")}",`;
        csv += `"${escapeCsv(inquiry.status || "new")}",`;
        csv += `"${createdAt}"\n`;
      });

      // Set headers for CSV download
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=inquiries.csv");
      res.status(200).send(csv);

      logger.log("CSV export completed successfully");
    } catch (error) {
      logger.error("Error exporting inquiries:", error);
      res.status(500).send("Error exporting inquiries");
    }
  }
);

/**
 * Escape CSV values
 */
function escapeCsv(value) {
  if (value === null || value === undefined) return "";
  const str = String(value);
  // Escape quotes and wrap in quotes if contains comma or newline
  if (str.includes(",") || str.includes("\n") || str.includes('"')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}
