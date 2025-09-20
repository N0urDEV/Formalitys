# MinIO Setup Guide for Formalitys

## 🚀 Quick Setup

### Step 1: Get MinIO Credentials from Railway

1. Go to your Railway dashboard
2. Click on your MinIO service
3. Go to the "Variables" tab
4. Copy these values:
   - `MINIO_ROOT_USER` (your access key)
   - `MINIO_ROOT_PASSWORD` (your secret key)
   - `MINIO_ENDPOINT` (your S3 endpoint URL)

### Step 2: Create .env File

Create a `.env` file in the `backend` directory with these variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/formalitys_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Email Configuration
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# Stripe
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# MinIO S3-Compatible Storage
S3_ENDPOINT="https://your-minio-endpoint.railway.app"
S3_REGION="us-east-1"
S3_ACCESS_KEY="your-minio-root-user"
S3_SECRET_KEY="your-minio-root-password"
S3_BUCKET_NAME="formalitys-uploads"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### Step 3: Replace the Placeholder Values

Replace these values with your actual MinIO credentials:
- `https://your-minio-endpoint.railway.app` → Your actual MinIO endpoint
- `your-minio-root-user` → Your actual MinIO root user
- `your-minio-root-password` → Your actual MinIO root password

### Step 4: Test the Connection

Run the test script to verify your connection:

```bash
node test-minio.js
```

## 🔧 MinIO Configuration

### Bucket Policy (for public file access)

Once your MinIO is set up, you'll need to set the bucket policy to allow public read access:

1. Go to your MinIO web interface (usually at your endpoint URL)
2. Login with your credentials
3. Go to the `formalitys-uploads` bucket
4. Go to "Manage" → "Access Rules"
5. Add this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::formalitys-uploads/*"
    }
  ]
}
```

## 🧪 Testing

### Test File Upload

1. Start your backend server:
   ```bash
   npm run start:dev
   ```

2. Test file upload with curl:
   ```bash
   curl -X POST http://localhost:3001/uploads/multiple \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -F "files=@test-file.pdf"
   ```

### Test File Access

1. Upload a file and get the URL
2. Open the URL in your browser
3. Verify the file is accessible

## 🔍 Troubleshooting

### Common Issues

1. **"Access Denied" Error**
   - Check your MinIO credentials
   - Verify the bucket exists
   - Check bucket permissions

2. **"Invalid endpoint" Error**
   - Check your S3_ENDPOINT URL
   - Ensure it includes the protocol (https://)
   - Verify the endpoint is accessible

3. **"File not found" Error**
   - Check if the file was uploaded successfully
   - Verify the file key is correct
   - Check bucket permissions

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

## 📁 File Organization

Files will be organized in MinIO as:
```
formalitys-uploads/
├── uploads/
│   ├── username1/
│   │   ├── cni/
│   │   │   └── 1234567890-987654321.pdf
│   │   ├── passport/
│   │   │   └── 1234567890-987654321.jpg
│   │   └── rib/
│   │       └── 1234567890-987654321.pdf
│   └── username2/
│       └── cni/
│           └── 1234567890-987654321.pdf
```

## ✅ Success Indicators

You'll know everything is working when:
- ✅ Test script runs without errors
- ✅ Files upload successfully
- ✅ Files are accessible via URL
- ✅ Files appear in MinIO web interface
- ✅ No errors in backend logs

## 🚀 Next Steps

Once MinIO is connected:
1. Test file uploads from your frontend
2. Verify files are stored in MinIO
3. Test file access and downloads
4. Monitor storage usage in Railway dashboard
