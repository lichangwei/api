import { Controller, Get, Req, Res, Header, Query, Post, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import RequestIp from 'request-ip';
import QRCode from 'qrcode';
import puppeteer from 'puppeteer';

interface IExportPdfOptions {
  format: puppeteer.PDFOptions['format'];
  header?: () => string | string;
  footer?: {
    left?: string;
  };
}

@Controller('/api')
export class ApiController {
  @Get('/ip')
  @Header('Content-Type', 'text/plain')
  public getClientIp(@Req() req: Request) {
    return RequestIp.getClientIp(req);
  }

  @Get('/qrcode')
  public saveWish(@Query('text') text: string, @Res() res: Response) {
    QRCode.toFileStream(res, text);
  }

  @Post('/export/pdf')
  @Header('Content-Type', 'application/pdf')
  public async exportPDF(
    @Body('title') title: string,
    @Body('html') html: string,
    @Body('options') options: IExportPdfOptions,
    @Res() res: Response
  ) {
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
        format: options.format || 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '',
        footerTemplate: `
                  <div style="width:100%;font-size:10px;padding-left:20px;">
                      ${options?.footer?.left || ''}
                  </div>
                  <div style="width:100%;font-size:10px;padding-right:20px;text-align:right;">
                      <span class='pageNumber'></span>
                      <span>/</span>
                      <span class='totalPages'></span>
                  </div>`,
        margin: {
          top: '10px',
          bottom: '50px',
        },
      })
      .then(function(buffer: Buffer) {
        res.setHeader('Content-Type', 'application/pdf');
        res.attachment(`${title}.pdf`);
        res.write(buffer);
        res.end();
      })
      .then(function() {
        browser.close();
      });
  }
}
