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

### 2. Set Up SendGrid Account

1. Go to [SendGrid](https://sendgrid.com/) and create a free account
2. Verify your sender email/domain
3. Create an API Key with "Full Access" or "Mail Send" permissions
4. Copy your API key (starts with `SG.`)

### 3. Set Firebase Secrets

Run these commands in your project root:

```bash
# Set SendGrid API Key
firebase functions:secrets:set SENDGRID_API_KEY

# Set your admin email (where notifications will be sent)
firebase functions:secrets:set ADMIN_EMAIL

# Set the "from" email address (must be verified in SendGrid)
firebase functions:secrets:set FROM_EMAIL
```

When prompted, enter:
- `SENDGRID_API_KEY`: Your SendGrid API key (SG.xxx...)
- `ADMIN_EMAIL`: Your email address to receive notifications
- `FROM_EMAIL`: The email address that will send emails (e.g., noreply@intellirev.ai)

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
- Verify SendGrid API key is correct
- Check that sender email is verified in SendGrid
- Review function logs for errors

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
- **SendGrid**: Free (100 emails/day limit)
- **Total**: $0/month

## Support

For issues or questions:
1. Check Firebase Functions logs
2. Review SendGrid email activity
3. Test with Firebase Emulator Suite
4. Check Firestore security rules
