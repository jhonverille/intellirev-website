# Firebase Cloud Functions Setup

This directory contains Firebase Cloud Functions for the IntelliRev AI Solutions website.

## Features

1. **Email Notifications** - Sends instant email notifications when new inquiries arrive
2. **Auto-Confirmation** - Sends confirmation emails to prospects
3. **Lead Scoring** - Automatically scores each inquiry (0-100) based on content
4. **Reply System** - Sends email replies from the admin dashboard
5. **CSV Export** - HTTP endpoint to export inquiries as CSV

## Setup Instructions

### 1. Install Dependencies

```bash
cd functions
npm install
```

### 2. Set Up Resend Account

1. Go to [Resend](https://resend.com) and create a free account
2. Verify your domain (recommended: `intellirev.ai`) OR verify a single sender email
3. Create an API Key
4. Copy your API key (starts with `re_`)

**Why Resend?**
- ✅ 3,000 free emails/month (vs SendGrid's 3,000 but simpler)
- ✅ No IP warming required (emails work immediately)
- ✅ Modern, clean API
- ✅ Better deliverability for new domains

### 3. Set Firebase Secrets

Run these commands in your project root:

```bash
# Set Resend API Key
firebase functions:secrets:set RESEND_API_KEY

# Set your admin email (where notifications will be sent)
firebase functions:secrets:set ADMIN_EMAIL

# Set the "from" email address (must be verified in Resend)
firebase functions:secrets:set FROM_EMAIL
```

When prompted, enter:
- `RESEND_API_KEY`: Your Resend API key (re_xxx...)
- `ADMIN_EMAIL`: Your email address to receive notifications (e.g., you@gmail.com)
- `FROM_EMAIL`: The email address that will send emails (must be verified in Resend)
  - Recommended: `noreply@intellirev.ai` or `hello@intellirev.ai`

### 4. Deploy Functions

```bash
firebase deploy --only functions
```

### 5. Verify Deployment

Check the Firebase Console to see your deployed functions:
https://console.firebase.google.com/project/antigravity-portfolio-999/functions

## Lead Scoring Algorithm

Each inquiry is automatically scored (0-100) based on:

- **+30 points**: Budget indicators ("budget", "$", "cost", "price", "investment")
- **+25 points**: Urgency ("ASAP", "urgent", "immediately", "this week")
- **+20 points**: Company/team mentions ("company", "team", "enterprise", "organization")
- **+15 points**: Project scope ("large", "big", "multiple", "complex", "enterprise")
- **+10 points**: Service mentions ("automation", "AI", "machine learning", "integration")
- **-10 points**: Red flags ("free", "cheap", "lowest price", "just looking")

**Score Categories:**
- 🔥 **Hot (80-100)**: High-priority leads
- 🟡 **Warm (50-79)**: Medium-priority leads  
- 🔵 **Cold (<50)**: Low-priority leads

## Email Templates

### Admin Notification Email
- Subject includes lead score and priority
- Contains all inquiry details
- Link to view in dashboard
- Professional HTML styling

### Prospect Confirmation Email
- Thank you message
- Timeline expectations (24-48 hours)
- Links to schedule call and website
- Professional branding

### Reply Email
- Professional formatting
- Includes your reply message
- Contact information

## Testing

To test the functions locally:

```bash
# Start the Firebase emulator
firebase emulators:start --only functions

# Or test with shell
firebase functions:shell
```

## Monitoring

View function logs:
```bash
firebase functions:log
```

Or check the Firebase Console Functions dashboard.

## Troubleshooting

**Emails not sending:**
- Verify Resend API key is correct
- Check that sender email is verified in Resend
- Review function logs for errors
- Ensure secrets are set correctly

**"Domain not verified" error:**
- You need to verify your domain in Resend
- Or use single sender verification for testing

**Function deployment fails:**
- Ensure you're in the project directory
- Check that `firebase.json` has functions configuration
- Verify you have proper Firebase CLI permissions

**Lead scoring not working:**
- Check that `leadScore` and `scoredAt` fields are being added to inquiries
- Review function logs for calculation errors

## Security

- API keys are stored as Firebase Secrets (encrypted)
- Functions only trigger on authenticated requests where required
- CSV export requires authentication
- Reply emails are logged in Firestore for audit trail

## Cost

With ~20 inquiries/day:
- **Firebase Functions**: Free (within 2M invocations/month limit)
- **Resend**: Free (3,000 emails/month limit)
- **Total**: $0/month

## Migration from SendGrid

If you were previously using SendGrid:
1. Update `package.json`: Replace `@sendgrid/mail` with `resend`
2. Update secrets: Change `SENDGRID_API_KEY` to `RESEND_API_KEY`
3. Redeploy functions
4. No other changes needed!

## Support

For issues or questions:
1. Check Firebase Functions logs
2. Review Resend dashboard for email activity
3. Test with Firebase Emulator Suite
4. Check Firestore security rules

**Resend Documentation:** https://resend.com/docs
