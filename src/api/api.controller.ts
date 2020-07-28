import { Controller, Get, Req, Res, Header, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import RequestIp from 'request-ip';
import QRCode from 'qrcode';
import { ApiQuery, ApiResponse, ApiProperty } from '@nestjs/swagger';

class PersonDTO {
  @ApiProperty({
    description: '姓名',
    required: true,
  })
  name: string;
  @ApiProperty({
    description: '年龄',
    required: false,
  })
  age?: number;
}

@Controller('/api')
export class ApiController {
  constructor() {}

  @Get('/ip')
  @Header('Content-Type', 'text/plain')
  @ApiResponse({ status: 200, type: String })
  public getClientIp(@Req() req: Request): string {
    return RequestIp.getClientIp(req) as string;
  }

  @Get('/test')
  @Header('Content-Type', 'text/plain')
  @ApiResponse({ status: 200, type: PersonDTO, isArray: true })
  public test(@Req() req: Request) {
    const persons = [
      {
        name: 'a',
      },
    ];
    return Promise.resolve(persons);
  }

  @Get('/qrcode')
  @Header('Content-Type', 'image/png')
  @ApiQuery({ name: 'text', description: '二维码内容，可以是网址或普通文本' })
  @ApiResponse({ status: 200 })
  public async saveWish(@Query('text') text: string, @Res() res: Response) {
    QRCode.toFileStream(res, text);
  }
}
