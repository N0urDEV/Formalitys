# S3 Setup Guide for Formalitys

## Overview
This guide explains how to set up Railway S3-compatible storage for file uploads in the Formalitys backend.

## Prerequisites
- AWS SDK installed: `npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner`
- Railway account with S3-compatible storage service

## Environment Variables

Add these variables to your `.env` file in the backend directory:

```env
# Railway S3-Compatible Storage
S3_ENDPOINT="https://your-railway-s3-endpoint.com"
S3_REGION="us-east-1"
S3_ACCESS_KEY="your-access-key"
S3_SECRET_KEY="your-secret-key"
S3_BUCKET_NAME="your-bucket-name"
```

## How to Get Railway S3 Credentials

1. **Go to Railway Dashboard**
   - Visit [railway.app](https://railway.app)
   - Sign in to your account

2. **Create S3-Compatible Storage Service**
   - Click "New Project"
   - Select "Database" → "S3-Compatible Storage"
   - Choose a region (e.g., us-east-1)

3. **Get Your Credentials**
   - Go to your S3 service
   - Click on "Variables" tab
   - Copy the following values:
     - `S3_ENDPOINT` (e.g., https://s3.railway.app)
     - `S3_ACCESS_KEY` (your access key)
     - `S3_SECRET_KEY` (your secret key)
     - `S3_BUCKET_NAME` (your bucket name)
     - `S3_REGION` (e.g., us-east-1)

## File Structure

Files are organized in S3 as follows:
```
uploads/
├── username/
│   ├── cni/
│   │   └── timestamp-random.pdf
│   ├── passport/
│   │   └── timestamp-random.jpg
│   ├── rib/
│   │   └── timestamp-random.pdf
│   └── autre/
│       └── timestamp-random.docx
```

## Document Type Detection

The system automatically detects document types based on filename patterns:

- **cni**: CNI, carte identité, identity card
- **passport**: Passport, passeport
- **rib**: RIB, relevé bancaire, bank statement
- **statut**: Statuts, statutes
- **acte**: Acte de constitution, deed
- **registre_commerce**: Registre du commerce
- **patente**: Patente, tax license
- **cnss**: CNSS, social security
- **autorisation**: Autorisation, permit
- **classement**: Classement touristique
- **taxe**: Taxe de séjour
- **autre**: Other documents

## API Endpoints

### Upload Single File
```
POST /uploads/file
Content-Type: multipart/form-data
Authorization: Bearer <token>

Body: file (multipart file)
```

### Upload Multiple Files
```
POST /uploads/multiple
Content-Type: multipart/form-data
Authorization: Bearer <token>

Body: files[] (multipart files)
```

### Get File URL
```
GET /uploads/file/:key
Authorization: Bearer <token>
```

### Delete File
```
DELETE /uploads/file/:key
Authorization: Bearer <token>
```

## Response Format

```json
{
  "id": "file_1234567890_abc123",
  "filename": "username-cni-1234567890-987654321.pdf",
  "originalName": "carte_identite.pdf",
  "documentType": "cni",
  "size": 1024000,
  "mimetype": "application/pdf",
  "url": "https://your-railway-s3-endpoint.com/bucket/uploads/username/cni/1234567890-987654321.pdf",
  "key": "uploads/username/cni/1234567890-987654321.pdf",
  "uploadedBy": "user_id",
  "uploadedByName": "User Name",
  "uploadedAt": "2024-01-01T00:00:00.000Z"
}
```

## Benefits

- ✅ **Scalable**: Cloud storage with unlimited capacity
- ✅ **Reliable**: S3-compatible with redundancy
- ✅ **Cost-effective**: Railway pricing
- ✅ **Secure**: Files are properly organized and access-controlled
- ✅ **Fast**: Direct S3 URLs for file access
- ✅ **Organized**: Files are structured by user and document type

## Testing

1. Start your backend server
2. Test file upload with Postman or your frontend
3. Check Railway dashboard to see uploaded files
4. Verify file URLs are accessible

## Troubleshooting

### Common Issues

1. **"Access Denied" Error**
   - Check your S3 credentials
   - Verify bucket permissions

2. **"File not found" Error**
   - Check if the file key exists
   - Verify the file was uploaded successfully

3. **"Invalid endpoint" Error**
   - Check your S3_ENDPOINT URL
   - Ensure it includes the protocol (https://)

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

This will show detailed S3 operation logs in your console.
