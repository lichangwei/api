import { Controller, Get, Req, Res, Header, Query, Post, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import RequestIp from 'request-ip';
import QRCode from 'qrcode';
import puppeteer from 'puppeteer';
import { ExportPdfDto } from './export.pdf.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('/api')
export class ApiController {
  constructor() {}

  @Get('/ip')
  @Header('Content-Type', 'text/plain')
  public getClientIp(@Req() req: Request) {
    return RequestIp.getClientIp(req);
  }

  @Get('/qrcode')
  @Header('Content-Type', 'image/png')
  @ApiQuery({ name: 'text', description: '二维码内容，可以是网址或普通文本' })
  public saveWish(@Query('text') text: string, @Res() res: Response) {
    QRCode.toFileStream(res, text);
  }

  @Post('/export/pdf')
  @Header('Content-Type', 'application/pdf')
  public async exportPDF(@Body() body: ExportPdfDto, @Res() res: Response) {
    const { name, html, options } = body;
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.once('request', (request: puppeteer.Request) => {
      request.respond({ body: html });
    });
    await page.setContent(html);
    await page
      .pdf({
        format: options?.format || 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: options?.header || '',
        footerTemplate: options?.footer || ExportPdfDefaultFooter,
        margin: {
          top: '10px',
          bottom: '50px',
        },
      })
      .then(function(buffer: Buffer) {
        res.setHeader('Content-Type', 'application/pdf');
        res.attachment(`${name}.pdf`);
        res.write(buffer);
        res.end();
      })
      .then(function() {
        browser.close();
      });
  }
}

const ExportPdfDefaultFooter = `
  <div style="width:100%;font-size:10px;padding-right:20px;text-align:right;">
    <span class='pageNumber'></span>
    <span>/</span>
    <span class='totalPages'></span>
  </div>`;
