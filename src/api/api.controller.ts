import { Controller, Get, Req, Res, Header, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import RequestIp from 'request-ip';
import QRCode from 'qrcode';
import * as d3 from 'd3';
import { JSDOM } from 'jsdom';
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
  public async createQRCode(@Query('text') text: string, @Res() res: Response) {
    QRCode.toFileStream(res, text);
  }

  @Get('/chart/simple')
  @Header('Content-Type', 'image/svg+xml')
  public async createSimpleChart(
    @Query('xs') xArrayString: string = '[1,2,3,4,5]',
    @Query('ys') yArrayString: string = '[20,75,45,50,33]',
    @Query('width') width: number = 200,
    @Query('height') height: number = 50,
    @Query('color') color: string = '#87c14d'
  ) {
    const { window } = new JSDOM(`<svg viewBox="0 0 ${width} ${height}"  xmlns="http://www.w3.org/2000/svg" />`);
    const svg = d3.select(window.document).select<Element>('svg');

    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

    const xDataArray: string[] = JSON.parse(xArrayString);
    const yDataArray: number[] = JSON.parse(yArrayString);

    const x = d3
      .scaleBand()
      .domain(xDataArray)
      .range([margin.left, ((width - margin.right) * xDataArray.length) / (xDataArray.length - 1)]);
    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .nice()
      .range([height - margin.bottom, margin.top]);
    const area = d3
      .area<string>()
      .curve(d3.curveCardinal)
      .x((d) => x(d) as number)
      .y0(y(0) as number)
      .y1((d, i) => y(yDataArray[i]) as number);

    svg.append('path').datum(xDataArray).attr('fill', color).attr('d', area);
    return svg.node()?.outerHTML;
  }
}
