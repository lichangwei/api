import { ApiProperty } from '@nestjs/swagger';
import puppeteer from 'puppeteer';

export class ExportPngDto {
  @ApiProperty({
    description: '图片文件名称',
  })
  name: string;

  @ApiProperty({
    description: '将要导出内容',
  })
  html: string;

  @ApiProperty({
    description:
      '截屏选项，详细参考[puppeteer官方文档](https://pptr.dev/#?product=Puppeteer&show=api-pagescreenshotoptions)',
    required: false,
  })
  options?: puppeteer.ScreenshotOptions;
}
