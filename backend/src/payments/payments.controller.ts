import { Body, Controller, Post, UseGuards, Req, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaymentsService } from './payments.service';
import { IsString, IsNumber, IsIn } from 'class-validator';
import type { Request } from 'express';

class CreatePaymentIntentDto {
  @IsNumber()
  dossierId!: number;

  @IsString()
  @IsIn(['company', 'tourism'])
  dossierType!: 'company' | 'tourism';
}

class ConfirmPaymentDto {
  @IsString()
  paymentIntentId!: string;
}

@Controller('payments')
@UseGuards(AuthGuard('jwt'))
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  createPaymentIntent(@Body() dto: CreatePaymentIntentDto, @Req() req: any) {
    return this.paymentsService.createPaymentIntent(
      dto.dossierId,
      dto.dossierType,
      req.user?.userId,
    );
  }

  @Post('confirm')
  confirmPayment(@Body() dto: ConfirmPaymentDto) {
    return this.paymentsService.confirmPayment(dto.paymentIntentId);
  }

  @Post('webhook')
  handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: Request & { rawBody?: Buffer }
  ) {
    if (!req.rawBody) {
      throw new Error('Raw body required for webhook');
    }
    return this.paymentsService.handleWebhook(signature, req.rawBody);
  }
}
