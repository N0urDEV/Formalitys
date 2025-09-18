# Email Configuration Setup

## Environment Variables

Add these variables to your `.env` file in the backend directory:

```env
# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="Formalitys <noreply@formalitys.ma>"

# Frontend URL (for reset links)
FRONTEND_URL="http://localhost:3000"
```

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password as `SMTP_PASS`

3. **Configure your .env**:
   ```env
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_SECURE="false"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-16-character-app-password"
   SMTP_FROM="Formalitys <your-email@gmail.com>"
   ```

## Other Email Providers

### Outlook/Hotmail
```env
SMTP_HOST="smtp-mail.outlook.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@outlook.com"
SMTP_PASS="your-password"
```

### SendGrid
```env
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
```

### Custom SMTP
```env
SMTP_HOST="your-smtp-server.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-username"
SMTP_PASS="your-password"
```

## Testing

1. **Start the backend server**:
   ```bash
   npm run start:dev
   ```

2. **Test password reset**:
   - Go to `/forgot-password`
   - Enter a valid email
   - Check your email inbox
   - In development, the reset URL is also logged to console

3. **Test user registration**:
   - Register a new user
   - Check email for welcome message

## Email Templates

The system includes two email templates:

1. **Password Reset Email** (`sendPasswordResetEmail`)
   - Professional design with Formalitys branding
   - Security warnings and instructions
   - 1-hour token expiration notice

2. **Welcome Email** (`sendWelcomeEmail`)
   - Welcome message for new users
   - Service overview and features
   - Contact information and support details

## Troubleshooting

### Common Issues

1. **"Invalid login" error**:
   - Check SMTP credentials
   - Ensure 2FA is enabled for Gmail
   - Use App Password, not regular password

2. **"Connection timeout"**:
   - Check SMTP_HOST and SMTP_PORT
   - Verify firewall settings
   - Try different port (465 for SSL)

3. **"Authentication failed"**:
   - Double-check SMTP_USER and SMTP_PASS
   - Ensure account has SMTP access enabled

### Debug Mode

Set `NODE_ENV=development` to see detailed email logs in console.

## Production Considerations

1. **Use a dedicated email service** (SendGrid, Mailgun, AWS SES)
2. **Set up proper SPF/DKIM records** for your domain
3. **Monitor email delivery rates**
4. **Implement email queue** for high volume
5. **Add email templates management** for easy updates

## Security Notes

- Never commit `.env` file to version control
- Use environment-specific email accounts
- Monitor for suspicious email activity
- Implement rate limiting for password reset requests
