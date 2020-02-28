import { Controller, Get, Req, Res, Header, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import RequestIp from 'request-ip';
import QRCode from 'qrcode';

@Controller('/api')
export class ApiController {
  @Get('/ip')
  @Header('Content-Type', 'text/plain')
  public getClientIp(@Req() req: Request) {
    return RequestIp.getClientIp(req);
  }

  @Get('/qrcode')
  @Header('Content-Type', 'image/png')
  public saveWish(@Query('text') text: string, @Res() res: Response) {
    QRCode.toFileStream(res, text);
  }
}
