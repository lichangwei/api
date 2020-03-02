import { Controller, Get, Query, Render, Req, Header } from '@nestjs/common';

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
