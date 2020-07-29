import { ApiProperty } from '@nestjs/swagger';
import puppeteer from 'puppeteer';

class ExportPdfOptionsDto {
  @ApiProperty({
    description:
      'PDF文件尺寸，详细参考[puppeteer官方文档](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md)',
    enum: ['Letter', 'Legal', 'Tabloid', 'Ledger', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
    default: 'A3',
    required: false,
  })
  format?: puppeteer.PDFOptions['format'];

  @ApiProperty({
    description: 'PDF文件页头内容',
    required: false,
  })
  header?: string;

  @ApiProperty({
    description: 'PDF文件页脚内容，默认显示页码`1/5`',
    required: false,
  })
  footer?: string;
}

export class ExportPdfDto {
  @ApiProperty({
    description: 'PDF文件名称',
  })
  name: string;

  @ApiProperty({
    description: '将要导出内容',
  })
  html: string;

  @ApiProperty({
    description: 'PDF导出选项',
    type: ExportPdfOptionsDto,
    required: false,
  })
  options?: ExportPdfOptionsDto;
}
