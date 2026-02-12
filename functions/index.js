const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {logger} = require("firebase-functions");
const {defineSecret} = require("firebase-functions/params");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

// Initialize Firebase Admin
admin.initializeApp();

// Define secrets
const sendgridApiKey = defineSecret("SENDGRID_API_KEY");
const adminEmail = defineSecret("ADMIN_EMAIL");
const fromEmail = defineSecret("FROM_EMAIL");

/**
 * Send email notification when new inquiry is created
 */
exports.sendInquiryNotification = onDocumentCreated(
  {
    document: "inquiries/{inquiryId}",
    secrets: [sendgridApiKey, adminEmail, fromEmail],
  },
  async (event) => {
    const snapshot = event.data;
    
    if (!snapshot) {
      logger.log("No data associated with the event");
      return;
    }
    
    const inquiry = snapshot.data();
    const inquiryId = event.params.inquiryId;
    
    // Set SendGrid API key
    sgMail.setApiKey(sendgridApiKey.value());
    
    try {
      // Calculate lead score
      const leadScore = calculateLeadScore(inquiry);
      
      // Update inquiry with lead score
      await admin.firestore().collection("inquiries").doc(inquiryId).update({
        leadScore: leadScore,
        scoredAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      
      logger.log(`Inquiry ${inquiryId} scored: ${leadScore}`);
      
      // Send email to admin
      await sendAdminNotification(inquiry, inquiryId, leadScore);
      
      // Send confirmation to prospect
      await sendProspectConfirmation(inquiry);
      
      logger.log(`Emails sent successfully for inquiry ${inquiryId}`);
    } catch (error) {
      logger.error("Error processing inquiry:", error);
      throw error;
    }
  }
);

/**
 * Calculate lead score based on inquiry content
 */
function calculateLeadScore(inquiry) {
  let score = 0;
  const message = inquiry.message?.toLowerCase() || "";
  
  // Budget indicators (+30 points)
  if (/\$|budget|cost|price|investment|spending|allocate/i.test(message)) {
    score += 30;
  }
  
  // Urgency indicators (+25 points)
  if (/asap|urgent|immediately|this week|deadline|rush|quickly/i.test(message)) {
    score += 25;
  }
  
  // Company/team size indicators (+20 points)
  if (/company|team|enterprise|organization|we need|our business|startup/i.test(message)) {
    score += 20;
  }
  
  // Project scope indicators (+15 points)
  if (/large|big|multiple|complex|enterprise|scalable|long-term/i.test(message)) {
    score += 15;
  }
  
  // Specific service mentions (+10 points)
  if (/automation|ai|machine learning|integration|bot|workflow/i.test(message)) {
    score += 10;
  }
  
  // Spam/red flags (-10 points)
  if (/free|cheap|lowest price|just looking|testing/i.test(message)) {
    score -= 10;
  }
  
  // Ensure score is between 0-100
  return Math.max(0, Math.min(100, score));
}

/**
 * Send notification email to admin
 */
async function sendAdminNotification(inquiry, inquiryId, leadScore) {
  const priority = leadScore >= 80 ? "🔥 HOT" : leadScore >= 50 ? "🟡 WARM" : "🔵 COLD";
  
  const msg = {
    to: adminEmail.value(),
    from: fromEmail.value(),
    subject: `${priority} Lead: ${inquiry.name} - Score: ${leadScore}/100`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #f97316; margin-top: 0;">🎯 New Lead Alert</h2>
          
          <div style="background: ${getScoreColor(leadScore)}; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-bottom: 20px;">
            <strong>Lead Score: ${leadScore}/100</strong> - ${priority}
          </div>
          
          <div style="margin-bottom: 20px;">
            <p><strong>Name:</strong> ${inquiry.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0 0 0; font-style: italic;">${inquiry.message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://ai.intellirev.space/admin" 
               style="background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View in Dashboard
            </a>
          </div>
        </div>
        
        <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
          IntelliRev AI Solutions - Lead Management System
        </p>
      </div>
    `,
  };
  
  await sgMail.send(msg);
}

/**
 * Send confirmation email to prospect
 */
async function sendProspectConfirmation(inquiry) {
  const msg = {
    to: inquiry.email,
    from: fromEmail.value(),
    subject: "Thank you for your inquiry - IntelliRev AI Solutions",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #f97316; margin: 0;">Thank You, ${inquiry.name}!</h2>
          </div>
          
          <p>We've received your inquiry and our team is reviewing it. We'll get back to you within 24-48 hours.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Your Message:</strong></p>
            <p style="margin: 0; font-style: italic; color: #666;">${inquiry.message}</p>
          </div>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Schedule a call: <a href="https://calendly.com/intellirev">Book a meeting</a></li>
            <li>Visit our website: <a href="https://ai.intellirev.space">ai.intellirev.space</a></li>
          </ul>
          
          <p style="margin-top: 30px;">Best regards,<br>
          <strong>The IntelliRev AI Team</strong></p>
        </div>
        
        <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
          © 2026 IntelliRev AI Solutions. All rights reserved.
        </p>
      </div>
    `,
  };
  
  await sgMail.send(msg);
}

/**
 * Get color based on lead score
 */
function getScoreColor(score) {
  if (score >= 80) return "#dc2626"; // Red for hot
  if (score >= 50) return "#f97316"; // Orange for warm
  return "#6b7280"; // Gray for cold
}

/**
 * Send reply email from admin dashboard
 */
exports.sendReplyEmail = onDocumentCreated(
  {
    document: "inquiries/{inquiryId}/replies/{replyId}",
    secrets: [sendgridApiKey, fromEmail],
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
    
    sgMail.setApiKey(sendgridApiKey.value());
    
    try {
      const msg = {
        to: inquiry.email,
        from: fromEmail.value(),
        subject: `Re: Your inquiry to IntelliRev AI Solutions`,
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
      };
      
      await sgMail.send(msg);
      
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
    secrets: [sendgridApiKey],
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
      let csv = "Name,Email,Message,Status,Lead Score,Created At\n";
      
      inquiriesSnapshot.forEach((doc) => {
        const inquiry = doc.data();
        const createdAt = inquiry.createdAt ? 
          new Date(inquiry.createdAt.toDate()).toISOString() : "";
        
        csv += `"${escapeCsv(inquiry.name || "")}",`;
        csv += `"${escapeCsv(inquiry.email || "")}",`;
        csv += `"${escapeCsv(inquiry.message || "")}",`;
        csv += `"${escapeCsv(inquiry.status || "new")}",`;
        csv += `${inquiry.leadScore || 0},`;
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
