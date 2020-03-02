import React from 'react';
import { NextPage, NextPageContext } from 'next';
import './Index.less';

interface IIndexProps {
  query: { name?: string };
}

const Index: NextPage<IIndexProps> = () => {
  return (
    <>
      <article>
        <title>我的编程记录</title>
        <a href="./wechat-image-to-background">微信公众号文章实现防触碰效果</a>
      </article>
      <footer>
        <div>Copyright© 2019-2020 我的编程记录</div>
        <a href="http://www.beian.miit.gov.cn" rel="nofollow noopener noreferrer">
          苏ICP备19067408号-1
        </a>
      </footer>
    </>
  );
};

Index.getInitialProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  return { query };
};

export default Index;
