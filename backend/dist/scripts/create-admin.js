"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function createAdmin() {
    const email = 'admin@formalitys.ma';
    const password = 'admin123';
    const name = 'Admin';
    try {
        const existingAdmin = await prisma.user.findUnique({
            where: { email },
        });
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const admin = await prisma.user.create({
            data: {
                email,
                name,
                passwordHash,
                role: 'ADMIN',
            },
        });
        console.log('Admin user created successfully:');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log(`ID: ${admin.id}`);
    }
    catch (error) {
        console.error('Error creating admin user:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
createAdmin();
//# sourceMappingURL=create-admin.js.map