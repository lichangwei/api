import { Controller, Res, Header, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import puppeteer from 'puppeteer';
import { ApiResponse } from '@nestjs/swagger';
import { ExportPdfDto } from './export.pdf.dto';
import { ExportPngDto } from './export.png.dto';

@Controller('/api')
export class ExportController {
  @Post('/export/pdf')
  @Header('Content-Type', 'application/pdf')
  @ApiResponse({ status: 200 })
  public async exportPDF(@Body() body: ExportPdfDto, @Res() res: Response) {
    const { name, html, options } = body;
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.once('request', async (request) => {
      request.respond({ body: html });
      await page.setRequestInterception(false);
    });
    await page.goto('http://www.example.com/', { waitUntil: 'load' });

    await page
      .pdf({
        format: options?.format || 'A3',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: options?.header || '',
        footerTemplate: options?.footer || ExportPdfDefaultFooter,
        margin: {
          top: '10px',
          bottom: '50px',
        },
      })
      .then(function (buffer: Buffer) {
        res.attachment(`${name}.pdf`);
        res.write(buffer);
        res.end();
      })
      .then(function () {
        browser.close();
      });
  }

  @Post('/export/img')
  @ApiResponse({ status: 200 })
  public async exportImg(@Body() body: ExportPngDto, @Res() res: Response) {
    const { name, html, options = {} } = body;
    delete options.path;
    options.type = options.type || 'png';
    options.fullPage = options.fullPage || true;

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: {
        width: 1200,
        height: 800,
        deviceScaleFactor: 1.5,
      },
    });

    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.once('request', async (request) => {
      request.respond({ body: html });
      await page.setRequestInterception(false);
    });
    await page.goto('http://www.example.com/', { waitUntil: 'load' });

    await page
      .screenshot(options)
      .then(function (buffer: string | Buffer) {
        res.setHeader('Content-Type', `image/${options.type}`);
        res.attachment(`${name}.${options.type}`);
        res.write(buffer);
        res.end();
      })
      .then(function () {
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
