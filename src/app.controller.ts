import { Controller, Get, Query, Render, Req, Header } from '@nestjs/common';
import { Request } from 'express';
import RequestIp from 'request-ip';

@Controller()
export class AppController {
  @Render('Index')
  @Get()
  public index() {
    return {};
  }

  @Render('TransformWeChatImageToBackground')
  @Get('/wechat-image-to-background')
  public transformWeChatImageToBackground() {
    return {};
  }
}
